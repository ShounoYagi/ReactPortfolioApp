import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import * as common from "../../common";
import Modal from '@material-ui/core/Modal';
import { DefaultButton ,ButtonContainer,DefaultBackButton} from './CommonLayouts';

// 引数で生成するCSSを定義してuseStyles関数を生成
const useStyles = makeStyles((theme) => ({
    buttonContainer : {
        display:"flex",
        justifyContent:"center",
        fontSize:common.FONT_SIZE.body_text,
    },
    paper: {
      position: 'absolute',
      minwidth: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "& #simple-modal-title":{
        fontWeight:"bold",
        margin:"3rem auto",
        textAlign:"center"
      }
    },
    
}));

interface Props {
    openModal: boolean;
    setOpenModal: any;
    modalFunc: any;
    isNotice?: boolean;
    children: JSX.Element;
}

export function CustomModal(props: Props) {

    //----定数の定義-------
    const isNotice = props.isNotice === undefined ? false : props.isNotice ;


    // -----汎用関数宣言-----
    function getModalStyle() {
        const top = 50 ;
        const left = 50 ;
    
        return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const handleClose = () => {
        props.setOpenModal(false);
    };

    const executionModalFunc =()=>{
        props.modalFunc();
        handleClose();
    }

    

    // -----スタイルの宣言-----
    const classNames = useStyles();


   
    //モーダルの中身
    const modalBody = (
        <div style={getModalStyle()} className={classNames.paper}>
            {props.children}
            <ButtonContainer className={classNames.buttonContainer} >
                <DefaultButton style={{width:"7rem"}} onClick={executionModalFunc}>{isNotice ? "OK" : "はい" } </DefaultButton>
                <DefaultBackButton style={{marginLeft:"3rem" ,marginRight:"0" ,width:"7rem" ,display: isNotice ? "none" : "inline-block" }} className="backBtn" onClick={handleClose}>いいえ</DefaultBackButton>
            </ButtonContainer>
        </div>
    );



    return (
        <Modal
            open={props.openModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {modalBody}
        </Modal>
    );
}
