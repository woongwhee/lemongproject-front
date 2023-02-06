import Loading from "../template/component/Loading";
import React from "react";

export const codeHandler=(res)=>{
    if(res.data.code==="2000"){
        return res.data.result;
    }else if(res.data.code=="4008"){
        throw new Error("조회결과없음");
    }else if(res.data.code=='4006'){
        throw new Error("업로드실패");
    }else{
        throw new Error("실패")
    }

}


