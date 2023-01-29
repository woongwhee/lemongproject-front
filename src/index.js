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
import reduxDate from './ToDoListPage/todolist3/TodoContext'

//todoDate 값 넘겨줄 redux기능 추가
// currentState: 현재 state값
// action : 어떻게 state값을 바꿀 것인가
function reducer(currentState, action) {
  
  let today = new Date();
  
  //기본날짜는 sysdate값(현재날짜)
  if(currentState === undefined){
      return {
          selectDay : today,
      };
  }
  
  //현재 값 copy
  const newState = {...currentState};
  
  //캘린더js에서 클릭시 dispatch발생. 
  //해당 캘린더 날짜 반환
  if(action.type === 'SELECTDAY'){
      return action.payload;
  }

  // if(action.type === 'VIEW'){
  //   const fetchTodo = async() => {
  //     try{
  //       const res = await axios.get("/api/todo/getTodo" , {
  //         params : {todoDate : todoDate,
  //                   userNo : 1},
  //       });
  //       console.log("response", res.data);
  //       setTodoList(res.data);
  //     } catch(res){
  //       console.log("실패")
  //     }
  //   }
  
  //   // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  //   useEffect(
  //     () => {
  //       // effect 구문에 생성한 함수를 넣어 실행합니다.
  //       fetchTodo();
  //     },[]
  //   )
  // }



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
