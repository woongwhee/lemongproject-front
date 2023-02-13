import React, {useState} from 'react';
import StartSingleModal from "./StartSingleModal";
import StartMultiModal from "./StartMultiModal";
import {Button} from "reactstrap";

const StartMultiBtn = ({templateNo}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const selectCategory = (categoryNo) => {
        setModal(!modal);
    }
    return (
        <>
            <Button onClick={toggle} color={"info"} size={"sm"}>
                같이하기
            </Button>
            <StartMultiModal isOpen={modal} toggle={toggle} templateNo={templateNo}/>
        </>
    );
};

export default StartMultiBtn;
