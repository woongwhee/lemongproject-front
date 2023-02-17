import React, {useState} from 'react';
import {todoDelete} from "../templateApi";
import apiHoc from "../../util/apiHoc";

const SavedTodoDate = ({result, updateActive}) => {
    const [savedContent, setSavedContent] = useState(result);
    const showBtn = (e) => {
        let childs = e.target.childNodes;
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].tagName == "BUTTON") {
                childs[i].classList.remove("hiddenbtn");
            }
        }
    }
    const updateSavedContent = async (e) => {
        let todoNo = e.target.dataset.todoNo;
        let result = await todoDelete(todoNo);
        if (result > 0) {
            let content = savedContent.find(todo => todo.tpTodoNo == todoNo).content;
            let newSaved = savedContent.filter(e => e.tpTodoNo != todoNo);
            updateActive(content)
            setSavedContent(newSaved);
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
    const removeSavedContent = async (tpTodoNo) => {
        let result = await todoDelete(tpTodoNo);
        if (result > 0) {
            let newSaved = savedContent.filter(e => e.tpTodoNo != tpTodoNo);
            setSavedContent(newSaved);
        } else {
            alert("삭제실패");
        }

    };

    return (
        <div>
            {savedContent.map((todo) => {
                console.log(todo);
                return (<p className="savedTodoContent" data-todoNo={todo.tpTodoNo}
                           onDoubleClick={updateSavedContent}
                           onMouseEnter={showBtn}
                           onMouseOut={hideBtn}>{todo.value}. {todo.content}
                    <button className="hiddenbtn inputbtn" onClick={()=>{removeSavedContent(todo.tpTodoNo)}}>x</button>
                </p>)
            })
            }
        </div>
    );
};

export default apiHoc(SavedTodoDate);
