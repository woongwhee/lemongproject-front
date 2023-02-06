import React from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";

const TemplateDetail = (state) => {
    const template=state.result;
    return (
        <>{template.templateNo}</>
    );
};

export default apiHoc(TemplateDetail);
