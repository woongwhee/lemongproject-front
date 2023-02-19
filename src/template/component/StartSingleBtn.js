import React, {useState} from 'react';
import {Button} from "reactstrap";
import StartSingleModal from "./StartSingleModal";

import { BsFillPersonFill } from "react-icons/bs";

import '../../template/style/TemplateJiho.css';

const StartSingleBtn = ({templateNo}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const selectCategory=(categoryNo)=>{setModal(!modal);}

    return (
        <>
            <div style={{marginLeft:'510px' , marginBottom:'-30px'}} onClick={toggle} color={"info"}>
                <BsFillPersonFill className='themBtn' style={{fontSize:'30px'}}></BsFillPersonFill> <span style={{fontFamily:'SourceSansPro-Light' , fontSize:'20px'}}>Single</span> 
                <StartSingleModal isOpen={modal} toggle={toggle} templateNo={templateNo}/>
            </div>
        </>
    );
};

export default StartSingleBtn;

