import React, {useEffect, useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function FeedUpdate(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const feedNo = props.feedNo;
    const content = props.feedContent
    const [newContent, setContent] = useState('');

    return (
        <>
        <Button variant="outline-dark" size="sm"  onClick={handleShow}>업데이트</Button>
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>
                    피드 업데이트
                </Modal.Title>
            </Modal.Header>
            {/*<div>*/}
            {/*<button onClick={closeClick} style={{border:"none", background:"none", fontSize:"30px"}}>X</button >*/}
            {/*</div>*/}
            <ModalBody>
            원래 피드 내용 : {content} <br/>
                <div style={{border:"2px solid black", width:"300px", height:"300px"}}>
                    여기는 사진

                </div>
            {/*<input type="text" onChange={(e)=> {setContent(e.target.value);}}/>*/}

                <FloatingLabel controlId="floatingTextarea2" label="새로운 피드 내용">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '200px', resize:'none', marginTop:'30px'}}
                        onChange={(e)=> {setContent(e.target.value);}}
                    />
                </FloatingLabel>


            </ModalBody>
            <ModalFooter>
            <Button variant="primary" onClick={
                () => {axios.post(
                'api/feed/updateFeed',
                {feedNo:feedNo, feedContent:newContent}
                ).catch(function () {
                    console.log('실패함')
                    console.log(feedNo);
                    console.log(newContent);
                }).then(function (res){
                    console.log(feedNo)
                    alert('업테이트성공');
                    handleClose();
                    window.location.reload("/main");
                })
                }}>수정하기</Button>
            </ModalFooter>
        </Modal>
        </>
    );
}

export default FeedUpdate;
