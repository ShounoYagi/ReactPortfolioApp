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
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import * as common from "../../../common";
import { Question ,APIResponse } from '../../../react-app-env';


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



export function TextAndChoices(props:{question:Question ,handleInput_BodyText:any ,handleInput_Choices:any ,handleClick_ChoiceRadioBtn:any ,addChoice:any ,deleteChoice:any}) {

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    


    // -----汎用関数宣言-----
   


    // -----スタイルの宣言-----
    const classNames = useStyles();



    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {

    }, []);
  



    return (
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    width: '100%', 
                    bgcolor: 'background.paper' 
                }}>
                    <TextField
                    sx={{width:'100%'}}
                        key = {props.question.id}
                        label="問題文"
                        multiline
                        rows={5}
                        defaultValue={props.question.bodyText}
                        name="bodyText" 
                        onChange={props.handleInput_BodyText}
                    />

                    <Button sx={{alignSelf:"flex-end" ,margin:"1rem"}} onClick={()=>props.addChoice()} variant="contained">選択肢追加</Button>

                    <Typography align="left" sx={{width:'10%' ,textAlign:"center"}} fontWeight={"bold"} gutterBottom component="div">
                        正答
                    </Typography>

                    {props.question.choices.map((data, idx) => (
                        <Box　key={data.id} sx={{width:'100%' ,marginBottom:"1rem"}}>
                            <Radio
                                sx={{width:'10%'}}
                                checked={data.hitFlag}
                                onChange={()=> props.handleClick_ChoiceRadioBtn(data.id) }
                            />
                            <TextField
                            sx={{width:'80%'}}
                                key={data.id}
                                value={data.choiceText}
                                variant="standard"
                                onChange={(e)=>props.handleInput_Choices(data.id ,e)}
                            />
                            {props.question.choices.length == 1 ? <p></p> 
                            :   <IconButton sx={{width:'10%'}} onClick={()=>props.deleteChoice(data.choiceOrder)} aria-label="delete" color="primary">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </Box>
                    )
                    )}
                   

                </Box>
                
            );
}
