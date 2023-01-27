import React, {useState} from 'react';
import axios from "axios";

function Test1(props) {

    const [photoList,setPhoto]=useState([]);

    const onChange = async (e) => {
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
                putPhoto(response.data.result);
                e.target.value="";
            }
        }
    }
    const putPhoto = (newPhoto) => {
        setPhoto([...photoList,newPhoto]);
    }


    return (
        <div>
            FileData
            <div>
                <input type='file'
                       accept="image/*"
                       name='profile_img'
                       onChange={onChange}>
                </input>
            </div>
            {photoList?.map(photo=><img style={{width:"100px", height:"100px"}} src={photo?.filePath+photo.changeName}/>)}
            <div>
                <button>Send</button>
            </div>
        </div>
    );
}


export default Test1;