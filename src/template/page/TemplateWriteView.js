import React from 'react';
import {useAsync} from "react-async-hook";
import {loadUnSave, templateList} from "../templateApi";

const TemplateWriteView = () => {
    const state = useAsync(loadUnSave);
    return (
        <div>
            <h1>하이하이</h1>
        </div>
    );
};

export default TemplateWriteView;
