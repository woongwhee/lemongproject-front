import React, {useCallback, useEffect, useRef, useState} from 'react';
import TemplateCard from "./TemplateCard";
import {CardGroup} from "reactstrap";
import WriteButton from "./WriteButton";
import CategoryButton from "./CategoryButton";
import apiHoc from "../../util/apiHoc";
import {useTemplateState} from "../TemplateContext";
import {templateList, templateMaxPage} from "../templateApi";


const TemplateList = ({result}) => {

    const [templates, setTemplates] = useState(result);
    const isLanding = useRef(false);
    const {categoryNo} = useTemplateState();
    const [page, setPage] = useState(0);
    const maxPage = useRef(-1);
    const target = useRef(null);
    const options = {
        threshold: 1.0,
    };
    const loadPage = async () => {
        console.log(isLanding.current, "???")
        if (isLanding.current == true) return;
        isLanding.current = true;
        if (maxPage.current == -1) {
            maxPage.current = await templateMaxPage(categoryNo);
        }
        let result = await templateList(page, categoryNo);
        let newList = [...templates, ...result];
        setTemplates(newList);
        isLanding.current = false;
    };
    const observer = new IntersectionObserver(loadPage, options);

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
                {templates.map(template => <TemplateCard key={template.templateNo} template={template}/>)}
                <div ref={target} className={"target"} style={{color: "red", height: "10px"}}>흐음</div>
            </div>
            <WriteButton/>
            <CategoryButton/>
        </div>
    );
};

export default apiHoc(TemplateList);
