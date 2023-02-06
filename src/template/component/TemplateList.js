import React from 'react';
import TemplateCard from "./TemplateCard";
import {CardGroup} from "reactstrap";
import WriteButton from "./WriteButton";
import CategoryButton from "./CategoryButton";
import apiHoc from "../../util/apiHoc";


const TemplateList = ({result}) => {
    let templateList=result;
    return (
        <div className="outer_Temp">
            <div className="template-list">
                {templateList.map(template => <TemplateCard key={template.templateNo} template={template}/>)}
            </div>
            <WriteButton/>
            <CategoryButton/>
        </div>
    );
};

export default apiHoc(TemplateList);
