import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {isEmpty} from "../../util/typeUtile";
import {todoDetail} from "../templateApi";
import {codeHandler} from "../../util/apiUtil";
import {useAsync} from "react-async-hook";
import SavedTodoDate from "./SavedTodoData";

const TodoWriter = ({templateNo, isOpen, dayList, toggle, onClosed, contentList, addContent, removeContent}) => {
    let [isInput, setIsInput] = useState(false);
    let [isUpdate, setIsUpdate] = useState(false);
    let [isSingle, setIsSingle] = useState(false);
    let [updateValue, setUpdateValue] = useState("");
    let [maxValue, setMaxValue] = useState( 0);
    fetch("aa")
    const loadTodo = async (templateNo,dayList) => {
        if(dayList.length>1){
            return
        }
        let todoList = await todoDetail(templateNo, dayList[0]);
        setMaxValue(todoList.length);
        setIsSingle(true);
        return todoList;
    }
    let state=useAsync(loadTodo,[templateNo,dayList]);

    const add = (e) => {
        setIsInput(!isInput);
        let value = e.target.value;
        if (value.length == 0 || value == "") {
            return;
        }
        addContent(value);
    }
    const activeInput = async () => {
        await setIsInput(true);
        document.querySelector("#newInput").focus();
    }
    const update = (e) => {
        setIsUpdate(!isUpdate);
        let value = e.target.value;
        if (value.length == 0 || value == "") {
            return;
        }
        addContent(value);
    }
    const updateContent = (e) => {
        let index = e.target.dataset.index
        removeContent(index);
        updateActive(contentList[index])
    }
    const showBtn = (e) => {
        let childs = e.target.childNodes;
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].tagName == "BUTTON") {
                childs[i].classList.remove("hiddenbtn");
            }
        }
    }
    const hideBtn = (e) => {
        let childs = e.target.childNodes;
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].tagName == "BUTTON") {
                setTimeout(() => {
                    childs[i].classList.add("hiddenbtn")
                }, 2000);
            }
        }
    }
    const updateActive=async (updateValue)=>{
        await setUpdateValue(updateValue);
        await setIsUpdate(true);
        document.querySelector("#newUpdate").focus();
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle} onClosed={onClosed}>
            <ModalHeader>{dayList.toString()}일차 <Button color="info" size="sm"
                                         onClick={activeInput}>+</Button></ModalHeader>
            <ModalBody id="todoInputBody">
                {isInput && <input name="todoContent" id="newInput" onBlur={add} type="text"/>}
                {isSingle &&<SavedTodoDate state={state} updateActive={updateActive} />
                //     savedContent.map((todo) => {
                //     return (
                //         <p className="savedTodoContent" data-todoNo={todo.tpTodoNo} onDoubleClick={updateSavedContent}
                //            onMouseEnter={showBtn} onMouseOut={hideBtn}>{todo.value}. {todo.content}
                //             <button className="hiddenbtn deleteBtn" onClick={removeSavedContent}>x</button>
                //         </p>)
                // })
                }
                {isUpdate &&
                    <input name="todoUpdate" id="newUpdate" onBlur={update} defaultValue={updateValue} type="text"/>}
                {contentList.map((content, index) => {
                    return (<p className="insertTodoContent" data-index={index}
                               onDoubleClick={updateContent} onMouseEnter={showBtn}
                               onMouseOut={hideBtn}>{maxValue + index + 1}. {content}
                        <button className="hiddenbtn deleteBtn" onClick={() => removeContent(index)}>x</button>
                    </p>)
                })
                }
            </ModalBody>
        </Modal>
    );
};

export default TodoWriter;
