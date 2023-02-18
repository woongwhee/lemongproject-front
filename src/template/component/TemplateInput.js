import React from 'react';
import {useAsync} from "react-async-hook";
import {templateCategory} from "../templateApi";
import {useTemplateState} from "../TemplateContext";

const TemplateInput = ({inputValue, updateInputValue}) => {
    // const state=useAsync(templateCategory);
    let {categories}=useTemplateState()
    return (
        <div className="template-input">
            <div className="tpdiv1">
                <label htmlFor="title">제목&nbsp;</label>
                <input type="text" onBlur={updateInputValue} name="title" defaultValue={inputValue.title}/>
            </div>
            <div className="tpdiv2">
                <label htmlFor="content">내용&nbsp;</label>
                <input type="text" onBlur={updateInputValue} name="content" defaultValue={inputValue.content}/>
                <br/>
            </div>
            <div className="tpdiv3">
                <label htmlFor="categoryNo">분류&nbsp;</label>
                <select name="categoryNo" onChange={updateInputValue}>
                    {inputValue.categoryNo==null&&<option value={null} selected>선택해주세요</option>}
                    {categories.map(c => {
                        if (c.categoryNo != inputValue.categoryNo) {
                            return <option key={c.categoryNo} value={c.categoryNo}>{c.categoryName}</option>
                        } else {
                            return <option key={c.categoryNo} value={c.categoryNo} selected>{c.categoryName}</option>
                        }
                    })
                    }
                </select>
            </div>
            <div className="tpdiv4">
                <label htmlFor="range">기간&nbsp;</label>
                <input type="number" onBlur={updateInputValue} name="range" max="365" defaultValue={inputValue.range}></input>
            </div>
        </div>
    );
};

export default TemplateInput;
