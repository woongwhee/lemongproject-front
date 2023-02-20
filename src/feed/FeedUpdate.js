import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import {ModalBody, ModalFooter} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Favorite from '@mui/icons-material/Favorite';
import CloseButton from "react-bootstrap/CloseButton";

import ButtonR from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import swal from 'sweetalert';


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



//----------------------------------------------------------------------+
    const dragFunction = (event, type) => {
        event.preventDefault(); // 페이지 이동 금지 시키기
        event.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파 중지
    }
    // 사진 번호 가져오기
    let arr = [];
    const startClickPhoto=(t)=>{
        console.log('시작' + t);
        arr.push(t);

    }
    const finishClickPhoto=(e,t)=>{
        arr.push(t);
    }
    const changeValue = () =>{
        axios.post('api/feed/changeValue',{
            startPhoNo:arr[0],
            finishPhoNo:arr[1]
        }).then(function (res){
            arr = [];
        })
    }
//----------------------------------------------------------------------+

    // 인덱스 바꾸기
    let arrCh = []
    const startIndex = (e) =>{
        const newNo = getPhotoNoList.indexOf(e)
        arrCh.push(newNo);
    }
    const finishIndex = (e) => {
        const newNo = getPhotoNoList.indexOf(e)
        arrCh.push(newNo)
    }
    const changeArray = (e) =>{
        const photoNo = [...getPhotoNoList]
        photoNo.splice(arrCh[0],1,arr[1]) // 0, 1, 477
        photoNo.splice(arrCh[1],1,arr[0]) // 1, 1, 476
        setPhotoNoList(photoNo);
    }
//----------------------------------------------------------------------+

    // 파일위치
    let arrFile = []
    const startPath = (t) =>{
        arrFile.push(t)

    }
    const finalPath = (t) =>{
        arrFile.push(t)
        console.log(arrFile);
    }
    const changePath = (e) =>{
        const filePath = [...getFilePathList]
        filePath.splice(arrCh[0],1,arrFile[1])
        filePath.splice(arrCh[1],1,arrFile[0])
        console.log(filePath);
        setFilePathList(filePath);
    }
//----------------------------------------------------------------------+

    const Rendering = () => {
            const result = [];
            for (let i = 0; i < getFilePathList.length; i++) {
                result.push(
                    <div key={i}
                         style={{border:"1px solid black", width:"310px", height:"380px", marginLeft:"10px",textAlign:"center",float:"left"}}
                         onDragStart={(e)=>{
                             startClickPhoto(getPhotoNoList[i]);
                             startIndex(getPhotoNoList[i]);
                             startPath(getFilePathList[i]);
                         }}

                         onDragLeave={(event) => dragFunction(event)}
                         // * onDragLeave : 드래그한 대상이 드랍하지 않고 떠나는 경우 이벤트가 발생 합니다.

                         onDragEnter={(event) => {
                             dragFunction(event);
                            }
                         }
                         // * onDragEnter : 드래그한 대상이 드랍영역에 다다르면 이벤트가 발생 합니다.
                         onDrop={(event) => {
                             finishClickPhoto(event, getPhotoNoList[i]);
                             finishIndex(getPhotoNoList[i]);
                             finalPath(getFilePathList[i]);
                             changeValue();
                             changeArray(event);
                             changePath(event);
                         }}
                         onDragOver={(event) => { return dragFunction(event); }}
                    >


                        <div style={{float:"right"}}>
                            <IconButton aria-label="delete">
                            <DeleteOutlineOutlinedIcon
                                onClick={()=>{
                                    deletePhotoNoList(getPhotoNoList[i]); // 숫자 숨겨
                                    deletePhotoPathList(getFilePathList[i]); // 위치 숨겨
                                    deleteClick(getPhotoNoList[i]); // 숫자 지운
                                }}
                            />
                            </IconButton>
                        </div>

                        <img
                            src={getFilePathList[i]}
                            alt='사진이없습니다'
                            style={{width:"300px", height:"300px"}}
                            draggable={true}
                        />
                        <span>{getPhotoNoList[i]}  :::  {[i]}</span>
                    </div>
                );
            }
        return result;
    };
//----------------------------------------------------------------------+

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
//----------------------------------------------------------------------+

    const [getPhotoNoList, setPhotoNoList] = useState(photoNoList);     // 원래 사진번호
    const [getFilePathList, setFilePathList] = useState(filePathList);  // 원래 파일위치


    const putPhotoNo = (PhotoNo) => {
        const newList=[...getPhotoNoList,PhotoNo];
        setPhotoNoList(newList);
        console.log(newList);
    }

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
    const [disable, setDisable] = useState(true);
    const containContent = (e) => {
        e ? setDisable(false) : setDisable(true)
    }
    useEffect(()=>{
        if(newContent === "" || getPhotoNoList.length === 0){
            setDisable(true);
        }
        if(getPhotoNoList.toString() !== photoNoList.toString()){
            setDisable(false);
        }
    })
    const checkContent = (insertFail) => {
        if (insertFail === "Fail") {
            return alert("내용입력은 필수 입니다.")
        }
    }

    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '&.Mui-expanded': {
                fontWeight: theme.typography.fontWeightRegular,
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: 'var(--tree-view-color)',
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: 'inherit',
                color: 'inherit',
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2),
            },
        },
    }));

    function StyledTreeItem(props) {
        const {
            bgColor,
            color,
            labelIcon: LabelIcon,
            labelInfo,
            labelText,
            ...other
        } = props;

        return (
            <StyledTreeItemRoot
                label={
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                }
                style={{
                    '--tree-view-color': color,
                    '--tree-view-bg-color': bgColor,
                }}
                {...other}
            />
        );
    }

    StyledTreeItem.propTypes = {
        bgColor: PropTypes.string,
        color: PropTypes.string,
        labelIcon: PropTypes.elementType.isRequired,
        labelInfo: PropTypes.string,
        labelText: PropTypes.string.isRequired,
    };


    return (
        <>
            <StyledTreeItem
                nodeId="6"
                labelText=""
                labelIcon={CreateIcon}
                labelInfo=""
                color="#1a73e8"
                bgColor="#e8f0fe"
                onClick={handleShow}
            />
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-90w">>
            <Modal.Header closeButton>
                <Modal.Title>
                    피드 업데이트
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
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
                </div>
                <div>
                    {Rendering()}
                    <div style={{clear:"both"}}></div>
                </div>

                <div style={{clear:"both"}}></div>

                <FloatingLabel controlId="floatingTextarea2" label="내용수정">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '200px', resize:'none', marginTop:'30px'}}
                        onChange={(e)=> {
                            setContent(e.target.value);
                            containContent(e);
                        }}
                        defaultValue={feedContent}
                    />
                </FloatingLabel>
            </ModalBody>
            <ModalFooter>
            <ButtonR variant="outline-primary"
                    onClick={ () => {
                    axios.post(
                        'api/feed/updateFeed',
                        {feedNo: feedNo,
                            feedContent: newContent,
                            photoNo: getPhotoNoList
                        }).catch(function (res) {
                        console.log('실패함');
                        checkContent(res.data.Java);
                        }).then(function (res) {
                            console.log(feedNo)
                            handleClose();
                            swal({
                                title: "업데이트 성공!",
                                icon: "success",
                                button: "확인",
                            }).then(()=>{window.location.reload("/main")});


                        })}}
                    disabled={disable}
            >수정하기</ButtonR>
            </ModalFooter>
        </Modal>
        </>
    );
}
export default FeedUpdate;
