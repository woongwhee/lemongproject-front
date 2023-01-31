import React, {useEffect, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'
import FeedPictureDelete from "./FeedPictureDelete";

function FeedPictureInsert(props) {
    const [photoList,setPhotoList]=useState([]);
    const [photoNoList, setPhotoNoList] = useState([]);

    const putPhoto = (newPhoto) => { //사진 미리보기
        console.log(newPhoto)
        setPhotoList([...photoList,newPhoto]);
        // setPhotoNoList(newList);
        console.log(photoList)
    }
    const putPhotoNo = (PhotoNo) => {
        const newList=[...photoNoList,PhotoNo];
        setPhotoNoList(newList);
        console.log(newList);
        props.setInsertPhotoNo(newList);
    }

    const onChange = async (e) => {
        // try{
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
                    putPhoto(response.data.result) // photoPath 미리보기 데이터
                    // console.log(response.data.result)
                    callback(response.data.result.photoNo); // photoNo만
                    console.log(response.data.result.photoNo);
                    putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
                    e.target.value="";
                }
            }
        // }catch (error){
        //     console.log(error);
        // }
    }
    const [ photoNo, SetPhotoNo] = useState();
    function callback(str) { // 사진 지우기 photoNo
        SetPhotoNo(str);
    }
    const [deleteStatus, setDeleteStatus] = useState(0)
    const deleteCallBack=()=>{
        if(deleteStatus === 'success'){
            photoList.pop();
            const newList=[...photoNoList];
            newList.pop();
            setPhotoNoList(newList)
            props.setInsertPhotoNo(newList);
        }
    }
    const getData = (Java) => {
        setDeleteStatus(Java); // 'success'을 가져옴
        deleteCallBack();
    }


    let i =0;
    return (
        <>
            <table style={{border:"1px solid black"}}>
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
                <div className="imagePreview" >
                    {
                        photoList?.map(photo =>
                            <img alt="피드사진입니다." style={{width:"100px", height:"100px"}} src={photo?.filePath+photo?.changeName} key={i++}/>
                        )

                    }
                    <FeedPictureDelete photoNo={photoNo} getData={getData}></FeedPictureDelete>
                </div>
            </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}

export default FeedPictureInsert;