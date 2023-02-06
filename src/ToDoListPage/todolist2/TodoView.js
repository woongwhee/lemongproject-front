import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoDate from './TodoDate'; //투두리스트의 날짜를 보여주는 컴포넌트
import TodoList from './TodoList'; //할일 리스트. todoItem컨포넌트를 렌더링해서 보여준다.
import TodoCreate from './TodoCreate'; //새로운 할일 등록해주는 컴포넌트
import TodoTemplate from './TodoTemplate';

import axios from "axios";

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components
 
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
 
const TodoView = () => {


  //입력창 값 저장
  const [inputValue, setInputValue] = useState('')

  //입력 내용 리스트 배열로 저장
  const [todoList, setTodoList] = useState([])

  //투두 추가 함수
  const addItem = () => {
    setTodoList([
      ...todoList,
      inputValue
    ])
    setInputValue('')
  }

  //투두 삭제함수
  const onDel = (id) => {
    setTodoList(todoList.filter(todoList=>todoList.id !== id))
  }

  return (
    <>
      <TodoTemplate>
        <GlobalStyle />
        <TodoDate /> {/*todo날짜 컴포넌트*/}
        <TodoList todoList={todoList}/> {/*todo목록 컴포넌트*/}
        <TodoCreate addItem={addItem} onDel={onDel} inputValue={inputValue} setInputValue={setInputValue}/> {/*todo생성 컴포넌트*/}
      </TodoTemplate>
    </>
  );
}
 
export default TodoView;
