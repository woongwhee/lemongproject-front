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
 
function TodoView3({todoDate}){
  //console.log("todoView",todoDate)

  //투두 날짜(임시)
  const today = new Date();

  //투두넘버 설정
  const todoNo = useRef(0)

  //입력 내용 리스트 배열로 저장
  const [todoList, setTodoList] = useState([])

  // const fetchTodo = async() => {
  //   const res = await axios.get("/api/todo/getTodo" );
  //   console.log("response",res);
  //   setTodoList(res.data[0]);
  // }

  // useEffect(
  //   () => {
  //       fetchTodo();
  //       return
  //   },[]
  // )

  // const insertTodo = () => {
  //   axios({
  //     method: 'post',
  //     url: '/api/todo/insert',
  //     data: {
  //       id : todoNo.current++, 
  //       userNo : 1,
  //       date : today,
  //       content : inputValue,
  //       done : false,
  //       sort : 1
  //     }
  //   })
  // }

  //투두 추가 함수
  const onAdd = (inputValue) => {
    setTodoList([
      ...todoList,
      {
        id : todoNo.current++, 
        userNo : 1,
        date : today,
        content : inputValue,
        done : false,
        sort : 1
      }
    ])
    console.log(todoList)
  }

  //투두 삭제
  const onDel = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
    console.log(todoList)
  }

  //투두 일정완료 
  const onToggle = (id) => {
   setTodoList(todoList.map(todo =>
     todo.id === id ? { ...todo, done: !todo.done } : todo
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
        <TodoDate todoDate={todoDate}/> {/*todo날짜 컴포넌트*/}
        <TodoList todoList={todoList} onDel={onDel} onToggle={onToggle} /> {/*todo목록 컴포넌트*/}
        <TodoCreate onAdd={onAdd}  /> {/*todo생성 컴포넌트*/}
      </TodoTemplate>
    </>
  );
}
 
export default TodoView3;
