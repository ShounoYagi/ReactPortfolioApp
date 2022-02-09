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
import Typography from '@mui/material/Typography';

import {SideBar} from "./QuestionEditorComponents/SideBar";
import {TextAndChoices} from "./QuestionEditorComponents/TextAndChoices";
import * as common from "../../common";
import { Exam , Question,APIResponse } from '../../react-app-env';


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



export function QuestionEditor(props:{examData:Exam , questions:Question[] ,selectedQuestionOrder:number ,getSelectedQuestion:any ,changeContent:any ,handleInput_BodyText:any ,handleClick_sideBar:any 
        ,handleInput_Choices:any ,handleClick_ChoiceRadioBtn:any ,addQuestion:any ,addChoice:any ,deleteQuestion:any ,deleteChoice:any ,submitExamData:any}) {

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    


    // -----汎用関数宣言-----
    const onClick_ReturnBtn = () => {
        props.changeContent("ExamInput");
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
                    試験問題登録画面
                </Typography>

                <Grid sx={{marginTop:"2rem"}} container spacing={2}>

                    <Grid item xs={3}>
                        <SideBar questions={props.questions} selectedQuestionOrder={props.selectedQuestionOrder} handleClick_sideBar={props.handleClick_sideBar} addQuestion={props.addQuestion} deleteQuestion={props.deleteQuestion}></SideBar>
                    </Grid>

                    <Grid item xs={8}>
                        <TextAndChoices question={props.getSelectedQuestion()} handleInput_BodyText={props.handleInput_BodyText} handleInput_Choices={props.handleInput_Choices} 
                            handleClick_ChoiceRadioBtn={props.handleClick_ChoiceRadioBtn} addChoice={props.addChoice} deleteChoice={props.deleteChoice} ></TextAndChoices>
                    </Grid>

                </Grid>
                <Box sx={{width:"25%" ,display:"flex" ,justifyContent:"space-around"}}>
                    <Button sx={{width:"30%"}} onClick={onClick_ReturnBtn} variant="contained">戻る</Button>
                    <Button sx={{width:"30%"}} onClick={()=>props.submitExamData()} variant="contained">保存</Button>
                </Box>
        </div>
    );
}
