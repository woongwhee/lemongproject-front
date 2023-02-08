import React from 'react';
import {useAsync} from "react-async-hook";
import {loadUnSave, templateList} from "../templateApi";
import TemplateWrite from "../component/TemplateWrite";

const TemplateWriteView = () => {
    const state = useAsync(loadUnSave);
    return (
        <TemplateWrite state={state}></TemplateWrite>
    );
};

export default TemplateWriteView;
