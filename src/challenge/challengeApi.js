import axios from "axios";
import {codeHandler} from "../util/apiUtil";
import {CHALLENGE_CANCEL, MULTI_JOIN, MULTI_START, READY_DETAIL, READY_LIST, SINGLE_START} from "./challengeURI";





export const readyList= async (page)=>{
    const res=await axios.get(`${READY_LIST}/${page}`)
    return codeHandler(res);
}
export const readyDetail= async (challengeNo)=>{
    const res=await axios.get(`${READY_DETAIL}/${challengeNo}`)
    return codeHandler(res);
}

export const joinMulti=async (challengeNo)=>{
    const res=await axios.put(`${MULTI_JOIN}/${challengeNo}`)
    return codeHandler(res);
}
export const cancelMulti= async (challengeNo)=>{
    const res=await axios.delete(`${CHALLENGE_CANCEL}/${challengeNo}`);
    return codeHandler(res);
}
export const startSingle=async ({startDate,templateNo,option,challengeTitle})=>{
    const payload={startDate,templateNo,option,challengeTitle};
    const res=await axios.post(SINGLE_START,payload)
    return  codeHandler(res);
}


export const startMulti=async ({startDate,templateNo,option,challengeTitle,challengeInfo})=>{
    const payload={startDate,templateNo,option,challengeTitle,challengeInfo};
    const res=await axios.post(MULTI_START,payload)
    return codeHandler(res);
}
