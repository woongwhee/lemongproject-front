import * as React from 'react';
import axios from 'axios';
import ProfileUpdate from './MyPageProfileUpdate';

const ProFileData = (): JSX.Element => {
    const fileList: File[] = []; // 업로드한 파일들을 저장하는 배열

    const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

        uploadFiles.forEach((uploadFile) => {
            fileList.push(uploadFile);
        });
    };

    const onFileUpload = () => {
        const formData = new FormData();

        fileList.forEach((file) => {
            // 파일 데이터 저장
            formData.append('file', file);
            console.log(file); // 데이터 잘 들어감.
            console.log(formData);
        });


        axios.post('/api/member/insertUserProfile', formData , {headers: {
            "Content-Type": "multipart/form-data",
        }}).catch(function(error) {
            console.log("실패");
            console.log(error);
            console.log(formData); // formData형식으로 잘 들어간 것 확인.
          });
    };

    return (
        <div>
            <input type="file" multiple /* 파일 여러개 선택 가능하게 하기 */ onChange={onSaveFiles} />
            <button onClick={onFileUpload}>프로필 업로드</button>
            <ProfileUpdate/>
        </div>
    );
};

export default ProFileData;