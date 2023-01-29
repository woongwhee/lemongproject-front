import React from 'react'
import { createStore } from 'redux';
import { Provider, useSelect, useDispatch  } from 'react-redux';


//todoDate 값 넘겨줄 redux기능 추가
function reducer(currentState, action) {
    // currentState: 현재 state값
    // action : 어떻게 state값을 바꿀 것인가
    let today = new Date();
    
    // console.log(action)
    // console.log("redux:"+action.payload)
    
    if(currentState === undefined){
        return {
            selectDay : today,
        };
    }
    //현재 값 copy
    const newState = {...currentState};
    
    if(action.type === 'SELECTDAY'){
        return action.payload;
    }
  }
  
  export const store = createStore(reducer);
