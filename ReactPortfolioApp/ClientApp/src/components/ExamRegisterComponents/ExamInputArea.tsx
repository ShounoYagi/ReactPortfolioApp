import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import { useForm, SubmitHandler } from "react-hook-form";

import * as common from "../../common";
import { Exam ,APIResponse } from '../../react-app-env';


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
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    labelStyle:{
        marginTop: "24px"
    }
}));

interface IFormInput {
    name: string;
    executeTime: number;
  }



export function ExamInputArea(props:{examData:Exam ,setExamData:any ,changeContent:any ,handleInput:any}) {

    const { register, handleSubmit } = useForm<IFormInput>();

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    


    // -----state-----
    const [validationErrorFlag, setValidationErrorFlag] = React.useState({
        name: false,
        executeTime:false
    });



    // -----汎用関数宣言-----

    const onClick_NextBtn: SubmitHandler<IFormInput> = (data) => {
        let nameErrFlag = false;
        let executeTimeErrFlag = false;
        if(data.name === "") nameErrFlag = true;
        if(data.executeTime < 1 ) executeTimeErrFlag = true;

        setValidationErrorFlag({...validationErrorFlag ,["name"]:nameErrFlag ,["executeTime"]:executeTimeErrFlag});

        if(!nameErrFlag && !executeTimeErrFlag){
            props.setExamData({
                ...props.examData,
                ["name"]:data.name,
                ["executeTime"]:data.executeTime,
            })
            props.changeContent("QuestionEditor");
        }
    };

    // -----スタイルの宣言-----
    const classNames = useStyles();

    


    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {

    }, []);
   



    return (
        <div >

            <div className={classNames.topRoot} >

                <Typography align="center" variant="h5" gutterBottom component="div">
                    試験基本情報入力画面
                </Typography>

                <Box
                    component="form"
                    sx={{
                       display: 'flex' , flexDirection: 'column' 
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit(onClick_NextBtn)}
                >
                    <TextField
                    {...register("name")}
                        sx={{width:"30%" ,margin:"2rem auto 0"}}
                        label="試験名称"
                        defaultValue={props.examData.name}
                        name="name" 
                        //onChange={props.handleInput}
                    />
                    <FormHelperText sx={{color:"red" ,width:"30%" ,margin:"0 auto" ,visibility:validationErrorFlag.name ? "visible" : "hidden"}}>
                        入力してください
                    </FormHelperText>

                    <TextField
                    {...register("executeTime")}
                        sx={{width:"30%" ,margin:"2rem auto 0"}}
                        label="試験時間"
                        type="number"
                        defaultValue={props.examData.executeTime}
                        name="executeTime" 
                        //onChange={props.handleInput}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">分</InputAdornment>,
                        }}
                    />

                    <FormHelperText sx={{color:"red" ,width:"30%" ,margin:"0 auto" ,visibility:validationErrorFlag.executeTime ? "visible" : "hidden"}}>
                        1以上の整数を入力してください
                    </FormHelperText>

                    <Button 
                        sx={{width:"10%" ,margin:"1rem auto"}} 
                        type="submit" variant="contained">次へ</Button>

                </Box>
                
            </div>
        </div>
    );
}
