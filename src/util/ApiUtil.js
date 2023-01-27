import axios from "axios";
import {useContext} from 'react';
import * as constants from "constants";
const ourAxios=axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
    "Content-Type": "application/json",
    withCredentials: true
    }
    }
);

const CodeHandler=(response)=>{
    const code=response.data.code

    if(code==='2000'){  return response.data.result; }//정상적인 응답의 경우
    if(code==='4000'){return }


}
ourAxios.interceptors.response.use(
    CodeHandler,()=>{

    }
)
export default ourAxios;