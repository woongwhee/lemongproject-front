import React, {useState} from 'react';
import apiHoc from "../../util/apiHoc";
import {resetUnSave, todoInsert, updateUnSave, upLoadUnSave, todoDelete} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";
import {Button} from "reactstrap";
import TemplateTodoInput from "./TemplateTodoInput";
import TemplateInput from "./TemplateInput";
import "../style/TemplateWrite.css"
import {useTemplateDispatch} from "../TemplateContext";
import GoBackButton from "./GoBackButton";

const TemplateWrite = ({result}) => {
    let {title, categoryNo, content, range, todoList} = result;
    let templateNo = result.templateNo;
    let todoCount = todoList == null ? 0 : todoList.length;
    let dispatch = useTemplateDispatch();
    let dayArr = new Array(range);
    if (todoList != null && todoList.length > 0) {
        for (let i = 0; i < todoList.length; i++) {
            dayArr[todoList[i].day] = new Array();
            dayArr[todoList[i].day].push({content: todoList[i].content})
        }
    }
    const [days, setDays] = useState(dayArr);
    const [inputValue, setInput] = useState({title, categoryNo, content, range});
    const updateInputValue = async (e) => {
        const {name, value} = e.target;
        if (inputValue[name] == value) {
            return;
        }
        const result = await updateUnSave(templateNo, name, value);
        console.log(result);
        if (result < 1) {
            return;
        }
        if (name == 'range') {
            if (range > value) {
                const newDays = dayArr.slice(0, value);
                setDays(newDays);
            } else {
                const newDays = [...dayArr];
                newDays.length = value;
                setDays(newDays);
            }

        }
        const newInput = {...inputValue, [name]: value}
        setInput(newInput)
    }

    const upload = async (e) => {
        if (isEmpty(title) || isEmpty(content) || todoCount == 0 || categoryNo == 0) {
            alert("모든내용을 입력해주세요");
            return
        }
        result = await upLoadUnSave();
        if (result > 0) {
            alert("작성완료");
            dispatch({type: "DETAIL", templateNo})
        }

    }
    const insertTodo = async (dayList, contentList) => {
        result = await todoInsert(dayList, contentList, templateNo);
        todoCount = todoCount + dayList.length * contentList.length
        let newDays = [...days];
        for (let i = 0; i < dayList.length; i++) {
            for (let j = 0; j < contentList.length; j++) {
                if (isEmpty(newDays[dayList[i]])) {
                    newDays[dayList[i]] = [{content: contentList[j]}];
                } else {
                    newDays[dayList[i]].push({content: contentList[j]})
                }
            }
        }
        setDays(newDays);
    }
    const deleteTodo = async (todoNo, day) => {
        result = await todoDelete(todoNo);
        if (result > 0) {
            let newDays = days[day].filter(e => e.todoNo != todoNo)
            setDays(newDays);
        }
    }

    const reset = async (e) => {
        const result = await resetUnSave();
        let {title, categoryNo, content, range} = result;
        templateNo = result.templateNo;
        setInput({title:null, categoryNo:null, content: null, range});
        setDays(new Array(range));
    }

    return (
        <div className={"template-write"}>
            <div className="btnBox">
                <GoBackButton/>
                <div>
                <Button onClick={reset}>
                    리셋
                </Button>
                <Button onClick={upload}>저장</Button>
                </div>
            </div>
            <TemplateInput inputValue={inputValue} updateInputValue={updateInputValue}/>
            <TemplateTodoInput range={inputValue.range} insertTodo={insertTodo} deleteTodo={deleteTodo}
                               days={days} templateNo={templateNo}></TemplateTodoInput>
        </div>
    );
};

export default apiHoc(TemplateWrite);
