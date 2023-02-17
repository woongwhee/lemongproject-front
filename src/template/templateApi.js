import axios from "axios";
import {
    REVIEW_INSERT,
    TEMPLATE_DETAIL,
    TEMPLATE_LIST,
    TODO_DETAIL,
    UNSAVE_LOAD, UNSAVE_RESET, UNSAVE_TODO_DELETE,
    UNSAVE_TODO_INSERT,
    UNSAVE_UP_LOAD, UNSAVE_UPDATE, TEMPLATE_DELETE, REVIEW_DELETE, TEMPLATE_CATEGORY, TEMPLATE_MAXPAGE, REVIEW_LIST

} from "./templateURI";
import {codeHandler} from "../util/apiUtil";


//get
export const templateList = (page = 0, categoryNo = 0) => axios.get(`${TEMPLATE_LIST}/${page}/${categoryNo}`).then(res =>codeHandler(res))
export const reviewList = (templateNo) => axios.get(`${REVIEW_LIST}/${templateNo}`).then(res => codeHandler(res))
export const templateMaxPage = (categoryNo) => axios.get(`${TEMPLATE_MAXPAGE}/${categoryNo}`).then(res => codeHandler(res))
export const templateDetail = (templateNo,day) => axios.get(`${TEMPLATE_DETAIL}/${templateNo}`).then(res => codeHandler(res))
export const templateCategory = () => axios.get(`${TEMPLATE_CATEGORY}`).then(res => codeHandler(res))
export const todoDetail = (templateNo,day) => axios.get(`${TODO_DETAIL}/${templateNo}/${day}`).then(res => codeHandler(res))
export const loadUnSave = () => axios.get(UNSAVE_LOAD).then(res => codeHandler(res))
//post
export const todoInsert = async (dayList, contentList, templateNo) => axios.post(UNSAVE_TODO_INSERT, {
    dayList,
    contentList,
    templateNo
}).then(res => codeHandler(res))
export const reviewInsert = ( templateNo,content) => axios.post(REVIEW_INSERT, {
    content,
    templateNo
}).then(res => codeHandler(res))
//put
export const upLoadUnSave = () => axios.put(UNSAVE_UP_LOAD).then(res => codeHandler(res));
export const updateUnSave = (templateNo, name, value) => axios.put(UNSAVE_UPDATE, {
    templateNo,
    [name]: value
}).then(res => codeHandler(res));
export const resetUnSave = () => axios.put(UNSAVE_RESET).then(res => codeHandler(res))

//delete
export const todoDelete = (todoNo) => axios.delete(`${UNSAVE_TODO_DELETE}/${todoNo}`).then(res => codeHandler(res))

export const reviewDelete = (reviewNo) => axios.delete(`${REVIEW_DELETE}/${reviewNo}`).then(res => codeHandler(res))
export const templateDelete = (templateNo) => axios.delete(`${TEMPLATE_DELETE}/${templateNo}`).then(res => codeHandler(res))
