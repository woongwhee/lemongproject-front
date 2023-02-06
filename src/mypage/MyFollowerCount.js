import React , {useState , useEffect} from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


function MyFollowCount(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = sessionStorage.getItem("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    // 스프링에있는 폴더에서 이미지 불러오기위한 경로
    let saveFilePath = "http://localhost:8081/api/images/";

    // (로그인을 한 유저)입장에서 다른 유저에게 팔로우를 신청할 경우
    // 상대방이 수락을 하던말던 나의 팔로워에 카운트가 올라가야함.
    const [myfollow , setMyFollow] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/MyFollowCount" , {
                params:{
                    followerIng : followerIng ,
                }
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                console.log(data);
                setMyFollow(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            });
        },[]
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

    function goUserPage(){
        console.log("이동 성공");
    }
   
    let i = 0;

    return(
        <div className="followCount" style={{marginTop:'-54px'}}>
            <span data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={ShowMyFollower} style={{fontSize:'27px' , marginLeft:'415px' , fontFamily:'Quicksand-Regular'}}><b>{myfollow?.count}</b></span>
            <div className="App">
            <div class="container p-5">
            
             <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'600px' , height:'800px' , borderRadius:'0'}}>
                   <div class="modal-header">
                        <h5>MyFollower</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-footer">
                        {myfollowerList?.map(e => <div>
                            <img key={i++} {...e} src={saveFilePath+e?.photo?.changeName} style={{width:'70px' , height:'70px', borderRadius:'50%' , backgroundColor:'gray' }}></img> &nbsp; <span key={i++} {...e} style={{fontSize:'30px'}}>{e?.profile?.nickName}</span>
                            <button type="button" key={i++} {...e} class="btn btn-warning" style={{width:'120px' , fontSize:'23px' , float:'right' , marginTop:'13px' , marginLeft:'200px'}} 
                            onClick={() => {goUserPage(window.location.href = "http://localhost:3000/mypage?userNo="+e?.profile?.userNo)}}>방문하기</button>
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