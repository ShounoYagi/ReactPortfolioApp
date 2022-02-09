import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Slider from '@mui/material/Slider';

import * as common from "../common";
import { Exam ,Choice ,Question ,APIResponse ,ExpansionQuestion} from '../react-app-env';
import {CustomModal} from "./StylesUI/CustomModal"
import Box from '@mui/material/Box';

import {QuestionScreen} from "./ExamScreenComponents/QuestionScreen";
import {ResultScreen} from "./ExamScreenComponents/ResultScreen";

// 引数で生成するCSSを定義してuseStyles関数を生成
const useStyles = makeStyles((theme) => ({
    // 第一階層はCSSクラス名（実際は後ろに重複防止の接尾辞がつく）
    // homeRoot => .homeRoot-1-2-3 など
    topRoot: {
        
    },
    modalText:{
        fontSize: "1.8rem",
        fontWeight: "bold",
        padding:"2rem 0",
        color:"#4378b6",
        "& .MuiTypography-body1":{
            fontSize: "2rem",
            fontWeight: "bold",
            color:"black",
        }
    },
    remainingTime: {
      display: "inline-block",
      padding: "0 0 0 12px",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#ffffff",
    },
    remainingTimeBox: {
      display: "inline-block",
      marginRight:"1rem",
      padding: " 5px 32px 7px",
      backgroundColor: "#4378b6",
      boxShadow: " 4px 4px 8px rgb(0 0 0 / 15%) inset",
      fontSize: "1rem",
      color: "#ffffff",
      height: " 34px",
      borderRadius: "22px"
    }
}));

const initialChoice:Choice[] = [ 
    {
        id:1,
        choiceOrder:1,
        choiceText:"アメリカ",
        hitFlag:true,
        deleteFlag:false
    },
    {
        id:2,
        choiceOrder:2,
        choiceText:"日本",
        hitFlag:false,
        deleteFlag:false
    },
    {
        id:3,
        choiceOrder:3,
        choiceText:"韓国",
        hitFlag:false,
        deleteFlag:false
    }
]

const initialChoice2:Choice[] = [ 
    {
        id:1,
        choiceOrder:1,
        choiceText:"象",
        hitFlag:true,
        deleteFlag:false
    },
    {
        id:2,
        choiceOrder:2,
        choiceText:"ワニ",
        hitFlag:false,
        deleteFlag:false
    }
]

const initialQuestion:ExpansionQuestion[] = [ 
    {
        id:1,
        questionOrder:1 ,
        bodyText:"一番大きい国は？",
        deleteFlag:false,
        choices:initialChoice,
        selectedChoiceId:-1
    },
    {
        id:2,
        questionOrder:2 ,
        bodyText:"一番大きい動物は？",
        deleteFlag:false,
        choices:initialChoice2,
        selectedChoiceId:-1
    }
]


export const initialExam:Exam = {
    id :1,
    userId:1,
    name :"サンプル試験",
    executeTime :5,
    passPoints :2,
    maxPoints :0,
    deleteFlag :false,
    questions :initialQuestion
};





export function ExamScreen() {

    // -----共通関数の宣言-----
    const {
        params,
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    // 試験データを送信する
    function sendExamData(args?: Exam) {
        return api("/api/Executions", "POST", args)
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


    //表示コンテンツの切り替え
    const handleSubmit = (type:string) => {
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

    const changeNextQuestion = () =>{
        setSelectedQuestionOrder(selectedQuestionOrder + 1);
    }

    const changePreviousQuestion = () =>{
        setSelectedQuestionOrder(selectedQuestionOrder - 1);
    }


    const handleClick_ChoiceRadioBtn = (id:number) =>{
        let newQuestions = initialQuestion;
        newQuestions = questions.map(question =>{
            if(question.questionOrder === selectedQuestionOrder){
                return {
                    id:question.id,
                    questionOrder:question.questionOrder,
                    bodyText:question.bodyText,
                    deleteFlag:question.deleteFlag,
                    choices:question.choices,
                    selectedChoiceId:id
                }
            }
            return question;
        });
        setQuestions(newQuestions)
    };


    //ResultScreenで使用する関数
    const getAnsweredChoiceText= (choices:Choice[] ,selectedChoiceId:number) =>{
        let retVal = "";
        choices.forEach(choice =>{
            if(choice.id === selectedChoiceId){
                retVal = choice.choiceText;
                return;
            }
        })
        return retVal
    }

    const getCorrectChoiceText= (choices:Choice[]) =>{
        let retVal = "";
        choices.forEach(choice =>{
            if(choice.hitFlag){
                retVal = choice.choiceText;
                return;
            }
        })
        return retVal
    }

    const isCorrectAnswer= (choices:Choice[] ,selectedChoiceId:number) =>{
        let isCorrect = false;
        choices.forEach(choice =>{
            if(choice.hitFlag){
                if(choice.id === selectedChoiceId){
                    isCorrect = true;
                }
                return;
            }
        })
        return isCorrect
    }

    const getCorrectAnswerNum= (questionArgs:ExpansionQuestion[]) =>{
        let correctNum = 0;
        questionArgs.forEach(question =>{
            if(isCorrectAnswer(question.choices ,question.selectedChoiceId)){
                correctNum++;
            }
        })

        return correctNum;
    }

    const countDown = (time: number) => {
        let count = time;
        let nowDate = new Date();
        const endDate = new Date(nowDate.getTime() + time * 1000);
        let id = setInterval(() => {
          count--;
          nowDate = new Date();
    
          setRemainingTime(count);
          if (nowDate.getTime() >= endDate.getTime()) {
            clearInterval(id);
            setRemainingTime(0);
            setIsFinishedTest(true);
            handleSubmit("ResultScreen");
          }
        }, 1000)
        return id;
    }

    //残り時間表示関数
    const dispRemainingTime = () => {
        const time = remainingTime;

        const allMinutes = Math.floor(time / 60);
        const hours = Math.floor(allMinutes / 60);
        const minutes = allMinutes - hours * 60;
        const seconds = time - (minutes * 60) - (hours * 60 * 60);
        return hours + ":" + paddZero(minutes) + ":" + paddZero(seconds)
    }

    const paddZero = (argNum: number) => {
        let retVal = String(argNum);
        if (argNum < 10) retVal = "0" + retVal;
        return retVal;
    }




    // -----スタイルの宣言-----
    const classNames = useStyles();


    
    // -----state-----
    //試験の基本情報格納用
    const [examData, setExamData] = React.useState<Exam>(initialExam);

    //試験の問題情報格納用
    const [questions, setQuestions] = React.useState<ExpansionQuestion[]>(initialQuestion);

    const [selectedQuestionOrder,setSelectedQuestionOrder] = React.useState(1);

    const [isLoaded,setIsLoaded] = React.useState(true);

    const [sortOrder,setSortOrder] = React.useState("ASC");

    const [openModal, setOpenModal] = React.useState(false);

    const [contentsType, setContentsType] = React.useState("QuestionScreen");

    const [modalText, setModalText] = React.useState(<div></div>);

    const [remainingTime, setRemainingTime] = React.useState(0);

    const [isFinishedTest, setIsFinishedTest] = React.useState<boolean>(false);


    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {

        let timerId: any;
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
                    const expansionQuestions = data.value.questions.map(question =>{
                        return {
                            id:question.id,
                            questionOrder:question.questionOrder,
                            bodyText:question.bodyText,
                            deleteFlag:question.deleteFlag,
                            choices:question.choices,
                            selectedChoiceId:-1
                        }
                    })
                    setQuestions(expansionQuestions);
                    //画面遷移後すぐにカウントダウン開始
                    timerId = countDown(data.value.executeTime * 60);
                }

                setIsLoaded(true);

            }).catch((err) => {
                // alert(common.ResponseMessages.Error_GetExam);
            });

            return () => {
                clearInterval(timerId);
              }

    }, []);
   


    let contents;
    
    switch(contentsType) 
        {
            case "ResultScreen":
                contents =  <ResultScreen examData={examData} questions={questions} getCorrectAnswerNum={getCorrectAnswerNum} isCorrectAnswer={isCorrectAnswer} getCorrectChoiceText={getCorrectChoiceText} getAnsweredChoiceText={getAnsweredChoiceText}></ResultScreen>
                break;
        
            case "QuestionScreen":
                contents =  <QuestionScreen examData={examData} questions={questions} selectedQuestionOrder={selectedQuestionOrder} getSelectedQuestion={getSelectedQuestion} handleSubmit={handleSubmit}  
                                            handleClick_sideBar={handleClick_sideBar}  handleClick_ChoiceRadioBtn={handleClick_ChoiceRadioBtn} changeNextQuestion={changeNextQuestion}
                                            changePreviousQuestion={changePreviousQuestion}></QuestionScreen>
                break;
        }
    
    let headerRemainingTime =
        <span className={classNames.remainingTimeBox}>
            残り時間：<span className={classNames.remainingTime} >{dispRemainingTime()}</span>
        </span>


    return (
        <div >
            {isLoaded ? 

            <Box className={classNames.topRoot} >

                <CustomModal
                    openModal = {openModal}
                    setOpenModal = {setOpenModal}
                    modalFunc = {()=>{}}
                    isNotice = {true}
                >
                    {modalText}
                </CustomModal>
                <Box sx={{display:"flex" ,justifyContent:"flex-end"}} hidden={isFinishedTest}>
                    {headerRemainingTime}
                </Box>
                <Slider min={0} max={examData.executeTime * 60} value={examData.executeTime * 60 - remainingTime} hidden={isFinishedTest}></Slider>

                {contents}
                
            </Box>

            : <div>Loading...</div>

            }
        </div>
    );
}
