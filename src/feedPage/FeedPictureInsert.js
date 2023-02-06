import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseButton from "react-bootstrap/CloseButton";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Card from 'react-bootstrap/Card';
import ButtonR from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CardFooter} from "reactstrap";


function FeedPictureInsert(props) {

    const dragFunction = (event) => {
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
        // e.preventDefault();
        // e.stopPropagation();
        console.log('끝' + t);
        arr.push(t);
        console.log(arr)
    }
    //-----------------------------------------------------
    // 인덱스 바꾸기
    let arrCh = []
    const startIndex = (e) =>{
        console.log("시작인덱스번호 : " + photoNoList.indexOf(e) + "리스트 : " + photoNoList);
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo);
    }
    const finishIndex = (e) => {
        console.log("끝인덱스번호 : " + photoNoList.indexOf(e))
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo)
        console.log("바꿀인덱스 : "+arrCh);
    }
    const changeArray = (e) =>{
        const photoNo = [...photoNoList]
        photoNo.splice(arrCh[0],1,arr[1]) // 0, 1, 477
        photoNo.splice(arrCh[1],1,arr[0]) // 1, 1, 476
        console.log("복사본바꾼리스트 : "+photoNo);
        setPhotoNoList(photoNo);
    }
    //-----------------------------------------------------
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
        const filePath = [...photoFilePathList]
        filePath.splice(arrCh[0],1,arrFile[1])
        filePath.splice(arrCh[1],1,arrFile[0])
        console.log(filePath);
        setPhotoFilePathList(filePath);
    }
    //-----------------------------------------------------

    const Rendering=()=>{
        const result = [];
        for(let i = 0; i<photoFilePathList.length; i++){
            result.push(
                <div
                    key={i}
                    style={{
                        border:"3px solid black",
                        marginLeft:"10px",
                        textAlign:"center",
                        float:"left",
                        width:"300px",
                        height:"300px"

                }}
                    onDragStart={(e)=>{
                        startClickPhoto(photoNoList[i]);
                        startIndex(photoNoList[i]);
                        startPath(photoFilePathList[i]);
                    }}
                    onDragLeave={(event) => dragFunction(event)}
                    onDragEnter={(event) => {dragFunction(event);}}
                    onDrop={(event) => {
                        finishClickPhoto(event, photoNoList[i]);
                        finishIndex(photoNoList[i]);
                        finalPath(photoFilePathList[i]);
                        changeArray(event);
                        changePath(event);
                    }}
                    onDragOver={(event) => { return dragFunction(event); }}
                >
                    <Container>
                        <Row>
                            <CloseButton onClick={()=>{
                                deletePhotoNoList(photoNoList[i]); // 숫자 숨겨
                                deletePhotoPathList(photoFilePathList[i]); // 위치 숨겨
                                deleteClick(photoNoList[i]);}}// 숫자 지운/>
                            />
                        </Row>
                        <Row>
                            <img src={photoFilePathList[i]} alt="없는사진" style={{height:"300px"}}/>
                        </Row>
                        <Row>
                            {i+1} 번째 사진
                        </Row>
                    </Container>
                </div>


            )
        }
        return result;
    }
    const deletePhotoNoList=(i)=>{
        const newPlist=[...photoNoList];
        let index=newPlist.indexOf(i);
        newPlist.splice(index,1)
        setPhotoNoList(newPlist);
    }
    const deletePhotoPathList=(i)=>{
        const newPlist=[...photoFilePathList];
        let index=newPlist.indexOf(i); // 숫자
        newPlist.splice(index,1)
        setPhotoFilePathList(newPlist);
    }
    const deleteClick=(photoNo)=>{
        axios({
                url:'api/feed/deletePhoto',
                method:'GET',
                params:{photoNo:photoNo}
            },
        ).then(function (res){
            console.log("성공");

        }).catch(function (res) {
            console.log(photoNo);
        })

    }

    const [photoFilePathList,setPhotoFilePathList]=useState([]);        // 원래 사진 경로
    const [photoNoList, setPhotoNoList] = useState([]);                 // 원래 사진 번호

    const putPhotoFilePath = (newPhoto) => { //사진 미리보기
        console.log(newPhoto)
        setPhotoFilePathList([...photoFilePathList,newPhoto]);
    }
    const putPhotoNo = (PhotoNo) => {
        const newList=[...photoNoList,PhotoNo];
        setPhotoNoList(newList);
    }
    props.setInsertPhotoNo(photoNoList);

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
            });
            if(response.data.code==='2000'){
                // console.log(response.data.result)
                // callback(response.data.result.photoNo); // photoNo만
                console.log(response.data.result.photoNo);

                const newFilePath = (response.data.result.filePath);
                const newChangeName = (response.data.result.changeName);

                const newFilePathName = newFilePath+newChangeName;

                putPhotoFilePath([newFilePathName]) // photoPath 미리보기 데이터
                putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
                e.target.value="";
            }
        }
    }
    // const [ photoNo, setPhotoNo] = useState();
    // function callback(str) { // 사진 지우기 photoNo
    //     setPhotoNo(str);
    // }
    //
    // const [deleteStatus, setDeleteStatus] = useState(0)
    // const deleteCallBack=()=>{
    //     if(deleteStatus === 'success'){
    //         photoList.pop();
    //         const newList=[...photoNoList];
    //         newList.pop();
    //         setPhotoNoList(newList);
    //         setPhotoNo(newList[newList.length-1]);
    //         props.setInsertPhotoNo(photoNoList);
    //     }
    // }
    // const getData = (Java) => {
    //     setDeleteStatus(Java); // 'success'을 가져옴
    //     deleteCallBack();
    // }

    return (
        <div>
            <Button variant="contained" component="label" startIcon={<AddAPhotoIcon/>} style={{marginBottom:"50px"}}>
                Upload
                <input hidden type="file" accept="image/*" onChange={onChange}/>
            </Button>

            <div>
                <Rendering/>
                <div style={{clear:"both"}}></div>
                {photoNoList}
            </div>
        </div>
    );
}

export default FeedPictureInsert;