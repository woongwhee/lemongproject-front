import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import './MyPage.css';

function MySearch(){

    // 유저 아이디(닉네임)검색 시 여기로 값이 들어옴.
    // 이 값들을 스프링으로 넘겨서 일치하는 값이 있을 시 일치하는 유저값 보여주기.
    const [selectUser , setSelectUser] = useState({
        
    });

    return(
        <div className="outer_req1">
            <form>
                <div className="outer_searchBtn">
                    <input type="search" className="searchbar" placeholder="아이디를 입력해주세요."></input>
                    <button type="submit" className="searchbtn">검색</button>
                </div>
            </form>
        </div>
    )
}

export default MySearch;