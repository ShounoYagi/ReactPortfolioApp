using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace BackEndCommon 
{

    public class ClientResponse<TValue> where TValue : class
    {
        public ClientResponse(string methodName, object clientArgs, Exception ex)
        {

        }

        public int errorCode { get; set; }
        public string errorTitle { get; set; }
        public string errorDetail { get; set; }
        public TValue value { get; set; }

    }

    public class ResponseMessages
    {

        // ------common---------
        public const string Success_Title = "成功";
        public const string Error_ParameterError_Detail = "パラメータエラーです。";
        public const string Error_GetUser_Detail = "ユーザー情報が取得できませんでした。";
        public const string Error_GetUser_SystemError_Title = "ユーザー情報取得でシステムエラーが発生しました。";
        public const string Error_GetUser_Title = "ユーザー情報取得に失敗しました。";
        public const string Success_GetUser_Title = "ユーザー情報取得に成功しました。";

        public const string Error_GetExecutions_SystemError_Title = "試験情報取得でシステムエラーが発生しました。";
        public const string Error_GetExecutions_Title = "試験情報取得に失敗しました。";
        public const string Error_GetExecutions_Detail = "試験情報が取得できませんでした。";
        public const string Success_GetExecutions_Detail = "試験情報取得に成功しました。";
        public const string Error_PutExam_SystemError_Title = "試験情報設定でシステムエラーが発生しました。";
        public const string Error_PutExam_Title = "試験情報設定に失敗しました。";
        public const string Success_PutExam_Detail = "試験情報設定に成功しました。";
        public const string Error_GetCustomerID_Detail = "customerIdが取得できませんでした。";  
        public const string Error_NotExsistExecutionID_Detail = "存在しない試験IDです。"; 
        public const string Error_notExsistUserID_Detail = "存在しないユーザーIDです。";
        public const string Error_ExamDataChanged_Detail = "試験データが変更されています。";
        public const string Error_NotQuestionID_Detail = "存在しない問題IDです。";

        // ------LExamController---------
        public const string Error_PutExam_ExecutionStarted_Detail = "既に試験を開始しています。";
        public const string Error_PutExam_NotReady_Detail = "試験の準備ができていません。";
        public const string Error_PutExam_BeforeTheStart_Detail = "試験期間前です。";
        public const string Error_PutExam_ExecutionEnded_Detail = "試験期間は終了しています。";
        public const string Error_PutExam_NotStarted_Detail = "まだ試験を開始していません。";
        public const string Error_PutExam_ExecutionTested_Detail = "既に試験を終了しています。";
        
        // ------LQuestionController---------
        public const string Error_GetQuestion_SystemError_Title = "問題情報取得でシステムエラーが発生しました。";
        public const string Error_GetQuestion_Title = "問題情報取得に失敗しました。";
        public const string Success_GetQuestion_Detail = "問題情報取得に成功しました。";
        public const string Error_PostQuestion_SystemError_Title = "問題送信でシステムエラーが発生しました。";
        public const string Error_PostQuestion__Title = "問題送信に失敗しました。";
        public const string Success_PostQuestion__Detail = "問題送信に成功しました。";
        public const string Error_PostQuestion_NotExistChoice_Detail = "存在しない選択肢idが含まれています。";

        // ------ReceptionController---------
        public const string Error_GetReception_Validate_Title = "受付検証失敗";
        public const string Error_GetReception_Validate_Detail = "受付コードが不正です。";
        public const string Error_GetReception_Title = "受付不可";
        public const string Error_GetReception_Run_Title = "受付失敗";
        public const string Error_GetReception_Expired_Detail = "受付コードの期限が切れています。";
        public const string Error_GetReception_NotExsistExam_Detail = "試験は存在しないか終了しています。";
        public const string Error_GetReception_BeforeAcceptStart_Detail = "試験の受付はまだ始まっていません。";
        public const string Error_GetReception_AcceptEnd_Detail = "試験の受付は終了しています。";
        public const string Error_GetReception_DifferenceUser_Title = "受験者ID相違";
        public const string Error_GetReception_DifferenceUser_Detail = "別試験の受験者IDでログイン済みです。いったんログアウトしてください。";
        public const string Error_GetReception_Accepted_Detail = "すでに受付済です。";
        public const string Success_GetReception_Accept_Detail = "受付チェックに成功しました。";
        public const string Error_PutReception_Password_Title = "パスワード設定失敗";
        public const string Error_PutReception_UserInfoError_Ttile = "情報設定失敗";
        public const string Error_PutReception_UserInfoError_Detail = "情報設定でシステムエラーが発生しました。";
        public const string Error_PutReception_GetCustomerInfoError_Detail = "主催者情報が取得できませんでした。";
        public const string Success_PutReception_Accept_Detail = "受付に成功しました。";


        // ------AnswerCSVController---------
        public const string Error_GetAnswerCSV_SystemError_Title = "解答取得でシステムエラーが発生しました。";
        public const string Error_GetAnswerCSV_Title = "解答取得に失敗しました。";      
        public const string Error_GetAnswerCSV_NotExsistQuestions_Detail = "問題データがありません。";       
        public const string Error_GetAnswerCSV_NotExsistLearners_Detail = "受験者データがありません。";      
        public const string Error_GetAnswerCSV_NotExsistChoices_Detail = "選択データがありません。";   
        public const string Error_GetAnswerCSV_NotExsistSection_Detail = "問題のセクションがありません。";      
        public const string Success_GetAnswerCSV_Detail = "解答取得に成功しました。";      


        // ------ExamController---------
        public const string Error_PostExam_SystemError_Title = "試験情報登録でシステムエラーが発生しました。";
        public const string Success_PostExam_Detail = "試験情報登録に成功しました。";
        public const string Error_PutExam_Update_SystemError_Title = "試験情報更新でシステムエラーが発生しました。";
        public const string Error_PutExam_Updated_Detail = "データが更新されています。";
        public const string Success_PutExam_Update_Title = "試験情報更新に成功しました。";
        public const string Error_DeleteExam_SystemError_Title = "試験情報削除でシステムエラーが発生しました。";
        public const string Success_DeleteExam_Detail = "試験情報削除に成功しました。";

    }

}