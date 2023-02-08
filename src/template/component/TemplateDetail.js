import React, {useEffect} from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo,content,clear}=template;

    console.log(template)
    return (
        <>
            <StartSingleBtn templateNo={templateNo}/>
            <StartMultiBtn templateNo={templateNo}/>
            {templateNo}
            {title}
            {content}
            {clear&&<img src="/LemongImg/category/letter-v.png"/>}
        </>
    );
};

export default apiHoc(TemplateDetail);
