import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {isEmpty} from "../../util/typeUtile";

const TodoSingleWriter = ({ isOpen, dayList, toggle,onClosed}) => {

    let [isInput, setIsInput] = useState(false);
    const [contentList, setContentList] = useState([]);
    const addInput = async () => {
        await setIsInput(true);
        document.querySelector("#newInput").focus()
    }
    const addContent = (e) => {
        setIsInput(!isInput);
        console.log(e)
        let value=e.target.value;
        if (value.length == 0 || value == "") {
            return;
        }
        const newContentList = [...contentList,value];
        setContentList(newContentList);
    }
    const updateContent = () => {

    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} onClosed={onClosed}>
            <ModalHeader>{dayList.toString()}일차 <Button color="info" size="sm"
                                                        onClick={addInput}>+</Button></ModalHeader>
            <ModalBody id="todoInputBody">
                {isInput && <input name="todoContent" id="newInput" onBlur={addContent} type="text"/>}
                {contentList.map((content, index) => <p data-index={index+1} onDblClick={updateContent}>{index+1}. {content}</p>)}
            </ModalBody>

        </Modal>
    );
};

export default TodoSingleWriter;
