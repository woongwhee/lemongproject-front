import React , {useState , useEffect} from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './MyPage.css';

import { useLoginState } from "../Member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

function MyFollowCount(){

    // const queryString = window.location.search;
    // const params = new URLSearchParams(queryString);

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    let {profile}=useLoginState;
    console.log(profile);
    // console.log(userNo)
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    const dispatch = useDispatch();

    const selectUserNo = e => {
        console.log(e + "[통과확인] === success"); // 값 뽑히는거 확인됨.
        dispatch(
            {type : 'SELECTUSERNO' , payload : {selectUserNo : e}} ,
        )
    };

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    // 팔로우 당하는사람(팔로워)
    const follower = userNos;

    // 팔로우 하는사람(팔로잉)
    const followerIng = userNos;

    // (로그인을 한 유저)입장에서 다른 유저에게 팔로우를 신청할 경우
    // 상대방이 수락을 하던말던 나의 팔로워에 카운트가 올라가야함.
    const [myfollow , setMyFollow] = useState();
    
    console.log(userNos + "통과 제발 되라 제발요.")

    useEffect(
        () => {
            axios.get("/api/follow/MyFollowCount" , {
                params:{
                    followerIng : userNos != null ? userNos : userNo  ,
                }
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                console.log(data);
                console.log(userNos + "통 과 됨")
                setMyFollow(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            });
        },[userNos != null ? userNos : userNo]
    )

    // 나의 팔로워 리스트 띄우기.
    const [myfollowerList , setMyFollowerList] = useState();

    function ShowMyFollower(){
        axios.get("/api/follow/selectMyFollowerList" , {
            params:{
                followerIng : followerIng,
            }
        }).then(function(res){
            console.log(res+"데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            setMyFollowerList(data);
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }
   
    let i = 0;

    return(
        <div className="followCount" style={{marginTop:'-54px'}}>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={ShowMyFollower} style={{fontSize:'27px' , marginLeft:'415px' , fontFamily:'Quicksand-Regular'}}><b>{myfollow?.count}</b></span>
            <div className="App">
            <div class="container p-5">
            
             <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'400px' , height:'700px' , borderRadius:'0'}}>
                   <div class="modal-header">
                        <h5 style={{fontFamily:'SourceSansPro-Light' , fontSize:'25px'}}><b>MyFollower</b></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="scrollBar" style={{overflow:'scroll' , height:'733px'}}>
                        {myfollowerList?.map(e => <div style={{marginTop:'10px'}}>
                            <img key={i++} {...e} src={e?.photo?.filePath+e?.photo?.changeName} style={{width:'45px' , height:'45px', borderRadius:'50%' , backgroundColor:'gray' , marginLeft:'15px'}}></img> &nbsp; <span key={i++} {...e} style={{fontSize:'20px' , fontFamily:'NanumGothic-Regular'}}>{e?.profile?.nickName}</span>
                            <div style={{float:'right' , marginRight:'300px' , marginTop:'-45px'}}>
                                <button type="button" key={i++} {...e} class="btn btn-primary" style={{width:'88px' , fontSize:'15px' , float:'right' , marginLeft:'200px' , borderRadius:'100px' , position:'fixed'}} 
                                onClick={() => {selectUserNo(e?.profile?.userNo);}}>방문하기</button>
                                </div>
                        </div>)}  
                   </div>
                                 
                </div>
             </div>
             </div>
                    
             </div>
            </div>
        </div>
    );  

};

export default MyFollowCount;