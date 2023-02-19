import React, {useRef, useState} from 'react';
import {REVIEW_INSERT} from "../templateURI";
import {useLoginState} from "../../member/LoginContext";
import {reviewInsert, reviewList} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";

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
    }
    const reviewDelete=async (reviewNo)=>{
        const result=await reviewDelete(reviewNo);
        if(result>0){
            refreshReview();
        }
    }
    return (
        <div className="review area">
            <div className="review-input">
                <input onChange={onInputChange} ref={contentInput}></input>
                <button onClick={submitReview}> </button>
            </div>
            {reviews.map(review=>{
                return <h1>{review.reviewDetail}</h1>
            })}
        </div>
    );
};

export default ReviewArea;
