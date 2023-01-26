import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'; //부트스트랩 import

import { MyPage } from './mypage/MyPage';
import MainPage from './ToDoListPage/MainPage'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//todoDate 값 넘겨줄 redux기능 추가
function reducer(currentState, action) {
  // currentState: 현재 state값
  // action : 어떻게 state값을 바꿀 것인가
  let today = new Date();
  
  console.log(action)
  console.log("redux:"+action.payload)
  
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

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Provider는 최상위 레벨에서 렌더링 된다
  // provider의 props로 store가 있으며 redux store를 할당한다.
  <Provider store={store}>
    <MainPage/>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
