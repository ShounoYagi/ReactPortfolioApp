import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import * as common from "../common";
// import { ExamTable } from '../Table/ExamTable';
import { Exam ,APIResponse } from '../react-app-env';
import { Layout } from './Layout';
// import {normalLinks,goExamRegister} from '../NavLinks/NavLinks';

import {CustomModal} from "./StylesUI/CustomModal"

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@mui/material/Box';
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

import { initialExam } from './ExamRegister'

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

const initialState = {
    mouseX: null,
    mouseY: null,
};


export function Top() {

    // -----共通関数の宣言-----
    const {
        go, // 画面遷移 
        api  // API呼び出し
    } = common.useCommon();


    // -----API-----
    // 試験データを取得する
    function getExamData(args?: any):Promise<APIResponse<Exam[]>> {
        return api("/api/Executions", "GET", args)
    };

    // 試験データを取得する
    function deleteExamData(id:string ,args?: any):Promise<APIResponse<String>> {
        return api("/api/Executions/" + id, "DELETE", args)
    };


    // -----汎用関数宣言-----

    const handleClickSortOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.currentTarget.blur();
        if(sortOrder === "ASC") setSortOrder("DESC");
        else setSortOrder("ASC");
    }

    const needsOpenModal = (latestExam:Exam[])=>{
        let flag = false;

        for (const exam of latestExam) {
            // if(exam.status === 0){
            //     flag = true ;
            // }
        }
        return flag;
    }


    const getExamDataById = (examId:number)=>{
        const retValExam = examData.filter( exam => exam.id === examId );
        return retValExam[0];
    }

    const handleClose = () => {
        setState(initialState);
        setSelectedExam(initialExam);
    };

    const handleClickContextMenu = (event:any ,examId:number)=>{
        event.preventDefault();

        const examData = getExamDataById(examId);
        setSelectedExam(examData);

        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });

    };


    const deleteExam = (id:number)=>{
        deleteExamData(String(id))
        .then((data:APIResponse<String>) => {
            setOpenModal(true);
        }).catch((err) => {
            alert(err);
        });
    };

    const updatePage=()=>{
        handleClose();
        setUpdata(update?false:true);
    };


    // -----スタイルの宣言-----
    const classNames = useStyles();


    


    // -----state-----
    const [examData, setExamData] = React.useState<Exam[]>([]);

    const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
    }>(initialState);

    const [selectedExam, setSelectedExam] = React.useState<Exam>(initialExam);

    const[isLoaded,setIsLoaded] = React.useState(true);

    const[sortOrder,setSortOrder] = React.useState("ASC");

    const [openModal, setOpenModal] = React.useState(false);

    const [modalText, setModalText] = React.useState(<div></div>);

    const [update,setUpdata] = React.useState<boolean>(false);


    // -----use effefct-----
    // 初回だけ実行する処理
    React.useEffect(() => {
        setIsLoaded(false);
        // サーバーから認証してデータ取得
        getExamData()
            .then((data:APIResponse<Exam[]>) => {
                if (data.errorCode !==20000) {
                    //common.alertError(data.errorTitle , data.errorDetail);
                    alert("error");
                    return;
                }

                if(data.value !== null){

                    const existExamData = data.value.filter((exam:Exam)=>{
                        return (exam.deleteFlag===false) 
                    })
                    setExamData(existExamData);
                }

                setIsLoaded(true);

            }).catch((err) => {
                // alert(common.ResponseMessages.Error_GetExam);
            });
    }, [update]);
   



    return (
        <div >
            {isLoaded ? 

            <Box className={classNames.topRoot} >

                <Typography sx={{width: "90%",margin:"1rem auto",fontSize:"1.8rem"}} variant="h3" component="div">
                    試験一覧
                </Typography>

                <CustomModal
                    openModal = {openModal}
                    setOpenModal = {setOpenModal}
                    modalFunc = {()=>{updatePage()}}
                    isNotice = {true}
                >
                    <div className={classNames.modalText}>試験を削除しました</div>
                </CustomModal>

                <Box sx={{
                        width: "90%",
                        margin:"0 auto"
                    }}
                >
                    {/* <ExamTable sortOrder={sortOrder} handleClickSortOrder={handleClickSortOrder} switchOrder={switchOrder} examData={examData} /> */}
                    {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>試験名</TableCell>
                                    <TableCell align="right">試験時間</TableCell>
                                    <TableCell align="right">満点</TableCell>
                                    <TableCell align="right">合格点</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                        {examData.map((exam) => (
                            <TableRow
                                key={exam.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{exam.name}</TableCell>
                                <TableCell align="right">{exam.executeTime}</TableCell>
                                <TableCell align="right">{exam.maxPoints}</TableCell>
                                <TableCell align="right">{exam.passPoints}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                

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
                        { title: '試験名称', field: 'name' , sorting: false ,cellStyle:{ fontWeight: "bold" } },
                        { title: '試験時間', field: 'executeTime' , sorting: false ,searchable:false},
                        { title: '問題数', field: 'maxPoints'  , sorting: false ,searchable:false},
                        { title: '合格正答数', field: 'passPoints'  , sorting: false ,searchable:false},
                        
                        ]}
                        data={
                        examData.map((data, idx) => (
                            { 
                                id:data.id,
                                name: data.name, 
                                executeTime: data.executeTime + "分", 
                                maxPoints: data.maxPoints, 
                                passPoints: data.passPoints, 
                            }
                            ))
                        }
                        actions={[
                            {
                            icon: () => <MoreHorizIcon />,
                            tooltip: 'メニューを開く',
                            onClick: (event, rowData:any) => handleClickContextMenu(event,rowData.id),
                            position: "row"
                            },
                            // {
                            //     icon: ()=> isTopPage ? {} : props.yearMonthSelectForm ,
                            //     isFreeAction: true,
                            //     onClick: () => {},
                            //     hidden: props.switchIncludingTested === undefined
                            // },
                            // {
                            //   icon: ()=> <div className={classNames.checkBoxContainer}>
                            //                   <Checkbox  checked={ isTopPage ? false : props.containsFinished }/>
                            //                   全ての試験を表示する
                            //               </div>,
                            //   isFreeAction: true,
                            //   onClick: () => isTopPage ? {} : props.switchIncludingTested(),
                            //   hidden: props.switchIncludingTested === undefined
                            // }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            showTitle: false,
                            draggable: false,
                            searchFieldAlignment:"left",
                            searchFieldStyle:{
                                marginLeft:16
                            },
                            headerStyle: {
                                backgroundColor: '#7c7c80',
                                color: 'white',
                                fontWeight:"bold"
                            }
                        }}
                        localization={localizationData}
                    />

                    <Menu
                        keepMounted
                        open={state.mouseY !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            state.mouseY !== null && state.mouseX !== null
                                ? { top: state.mouseY, left: state.mouseX }
                                : undefined
                        }
                    >
                        <MenuItem onClick={() => {go({pathname:"/ExamScreen/"+ selectedExam.id}) }}>試験を受ける</MenuItem>
                        <MenuItem onClick={() => {go({pathname:"/ExamRegister/"+ selectedExam.id}) }}>試験の編集</MenuItem>
                        <MenuItem onClick={() => {deleteExam(selectedExam.id)}}>試験の削除</MenuItem>
                    </Menu>

                </Box>

            </Box>

            : <div>Loading...</div>

            }
        </div>
    );
}
