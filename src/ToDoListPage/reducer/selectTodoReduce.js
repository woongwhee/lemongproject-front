import React from 'react'

const initialState = {
    value: 0,
  };

export default function selectTodoReduce(state = initialState, action) {
  
    if(action.type === 'VIEW'){
        return initialState;
    }


}

