import React from 'react';
import {useTemplateDispatch} from "../TemplateContext";
import "../style/GoBackButton.css"

import { FiChevronLeft } from "react-icons/fi";

import '../../template/style/TemplateJiho.css';

const BackButton = () => {
    let dispatch = useTemplateDispatch();
    const back=()=>{
        dispatch({type:"BACK_LIST"})
    }
    return (
        <div className="back-button" onClick={back}>
        <icon/>
            <FiChevronLeft className='themBtn' style={{fontSize:'30px'}}/>
        </div>
    );
};

export default BackButton;
