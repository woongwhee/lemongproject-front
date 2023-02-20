import React, {useState, useEffect} from "react";
import {Component} from "react";
import axios from "axios";

import {CiCircleCheck} from "react-icons/ci";
import {useLoginState} from "../member/LoginContext"
import './MyPage.css';
import moment from 'moment';
import 'moment/locale/ko';
import {useSelector} from "react-redux";

function FollowAccept() {
    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");
    let {profile} = useLoginState();
    console.log(profile);
    const userNo = useSelector(state => state.menu.userNo); // 로그인한 사용자 userNoㄷ
    const myNo = profile?.userNo
    // 나한테 온 팔로우신청 목록들.
    const [followerList, setFollowerList] = useState([]);
    // 팔로우 당하는사람(팔로워)

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    function callback(data) {
        setFollowerList(data);
    }


    // 검색 버튼 클릭 시 새로고침되서 현재 페이지로 되돌아오는 거 방지하는 함수.
    function handleSubmit(event) {
        event.preventDefault();
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
    }

    // 나한테 팔로우 신청을 건 사용자들 목록띄우기
    useEffect(
        () => {
            axios.get("/api/follow/MyfollowerList", {
                params: {follower: myNo}
            }).then(function (res) {
                console.log("데이터 전송 성공");
                console.log(res.data.result);
                const data = res.data.result;
                callback(data);
            }).catch(function () {
                console.log("데이터 전송 실패");
            })
        }, []
    )

    // 팔로우 신청이 한명한테만 오는게 아니기 때문에 setfollowOk()에 값을 바꿔서 넣어주면서 그 닉네임에 해당하는 userNo select해서 update하기.
    const [followOk, setfollowOk] = useState({
        followNick: '',
    })

    const followNickHandle = (event) => {

        const {name, value} = event.target;

        setfollowOk({
            ...followOk,
            [name]: value,
        });
    };

    // 팔로우 신청 수락 => ACCEPT(기본값 'N')을 'Y'로 변경하여 수락.
    function followOkHandle(follower) {
        axios.get("/api/follow/followOk", {
            params: {
                followerIng: myNo,
                follower: follower
            }
        }).then(function (res) {
            console.log(res + "데이터 전송 성공");
            alert("팔로우 신청을 수락하였습니다.")
            setFollowerList(e=>e.filter(e.userNo!=follower))

        }).catch(function () {
            console.log("데이터 전송 실패");
        })
    }

    return (
        <div className="followAcceptList" style={{position: 'absolute'}}>
            <br></br>
            <form onSubmit={handleSubmit}>
                {followerList?.map((e,i) => <div className="sUserList" key={i}>
                    <img  src={e?.photo?.filePath + e?.photo?.changeName} style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'gray',
                        float: 'left',
                        marginTop: '15px',
                        marginLeft: '7px'
                    }}></img> <span name="followNick"
                                    style={{float: 'left', marginTop: '10px', marginLeft: '10px', fontSize: '14px'}}
                     onChange={followNickHandle}><b>[{e?.profile?.nickName}]</b></span>
                    <p style={{float: 'left', fontSize: '13px', marginTop: '30px', marginLeft: '-80px'}}>님이 팔로우를
                        신청하였습니다.</p>
                    <p   style={{
                        float: 'left',
                        marginTop: '45px',
                        marginLeft: '58px',
                        position: 'fixed',
                        fontSize: '13px'
                    }}><b>{moment(e?.followAt).format('YYYY-MM-DD')}</b></p>
                    <CiCircleCheck type="submit" onClick={() => {
                        followOkHandle(e.userNo)
                    }} style={{fontSize: '35px', marginLeft: '10px', marginTop: '17px'}}>o</CiCircleCheck>
                </div>)}
            </form>
        </div>
    );
};

export default FollowAccept;