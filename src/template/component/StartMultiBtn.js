import React, {useState} from 'react';
import {Button} from "@mui/material";
import StartSingleModal from "./StartSingleModal";
import StartMultiModal from "./StartMultiModal";

const StartMultiBtn = ({templateNo}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const selectCategory = (categoryNo) => {
        setModal(!modal);
    }
    return (
        <>
            <Button onClick={toggle}>
                같이하기
            </Button>
            <StartMultiModal isOpen={modal} toggle={toggle} templateNo={templateNo}/>
        </>
    );
};

export default StartMultiBtn;
