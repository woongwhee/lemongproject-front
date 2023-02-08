import React, {useState} from 'react';
import apiHoc from "../../util/apiHoc";
import {resetUnSave, todoInsert, updateUnSave, upLoadUnSave, todoDelete} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";
import {Button} from "reactstrap";
import TemplateTodoInput from "./TemplateTodoInput";
import TemplateInput from "./TemplateInput";

const TemplateWrite = ({result}) => {
    console.log(result);
    let {templateTitle, categoryNo, templateContent, range} = result;
    const [templateNo, setTemplateNo] = useState(result.templateNo);
    const [list, setList] = useState(result.todoList == null ? [] : result.todoList);
    const [inputValue, setInput] = useState({templateTitle, categoryNo, templateContent, range});
    const updateInputValue = async (e) => {
        let {name, value} = e.target;
        if (inputValue[name] == value) {
            return;
        }
        result = await updateUnSave(name, value);
        if (result < 1) {
            return;
        }
        if (name == 'range' && range > value) {
            setList((list.filter(e => e.day > Range)))
        }
        let newInput = {...inputValue, [name]: value}
        setInput(newInput)
        alert("작성완료");
    }

    const upload = async (e) => {
        if (isEmpty(templateTitle) || isEmpty(templateContent) || list.length == 0 || categoryNo == 0) {
            alert("모든내용을 입력해주세요");
            return
        }
        result = await upLoadUnSave();
        if (result > 0) {
            alert("작성완료");
        }
    }
    const insertTodo = async (dayList, todoContent) => {
        result = await todoInsert(dayList, todoContent, templateNo);
    }
    const deleteTodo = async (todoNo) => {
        result = await todoDelete(todoNo);
        if (result > 0) {
            setList((list.filter(e => e.todoNo != todoNo)))
        }
    }
    const reset = async (e) => {
        const result = await resetUnSave();
        let {templateTitle, categoryNo, templateContent, templateNo, range} = result;
        setTemplateNo(templateNo);
        setInput({templateTitle, categoryNo, templateContent, range});
        setList([]);
    }
    return (
        <>
            <button>
                리셋
            </button>
            <Button onClick={upload}>저장</Button>
            <TemplateInput inputValue={inputValue} uploadInputValue={updateInputValue}/>
            <TemplateTodoInput range={inputValue.range} insertTodo={insertTodo} deleteTodo={deleteTodo}
                               list={list}></TemplateTodoInput>
        </>
    );
};

export default apiHoc(TemplateWrite);
