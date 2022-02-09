import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import MaterialTable from '@material-table/core';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBox from '@mui/icons-material/AddBox';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import { forwardRef } from 'react';
import { Localization } from '@material-table/core';


import {SideBar} from "./QuestionScreenComponents/SideBar";
import {TextAndChoices} from "./QuestionScreenComponents/TextAndChoices";
import * as common from "../../common";
import { Exam , ExpansionQuestion,APIResponse } from '../../react-app-env';


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

//material-tableの日本語化変数
const localizationData: Localization = {
    error: "エラー",
    body: {
      emptyDataSourceMessage: "表示するレコードがありません。",
      filterRow: {
        filterTooltip: "フィルター",
      },
      editRow: {
        saveTooltip: "保存",
        cancelTooltip: "キャンセル",
        deleteText: "この行を削除しますか？",
      },
      addTooltip: "追加",
      deleteTooltip: "削除",
      editTooltip: "編集",
    },
    header: {
      actions: "",
    },
    grouping: {
      groupedBy: "グループ化:",
      placeholder: "ヘッダーをドラッグ ...",
    },
    pagination: {
      firstTooltip: "最初のページ",
      firstAriaLabel: "最初のページ",
      previousTooltip: "前のページ",
      previousAriaLabel: "前のページ",
      nextTooltip: "次のページ",
      nextAriaLabel: "次のページ",
      labelDisplayedRows: "{from}-{to} 全{count}件",
      labelRowsPerPage: "ページあたりの行数:",
      lastTooltip: "最後のページ",
      lastAriaLabel: "最後のページ",
      labelRowsSelect: "行",
    },
    toolbar: {
      addRemoveColumns: "列の追加、削除",
      nRowsSelected: "{0} 行選択",
      showColumnsTitle: "列の表示",
      showColumnsAriaLabel: "列の表示",
      exportTitle: "出力",
      exportAriaLabel: "出力",
      searchTooltip: "検索",
      searchPlaceholder: "試験名称検索",
    }
  };





export function ResultScreen(props:{examData:Exam , questions:ExpansionQuestion[] ,getCorrectAnswerNum:any ,isCorrectAnswer:any ,getCorrectChoiceText:any ,getAnsweredChoiceText:any}) {

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
        <Box className={classNames.topRoot} >

                <Typography align="center" variant="h5" gutterBottom component="div">
                    {props.examData.name} 結果画面
                </Typography>

                <Box sx={{
                        width: "90%",
                        margin:"0 auto"
                    }}
                >
                    <MaterialTable
                            icons={ {
                                Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                                Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                                Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                                Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                                DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                                Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
                                Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
                                FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                                LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                                NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                                PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                                ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                                SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
                                ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
                                ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
                            }}
                            columns={[
                            { title: '問番号', field: 'questionNum' , sorting: false ,cellStyle:{ fontWeight: "bold" } },
                            { title: '結果', field: 'result' , sorting: false ,searchable:false},
                            { title: '回答選択肢', field: 'answeredChoice'  , sorting: false ,searchable:false},
                            { title: '正答選択肢', field: 'correctChoice'  , sorting: false ,searchable:false},
                            
                            ]}
                            data={
                            props.questions.map((data, idx) => (
                                { 
                                    questionNum: data.questionOrder, 
                                    result: props.isCorrectAnswer(data.choices ,data.selectedChoiceId) ? "正解" : "不正解", 
                                    answeredChoice: props.getAnsweredChoiceText(data.choices ,data.selectedChoiceId), 
                                    correctChoice: props.getCorrectChoiceText(data.choices)
                                }
                                ))
                            }
                            
                            options={{
                                actionsColumnIndex: -1,
                                showTitle: false,
                                draggable: false,
                                search:false,
                                headerStyle: {
                                    backgroundColor: '#7c7c80',
                                    color: 'white',
                                }
                            }}
                            localization={localizationData}
                        />
                </Box>


                <Typography m={"1rem"} align="center" variant="h5" gutterBottom component="div">
                    正解数：{props.getCorrectAnswerNum(props.questions)}問
                </Typography>

                <Typography m={"1rem"} align="center" variant="h5" gutterBottom component="div">
                    {props.getCorrectAnswerNum(props.questions) >= props.examData.passPoints ? "合格" : "不合格"}
                </Typography>

                <Box sx={{display:"flex" ,justifyContent:"center"}}>
                    <Button onClick={()=>{go("/")}} variant="contained">ホームに戻る</Button>
                </Box>

        </Box>
    );
}
