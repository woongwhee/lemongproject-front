import React from 'react';
import {useAsync} from "react-async-hook";
import {templateDetail} from "../templateApi";
import Loading from "../component/Loading";
import {CardGroup} from "reactstrap";
import TemplateDetail from "../component/TemplateDetail";
import {useTemplateState} from "../TemplateContext";
import {Async} from "../../util/apiUtil";

const TemplateDetailView = () => {
    const {templateNo}=useTemplateState();
    const state = useAsync(templateDetail, [templateNo]);
    return (
            <TemplateDetail state={state}></TemplateDetail>
    );

};
export default TemplateDetailView;
