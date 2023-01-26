import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoDate from './TodoDate'; //투두리스트의 날짜를 보여주는 컴포넌트
import TodoList from './TodoList'; //할일 리스트. todoItem컨포넌트를 렌더링해서 보여준다.
import TodoCreate from './TodoCreate'; //새로운 할일 등록해주는 컴포넌트
import TodoTemplate from './TodoTemplate';
import Calendar2 from '../calendar/Calendar';
import moment from 'moment/moment';

import axios from "axios";

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components
 
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function TodoView3(props){

  const today = new Date()

  //투두넘버 설정->가져온 투두list+1
  const todoNo = useRef('')

  //입력 내용 리스트 배열로 저장
  const [todoList, setTodoList] = useState([])

  //투두리스트 가져오기(백)
  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodo = async() => {
    const res = await axios.get("/api/todo/getTodo" );
    console.log("response",res);
    setTodoList(res.data);
  }

   // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(
    () => {
      // effect 구문에 생성한 함수를 넣어 실행합니다.
        fetchTodo();
        return
    },[]
  )


  //투두 추가 함수(프론트)
  const onAdd = (inputValue) => {

    setTodoList([
      ...todoList,
      {
        todoNo: todoNo.current++, 
        userNo : 1,
        todoDate : today,
        todoContent : inputValue,
        clear : false,
        sort : 1
      }
    ])
    console.log(todoList)
  }

  //투두 삭제(프론트)
  const onDel = (todoNo) => {
    setTodoList(todoList.filter(todo => todo.todoNo !== todoNo))
    console.log(todoList)
  }

  //투두 일정완료(프론트)
  const onToggle = (todoNo) => {
   setTodoList(todoList.map(todo =>
     todo.todoNo === todoNo ? { ...todo, clear: !todo.clear } : todo
   ));
   console.log(todoList)
  }

  //투두 수정
  // const onUpdate = (id) => {
  //   setTodoList(todoList.content())
  // }

  return (
    <>
      <TodoTemplate>
        <GlobalStyle />
        <TodoDate /> {/*todo날짜 컴포넌트*/}
        <TodoList todoList={todoList} onDel={onDel} onToggle={onToggle} /> {/*todo목록 컴포넌트*/}
        <TodoCreate onAdd={onAdd}/> {/*todo생성 컴포넌트*/}
      </TodoTemplate>
    </>
  );
}
 
export default TodoView3;
