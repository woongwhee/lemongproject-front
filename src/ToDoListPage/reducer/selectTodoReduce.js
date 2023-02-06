import React from 'react'

const initialState = {
    value: 3,
  };

export default function selectTodoReduce(state = initialState, action) {
    if(action.type === 'VIEW'){
        return initialState;
    }
}

