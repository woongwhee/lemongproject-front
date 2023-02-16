import axios from "axios";

//리덕스 툴킷
//npm install @reduxjs/toolkit react-redux


//const MOVE = 'mark/MOVE';

//export const move = () => ({type : MOVE});

const initialState = {
  mark : {},
};

function mark(state=initialState, action) {

  switch(action.type){
    case 'MOVE' : 
      return moveMarkFn();
    default : 
      return state;
  }
};

const moveMarkFn = async() => {
  axios.get("/api/todo/calTodo").then(function(res){
      //console.log(res.data)
      return res.data;
  })
    //console.log("비동기 작동함")
}

export default mark;