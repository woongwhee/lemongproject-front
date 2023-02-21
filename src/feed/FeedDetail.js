import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeedReplyInsert from "./FeedReplyInsert";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import FeedDelete from "./FeedDelete";
import FeedDetailView from "./FeedDetailView";

function FeedDetail(props) {
    let Feed = props.Feed;

    const [show, setShow] = useState(false);

    return (
        <>
            <IconButton aria-label="add to favorites" onClick={() => setShow(true)}>
                <InfoIcon />
            </IconButton>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        디테일
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FeedDetailView Feed={Feed}></FeedDetailView>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FeedDetail;