import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {SideBar} from "./QuestionScreenComponents/SideBar";
import {TextAndChoices} from "./QuestionScreenComponents/TextAndChoices";
import * as common from "../../common";
import { Exam , ExpansionQuestion,APIResponse } from '../../react-app-env';
import Typography from '@mui/material/Typography';


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
    formStyle:{

    },
    labelStyle:{

    }
}));



export function QuestionScreen(props:{examData:Exam , questions:ExpansionQuestion[] ,selectedQuestionOrder:number ,getSelectedQuestion:any ,handleSubmit:any ,handleClick_sideBar:any ,handleClick_ChoiceRadioBtn:any, 
                                changeNextQuestion:any ,changePreviousQuestion:any}) {

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    


    // -----汎用関数宣言-----
    const onClick_ResultBtn = () => {
        props.handleSubmit("ResultScreen");
    };


    // -----スタイルの宣言-----
    const classNames = useStyles();


    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {

    }, []);
   



    return (
        <div className={classNames.topRoot} >

                <Typography align="center" variant="h5" gutterBottom component="div">
                    {props.examData.name}
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={3}>
                        <SideBar questions={props.questions} handleClick_sideBar={props.handleClick_sideBar} selectedQuestionOrder={props.selectedQuestionOrder}></SideBar>
                    </Grid>

                    <Grid item xs={8}>
                        <TextAndChoices question={props.getSelectedQuestion()} handleClick_ChoiceRadioBtn={props.handleClick_ChoiceRadioBtn} ></TextAndChoices>
                    </Grid>

                </Grid>

                <Grid container spacing={2}>

                    <Grid item xs={3}></Grid>

                    <Grid sx={{display:"flex" ,justifyContent:"space-between"}} item xs={8}>
                        <Button sx={{width:"20%"}} disabled={props.selectedQuestionOrder == 1} onClick={()=>{props.changePreviousQuestion()}} variant="contained">戻る</Button>
                        <Button sx={{width:"20%" ,display:props.questions.length == props.selectedQuestionOrder ? "none" : "block" }} 
                            onClick={()=>{props.changeNextQuestion()}} variant="contained">次へ</Button>
                        <Button sx={{width:"20%" ,display:props.questions.length == props.selectedQuestionOrder ? "block" : "none" }} 
                            onClick={onClick_ResultBtn} variant="contained">結果を見る
                        </Button>
                    </Grid>
                    
                </Grid>

        </div>
    );
}
