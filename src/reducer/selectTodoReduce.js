import React from 'react'

const initialState = {
    value: 0,
  };

export default function MoveMark(state = initialState, action) {
  
    if(action.type === 'MOVE'){
        return initialState;
    }


}

