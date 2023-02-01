import React from 'react'
import { createStore } from 'redux';
import { Provider, useSelect, useDispatch  } from 'react-redux';


//todoDate 값 넘겨줄 redux기능 추가
export default function reducer(currentState, action) {
// currentState: 현재 state값
// action : 어떻게 state값을 바꿀 것인가

    let today = new Date();

    if(currentState === undefined){
        return {
            selectDay : today,
        };
    }

    //캘린더js에서 클릭시 dispatch발생. 
    //해당 캘린더 날짜 반환
    // if(action.type === 'SELECTDAY'){
    //     return action.payload;
    // }

    switch(action.type) {
        case 'SELECTDAY' :
            return action.payload ;
    }


}

