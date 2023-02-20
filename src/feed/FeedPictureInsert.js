import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "@mui/material";
import CloseButton from "react-bootstrap/CloseButton";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
function FeedPictureInsert(props) {

    const dragFunction = (event) => {
        event.preventDefault(); // 페이지 이동 금지 시키기
        event.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파 중지
    }

    // 사진 번호 가져오기
    let arr = [];
    const startClickPhoto=(t)=>{
        arr.push(t);
    }
    const finishClickPhoto=(e,t)=>{
        arr.push(t);
    }
    //-----------------------------------------------------
    // 인덱스 바꾸기
    let arrCh = []
    const startIndex = (e) =>{
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo);
    }
    const finishIndex = (e) => {
        const newNo = photoNoList.indexOf(e)
        arrCh.push(newNo)
    }
    // console.log("바꿀인덱스 : "+arrCh);

    const changeArray = (e) =>{
        const photoNo = [...photoNoList]
        photoNo.splice(arrCh[0],1,arr[1]) // 0, 1, 477
        photoNo.splice(arrCh[1],1,arr[0]) // 1, 1, 476
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
    }

    const changePath = (e) =>{
        const filePath = [...photoFilePathList]
        filePath.splice(arrCh[0],1,arrFile[1])
        filePath.splice(arrCh[1],1,arrFile[0])
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
                        border:"3px solid gray",
                        marginLeft:"10px",
                        textAlign:"center",
                        float:"left",
                        width:"300px",
                        height:"380px"
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
                        <div style={{float:"right"}}>
                            <CloseButton onClick={()=>{
                                deletePhotoNoList(photoNoList[i]); // 숫자 숨겨
                                deletePhotoPathList(photoFilePathList[i]); // 위치 숨겨
                                deleteClick(photoNoList[i]);}}// 숫자 지운/>
                            />
                        </div>
                    <div style={{clear:"both"}}>
                            <img
                                src={photoFilePathList[i]}
                                alt="없는사진"
                                style={{height:"300px",width:"100%"}}
                            />
                    </div>
                            {i+1} 번째 사진
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
            const formData = new FormData()                 // html 의 form 을 비동기로 할려면 => key : value 로 보낼려면 =>
            formData.append('files',uploadFile)     // 비동기로 할려면 json 형태인데 => form 으로만들어주면 첨부파일을 올릴수있다.

            const response = await axios({
                method: 'post',
                url: '/api/feed/insertPhoto',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',  // 파일은 엄청긴 데이터인데 파일보낸다고 미리 선언해서 그냥 보내는느낌 // request요청을 어떻게할거냐
                },
            });
            if(response.data.code==='2000'){ // 성공했다면
                const newFilePath = (response.data.result.filePath);
                const newChangeName = (response.data.result.changeName);

                const newFilePathName = newFilePath+newChangeName;

                putPhotoFilePath([newFilePathName]) // photoPath 미리보기 데이터
                putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
                e.target.value="";
            }
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                component="label"
                startIcon={<AddAPhotoIcon/>}
                style={{marginBottom:"10px"}}>
                Upload
                <input hidden type="file" accept="image/*" onChange={onChange}/>
            </Button>
            <hr/>
            <div>
                <Rendering/>
                <div style={{clear:"both"}}></div>
            </div>
            <hr/>
        </div>
    );
}

export default FeedPictureInsert;