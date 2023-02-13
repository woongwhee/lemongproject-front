import React , {useState , useEffect} from "react";
import axios from "axios";

import './MyPage.css';

import { useLoginState } from "../Member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

function AcceptFollowCount(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    let {profile}=useLoginState();
    console.log(profile);
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    // 팔로우 당하는사람(팔로워)
    const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = params.get("userNo");

    const dispatch = useDispatch();

    const selectUserNo = e => {
        console.log(e + "[통과확인] === success"); // 값 뽑히는거 확인됨.
        dispatch(
            {type : 'SELECTUSERNO' , payload : {selectUserNo : e}} ,
        )
    };

    // 팔로우 신청 받은 유저 입장에서 팔로우 신청 수락 시 카운트 올라감.
    const [AcceptCount , setAcceptCount] = useState();

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    useEffect(
        () => {
            axios.get("/api/follow/AcceptFollowCount" , {
                params:{
                    followerIng : userNos,
                }
            }).then(function(res){
                console.log(res+"데이터 통과 성공");
                const data = res.data.result;
                console.log(data);
                setAcceptCount(data);
            }).catch(function(){
                console.log("데이터 통과 실패");
            })
        } , [userNos]
    )

    // 상대방 팔로잉 리스트 띄우기.
    const [AcceptfollowerList , setAcceptfollowerList] = useState();

    // 스프링에있는 폴더에서 이미지 불러오기위한 경로
    let saveFilePath = "http://localhost:8081/api/images/";

    function ShowAcceptFollower(){
        axios.get("/api/follow/selectAcceptFollowerList" , {
            params:{
                followerIng : userNos ,
            }
        }).then(function(res){
            console.log(res+"데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            setAcceptfollowerList(data);
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    useEffect(() => {
        ShowAcceptFollower();
        console.log(userNos + "===여기도 통과됨")
      },[userNos])

    let i = 0;

    return(
    //     <div className="followCount">
    //     <span style={{marginLeft:'150px'}}>팔로워 <p style={{marginLeft:'170px'}} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={ShowAcceptFollower}>{AcceptCount?.count}</p></span>
    //     <div className="App">
    //     <div class="container p-5">
        
    //      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //      <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
    //         <div class="modal-content" style={{width:'600px' , height:'800px' , borderRadius:'0'}}>
    //            <div class="modal-header">
    //                 <h5>MyFollowIng</h5>
    //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //            </div>
    //            <div class="modal-footer">
    //                 {AcceptfollowerList?.map(e => <div>
    //                     <img key={i++} {...e} src={saveFilePath+e?.photo?.changeName} style={{width:'70px' , height:'70px', borderRadius:'50%' , backgroundColor:'gray' }}></img> &nbsp; <span key={i++} {...e} style={{fontSize:'30px'}}>{e?.profile?.nickName}</span>
    //                     <button type="button" key={i++} {...e} class="btn btn-warning" style={{width:'120px' , fontSize:'23px' , float:'right' , marginTop:'13px' , marginLeft:'200px'}} 
    //                     onClick={() => {goUserPage(window.location.href = "http://localhost:3000/mypage?userNo="+e?.profile?.userNo)}}>방문하기</button>
    //                 </div>)}
    //            </div>                
    //         </div>
    //      </div>
    //      </div>
                
    //      </div>
    //     </div>
    // </div>
    <div className="followCount" style={{marginTop:'-54px'}}>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={ShowAcceptFollower} style={{fontSize:'27px' , marginLeft:'415px' , fontFamily:'Quicksand-Regular'}}><b>{AcceptCount?.count}</b></span>
            <div className="App">
            <div class="container p-5">
            
             <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'400px' , height:'700px' , borderRadius:'0'}}>
                   <div class="modal-header">
                   <h5 style={{fontFamily:'SourceSansPro-Light' , fontSize:'25px'}}><b>Follower</b></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="scrollBar" style={{overflow:'scroll' , height:'733px'}}>
                        {AcceptfollowerList?.map(e => <div style={{marginTop:'10px'}}>
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

export default AcceptFollowCount;