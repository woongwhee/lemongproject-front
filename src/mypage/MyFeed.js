// import React , {useState , useEffect} from "react";
// import { Component } from "react";
// import axios from "axios";
//
// import './MyPage.css';
//
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
//
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";a
// import "slick-carousel/slick/slick-theme.css";
// import styled, { css } from 'styled-components'
//
// import { useLoginState } from "../member/LoginContext";
// import { autoBatchEnhancer } from "@reduxjs/toolkit";
// import {useDispatch, useSelector} from 'react-redux';
//
// const StyledSlider = styled(Slider)`
//   height: 65%;
//   width: 70%;
//   position: relative;
//   .slick-prev::before,
//   .slick-next::before {
//     opacity: 0;
//     display: none;
//   }`;
//
// const Pre = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   left: 3%;
//   z-index: 3;
// `;
//
// const NextTo = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   right: 3%;
//   z-index: 3;
// `;
//
// function MyFeed(){
//
//     // userNo에 해당하는 feed값 db에서 가져오기
//     const [myFeedList , setMyFeedList] = useState();
//
//     const [myfeedImg , setMyFeedImg] = useState();
//


// const userNos = useSelector((state) => state.userNo.selectUserNo);
//
//     let {profile}=useLoginState();
//     console.log(profile);
//     const userNo = profile?.userNo; // 로그인한 사용자 userNo
//
//     useEffect(
//         () => {
//             axios.get("api/feed/selectMyFeedList" , {
//                 params:{
//                     userNo : userNos != null ? userNos : userNo,
//                 }
//             }).then(function(res){
//                 console.log(res + " : Myfeed 정보들 통과됨");
//                 const data = res.data.result;
//                 console.log(data);
//                 setMyFeedList(data);
//             }).catch(function(){
//                 console.log("데이터 전송 실패")
//             })
//         } , [userNos != null ? userNos : userNo]
//     )
//
//     let i = 0;
//
//     function searchImg(e){
//
//     console.log(e + "정보 확인"); // 피드 대표 이미지 클릭 시 그 이미지의 NO에 포함되는 이미지 경로 가져오는 것 확인.
//
//     axios.get("api/feed/searchImg" , {
//         params:{
//             feedNo : e ,
//         }
//     }).then(function(res){
//         console.log(res + "정보확인");
//         console.log(res.data.result);
//         const data = res.data.result;
//         setMyFeedImg(data);
//         console.log("데이터 전송 성공");
//     }).catch(function(){
//         console.log("데이터 전송 실패");
//     })
//
//  }
//
//  const settings = {
//     dots: true,
//     fade: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//
//
//     return(
//         <div className="outer_Feed" style={{overflow:'scroll'}}>
//             {myFeedList?.map(e => <div className="outer_feedThum" data-bs-toggle="modal" data-bs-target="#exampleModal3">
//                 <img key={i++} {...e} src={e?.photo?.filePath.split(",")[0]} style={{width:'226px' , height:'210px'}} onClick={() => {searchImg(e?.feedNo);}}></img>
//             </div>)}
//             <div className="App">
//             <div class="containers p-5">
//
//              <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//              <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
//                 <div class="modal-content" style={{width:'1500px' , height:'800px' , borderRadius:'0' , marginLeft:'-150px'}}>
//                    <div class="modal-header">
//                    <h5 style={{fontFamily:'SourceSansPro-Light' , fontSize:'25px'}}><b>MyFeed</b></h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                    </div>
//                    <div className="scrollBar" style={{overflow:'scroll' , height:'733px'}}>
//                         <div className="outer_sub">
//                             {/* 피드 이미지 */}
//                             <StyledSlider {...settings}>
//                             {myfeedImg?.map(e =>
//                             <div className="outer_feedImg">
//                                 <img key={i++} {...e} src={e?.photo?.filePath+e?.photo?.changeName} style={{width:'100%' , height:'650px'}}></img>
//                             </div>)}
//                             </StyledSlider>
//                             {/* 피드 날짜 */}
//                            <div style={{border:'1px solid red' , width:'70%' , float:'left'}}>
//                                 <p>피드 날짜 / 좋아요 들어갈 공간</p>
//                            </div>
//                            {/* 피드 내용 */}
//                            <div style={{border:'1px solid green' , width:'30%' , height:'200px' , float:'right' , marginTop:'-653px'}}>
//                                 <p>피드 내용 들어갈 공간</p>
//                            </div>
//                            {/* 댓글  */}
//                            <div style={{border:'1px solid pink' , width:'30%' , height:'496px' , float:'right' , marginTop:'-453px'}}>
//                                 <p>댓글관련 들어갈 공간</p>
//                            </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             </div>
//                 </div>
//          </div>
//     </div>
//
//     )
//
// };
//
// export default MyFeed;
//


import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLoginState} from "../member/LoginContext";
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import FeedDetailView from "../feed/FeedDetailView";

function MyFeed(props) {

    const [myFeedList , setMyFeedList] = useState([]);
    const [show, setShow] = useState(false);

    const userNos = useSelector((state) => state.menu.userNo);

    const [currentFeed,setCurrentFeed]=useState({});

    let {profile}=useLoginState();
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    useEffect(
        () => {
            axios.get("api/feed/selectMyFeedList" , {
                params:{
                    userNo : userNos != null ? userNos : userNo,
                }
            }).then(function(res){
                setMyFeedList(parseFeedList(res.data.result));
            }).catch(function(){
                console.log("데이터 전송 실패")
            })
        } , [userNos != null ? userNos : userNo]
    )
    const parseFeedList=(result)=>{
        return result.map(e=>{
            e.filePathList=e.filePath.split(",");
            e.photoNoList=e.photoNo.split(",")
            return e;
        })

    }
    console.log(currentFeed)

    const openFeed=(feed)=>{
        setCurrentFeed(feed);
        setShow(true);
    }
    return (
        <>
            {myFeedList.map(Feed=>
                <div style={{border:"3px solid black", float:"left"}}>
                    <img src={Feed.filePathList[0]} style={{width:"240px", height:"240px"}} onClick={() => {openFeed(Feed)}}/>
                </div>
            )}
        {/*</div>*/}
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    디테일
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<FeedReplyInsert feedNo={feedNo}/>*/}
                <FeedDetailView Feed={currentFeed}></FeedDetailView>
            </Modal.Body>
        </Modal>
    </>
    );
}

export default MyFeed;