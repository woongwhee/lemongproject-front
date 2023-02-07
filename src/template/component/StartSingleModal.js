import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {Checkbox} from "@mui/material";
import {startSingle} from "../../challenge/challengeApi";
import moment from "moment";

const StartSingleModal = ({isOpen,toggle,templateNo}) => {

    const now_utc = Date.now() // 지금 날짜를 밀리초로
    const initOption=[1,1,1,1,1,1,1,0];
    const optionInfo=["월","화","수","목","금","토","일","공휴일제외"];
    const[option,setOption]=useState(initOption)
    const[startDate,setStartDate]=useState()
    const timeOff = new Date().getTimezoneOffset()*60000; // 분단위를 밀리초로 변환
    const today = new Date(now_utc-timeOff).toISOString().split("T")[0];
    const optionToggle=(index)=>{
        let o=[...option];
        o[index]=option[index]==0?1:0;
        setOption(o);
        console.log(parseOption());
    }
    const parseOption=()=>{
        let opstionString="";
        option.forEach(e=>opstionString+=e)
        return opstionString;
    }
    const start=async()=>{
      const result= await startSingle(startDate, templateNo, parseOption());
        if(result!=null){
            alert("ok")
        }


    }
    const changeDate=(e)=>{
        let value =e.target.value;
        const newDate = new moment(value).format('YYMMDD');
        setStartDate(newDate)
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            {  option.map((item,i)=>{
               return( <><Checkbox type="checkbox" key={"sc+i"} checked={item}  onClick={()=>{optionToggle(i)}} id={"sc"+i}/><label htmlFor={"sc"+i}>{optionInfo[i]}</label> </>)
                })}
            <input type="date" min={today} onChange={changeDate}></input>
            <button onClick={start}>시작하기</button>
        </Modal>
    );
};

export default StartSingleModal;
