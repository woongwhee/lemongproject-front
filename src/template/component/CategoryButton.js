import React, {useState} from 'react';
import {useTemplateDispatch, useTemplateState} from "../TemplateContext";
import {useAsync} from "react-async-hook";
import {templateCategory} from "../templateApi";
import Modal from "react-modal";
import CategoryModal from "./CategoryModal";
import {isEmpty} from "../../util/typeUtile";

const CategoryButton = (props) => {
    const state=useAsync(templateCategory);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (<>
            <button type="button" className="Category-Button" onClick={toggle} >
                <img src="/LemongImg/template/search.png" />
            </button>
            {
            <CategoryModal state={state} isOpen={modal} toggle={toggle}/>
            }
            </>
    );
};

export default CategoryButton;
