import React, {useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';

import Pagination from 'react-bootstrap/Pagination';

function FeedUpdate(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const feedNo = props.feedNo;
    const content = props.feedContent
    const [newContent, setContent] = useState('');

    let active = 1;
    let items = [];
    for (let number = 1; number <= 4; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

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
                <Figure>
                    <Figure.Image
                        width={300}
                        height={300}
                        alt="300*300"
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_185e519ece7%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_185e519ece7%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.375%22%20y%3D%2295.4%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    />
                    <Pagination>{items}</Pagination>

                    <Figure.Caption>
                        사진을 넣는공간
                    </Figure.Caption>
                </Figure>
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
