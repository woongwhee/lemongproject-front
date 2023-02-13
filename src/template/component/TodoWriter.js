import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {isEmpty} from "../../util/typeUtile";

const TodoWriter = ({isOpen, dayList, toggle, onClosed, contentList, addContent, removeContent}) => {

    let [isInput, setIsInput] = useState(false);
    let [isUpdate, setIsUpdate] = useState(false);
    let [updateValue, setUpdateValue] = useState("");
    const addInput = async () => {
        await setIsInput(true);
        document.querySelector("#newInput").focus();
    }
    const add = (e) => {
        setIsInput(!isInput);
        console.log(e)
        let value = e.target.value;
        if (value.length == 0 || value == "") {
            return;
        }
        addContent(value);
    }
    const update = (e) => {
        setIsUpdate(!isUpdate);
        console.log(e)
        let value = e.target.value;
        if (value.length == 0 || value == "") {
            return;
        }
        addContent(value);
    }
    const updateContent = (e) => {
        let index = e.target.dataset.index
        setUpdateValue(contentList[index]);
        removeContent(index);
        console.log(index, contentList[index]);
        setIsUpdate(true);
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
    useEffect(() => {
        return () => {
        };
    }, [contentList]);

    return (
        <Modal isOpen={isOpen} toggle={toggle} onClosed={onClosed}>
            <ModalHeader>{dayList.toString()}일차 <Button color="info" size="sm"
                                                        onClick={addInput}>+</Button></ModalHeader>
            <ModalBody id="todoInputBody">
                {isInput && <input name="todoContent" id="newInput" onBlur={add} type="text"/>}
                {isUpdate &&
                    <input name="todoUpdate" id="newInput" onBlur={update} defaultValue={updateValue} type="text"/>}
                {contentList.map((content, index) => <p className="insertTodoContent" data-index={index}
                                                        onDoubleClick={updateContent} onMouseEnter={showBtn}
                                                        onMouseOut={hideBtn}>{index + 1}. {content}
                    <button className="hiddenbtn inputbtn" onClick={() => removeContent(index)}>x</button>
                </p>)}
            </ModalBody>
        </Modal>
    );
};

export default TodoWriter;
