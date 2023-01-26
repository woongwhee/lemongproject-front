import React from 'react'
import { createStore } from 'redux';
import { Provider, useSelect, useDispatch  } from 'react-redux';


function reducer(currentState, action) {
    // currentState: 현재 state값
    // action : 어떻게 state값을 바꿀 것인가
    let today = new Date();
    
    console.log(action.todoDate)
    
    if(currentState === undefined){
        return {
            today,
        };
    }
    //현재 값 copy
    const newState = {...currentState};
    
    if(action.type === 'SELECTDAY'){
        newState.todoDate
    }
    return newState;
}

const store = createStore(reducer);
