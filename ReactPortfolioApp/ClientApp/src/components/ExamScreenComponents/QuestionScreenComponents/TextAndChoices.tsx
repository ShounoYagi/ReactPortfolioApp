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

import * as common from "../../../common";
import { ExpansionQuestion ,Choice } from '../../../react-app-env';


// 引数で生成するCSSを定義してuseStyles関数を生成
const useStyles = makeStyles((theme) => ({
    // 第一階層はCSSクラス名（実際は後ろに重複防止の接尾辞がつく）
    // homeRoot => .homeRoot-1-2-3 など
    topRoot: {
        "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":{
            cursor:"pointer"
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



export function TextAndChoices(props:{question:ExpansionQuestion ,handleClick_ChoiceRadioBtn:any }) {

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    


    // -----汎用関数宣言-----
    const sort_CallBackFunc =(first:Choice ,second:Choice)=>{
        if (first.choiceOrder > second.choiceOrder){
            return 1;
          }else if (first.choiceOrder < second.choiceOrder){
            return -1;
          }else{
            return 0;
          }
    }


    // -----スタイルの宣言-----
    const classNames = useStyles();



    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {

    }, []);
  



    return (
                <Box className={classNames.topRoot} sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    width: '100%', 
                    maxWidth: 800, 
                    bgcolor: 'background.paper' 
                }}>
                    <TextField
                        key = {props.question.id}
                        sx={{width:'100%' ,marginBottom:"2rem"}}
                        label="問題文"
                        multiline
                        rows={4}
                        defaultValue={props.question.bodyText}
                        name="bodyText" 
                        InputProps={{
                            readOnly: true
                        }}
                    />

                    {props.question.choices.sort(sort_CallBackFunc).map((data, idx) => (
                        <Box　key={data.id} sx={{width:'100%' ,marginBottom:"1rem"}}>
                            <Radio
                                sx={{width:'10%' ,marginTop:"1rem"}}
                                checked={data.id === props.question.selectedChoiceId}
                                onClick={()=> props.handleClick_ChoiceRadioBtn(data.id) }
                            />
                            <TextField
                                key={data.id}
                                value={data.choiceText}
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{cursor:"pointer" ,width:'80%' ,marginTop:"1rem"}}
                                onClick={()=> props.handleClick_ChoiceRadioBtn(data.id) }
                            />
                      </Box>
                    )
                    )}
            
                </Box>
                
            );
}
