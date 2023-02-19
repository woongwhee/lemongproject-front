import { combineReducers } from "redux";
import date from './date';
import mark from './mark';
import page from "./page";
import menu from "./menu";
import userNo from "./userNo";


const rootReducer = combineReducers({
    date, 
    mark,
    page,
    userNo,
    menu
});
  
export default rootReducer;