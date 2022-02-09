/// <reference types="react-scripts" />


/**
 * グローバルな状態の型
 */
 export interface IAppContext {
    backdropIsopen: boolean;
    [key: string]: any
}

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface APIArgs { [key: string]: string | number | Date | Boolean }
/**
 * ログインユーザー情報
 */
export interface UserData {
    id: string;
    userName: string;
    disp_name : string;
    disp_nameKana : string;
    email: string;
    customerId: string;
    passwordExpire: string;
    modified: string;
    created: string;
}

//APIレスポンスデータ
export interface APIResponse<TValue>{ 
    errorCode:number;
    errorTitle:string;
    errorDetail:string;
    value:TValue
} 

//試験データ
//引数
export interface APIArgsExamGet { 
    id?:number;
}   

//戻り値
export interface Exam { 
    id :number;
    userId:number
    name :string;
    executeTime :number;
    passPoints :number;
    maxPoints :number;
    deleteFlag :boolean;
    questions :Question[];
}   

//問題データ
//引数
export interface APIArgsQuestionGet { 
    id:number
}    

//戻り値
export interface Question{ 
    id:number;
    questionOrder:number ;
    bodyText:string;
    deleteFlag:boolean;
    choices:Choice[];
} 

//問題選択肢
export interface Choice{
    id:number ;
    choiceOrder:number;
    choiceText:string;
    hitFlag:boolean;
    deleteFlag:boolean        
}



export interface ExpansionQuestion{ 
    id:number;
    questionOrder:number ;
    bodyText:string;
    deleteFlag:boolean;
    choices:Choice[];
    selectedChoiceId:number
} 

