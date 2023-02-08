import axios from "axios";
import {codeHandler} from "../util/apiUtil";
import {MULTI_START, SINGLE_START} from "./challengeURI";


export const joinMulti=async ()=>{

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