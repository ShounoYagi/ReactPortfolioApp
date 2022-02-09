using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactPortfolioApp.Data;
using ReactPortfolioApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using BackEndCommon;

namespace ReactPortfolioApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExecutionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public class ChoiceData
        {
            public int id { get; set; }
            public int choiceOrder { get; set; }
            public string choiceText { get; set; }
            public bool hitFlag { get; set; }
            public bool deleteFlag { get; set; }
        }

        public class QuestionData
        {
            public int id { get; set; }
            public int questionOrder { get; set; }
            public string bodyText { get; set; }
            public bool deleteFlag { get; set; }
            public ChoiceData[] choices { get; set; }
        }

        public class ExamData
        {
            public int id { get; set; }
            public int userId { get; set; }
            public string name { get; set; }
            public int executeTime { get; set; }
            public int passPoints { get; set; }
            public int maxPoints { get; set; }
            public bool deleteFlag { get; set; }
            public QuestionData[] questions { get; set; }
        }


        public ExecutionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //Execution、Question、Choice全てを取得する
        // GET: api/Executions
        [HttpGet]
        [ActionName("exam")]
        public async Task<ActionResult> GetExecutions()
        {
            try{
                var executions = _context.Executions.Where(p => p.DeleteFlag == false);

                // if(id != null){
                //     executions = executions.Where(p => p.Id == (int)id);
                // }

                var executionsArray = await executions.ToArrayAsync();

                if (executionsArray == null)
                {
                    return new OkObjectResult(new ClientResponse<string>(nameof(GetExecutions), null, null)
                    {
                        errorCode = 40400,
                        errorTitle = ResponseMessages.Error_GetExecutions_SystemError_Title,
                        errorDetail = ResponseMessages.Error_GetExecutions_Detail
                    });
                }

                ExamData[] examDatas = executionsArray.Select(p => new ExamData
                {
                    id = p.Id,
                    userId = p.UserId,
                    name = p.Name,
                    executeTime = p.ExecuteTime,
                    passPoints = p.PassPoints,
                    maxPoints = p.MaxPoints,
                    deleteFlag = p.DeleteFlag
                }).ToArray();

                return new OkObjectResult(new ClientResponse<ExamData[]>(nameof(GetExecutions), null, null)
                {
                    errorCode = 20000,
                    errorTitle = ResponseMessages.Success_Title,
                    errorDetail = ResponseMessages.Success_GetExecutions_Detail,
                    value = examDatas
                });

            }catch(Exception ex){
                return new OkObjectResult(new ClientResponse<string>(nameof(GetExecutions), null, ex)
                {
                    errorCode = 50001,
                    errorTitle = ResponseMessages.Error_GetExecutions_SystemError_Title,
                    errorDetail = ex.Message
                });
            }
        }

        // GET: api/Executions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamData>> GetExecution(int id)
        {
            try{

                var execution = await _context.Executions.FindAsync(id);

                if (execution == null)
                {
                    return new OkObjectResult(new ClientResponse<string>(nameof(GetExecution), null, null)
                        {
                            errorCode = 40400,
                            errorTitle = ResponseMessages.Error_GetExecutions_SystemError_Title,
                            errorDetail = ResponseMessages.Error_GetExecutions_Detail
                        });
                }

                var questions = await _context.Questions.Where(q => q.ExecutionId == (int)id).ToArrayAsync();

                List<QuestionData> expansionQuestions = new List<QuestionData>();
                

                foreach (Question q in questions)
                {
                    Choice[] choicesData = await _context.Choices.Where(c => c.QuestionId == q.Id).ToArrayAsync();
                    List<ChoiceData> expansionChoices = new List<ChoiceData>();

                    foreach(var choice in choicesData)
                    {
                        expansionChoices.Add(new ChoiceData{
                            id = choice.Id,
                            choiceOrder = choice.ChoiceOrder,
                            choiceText = choice.ChiceText,
                            hitFlag = choice.HitFlag,
                            deleteFlag = choice.DeleteFlag
                        });
                    };
                
                    expansionQuestions.Add(new QuestionData {
                        id = q.Id,
                        questionOrder = q.QuestionOrder,
                        bodyText = q.BodyText,
                        deleteFlag = q.DeleteFlag,
                        choices = expansionChoices.ToArray()
                    });
                    
                }

                ExamData examDatas = new ExamData
                    {
                        id = execution.Id,
                        userId = execution.UserId,
                        name = execution.Name,
                        executeTime = execution.ExecuteTime,
                        passPoints = execution.PassPoints,
                        maxPoints = execution.MaxPoints,
                        deleteFlag = execution.DeleteFlag,
                        questions = expansionQuestions.ToArray()
                    };


                return new OkObjectResult(new ClientResponse<ExamData>(nameof(GetExecution), null, null)
                    {
                        errorCode = 20000,
                        errorTitle = ResponseMessages.Success_Title,
                        errorDetail = ResponseMessages.Success_GetExecutions_Detail,
                        value = examDatas
                });
                
            }catch(Exception ex){
                return new OkObjectResult(new ClientResponse<string>(nameof(GetExecutions), null, ex)
                {
                    errorCode = 50001,
                    errorTitle = ResponseMessages.Error_GetExecutions_SystemError_Title,
                    errorDetail = ex.Message
                });
            }

        }

        // PUT: api/Executions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<ActionResult<ExamData>> PutExecution(ExamData exam)
        {

            try{
                var questionsInDB = await _context.Questions.Where(q => q.ExecutionId == exam.id).ToArrayAsync();

                //既存のQuestionとchoiceを削除
                foreach(var qInDB in questionsInDB)
                {
                    _context.Questions.Remove(qInDB);
                    var choicesInDB = await _context.Choices.Where(c => c.QuestionId == qInDB.Id).ToArrayAsync();
                    foreach(var choice in choicesInDB)
                    {
                       _context.Choices.Remove(choice);
                    }
                }

                var execution = new Execution{ 
                    Id = exam.id,
                    UserId = exam.userId,
                    Name = exam.name,
                    ExecuteTime = exam.executeTime,
                    PassPoints = exam.passPoints,
                    MaxPoints = exam.maxPoints,
                    DeleteFlag = exam.deleteFlag 
                };
                _context.Entry(execution).State = EntityState.Modified;

                foreach(var q in exam.questions)
                {
                    var question = new Question{
                        ExecutionId = exam.id, 
                        QuestionOrder = q.questionOrder,
                        BodyText = q.bodyText,
                        Created = DateTime.Now,
                        Modified = DateTime.Now,
                        DeleteFlag = q.deleteFlag
                    };
                    _context.Questions.Add(question);
                    await _context.SaveChangesAsync();

                    foreach(var choice in q.choices)
                    {
                        var choiceData = new Choice{
                            QuestionId = question.Id, 
                            ChoiceOrder = choice.choiceOrder,
                            ChiceText = choice.choiceText,
                            HitFlag= choice.hitFlag,
                            Created = DateTime.Now,
                            Modified = DateTime.Now,
                            DeleteFlag = choice.deleteFlag
                        };
                        _context.Choices.Add(choiceData);
                    }
                };

                

                await _context.SaveChangesAsync();

                return new OkObjectResult(new ClientResponse<ExamData>(nameof(PostExecution), null, null)
                    {
                        errorCode = 20000,
                        errorTitle = ResponseMessages.Success_Title,
                        errorDetail = ResponseMessages.Success_GetExecutions_Detail,
                        value = exam
                    });

            }catch(Exception ex){
                return new OkObjectResult(new ClientResponse<ExamData>(nameof(PostExecution), null, ex)
                {
                    errorCode = 50001,
                    errorTitle = "エラーです",
                    errorDetail = ex.Message,
                    value = exam
                });
            }

        }

        // POST: api/Executions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //Execution、Question、Choice全てを登録処理する
        [HttpPost]
        public async Task<ActionResult<ExamData>> PostExecution(ExamData exam)
        {
            try{
                var execution = new Execution{ 
                    UserId = exam.userId,
                    Name = exam.name,
                    ExecuteTime = exam.executeTime,
                    PassPoints = exam.passPoints,
                    MaxPoints = exam.maxPoints,
                    DeleteFlag = exam.deleteFlag 
                };
                _context.Executions.Add(execution);
                await _context.SaveChangesAsync();

                foreach(var q in exam.questions)
                {
                    var question = new Question{
                        ExecutionId = execution.Id, //先ほど登録したexecutionに割り振られたIDをそのままの変数から参照できる
                        QuestionOrder = q.questionOrder,
                        BodyText = q.bodyText,
                        Created = DateTime.Now,
                        Modified = DateTime.Now,
                        DeleteFlag = q.deleteFlag
                    };
                    _context.Questions.Add(question);
                    await _context.SaveChangesAsync();

                    foreach(var choice in q.choices)
                    {
                        var choiceData = new Choice{
                            QuestionId = question.Id, //先ほど登録したquestionに割り振られたIDをそのままの変数から参照できる
                            ChoiceOrder = choice.choiceOrder,
                            ChiceText = choice.choiceText,
                            HitFlag= choice.hitFlag,
                            Created = DateTime.Now,
                            Modified = DateTime.Now,
                            DeleteFlag = choice.deleteFlag
                        };
                        _context.Choices.Add(choiceData);
                    }
                };

                await _context.SaveChangesAsync();

                return new OkObjectResult(new ClientResponse<ExamData>(nameof(PostExecution), null, null)
                    {
                        errorCode = 20000,
                        errorTitle = ResponseMessages.Success_Title,
                        errorDetail = ResponseMessages.Success_GetExecutions_Detail,
                        value = exam
                    });

            }catch(Exception ex){
                return new OkObjectResult(new ClientResponse<string>(nameof(PostExecution), null, ex)
                {
                    errorCode = 50001,
                    errorTitle = "エラーです",
                    errorDetail = ex.Message
                });
            }

            //return CreatedAtAction("GetExecution", new { id = exam.id }, exam);
        }

        // DELETE: api/Executions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteExecution(int id)
        {
            try{

                //Executionを削除
                var execution = await _context.Executions.FindAsync(id);
                _context.Executions.Remove(execution);

                var questionsInDB = await _context.Questions.Where(q => q.ExecutionId == id).ToArrayAsync();

                //Questionとchoiceを削除
                foreach(var qInDB in questionsInDB)
                {
                    _context.Questions.Remove(qInDB);
                    var choicesInDB = await _context.Choices.Where(c => c.QuestionId == qInDB.Id).ToArrayAsync();
                    foreach(var choice in choicesInDB)
                    {
                       _context.Choices.Remove(choice);
                    }
                }
              
                await _context.SaveChangesAsync();

                return new OkObjectResult(new ClientResponse<string>(nameof(PostExecution), null, null)
                    {
                        errorCode = 20000,
                        errorTitle = ResponseMessages.Success_Title,
                        errorDetail = ResponseMessages.Success_GetExecutions_Detail,
                    });

            }catch(Exception ex){
                return new OkObjectResult(new ClientResponse<string>(nameof(PostExecution), null, ex)
                {
                    errorCode = 50001,
                    errorTitle = "エラーです",
                    errorDetail = ex.Message,
                });
            }    
        }




        private bool ExecutionExists(int id)
        {
            return _context.Executions.Any(e => e.Id == id);
        }
    }
}
