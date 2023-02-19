import React , {useState} from "react";
import axios from "axios";


import { CiLocationArrow1 } from "react-icons/ci";

import './MyPage.css';
import SearchUserList from "./SearchUserList";

function MySearch(props){

    let{myprofile}=props;

    // 유저 아이디(닉네임)검색 시 여기로 값이 들어옴.
    // 이 값들을 스프링으로 넘겨서 일치하는 값이 있을 시 일치하는 유저값 보여주기.
    const [selectUser , setSelectUser] = useState({
        searcValue : '' ,
    });

    const SearchValHandle = (event) => {

        const {name , value} = event.target;

        setSelectUser({
            ...selectUser ,
            [name]:value,
        });
    };

    // 컨트롤러에서 받아온 값들 저장
    const [userList , setUserList] = useState();

    function callback(data){
        setUserList(data);
    }

    // 검색 버튼 클릭 시 새로고침되서 현재 페이지로 되돌아오는 거 방지하는 함수.
    function handleSubmit(event) {
        event.preventDefault(); 
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
      }

    // 검색창에 입력한 닉네임에 해당하는 유저 띄워주기.
    const SerchUser = () => {
        if(selectUser.searcValue !== ""){
            axios.get("/api/member/searchUser" , {
                params:{
                    userNick : selectUser.searcValue ,
                }
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                callback(data);
                console.log(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            });
        } 
    
    }

    let i = 0;
    return(
        <div id="serchOuter" className="serchOuter" style={{width:'92%' , marginLeft:'0px' , height:'960px' , marginTop:'-16px' , position:'absolute' , overflow:'scroll'}}>
        {/* // <div className="outer_req1"> */}
            <form id="searchForm" name="searchForm" onSubmit={handleSubmit}> 
                <div className="outer_searchBtn">
                    <input type="search" name="searcValue" className="searchbar" placeholder="아이디를 입력해주세요." onChange={SearchValHandle}
                    id="searchbbbar"></input>
                        <button type="submit" className="searchbtn" class="btn btn-dark" onClick={SerchUser} style={{width:'75px' , fontSize:'17px' , marginLeft:'20px' , marginTop:'10px' , borderRadius:'0px'}}>검색</button>
                    <SearchUserList userList={userList}/>
                </div>
            </form>
        {/* // </div> */}
        </div>
    )
}

export default MySearch;