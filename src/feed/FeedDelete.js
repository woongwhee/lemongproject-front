import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {Alert} from "@mui/lab";
import TreeItem from "@mui/lab/TreeItem";

function FeedDelete(props) {

    let Feed = props.Feed;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const feedNo = Feed.feedNo;
    // const photoNo = Feed.photoNoList[0];
    const deleteSuccess = () => {return(<Alert variant="outlined" severity="success">
        This is a success alert — check it out!
    </Alert>)};

    const deleteFeed = () => {
            axios.post(
                'api/feed/deleteFeed',{
                    feedNo:feedNo,
                    // photoNo:photoNo
                }).then(function (){
                    deleteSuccess();
                    handleClose();
                    window.location.reload("/main");
                })
    }
    return (
        <>
            {/*<Button*/}
            {/*    variant="danger"*/}
            {/*    size="sm"*/}
            {/*    onClick={handleShow}>삭제하기</Button>*/}
            <TreeItem nodeId="2" label="삭제하기" onClick={handleShow}/>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>피드 삭제하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    삭제하기 버튼 클릭시 이 피드는 삭제됩니다.<br/>
                    삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={deleteFeed}>삭제하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedDelete;