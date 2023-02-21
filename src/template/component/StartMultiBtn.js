import React, {useState} from 'react';
import StartSingleModal from "./StartSingleModal";
import StartMultiModal from "./StartMultiModal";
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_MY_PROFILE} from "../../reducer/menu";

import { BsFillPeopleFill } from "react-icons/bs";

import '../../template/style/TemplateJiho.css';

const StartMultiBtn = ({templateNo}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
    };
    const selectCategory = (categoryNo) => {
        setModal(!modal);
    }
    return (
        <>
            <div style={{marginLeft:'630px'}} onClick={toggle} color={"info"}>
                <BsFillPeopleFill className='themBtn' style={{fontSize:'30px'}}></BsFillPeopleFill> <span style={{fontFamily:'SourceSansPro-Light' , fontSize:'20px'}}>Multi</span>
                <StartMultiModal isOpen={modal} size="xl" toggle={toggle} templateNo={templateNo}/>
            </div>
        </>
    );
};

export default StartMultiBtn;
