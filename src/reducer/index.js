import { combineReducers } from "redux";
import date from './date';
import mark from './mark';
import page from "./page";
import menu from "./menu";


const rootReducer = combineReducers({
    date, 
    mark,
    page,
    menu
});
  
export default rootReducer;