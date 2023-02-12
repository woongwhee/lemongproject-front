import TodoList from "../ToDoListPage/todolist3/TodoList";
import ChallengeList from "../ToDoListPage/menubar/ChallengeList";
import FeedList from "../ToDoListPage/menubar/FeedList";

// Action types
export const OTHER = 'page/OTHER';
export const TODO = 'page/TODO';

// Action creators
export const other = () => {return {type : OTHER}};
export const todo = () => {return {type : TODO}};

// state초기값
const initialState = {
    menuList2 : false,
};

function page (state=initialState, action){
    // console.log(state.menuList2); = 0
    
    switch(action.type){
        case TODO : 
            return {menuList2 : true};
        case OTHER :
            return  {menuList2 : false}; 
        case '2' :
            return  {menuList2 : false};
        case '3' :
            return  {menuList2 : false};
        case '4' :
            return  {menuList2 : false};
        default : 
            return state;
    }
}

export default page;