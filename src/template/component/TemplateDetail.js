import React, {useEffect} from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";
import {CLEAR_MARK} from "../../ImagePath";
import ChallengeReadyCard from "../../challenge/component/ChallengeReadyCard";
import GoBackButton from "./GoBackButton";

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo,content,clear,challengeList}=template;

    console.log(template)
    return (
        <>
            <GoBackButton/>
            <StartSingleBtn templateNo={templateNo}/>
            <StartMultiBtn templateNo={templateNo}/>
            {clear&&<img className={"clear-img"} src={CLEAR_MARK} alt="templateClear"/>}
            <div className={"template-header"}>{title}</div>
            {title}
            {content}
            {clear&&<img src="/LemongImg/category/letter-v.png"/>}
            <div className="challenge-list"><h3>모집중</h3>
                {challengeList.map(challenge=><ChallengeReadyCard challenge={challenge}/>)}

            </div>

        </>
    );
};

export default apiHoc(TemplateDetail);
