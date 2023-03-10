import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import {useDispatch, useSelector} from 'react-redux';

import './MyPage.css';
import {MENU_PROFILE} from "../reducer/menu";

function SearchUserList(props){

    let{userList}=props;
    let userNo = userList?.photo?.userNo;
    const userNos = useSelector((state) => state.menu.userNo);
    let i = 0;

    let saveFilePath = "http://localhost:8081/api/images/";

    // function MoveUserPage(){
    //     console.log("이동 성공");
    //     console.log(userList);
    // }

    // 프로필 클릭 시 해당하는 userNo 뽑아오기.
    const dispatch = useDispatch();

    const MoveUserPage = e => {
        console.log(e + "[통과확인] === success"); // 값 뽑히는거 확인됨.
        dispatch(
            {type : MENU_PROFILE ,userNo:e} ,
        )
    };
    
    // div 클릭시 userNo에 해당하는 마이페이지로 이동하기.

    return(
        <div className="sListOuter">
            <br/>
           {userList?.map(e =><div className="sUserList" onClick={() => {MoveUserPage((e?.userNo))}}>
                <img key={i++} {...e} src={e?.photo?.filePath+e?.photo?.changeName} style={{width:'40px' , height:'40px', borderRadius:'50%' , backgroundColor:'gray' , float:'left' , marginTop:'15px' , marginLeft:'7px'}}
                ></img> <span key={i++} {...e} style={{float:'left' , marginTop:'13px' , marginLeft:'10px' , fontSize:'14px'}}>[{e?.nickName}]</span>
                <p key={i++} {...e} style={{fontSize:'13px' , marginTop:'37px' , marginRight:'67px' , float:'left' , position:'fixed' , marginLeft:'57px'}}>{e?.profileComment}</p>
           </div>)}
        </div>
    );
};

export default SearchUserList;
