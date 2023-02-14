import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import TodoDay from "./TodoDay";
import TodoWriter from "./TodoWriter";

function TemplateTodoInput({range, days, insertTodo, deleteTodo, templateNo}) {
    const [modal, setModal] = useState(false);
    const [singleModal, setSingleModal] = useState(false);
    const [dayList, setDayList] = useState([]);
    const [contentList, setContentList] = useState([]);
    let startX;
    let startY;
    let mode = false;
    const modalToggle = () => {
        setModal(!modal)
    }
    const addContent = (str) => {
        const newList = [...contentList, str];
        setContentList(newList);
    }
    const removeContent = (index) => {
        const newList = contentList.slice(index, 1);
        setContentList(newList);
    }
    const setSelectedDay = async () => {
        let selected = document.querySelectorAll(".onSelect");
        let newDayList = [];
        for (let i = 0; i < selected.length; i++) {
            newDayList.push(selected[i].dataset.day);
        }
        await setDayList(newDayList);
        return newDayList.length;
    }


    const mouseDown = (e) => {
        if (modal) {
            return;
        }
        mode = true;
        startX = e.clientX;
        startY = e.clientY;
        for (let i = 0; i < dayElements.length; i++) {
            if (dotSelect(dayElements[i], startX, startY)) {
                dayElements[i].classList.add("onSelect")
            } else {
                dayElements[i].classList.remove("onSelect")
            }
        }
    }

    let dayElements = document.getElementsByClassName("days");
    const mouseMove = (e) => {
        if (!mode || modal) {
            return
        }
        let endX = e.clientX;
        let endY = e.clientY;
        let rec1 = {
            x1: Math.min(startX, endX),
            x2: Math.max(startX, endX),
            y1: Math.min(startY, endY),
            y2: Math.max(startY, endY)
        }
        for (let i = 0; i < dayElements.length; i++) {
            if (rangeSelect(dayElements[i], rec1)) {
                dayElements[i].classList.add("onSelect")
            } else {
                dayElements[i].classList.remove("onSelect")
            }
        }
    }
    const addMouseEvent = () => {
        let todoInput = document.querySelector(".templatetodo-input");
        todoInput.addEventListener("mousedown", mouseDown);
        todoInput.addEventListener("mousemove", mouseMove);
        todoInput.addEventListener("mouseup", mouseUp);
    }
    const removeMouseEvent = () => {
        let todoInput = document.querySelector(".templatetodo-input");
        todoInput.removeEventListener("mousedown", mouseDown);
        todoInput.removeEventListener("mouseup", mouseUp);
        todoInput.removeEventListener("mousemove", mouseMove);
    }
    const onModalClose = async () => {
        console.log("sfdsdfds", contentList);
        if (contentList.length == 0) {
            return;
        }
        let result = await insertTodo(dayList, contentList);
        setDayList([]);
        setContentList([]);
    }
    const singleModalToggle = () => {
        setSingleModal(!modal);
    }
    const mouseUp = async (e) => {
        let selected = await setSelectedDay();
        mode = false;
        if (selected == 0) {
            return;
        } else {
            modalToggle();
        }
        for (let i = 0; i < dayElements.length; i++) {
            dayElements[i].classList.remove("onSelect")
        }

    }
    useEffect(() => {
        addMouseEvent()
        return () => {
            // removeMouseEvent();
        };
    }, []);
    const Days = () => {
        let Days = [];
        for (let i = 1; i < days.length + 1; i++) {
            let item = days[i];
            if (item != undefined) {
                Days.push(<TodoDay todoList={item} day={i}></TodoDay>)
            } else {
                Days.push(<TodoDay day={i}></TodoDay>)
            }
        }
        return Days;
    }
    return (
        <>
            <div className="templatetodo-input">
                {Days()}
            </div>
            {/*<TodoWriter isOpen={modal} dayList={dayList} contentList={contentList} addContent={addContent}*/}
            {/*            removeContent={removeContent} toggle={modalToggle} onClosed={onModalClose}></TodoWriter>*/}
            <TodoWriter isOpen={modal} templateNo={templateNo} dayList={dayList} contentList={contentList} addContent={addContent}
                         removeContent={removeContent} toggle={modalToggle} onClosed={onModalClose}></TodoWriter>
            {/*<TodoWriter isOpen={singleModal} templateNo={templateNo} dayList={dayList} toggle={singleModalToggle} onClosed={onModalClose} deleteTodo={deleteTodo}></TodoWriter>*/}
        </>
    )
}

/**
 * 사각형의 범위안에
 * @param el httpElement
 * @param rec1 좌표를 담은 객체{x1,x2,y1,y2}
 *
 *
 *
 */
const rangeSelect = (el, rec1) => {
    let rec2 = {
        y1: el.offsetTop,
        y2: el.offsetTop + el.offsetHeight,
        x1: el.offsetLeft,
        x2: el.offsetLeft + el.offsetWidth
    };
    if (rec1.x2 < rec2.x1 || rec2.x2 < rec1.x1 || rec1.y2 < rec2.y1 || rec2.y2 < rec1.y1) {
        return false;
    } else {
        return true;
    }
}
const dotSelect = (el, x, y) => {
    let rec = {
        y1: el.offsetTop,
        y2: el.offsetTop + el.offsetHeight,
        x1: el.offsetLeft,
        x2: el.offsetLeft + el.offsetWidth
    };
    if (rec.x1 > x || rec.x2 < x || rec.y1 > y || rec.y2 < y) {
        return false;
    } else {
        return true;
    }
}
export default TemplateTodoInput;