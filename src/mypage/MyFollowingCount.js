import React , {useState , useEffect} from "react";
import axios from "axios";

import './MyPage.css';

function MyFollowingCount(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = sessionStorage.getItem("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    // 스프링에있는 폴더에서 이미지 불러오기위한 경로
    let saveFilePath = "http://localhost:8081/api/images/";

    // 팔로우 신청을 받은 사용자 입장에서 
    // 나의 팔로우 수락여부에 상관없이 팔로잉이 플러스되어야함.
    const [MyFollowingCount , setMyFollowingCount] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/MyFollowingCount" , {
                params : {
                    follower : follower , 
                }
            }).then(function(res){
                console.log(res+"데이터 전송 성공");
                const data = res.data.result;
                setMyFollowingCount(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        } , []
    )

    // 나의 팔로워 리스트 띄우기.
    const [myfollowingList , setMyFollowingList] = useState();

    function ShowMyFollowing(){
        axios.get("/api/follow/selectMyFollowingList" , {
            params:{
                follower : follower,
            }
        }).then(function(res){
            console.log(res+"데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            setMyFollowingList(data);
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
            <span data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={ShowMyFollowing}><p style={{fontSize:'27px' , marginLeft : '255px' , marginTop:'-137px' , fontFamily:'Quicksand-Regular'}}><b>{MyFollowingCount?.count}</b></p></span>
            <div className="App">
            <div class="container p-5">
            
             <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'400px' , height:'700px' , borderRadius:'0'}}>
                   <div class="modal-header">
                   <h5 style={{fontFamily:'SourceSansPro-Light' , fontSize:'25px'}}><b>MyFollowing</b></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="scrollBar" style={{overflow:'scroll' , height:'733px'}}>
                        {myfollowingList?.map(e => <div style={{marginTop:'10px'}}>
                            <img key={i++} {...e} src={e?.photo?.filePath+e?.photo?.changeName} style={{width:'45px' , height:'45px', borderRadius:'50%' , backgroundColor:'gray' , marginLeft:'15px'}}></img> &nbsp; <span key={i++} {...e} style={{fontSize:'20px' , fontFamily:'NanumGothic-Regular'}}>{e?.profile?.nickName}</span>
                            <div style={{float:'right' , marginRight:'300px' , marginTop:'-45px'}}>
                                <button type="button" key={i++} {...e} class="btn btn-primary" style={{width:'88px' , fontSize:'15px' , float:'right' , marginLeft:'200px' , borderRadius:'100px' , position:'fixed'}} 
                                onClick={() => {goUserPage(window.location.href = "http://localhost:3000/mypage?userNo="+e?.profile?.userNo)}}>방문하기</button>
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

export default MyFollowingCount;