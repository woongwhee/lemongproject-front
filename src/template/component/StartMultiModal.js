import React, {useState} from 'react';
import Modal from "react-modal";
import {Checkbox} from "@mui/material";
import {startMulti, startSingle} from "../../challenge/challengeApi";
import moment from "moment";
import {isEmpty} from "../../util/typeUtile";

const StartSingleModal = ({isOpen, toggle, templateNo}) => {

    const now_utc = Date.now() // 지금 날짜를 밀리초로
    const initOption = [1, 1, 1, 1, 1, 1, 1, 0];
    const optionInfo = ["월", "화", "수", "목", "금", "토", "일", "공휴일제외"];
    const [option, setOption] = useState(initOption)
    const [inputs, setInputs] = useState({
        startDate: "",
        challengeTitle: "",
        challengeInfo: ""
    });
    const [startDate, setStartDate] = useState()
    const timeOff = new Date().getTimezoneOffset() * 60000; // 분단위를 밀리초로 변환
    const today = new Date(now_utc - timeOff).toISOString().split("T")[0];
    const optionToggle = (index) => {
        let o = [...option];
        o[index] = option[index] == 0 ? 1 : 0;
        setOption(o);
        console.log(parseOption());
    }
    const parseOption = () => {
        let opstionString = "";
        option.forEach(e => opstionString += e)
        return opstionString;
    }
    const start = async () => {
        let submitInput = {...inputs, option, templateNo};
        if (isEmpty(submitInput.startDate) || isEmpty(submitInput.challengeInfo) || isEmpty(submitInput.challengeTitle)) {
            alert("다채워주세요")
            return;
        }
        const result = await startMulti(submitInput);
        if (result != null) {
            console.log(result);

            toggle();
        }
    }

    const changeValue = (e) => {
        let {name, value} = e.target;
        if (name === "startDate") {
            value = new moment(value).format('YYMMDD');
            const newInputs = {...inputs, [name]: value};
            setInputs(newInputs);
        }
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            {option.map((item, i) => {
                return (<><Checkbox type="checkbox" key={"sc+i"} checked={item} onClick={() => {
                    optionToggle(i)
                }} id={"sc" + i}/><label htmlFor={"sc" + i}>{optionInfo[i]}</label> </>)
            })}
            <input type="date" name="startDate" min={today} onChange={changeValue}></input>
            <input type="text" name="challengeTitle" onChange={changeValue}></input>
            <input type="text" name="challengeInfo" onChange={changeValue}></input>
            <button onClick={start}>시작하기</button>
        </Modal>
    );

}
export default StartSingleModal;
