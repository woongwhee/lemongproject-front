import { combineReducers } from "redux";
import todoDateReducer from './todoDateReduce'

const rootReducer = combineReducers({todoDateReducer});

export default rootReducer;