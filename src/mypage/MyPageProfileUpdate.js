import React from 'react';
import axios from 'axios';


const ProfileUpdate = ({userNo})=> {


    // 업로드 한 후  변경된 파일들 저장하는 배열
    const fileList = []; 

    const onUpdateFiles = (e) => {
        const uploadUpFiles = Array.prototype.slice.call(e.target.files); // 파일 선택창에서 선택한 파일들
        uploadUpFiles.forEach((uploadUpFile) => {
            fileList.push(uploadUpFile);
        });
    };

    const onFileChangeUpload = () => {
        const formData = new FormData();

        fileList.forEach((file) => {
            // 파일 데이터 저장
            formData.append('file' , file);
            formData.append('userNo' , userNo);
            console.log(file + "정보들");
            console.log(formData + "정보들") 
        });

        axios.post('/api/member/updateUserProfile' ,
            formData , {headers: {
            "Content-Type": "multipart/form-data",
        }}).catch(function(error){
            console.log("실패");
            console.log(error);
            console.log(formData);
        });
    };

    return(
        <div>
            <input type="file" multiple /* 파일 여러개 선택 가능하게 하기 */ onChange={onUpdateFiles} />
            <button onClick={onFileChangeUpload}>프로필 변경</button>
        </div>
    )

}

export default ProfileUpdate;                                              