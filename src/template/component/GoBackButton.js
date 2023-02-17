import React from 'react';
import {useTemplateDispatch} from "../TemplateContext";
import "../style/GoBackButton.css"
const BackButton = () => {
    let dispatch = useTemplateDispatch();
    const back=()=>{
        dispatch({type:"BACK_LIST"})
    }
    return (
        <div className="back-button" onClick={back}>
        <icon/>
            <img src="/LemongImg/CommonImg/backIcon.png" alt="BackIcon" />
        </div>
    );
};

export default BackButton;
