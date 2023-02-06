import React from 'react';
import {useAsync} from "react-async-hook";
import {useTemplateDispatch, useTemplateState} from "../TemplateContext";
import {templateCategory} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";
import Loading from "./Loading";
import TemplateList from "./TemplateList";
import {ModalHeader} from "reactstrap";
import {ModalBody} from "react-bootstrap";
import Modal from "react-modal";
import apiHoc from "../../util/apiHoc";

const CategoryModal = ({isOpen, toggle, list}) => {
        const dispatch = useTemplateDispatch();
        const changeCategory = (categoryNo) => {
            dispatch({
                type: "CATEGORY", categoryNo: categoryNo
            })
        }
        return (
            <Modal ariaHideApp={false}
                   contentLabel="Selected Option" size="sm" fullscreen={false} isOpen={isOpen} toggle={toggle}>
                <ModalHeader> 카테고리 선택</ModalHeader>
                <button onClick={toggle}>영단기</button>
                <ModalBody>
                    {
                        list?.map(category => {
                            return (
                                <button className="category-select" onClick={() => {
                                    changeCategory(category.categoryNo)
                                }}>
                                    <img src={category.imagePath} alt={category.categoryNo}/>
                                    <p>{category.categoryName}</p>
                                </button>
                            )
                        })
                    }
                </ModalBody>
            </Modal>
        )

    }
;

export default apiHoc(CategoryModal);
