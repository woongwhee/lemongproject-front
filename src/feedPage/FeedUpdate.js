import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Buttonr from "react-bootstrap/Button";
import {Button, IconButton} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseButton from "react-bootstrap/CloseButton";
import {DndProvider, DragPreviewImage, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function FeedUpdate({Feed:{feedContent,feedNo,filePathList,photoNoList}}) {
    // 모달창
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = (breakpoint) => {
        setShow(true);
        setFullscreen(breakpoint);
    }
    const [newContent, setContent] = useState('');

    const Nemo = memo(
        ({
             id,
             index,
             nemo,
             moveNemo,
             someDragging,
             setSomeDragging,
         }) => {
            const [, dropLeft] = useDrop(
                () => ({
                    accept: ItemTypes.Nemo,
                    canDrop: () => false,
                    hover({ id: draggedId, index: orgIndex }) {
                        if (draggedId !== id) {
                            moveNemo(draggedId, index);
                        }
                    },
                }),
                [moveNemo]
            );
        }














    const Rendering = () => {
            const result = [];
            for (let i = 0; i < getFilePathList.length; i++) {
                result.push(
                <DndProvider backend={HTML5Backend}>
                    <div key={i}
                         style={{border:"3px solid black", width:"310px", height:"380px", marginLeft:"10px",textAlign:"center",float:"left"}}>
                        <div style={{float:"right"}}>
                            <CloseButton
                                onClick={()=>{
                                    deletePhotoNoList(getPhotoNoList[i]); // 숫자 숨겨
                                    deletePhotoPathList(getFilePathList[i]); // 위치 숨겨
                                    deleteClick(getPhotoNoList[i]); // 숫자 지운
                                }}
                            />
                        </div>
                        <img
                            src={getFilePathList[i]}
                            alt='사진이없습니다'
                            style={{width:"300px", height:"300px"}}
                            onDrag
                        />
                        <span>{getPhotoNoList[i]}  :::  {[i]}</span>
                    </div>
                </DndProvider>
                );
            }
        return result;
    };

    const deletePhotoNoList=(i)=>{
        const newPlist=[...getPhotoNoList];
        let index=newPlist.indexOf(i);
        newPlist.splice(index,1)
        setPhotoNoList(newPlist);
    }
    const deletePhotoPathList=(i)=>{
        const newPlist=[...getFilePathList];
        let index=newPlist.indexOf(i); // 숫자
        newPlist.splice(index,1)
        setFilePathList(newPlist);
    }
    const deleteClick=(photoNo)=>{
        axios.post(
            'api/feed/modifyFeedPhoto',{
            photoNo:photoNo
        }).then(function (res){
            console.log(res.data);
        }).catch(function (res){
            console.log("실패 : "+res.data)
        })
    }

    const [getPhotoNoList, setPhotoNoList] = useState(photoNoList);     // 원래 사진번호
    const [getFilePathList, setFilePathList] = useState(filePathList);  // 원래 파일위치

    // const [getAddPhotoNoList, addPhotoNoList] = useState([]);
    // const newPhotoNoList = () =>{
    //         const newPlist=[...getAddPhotoNoList];
    //         setPhotoNoList(newPlist);
    // }
    //
    // const [getAddPhotoPathList, addPhotoPathList] = useState([]);
    // const newPhotoPathList=()=>{
    //     const newPlist=[...getAddPhotoPathList];
    //     setFilePathList(newPlist);
    // }


    // const [getNewPhotoNoList, setNewPhotoNoList] = useState(photoNoList);
    const putPhotoNo = (PhotoNo) => {
        const newList=[...getPhotoNoList,PhotoNo];
        setPhotoNoList(newList);
        console.log(newList);
    }

    // const [getNewPhotoList,setNewPhotoList]=useState(filePathList);
    const putPhoto = (newPhoto) => {
        const newPList=[...getFilePathList,newPhoto]
        setFilePathList(newPList);
        console.log(newPList)
    }
    const onChange = async (e) => {
        e.preventDefault();
        if(e.target.files){
            const uploadFile = e.target.files[0]
            const formData = new FormData()
            formData.append('files',uploadFile)

            const response = await axios({
                    method: 'post',
                    url: '/api/feed/insertPhoto',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.code==='2000'){
                console.log(response.data.result.filePath);
                console.log(response.data.result.changeName);

                const newFilePath = (response.data.result.filePath);
                const newChangeName = (response.data.result.changeName);

                const newFilePathName = newFilePath+newChangeName;
                // console.log(newFilePathName);
                putPhoto([newFilePathName]);
                putPhotoNo(response.data.result.photoNo) // photoNo List 시키기

                const timer = setTimeout(() => console.log('Initial timeout!'), 5000);
                clearTimeout(timer);

                e.target.value="";
            }
        }
    }

    return (
        <>
        <Buttonr
            variant="outline-dark"
            size="sm"
            onClick={handleShow}>업데이트</Buttonr>

        <Modal
            show={show}
            onHide={handleClose}
            fullscreen={fullscreen}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    피드 업데이트
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                {/*<FeedUpdatePhotoInsert*/}
                {/*    photoNoList = {getPhotoNoList}*/}
                {/*   addPhotoNoList={addPhotoNoList}*/}
                {/*   filePathList={getFilePathList}*/}
                {/*   addPhotoPathList={addPhotoPathList}*/}
                {/*    newPhotoNoList={newPhotoNoList}*/}
                {/*    newPhotoPathList={newPhotoPathList}*/}
                {/*>*/}
                {/*</FeedUpdatePhotoInsert>*/}
                <div>
                    <Button variant="contained" component="label" startIcon={<AddAPhotoIcon/>} style={{marginBottom:"50px"}}>
                        Upload
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                    />
                    </Button>
                    {/*<button onClick={*/}
                    {/*    ()=>{*/}
                    {/*        newPhotoNoList();*/}
                    {/*        newPhotoPathList();*/}
                    {/*        }}>*/}
                    {/*    수정하기</button>*/}
                </div>
                <div>
                현재피드 포토 : {getPhotoNoList} <br/><br/>
                현재피드 파일위치 : {getFilePathList}<br/>
                </div>
                <div>
                    {Rendering()}

                    <div style={{clear:"both"}}></div>
                </div>

                <div style={{clear:"both"}}></div>

                <div style={{marginTop:"50px"}}>원래 피드 내용 : {feedContent}</div>
                <FloatingLabel controlId="floatingTextarea2" label="내용수정">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '200px', resize:'none', marginTop:'30px'}}
                        onChange={(e)=> {setContent(e.target.value);}}
                        defaultValue={feedContent}
                    />
                </FloatingLabel>
            </ModalBody>
            <ModalFooter>
            <Button variant="contained"
                    onClick={
                () => {axios.post(
                'api/feed/updateFeed',
                {feedNo:feedNo, feedContent:newContent, photoNo:getPhotoNoList}
                ).catch(function () {
                    console.log('실패함')

                }).then(function (res){
                    console.log(feedNo)
                    alert('업테이트성공');
                    handleClose();
                    window.location.reload("/main");
                })
                }

            }>수정하기</Button>
            </ModalFooter>
        </Modal>
        </>
    );
}
export default FeedUpdate;
