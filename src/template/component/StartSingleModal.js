import React, {useState} from 'react';
import {Checkbox} from "@mui/material";
import {startMulti, startSingle} from "../../challenge/challengeApi";
import moment from "moment";
import {isEmpty} from "../../util/typeUtile";
import {ModalBody, Modal, ModalFooter, ModalHeader} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_TODOLIST} from "../../reducer/menu";

const StartSingleModal = ({isOpen, toggle, templateNo}) => {

    const now_utc = Date.now() // 지금 날짜를 밀리초로
    const initOption = [1, 1, 1, 1, 1, 1, 1, 0];
    const optionInfo = ["월", "화", "수", "목", "금", "토", "일", "공휴일제외"];
    const [option, setOption] = useState(initOption)
    const [inputs, setInputs] = useState({
        startDate: "",
        challengeTitle: ""
    });
    let dispatch = useDispatch();
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
        let submitInput = {...inputs,option:parseOption(), templateNo};
        if (isEmpty(submitInput.startDate) || isEmpty(submitInput.challengeTitle)) {
            alert("다채워주세요")
            return;
        }

        const result = await startSingle(submitInput);
        if (result != null) {
            console.log(result);
            toggle();
            dispatch({type:MENU_TODOLIST}) ;
        }
    }

    const changeValue = (e) => {
        let {name, value} = e.target;
        if (name === "startDate") {
            value = new moment(value).format('YYMMDD');
        }
            const newInputs = {...inputs, [name]: value};
            setInputs(newInputs);
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            {/*<div className="modal-content">*/}
            <ModalHeader toggle={toggle}>혼자하기</ModalHeader>
            <ModalBody>
                <div>
                    {option.map((item, i) => {
                        return (<><Checkbox type="checkbox" key={i} checked={item} onClick={() => {
                            optionToggle(i)
                        }} id={"sc" + i}/><label htmlFor={"sc" + i}>{optionInfo[i]}</label> </>)
                    })}
                </div>
                <div>
                    <label for="stDate">시작일</label><input id="mtDate" type="date" name="startDate" min={today}
                                                          onChange={changeValue}></input>
                </div>
                <div>
                    <label htmlFor="stTitle">제목</label><input id="stTitle" type="text" name="challengeTitle"
                                                              onChange={changeValue}></input>
                </div>
            </ModalBody>
            <ModalFooter>
                <button onClick={start}>시작하기</button>
            </ModalFooter>
        </Modal>
    );
}
export default StartSingleModal;
