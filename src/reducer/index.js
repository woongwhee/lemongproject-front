import { combineReducers } from "redux";
import date from './date';
import mark from './mark';
import page from "./page";


const rootReducer = combineReducers({
    date, 
    mark,
    page,
});
  
export default rootReducer;