import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './ToDoTemplate'; //투두리스트의 레이아웃을 설정하는 컴포넌트
import ToDoListDate from './ToDoListDate'; //투두리스트의 날짜를 보여주는 컴포넌트
import TodoList from './ToDoList'; //할일 리스트. todoItem컨포넌트를 렌더링해서 보여준다.
import TodoCreate from './ToDoCreate'; //새로운 할일 등록해주는 컴포넌트

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components
 
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
 
function ToDoListView() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <ToDoListDate />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}
 
export default ToDoListView;