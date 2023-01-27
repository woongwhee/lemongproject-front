import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'
import FeedPictureDelete from "./FeedPictureDelete";

function FeedPictureInsert({getPhotoNo}) {
    const [photoList,setPhotoList]=useState([]);

    const [ photoNo, SetPhotoNo] = useState();

    const putPhoto = (newPhoto) => {
        setPhotoList([...photoList,newPhoto]);
    }
    function callback(str) { // 사진 지우기 photoNo
        SetPhotoNo(str);
    }

    const [photoNoList, setPhotoNoList] = useState([]);

    const putPhotoNo = (PhotoNo) => {
        setPhotoNoList([...photoNoList,PhotoNo]);
    }
    

    const onChange = async (e) => {
        try{
            e.preventDefault();
            if(e.target.files){
                const uploadFile = e.target.files[0]
                const formData = new FormData()
                formData.append('files',uploadFile)

                const response = await axios({
                    method: 'post',
                    url: '/api/feed/feedPhoto',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if(response.data.code==='2000'){
                    putPhoto(response.data.result) // photoPath 미리보기 데이터
                    console.log(response.data.result.photoNo)
                    callback(response.data.result.photoNo); // photoNo만
                    putPhotoNo(response.data.result.photoNo) // photoNo List 시키기
                    e.target.value="";
                }
            }
        }catch (error){
            console.log(error);
        }
    }

    const [deleteSuccess, setDeleteSuccess] = useState(0)

    if(deleteSuccess ==='success'){
        photoList.pop();
        photoNoList.pop();
    }

    const getData = (Java) => {
        setDeleteSuccess(Java); // 'success'을 가져옴
    }

    getPhotoNo(photoNoList); // FeedInsert한태 PhotoNO List 보내기


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
                        <input type="file" accept="image/*" onChange={onChange} multiple/>

                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="imagePreview" >
                            {
                                photoList?.map(photo =>
                                    <img style={{width:"100px", height:"100px"}} src={photo?.filePath+photo.changeName} key={i++}/>
                                )
                            }
                            <FeedPictureDelete photoNo={photoNo} getData={getData}></FeedPictureDelete>

                        </div>
                        <div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>



        </>
    );
}

export default FeedPictureInsert;