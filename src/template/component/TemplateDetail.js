import React from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo}=template;


    console.log(template)
    return (
        <>
            <StartSingleBtn templateNo={templateNo}/>
            <StartMultiBtn templateNo={templateNo}/>
            {template.templateNo}
        </>
    );
};

export default apiHoc(TemplateDetail);
