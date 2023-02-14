import React, {useEffect} from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";
import {CLEAR_MARK} from "../../ImagePath";

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo,content,clear,challengeList}=template;

    console.log(template)
    return (
        <>
            <StartSingleBtn templateNo={templateNo}/>
            <StartMultiBtn templateNo={templateNo}/>
            {clear&&<img className={"clear-img"} src={CLEAR_MARK} alt="templateClear"/>}
            <div className={"template-header"}>{title}</div>
            {templateNo}
            {title}
            {content}
            {clear&&<img src="/LemongImg/category/letter-v.png"/>}
        </>
    );
};

export default apiHoc(TemplateDetail);
