import React from 'react';
import {useTemplateDispatch} from "../TemplateContext";

const WriteButton = () => {
    const dispatch=useTemplateDispatch();
    const writerSwitch=()=>{
        dispatch({
            type:"WRITE"
        })
    }

    return (
        <div className="Write-Button" onClick={writerSwitch}>
            <img src="/LemongImg/template/edit.png" />
        </div>
    );
};

export default WriteButton;
