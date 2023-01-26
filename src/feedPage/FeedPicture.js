import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import './FeedPicture.css'
import FeedPictureDelete from "./FeedPictureDelete";

function FeedPicture(props) {
    const [photoList,setPhoto]=useState([]);

    const [ photoNo, SetPhotoNo] = useState();

    function callback(str) {
        SetPhotoNo(str);
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
                    putPhoto(response.data.result)
                    console.log(response.data.result.photoNo)
                    callback(response.data.result.photoNo);
                    e.target.value="";
                }
            }
        }catch (error){
            console.log(error);
        }
    }
    const putPhoto = (newPhoto) => {
        setPhoto([...photoList,newPhoto]);
    }
    let i =0;
    return (
        <>
            <table>
                <thead>
                <tr>
                <th>이미지 미리 보기</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            name="imgUpload"
                            type="file"
                            accept="image/*"
                            onChange={onChange}
                            multiple
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="imagePreview" >
                            {photoList?.map(photo => <img style={{width:"100px", height:"100px"}} src={photo?.filePath+photo.changeName} key={i++}/>)}
                        </div>
                        <div>
                            <FeedPictureDelete photoNo={photoNo}></FeedPictureDelete>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>



        </>
    );
}

export default FeedPicture;