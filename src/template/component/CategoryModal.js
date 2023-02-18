import React, {useEffect} from 'react';
import {useAsync} from "react-async-hook";
import {useTemplateDispatch, useTemplateState} from "../TemplateContext";
import {templateCategory} from "../templateApi";
import {isEmpty} from "../../util/typeUtile";
import Loading from "./Loading";
import TemplateList from "./TemplateList";
import {ModalBody, ModalHeader, Modal} from "reactstrap";
import apiHoc from "../../util/apiHoc";
import { borderRadius } from '@mui/system';

const CategoryModal = ({isOpen, toggle, result}) => {
        const dispatch = useTemplateDispatch();
        const changeCategory = (categoryNo) => {
            dispatch({
                type: "CATEGORY", categoryNo: categoryNo
            })
            toggle();
        }
        useEffect(() => {
                dispatch({type: "ADD_CATEGORY", categories: result})
            }
            , [])


        return (
            <Modal ariaHideApp={false} 
                    
                   contentLabel="Selected Option" size="sm" fullscreen={false} isOpen={isOpen} toggle={toggle}>
                <ModalHeader> 카테고리 선택</ModalHeader>
                <button onClick={toggle}>닫기</button>
                <ModalBody>
                    {
                        result?.map((category,index) => {
                            return (
                                <button className="category-select"  onClick={() => {
                                    changeCategory(category.categoryNo)
                                }} key={index}>
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
