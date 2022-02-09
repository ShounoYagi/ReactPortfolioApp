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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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



export function SideBar(props:{questions:Question[] ,handleClick_sideBar:any ,addQuestion:any ,deleteQuestion:any ,selectedQuestionOrder:number}) {

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
                    alignItems: 'center',
                    flexDirection: 'column', 
                    width: '100%', 
                    bgcolor: 'background.paper' 
                }}>

                    <Button sx={{alignSelf:"flex-end"}} onClick={()=>props.addQuestion()} 
                        variant="contained">問題追加
                    </Button>

                    <List sx={{width:"100%"}}>
                    {props.questions.map((data, idx) => (

                        <ListItem key={idx} disablePadding sx={{backgroundColor: data.questionOrder === props.selectedQuestionOrder ? "#4abccb" : "white"}}>
                            <ListItemButton onClick={(event) => props.handleClick_sideBar(data)}>
                            <ListItemText primary={"問 " + data.questionOrder}  />
                            </ListItemButton>
                            {props.questions.length == 1 ? <p></p> : 
                                    <IconButton onClick={()=>props.deleteQuestion(data.questionOrder)} aria-label="delete" color="primary">
                                        <DeleteIcon />
                                    </IconButton>
                            }       
                        </ListItem>
                            
                    ))}
                    </List>
                </Box> 
            );
}
