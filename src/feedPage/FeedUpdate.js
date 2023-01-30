import React, {useEffect, useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function FeedUpdate({Feed:{feedContent,feedNo,filePathList,photoNoList},updateFeed}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newContent, setContent] = useState('');

    // const [getFilePath,setFilePath] = useState('');
    // useEffect(()=>{setFilePath(filePath)})

    // const list = getFilePath.split(",");
    //
    // const [getPhotoNo,setPhotoNo] = useState('')
    // useEffect(()=>{setPhotoNo(photoNo)})

    // const photoNoList = getPhotoNo.split(",");

    const [showPhoto, setShowPhoto] = useState(true);
    const photoDelete = () => setShowPhoto(false);


    const rendering = () => {
        const result = [];
        for (let i = 0; i < filePathList.length; i++) {
                result.push(

                    <div key={i} >
                        <img
                            className="d-block w-100"
                            src={filePathList[i]}
                            alt='사진이없습니다'
                            style={{width:"300px", height:"300px"}}
                        />
                        <p>{photoNoList[i]}</p>
                        <button
                            onClick={()=>{
                            deleteClick(photoNoList[i])
                        }}
                        >삭제하기</button>
                    </div>

                );

        }
        return result;
    };
    const deleteClick=(photoNo)=>{
        axios.post(
            'api/feed/modifyFeedPhoto',{
            photoNo:photoNo
        }).then(function (res){
            const newPlist=[...photoNoList];
            console.log(newPlist);
                let index=newPlist.findIndex(photoNo);
            newPlist.splice(index,1)
            if(res.data.Java === 'success'){
                photoDelete();
            }
        }).catch(function (res){
            console.log("실패"+res.data)
        })
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

            <ModalBody>
            원래 피드 내용 : {feedContent} <br/>

            {rendering()}
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
                    updateFeed("feedContent",newContent)
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
