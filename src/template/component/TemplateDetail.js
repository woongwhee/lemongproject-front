import React, {useEffect} from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";
import {CLEAR_MARK} from "../../util/ImagePath";
import ChallengeReadyCard from "../../challenge/component/ChallengeReadyCard";
import GoBackButton from "./GoBackButton";
import ReviewArea from "./ReviewArea";

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo,content,clear,challengeList,reviewList}=template;

    console.log(template)
    return (
        <div className="template-detail">
            <div className="detail-top">
            <GoBackButton/>
            <StartSingleBtn templateNo={templateNo}/>
            <StartMultiBtn templateNo={templateNo}/>
            </div>
            {clear&&<img className={"clear-img"} src={CLEAR_MARK} alt="templateClear"/>}
            <div className={"template-header"}>{title}</div>
            {title}
            {content}
            {clear&&<img src={CLEAR_MARK} alt="clear-mark"/> }
            <div className="challenge-list"><h3>모집중</h3>
                {challengeList.map(challenge=><ChallengeReadyCard challenge={challenge}/>)}
            </div>
            <ReviewArea reviewlist={reviewList} templateNo={templateNo}/>


        </div>
    );
};

export default apiHoc(TemplateDetail);
