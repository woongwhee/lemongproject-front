import React, {useState} from 'react';
import Modal from "react-modal";
import FeedReplyInsert from "./FeedReplyInsert";
import CloseButton from 'react-bootstrap/CloseButton';

function FeedReply(props) {
    let feedNo = props.feedNo;

    const [isOpen, setOpen] = useState(false);
    const openClick = () => {
        setOpen(true);
    };
    const closeClick = () => {
        setOpen(false);
    };


    return (
        <>
        <button onClick={openClick}>📢</button>
        <Modal isOpen={isOpen}ariaHideApp={false}>
            <CloseButton onClick={closeClick} style={{float:'right'}}></CloseButton>
            <FeedReplyInsert feedNo={feedNo}/>
        </Modal>
        </>
    );
}

export default FeedReply;