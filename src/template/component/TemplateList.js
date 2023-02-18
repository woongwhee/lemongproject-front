import React, {useCallback, useEffect, useRef, useState} from 'react';
import TemplateCard from "./TemplateCard";
import {CardGroup} from "reactstrap";
import WriteButton from "./WriteButton";
import CategoryButton from "./CategoryButton";
import apiHoc from "../../util/apiHoc";
import {useTemplateState} from "../TemplateContext";
import {templateList, templateMaxPage} from "../templateApi";

import '../../mypage/font/font.css';

const TemplateList = ({result}) => {

    const [templates, setTemplates] = useState(result);
    const isLanding = useRef(false);
    const {categoryNo} = useTemplateState();
    const [page, setPage] = useState(0);
    const maxPage = useRef(-1);
    const target = useRef(null);
    const loadPage = async () => {
        if (isLanding.current == true) {
            return;
        }
        isLanding.current = true;
        if (maxPage.current == -1) {
            maxPage.current = await templateMaxPage(categoryNo);
        }
        let result = await templateList(page, categoryNo);
        let newList = [...templates, ...result];
        setTemplates(newList);
        isLanding.current = false;
    };

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            if (maxPage.current <= page && maxPage.current != -1) {
                return;
            }
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (target.current) observer.observe(target.current);
    }, [handleObserver]);
    useEffect(() => {
        loadPage();
    }, [page])

    return (
        <div className="outer_Temp">
            <div id="template-list">
                {templates.map((template, index) => <TemplateCard template={template} key={index}/>)}
                <div ref={target} className={"target"} style={{color: "red", height: "10px"}}></div>
            </div>
            <WriteButton/>
            <CategoryButton/>
        </div>
    );
};

export default apiHoc(TemplateList);
