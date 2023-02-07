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
        <div className="sListOuter">
            <br/>
           {userList?.map(e =><div className="sUserList" onClick={() => {MoveUserPage(window.location.href = "http://localhost:3000/mypage?userNo="+e?.userNo)}}>
                <img key={i++} {...e} src={e?.photo?.filePath+e?.photo?.changeName} style={{width:'50px' , height:'50px', borderRadius:'50%' , backgroundColor:'gray' , float:'left' , marginTop:'10px'}}
                ></img> <span key={i++} {...e} style={{float:'left' , marginTop:'13px' , marginLeft:'10px'}}>{e?.nickName}</span>
                <p key={i++} {...e} style={{fontSize:'13px' , marginTop:'37px' , marginRight:'65px' , float:'left' , position:'fixed' , marginLeft:'61px'}}>{e?.profileComment}</p>
           </div>)}
        </div>
    );
};

export default SearchUserList;
