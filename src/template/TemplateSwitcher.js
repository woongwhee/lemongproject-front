import React, {useEffect} from 'react';
import {TemplateProvider, useTemplateState} from "./TemplateContext";
import TemplateListView from "./page/TemplateListView";
import TemplateDetailView from "./page/TemplateDetailView";
import TemplateWriteView from "./page/TemplateWriteView";

const TemplateSwitcher = () => {

    const state = useTemplateState();
    const switching = (state) => {
        switch (state.index) {
            case 0:
                return <TemplateListView/>;
            case 1:
                return <TemplateDetailView/>;
            case 2:
                return <TemplateWriteView/>;
            default:
                return <TemplateListView/>;
        }
    }
    return (
        <>
            {
                switching(state)
            }
        </>)

};

export default TemplateSwitcher;
