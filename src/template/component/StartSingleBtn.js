import React, {useState} from 'react';
import {Button} from "reactstrap";
import StartSingleModal from "./StartSingleModal";

const StartSingleBtn = ({templateNo}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const selectCategory=(categoryNo)=>{setModal(!modal);}

    return (
        <>
        <Button onClick={toggle} color={"info"} size={"sm"}>
            혼자하기
        </Button>
        <StartSingleModal isOpen={modal} toggle={toggle} templateNo={templateNo}/>
        </>
    );
};

export default StartSingleBtn;

