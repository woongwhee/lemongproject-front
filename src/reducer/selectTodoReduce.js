import React from 'react'

const initialState = {
    value: 3,
  };

export default function MoveMark(state = initialState, action) {
    if(action.type === 'MOVE'){
        return initialState;
    }
}

