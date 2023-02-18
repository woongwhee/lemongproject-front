import React, {useRef, useState} from 'react';
import {REVIEW_INSERT} from "../templateURI";
import {useLoginState} from "../../member/LoginContext";
import {reviewInsert, reviewList} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";

import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import '../../mypage/react-confirm-alert.css';

const ReviewArea = ({reviewlist,templateNo}) => {
    const [content, setContent] = useState("");
    const contentInput=useRef(null);

    const [reviews, setReviews] = useState(reviewlist);
    const myUserNo=useLoginState().profile.userNo;
    const onInputChange=(e)=>{
        const value=e.target.value;
        setContent(value);
    }
    const submitReview=async ()=>{
        if(isEmpty(content)){
            alert("내용을 입력해주세요")
            contentInput.current.focus();
           return
        }
        const result=await reviewInsert(templateNo,content);
        if(result>0){
            await refreshReview();
            contentInput.current.value="";
        }
    }
    const refreshReview=async ()=>{
        const newList=await reviewList(templateNo)
        setReviews(newList);
        confirmAlert({
            title: "Success",
            message: "등록이 완료되었습니다.",
            buttons: [
                {
                  label: "Yes"
                }
              ]
          })
    }
    const reviewDelete=async (reviewNo)=>{
        const result=await reviewDelete(reviewNo);
        if(result>0){
            refreshReview();
        }
    }

    // 댓글 등록 알람
    const submitInReply = () => {
        confirmAlert({
          title: "Reply Insert",
          message: "댓글을 등록하시겠습니까?",
          buttons: [
            {
              label: "Yes",
              onClick: () => submitReview()
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            }
          ]
        });
      }
    return (
        <div className="review area" style={{marginTop:'-25px'}}>
            <p style={{fontFamily:'NanumGothic-Regular' , marginLeft:'240px' , mrginTop:'-25px'}}><b>Reply&nbsp;{"("+reviews.length+")"}</b></p>
            <div className='outer_dat' style={{width:'66%' , marginTop:'-8px' , marginLeft:'200px' , height:'227px' , overflow:'scroll'}}>
                {reviews.map(review=>{
                    return <div style={{marginTop:'7px'}}><img src={review?.userProfile?.photo?.filePath+review?.userProfile?.photo?.changeName} style={{width:'30px' , height:'30px' , borderRadius:'50%'}}/>&nbsp;<span style={{fontFamily:'NanumGothic-Regular'}}>{review?.userProfile?.nickName}</span> - 
                        &nbsp;&nbsp;<span style={{fontFamily:'NanumGothic-Regular'}}><b>{review.reviewDetail}</b></span>
                    </div>
                })} 
            </div>  
            <div className="review-input" style={{marginTop:'45px' , position:'relative'}}>
                <input className="form-control" style={{borderRadius:'0px' , width:'72%' , marginLeft:'200px' , marginTop:'-42px' , height:'30px'}} onChange={onInputChange} ref={contentInput} placeholder="🖉 댓글을 입력해주세요."></input>
                <button class="btn btn-dark" style={{borderRadius:'0px' , height:'30px' , marginLeft:'1150px' , marginTop:'-57px'}} onClick={submitInReply}>작성</button>
            </div>
        </div>
    );
};

export default ReviewArea;
