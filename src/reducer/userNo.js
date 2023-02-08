import axios from "axios";

//리덕스 툴킷
//npm install @reduxjs/toolkit react-redux


//const MOVE = 'mark/MOVE';

//export const move = () => ({type : MOVE});

const initialState = {
    index : 3,
    menuParam : null
};

export const MENU_TODOLIST="TODOLIST";
export const MENU_FEED="FEED";
export const MENU_CHALLENGE="CHALLENGE";
export const MENU_TEMPLATE="TEMPLATE";
export const MENU_MY_PROFILE="MY_PROFILE";
export const MENU_PROFILE="PROFILE";



function userNo(state=initialState, action) {

    switch(action.type){
        case "TODOLIST":
            return {index: 0};
        case "FEED":
            return {index: 1};
        case "CHALLENGE":
            return {index: 2};
        case "TEMPLATE":
            return {index:3};
        case "MY_PROFILE":
            return {index:4,menuParam:0};
        case "PROFILE":
            return {index:4,menuParam:action.userNo};
        default :
            return state;
    }
};



export default userNo;