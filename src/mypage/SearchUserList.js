import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import './MyPage.css';

function SearchUserList(props){

    let{userList}=props;

    let userNo = userList?.photo?.userNo;
  
    let i = 0;

    let saveFilePath = "http://localhost:8081/api/images/";

    function MoveUserPage(){
        console.log("이동 성공");
        console.log(userList);
    }
    
    // div 클릭시 userNo에 해당하는 마이페이지로 이동하기.

    return(
        <div className="searchUserList">
           {userList?.map(e =><div className="sUserList">
                <img key={i++} {...e} src={saveFilePath+e?.photo?.changeName} style={{width:'70px' , height:'70px', borderRadius:'50%' , backgroundColor:'gray'}}
                onClick={() => {MoveUserPage(window.location.href = "http://localhost:3000/mypage?userNo="+e?.userNo)}}></img> <span key={i++} {...e}>{e?.nickName}</span>
                <p key={i++} {...e}>{e?.profileComment}</p>
           </div>)}
        </div>
    );
};

export default SearchUserList;
