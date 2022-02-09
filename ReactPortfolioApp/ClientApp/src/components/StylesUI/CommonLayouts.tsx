
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




//共通スタイルのボタンを囲むコンテナ
export const ButtonContainer = styled("div")({
  display:"flex",
  justifyContent:"flex-start",
  "& span":{
    display: "inline-block",
    verticalAlign:"middle"
  }
  // ,
  // "& :hover":{
  //     backgroundColor:"#4378b6", 
  //     opacity: 1
  // }
});

// //共通スタイルのボタン
// export const DefaultButton = styled(Button)({
//   opacity: 0.9,
//   backgroundColor:"#4378b6", 
//   padding:"8px 20px",
//   borderRadius: "22px",
//   color:"white",
//   marginRight:"15px",
// });

//共通スタイルのボタン
export const DefaultButton = styled("button")({
  backgroundColor:"#4378b6", 
  padding:"8px 22px",
  borderRadius: "22px",
  color:"white",
  outline:"none",
  border: "solid 1px #4378b6",
  minWidth:"16rem"
});

export const DefaultBackButton = styled("button")({
  backgroundColor:"#ffffff", 
  padding:"8px 22px",
  borderRadius: "22px",
  border: "solid 1px #4378b6",
  color:"#4378b6",
  outline:"none",
  marginRight:"15px",
  minWidth:"16rem"
});








 