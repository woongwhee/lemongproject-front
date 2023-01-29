import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function FeedDelete(props) {

    let feedNo = props.feedNo;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteFeed = () => {
            axios.post(
                'api/feed/deleteFeed',{
                    feedNo:feedNo
                }).then(function (){
                    console.log(feedNo)
                    alert('삭제성공');
                    handleClose();
                    window.location.reload("/main");
                }
            )
    }


    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>삭제하기</Button>
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
                    <Button variant="danger" onClick={{deleteFeed}}>삭제하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedDelete;