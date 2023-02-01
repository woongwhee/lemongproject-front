import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'
import FeedPictureDelete from "./FeedPictureDelete";

function FeedPictureInsert(props) {

    const Rendering=()=>{
        const result = [];
        for(let i = 0; i<photoFilePathList.length; i++){
            result.push(
                <div key={i} style={{border:"1px solid red", width:"300px", float:"left"}}>
                    <img
                        src={photoFilePathList[i]}
                        alt="사진이없습니다"
                        style={{width:"300px", height:"300px"}}
                    />
                    <p>{photoNoList[i]}</p>
                    <button onClick={()=>{
                        deletePhotoNoList(photoNoList[i]); // 숫자 숨겨
                        deletePhotoPathList(photoFilePathList[i]); // 위치 숨겨
                        deleteClick(photoNoList[i]); // 숫자 지운
                    }
                    }>삭제하기</button>
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
        props.setInsertPhotoNo(newList);
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
        <>
            <table style={{border:"3px solid purple"}}>
                <thead>
                <tr>
                <th>이미지 미리 보기</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>
                        <input type="file" accept="image/*" onChange={onChange}/>
                    </td>
                </tr>
                <tr>
            <td>
                <div>
                    <Rendering></Rendering>
                    <div style={{clear:"both"}}></div>
                    {/*{*/}
                    {/*    photoList?.map(photo =>*/}
                    {/*        <img alt="피드사진입니다." style={{width:"100px", height:"100px"}} src={photo?.filePath+photo.changeName} key={i++}/>*/}
                    {/*    )*/}
                    {/*}*/}
                </div>

                {/*<FeedPictureDelete photoNo={photoNo} getData={getData}></FeedPictureDelete>*/}
            </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}

export default FeedPictureInsert;