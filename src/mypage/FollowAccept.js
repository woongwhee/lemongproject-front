import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import { CiCircleCheck } from "react-icons/ci";

import './MyPage.css';
import moment from 'moment';
import 'moment/locale/ko';

function FollowAccept(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 나한테 온 팔로우신청 목록들.
    const [followerList , setFollowerList] = useState();

    // 팔로우 당하는사람(팔로워)
    const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    function callback(data){
        setFollowerList(data);
    }

    let saveFilePath = "http://localhost:8081/api/images/";

    // 검색 버튼 클릭 시 새로고침되서 현재 페이지로 되돌아오는 거 방지하는 함수.
    function handleSubmit(event) {
        event.preventDefault(); 
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
    }

    // 나한테 팔로우 신청을 건 사용자들 목록띄우기
    useEffect(
        () => {
            axios.get("/api/follow/MyfollowerList" , {
                params:{follower : follower}
            }).then(function(res){
                console.log("데이터 전송 성공");
                console.log(res.data.result);

                const data = res.data.result;
                callback(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        },[]
    )

    // 팔로우 신청이 한명한테만 오는게 아니기 때문에 setfollowOk()에 값을 바꿔서 넣어주면서 그 닉네임에 해당하는 userNo select해서 update하기.
    const [followOk , setfollowOk] = useState({
        followNick : '' ,  
    })

    const followNickHandle = (event) => {

        const {name , value} = event.target;

        setfollowOk({
            ...followOk ,
            [name]:value,
        });
    };

    // 팔로우 신청 수락 => ACCEPT(기본값 'N')을 'Y'로 변경하여 수락.
    function followOkHandle(){
        axios.get("/api/follow/followOk" , {
            params:{
                followerIng: followerIng ,
                follower : follower,
            }
        }).then(function(res){
            console.log(res+"데이터 전송 성공");
            alert("팔로우 신청을 수락하였습니다.")
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    let i = 0;
    return(
        <div className="followAcceptList" style={{position:'absolute'}}>
            <br></br>
            <form onSubmit={handleSubmit}>
                {followerList?.map(e => <div className="sUserList">
                    <img key={i++} {...e} src={saveFilePath+e?.photo?.changeName} style={{width:'50px' , height:'50px', borderRadius:'50%' , backgroundColor:'gray' , float:'left' , marginTop:'10px'}}></img> <span name="followNick" key={i++} {...e} onChange={followNickHandle}><b>{e?.profile?.nickName}</b></span>
                    님이 팔로우를 신청하였습니다.
                    <p key={i++} {...e} style={{float:'left' , marginTop:'-17px' , marginLeft:'150px' , position:'fixed'}}><b>{moment(e?.followAt).format('YYYY-MM-DD')}</b></p>
                    <CiCircleCheck type="submit" onClick={followOkHandle} style={{fontSize:'35px' , marginLeft:'10px' , marginTop:'17px'}}>o</CiCircleCheck>
                </div>)}
            </form>
        </div>
    );
};

export default FollowAccept;