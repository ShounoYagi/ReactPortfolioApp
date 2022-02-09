import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import * as common from "../common";
import { Exam ,Choice ,Question ,APIResponse } from '../react-app-env';
import {CustomModal} from "./StylesUI/CustomModal"
import {ExamInputArea} from "./ExamRegisterComponents/ExamInputArea";
import {QuestionEditor} from "./ExamRegisterComponents/QuestionEditor";

// 引数で生成するCSSを定義してuseStyles関数を生成
const useStyles = makeStyles((theme) => ({
    // 第一階層はCSSクラス名（実際は後ろに重複防止の接尾辞がつく）
    // homeRoot => .homeRoot-1-2-3 など
    topRoot: {
        fontSize: common.FONT_SIZE.body_text,
        "& h4": {
            color: "#003f71",
            fontWeight: "bold",
            marginBottom:"30px",
            fontSize:common.FONT_SIZE.body_text
        },
        "& .MuiInputBase-input":{
            fontSize: common.FONT_SIZE.body_text
        }
    },
    modalText:{
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding:"2rem 0",
        color:"#4378b6",
        textAlign:"center",
        "& .MuiTypography-body1":{
            fontSize: "2rem",
            fontWeight: "bold",
            color:"black",
        }
    },
    formStyle:{

    },
    labelStyle:{

    }
}));

const initialChoice:Choice[] = [ 
    {
        id:1,
        choiceOrder:1,
        choiceText:"",
        hitFlag:true,
        deleteFlag:false
    }
]

const initialQuestion:Question[] = [ 
    {
        id:1,
        questionOrder:1 ,
        bodyText:"",
        deleteFlag:false,
        choices:initialChoice,
    }
]


export const initialExam:Exam = {
    id :1,
    userId:1,
    name :"",
    executeTime :0,
    passPoints :0,
    maxPoints :0,
    deleteFlag :false,
    questions :[]
};





export function ExamRegister() {

    // -----共通関数の宣言-----
    const {
        params,
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    // 試験データを登録する
    function sendExamData(args?: Exam) {
        return api("/api/Executions", "POST", args)
    }

    // 試験データを更新する
    function updateExamData(args?: Exam) {
        return api("/api/Executions", "PUT", args)
    }

    // 試験データを取得する
    function getExamData(args?: any):Promise<APIResponse<Exam>> {
        return api("/api/Executions/"+params.id, "GET", args)
    };
    


    // -----汎用関数宣言-----


    const needsOpenModal = (latestExam:Exam[])=>{
        let flag = false;

        for (const exam of latestExam) {
            // if(exam.status === 0){
            //     flag = true ;
            // }
        }
        return flag;
    }

    const validateExecuteTime = (time:string) => {
        if(time == "") return true;
        // チェック条件パターン
        let pattern = /^([1-9]\d*|0)$/;
        // 数値チェック
        return pattern.test(time);
    }

    //フォーム入力時の処理
    const handleInput=(event: React.ChangeEvent<HTMLInputElement>)=>{

        const name = event.target.name as keyof typeof examData;

        switch(name){
            case "name":
                break;

            case "executeTime":
                if(!validateExecuteTime(event.target.value)) return;
                break;
        }

        setExamData({
            ...examData,
            [name]:event.target.value
        })

    }

    //問題文編集時、state変数を更新
    const handleInput_BodyText = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newQuestions = initialQuestion;
        newQuestions = questions.map(question =>{ 
            if(question.questionOrder === selectedQuestionOrder){
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:event.target.value,
                    deleteFlag:question.deleteFlag,
                    choices:question.choices,
                }
            }
            return question;
        });
        setQuestions(newQuestions)
    }

    //表示コンテンツの切り替え
    const changeContent = (type:string) => {
        setContentsType(type);
    };

    //現在サイドバーで選択中の問題を取得する
    const getSelectedQuestion = () => {
        let retval = initialQuestion[0];
        questions.forEach(question =>{ if(question.questionOrder === selectedQuestionOrder){
            retval = question;
        }});
        return retval;
    };

    const handleClick_sideBar = (question:Question) =>{
        setSelectedQuestionOrder(question.questionOrder);
    }

    const replaceChoice_Text = (choices:Choice[] ,id:number ,text:string) =>{
        return choices.map(choice =>{
            if(choice.id === id){
                return {
                    id:choice.id,
                    choiceOrder:choice.choiceOrder,
                    choiceText:text,
                    hitFlag:choice.hitFlag,
                    deleteFlag:choice.deleteFlag
                }
            }
            return choice
        })
    }
    const replaceChoice_HitFlag = (choices:Choice[] ,id:number) =>{
        return choices.map(choice =>{
            if(choice.id === id){
                return {
                    id:choice.id,
                    choiceOrder:choice.choiceOrder,
                    choiceText:choice.choiceText,
                    hitFlag:true,
                    deleteFlag:choice.deleteFlag
                }
            }
            return {
                id:choice.id,
                choiceOrder:choice.choiceOrder,
                choiceText:choice.choiceText,
                hitFlag:false,
                deleteFlag:choice.deleteFlag
            }
        })
    }

    const handleInput_Choices = (id:number ,event: React.ChangeEvent<HTMLInputElement>) =>{
        let newQuestions = initialQuestion;
        newQuestions = questions.map(question =>{
            if(question.questionOrder === selectedQuestionOrder){
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:replaceChoice_Text(question.choices ,id ,event.target.value),
                }
            }
            return question;
        })
        setQuestions(newQuestions)
    };

    const handleClick_ChoiceRadioBtn = (id:number) =>{
        let newQuestions = initialQuestion;
        newQuestions = questions.map(question =>{
            if(question.questionOrder === selectedQuestionOrder){
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:replaceChoice_HitFlag(question.choices ,id),
                }
            }
            return question;
        });
        setQuestions(newQuestions)
    };

    const addQuestion = () =>{
        const lastQuestion = questions[questions.length -1 ];
        let newQuestions = questions.concat();
        newQuestions.push({
            id:lastQuestion.id + 1,
            questionOrder:lastQuestion.questionOrder + 1 ,
            bodyText:"",
            deleteFlag:false,
            choices:initialChoice,
        });
        setQuestions(newQuestions);
    };

    const addChoice = () =>{
        const newQuestions = questions.map(question =>{
            if(question.questionOrder === selectedQuestionOrder){
                const lastChoice = question.choices[question.choices.length -1];
                let newChoices = question.choices.concat();
                newChoices.push({
                    id:lastChoice.id + 1,
                    choiceOrder:lastChoice.choiceOrder + 1,
                    choiceText:"",
                    hitFlag:false,
                    deleteFlag:false
                });
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:newChoices
                }
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    const deleteQuestion = (order:number) =>{
        let newQuestions = questions.filter(question => question.questionOrder != order);
        newQuestions = newQuestions.map(question =>{
            if(question.questionOrder > order){
                return {
                    id:question.id,
                    questionOrder:question.questionOrder -1,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:question.choices
                }
            }
            return question;
        })
        //選択中のアイテム更新
        if(selectedQuestionOrder >= order){
            setSelectedQuestionOrder(selectedQuestionOrder -1);
        }
        setQuestions(newQuestions);
    };

    const deleteChoice= (chioceOrder:number) =>{
        let newQuestions = questions.map(question =>{
            if(question.questionOrder === selectedQuestionOrder){
                let newChoices = question.choices.filter(choice =>choice.choiceOrder != chioceOrder);
                newChoices = newChoices.map(choice =>{
                    if(choice.choiceOrder >chioceOrder){
                        return {
                            id:choice.id,
                            choiceOrder:choice.choiceOrder - 1,
                            choiceText:choice.choiceText,
                            hitFlag:choice.hitFlag,
                            deleteFlag:choice.deleteFlag
                        }
                    }
                    return choice;
                })
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:newChoices
                }
            }
            return question;
        })
        setQuestions(newQuestions);
    };


    const submitExamData = () =>{

        const submitExam:Exam = {
            id :examData.id,
            userId:examData.userId,
            name :examData.name,
            executeTime :examData.executeTime,
            passPoints :examData.passPoints,
            maxPoints :questions.length,
            deleteFlag :examData.deleteFlag,
            questions :questions
        };

        if(params.id == "0"){
            sendExamData(submitExam)
                .then((data:APIResponse<Exam>) => {
                    if (data.errorCode ===　20000) {
                        setOpenModal(true);
                        setModalText(<div className={classNames.modalText}>試験登録成功</div>);
                        return;
                    } 
                }).catch((err) => {
                    setOpenModal(true);
                    setModalText(<div className={classNames.modalText}>登録出来ませんでした</div>);
                    console.log(err);
            });
        }else{
            updateExamData(submitExam)
                .then((data:APIResponse<Exam>) => {
                    if (data.errorCode ===　20000) {
                        setOpenModal(true);
                        setModalText(<div className={classNames.modalText}>試験更新成功</div>);
                        return;
                    } 
                }).catch((err) => {
                    setOpenModal(true);
                    setModalText(<div className={classNames.modalText}>更新出来ませんでした</div>);
                    console.log(err);
            });
        }
    }



    // -----スタイルの宣言-----
    const classNames = useStyles();


    
    // -----state-----
    //試験の基本情報格納用
    const [examData, setExamData] = React.useState<Exam>(initialExam);

    //試験の問題情報格納用
    const [questions, setQuestions] = React.useState<Question[]>(initialQuestion);

    const [selectedQuestionOrder,setSelectedQuestionOrder] = React.useState(1);

    const [isLoaded,setIsLoaded] = React.useState(true);

    const [sortOrder,setSortOrder] = React.useState("ASC");

    const [openModal, setOpenModal] = React.useState(false);

    const [contentsType, setContentsType] = React.useState("ExamInput");

    const [modalText, setModalText] = React.useState(<div></div>);


    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {
        console.log(params.id);
        if(params.id != "0"){
            setIsLoaded(false);
            // サーバーから認証してデータ取得
            getExamData()
                .then((data:APIResponse<Exam>) => {
                    if (data.errorCode !==20000) {
                        //common.alertError(data.errorTitle , data.errorDetail);
                        alert("error");
                        return;
                    }

                    if(data.value !== null){
                        setExamData(data.value);
                        setQuestions(data.value.questions);
                    }

                    setIsLoaded(true);

                }).catch((err) => {
                    // alert(common.ResponseMessages.Error_GetExam);
                });
        }

    }, []);
   


    let contents;
    
    switch(contentsType) 
        {
            case "ExamInput":
                contents =  <ExamInputArea examData={examData} setExamData={setExamData} changeContent={changeContent} handleInput={handleInput} ></ExamInputArea>
                break;
        
            case "QuestionEditor":
                contents =  <QuestionEditor examData={examData} questions={questions} selectedQuestionOrder={selectedQuestionOrder} getSelectedQuestion={getSelectedQuestion} changeContent={changeContent} handleInput_BodyText={handleInput_BodyText} 
                                            handleClick_sideBar={handleClick_sideBar} handleInput_Choices={handleInput_Choices} handleClick_ChoiceRadioBtn={handleClick_ChoiceRadioBtn} addQuestion={addQuestion}
                                            addChoice={addChoice} deleteQuestion={deleteQuestion} deleteChoice={deleteChoice} submitExamData={submitExamData}></QuestionEditor>
                break;
        }


    return (
        <div >
            {isLoaded ? 

            <div className={classNames.topRoot} >

                <CustomModal
                    openModal = {openModal}
                    setOpenModal = {setOpenModal}
                    modalFunc = {()=>{go("/")}}
                    isNotice = {true}
                >
                    {modalText}
                </CustomModal>

                {contents}
                
            </div>

            : <div>Loading...</div>

            }
        </div>
    );
}
