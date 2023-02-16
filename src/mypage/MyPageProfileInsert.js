import * as React from 'react';
import axios from 'axios';
import ProfileUpdate from './MyPageProfileUpdate';

import { confirmAlert } from "react-confirm-alert";
import './react-confirm-alert.css';

import './MyPageUpdate.css';
import { width } from 'dom7';

import { TiTick } from "react-icons/ti";

import { useLoginState } from "../Member/LoginContext"; 
import {useDispatch, useSelector} from 'react-redux';

const ProFileData = (props): JSX.Element => {

    // let{userNo}=props;

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    let {profile}=useLoginState();
    console.log(profile);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userNo = params.get("userNo"); // 로그인한 사용자 userNo

    // const userNos = profile?.userNo; // 로그인한 사용자 userNo

    const fileList: File[] = []; // 업로드한 파일들을 저장하는 배열

    const onSaveFiles = (e) => {
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
            formData.append('userNo' , userNo);
            console.log(file); // 데이터 잘 들어감.
            console.log(formData);
        });


        axios.post('/api/member/insertUserProfile', 
            formData, {headers: {
            "Content-Type": "multipart/form-data",
        }}).then(function(){
            confirmAlert({
                title: "Success",
                message: "변경이 완료되었습니다.",
                buttons: [
                  {
                    label: "Yes" ,
                    onClick: () =>  window.location.href = "http://localhost:3000/MyPageUpdate?userNo="+userNo
                  }
                ]
              })
        }).catch(function(error) {
            console.log("실패");
            console.log(error);
            console.log(formData); // formData형식으로 잘 들어간 것 확인.
            confirmAlert({
                title: "Fail",
                message: "변경에 실패하였습니다.",
                buttons: [
                  {
                    label: "Yes" ,
                    onClick: () =>  window.location.href = "http://localhost:3000/MyPageUpdate?userNo="+userNo
                  }
                ]
              })
          });
    };

    // 프로필 insert 알람
    const submitUpProfile = () => {
        confirmAlert({
          title: "Profile Update",
          message: "프로필을 변경하시겠습니까?",
          buttons: [
            {
              label: "Yes",
              onClick: () => onFileUpload()
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            }
          ]
        });
      }


    return (
        <div>
            <input name="proFile" id="proFile" type="file" multiple /* 파일 여러개 선택 가능하게 하기 */ onChange={onSaveFiles} />
            <div id="my_ProfileImg" type="button" style={{marginTop:'-230px' , marginLeft:'100px'}}>
                <label for="proFile" id="proHover" style={{border:'none' , width:'200px' , height:'200px' , borderRadius:'50%'}}>
                    
                </label>
            </div>
            <TiTick id="pbtn" type='button'onClick={submitUpProfile} style={{marginLeft:'275px' , marginTop:'-80px' , fontSize:'35px'}}>프로필 업로드</TiTick>
            {/* <ProfileUpdate userNo={userNo}/> */}
        </div>
    );
};

export default ProFileData;