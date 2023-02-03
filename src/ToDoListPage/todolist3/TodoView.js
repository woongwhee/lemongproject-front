import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoDate from './TodoDate'; //투두리스트의 날짜를 보여주는 컴포넌트
import TodoList from './TodoList'; //할일 리스트. todoItem컨포넌트를 렌더링해서 보여준다.
import TodoCreate from './TodoCreate'; //새로운 할일 등록해주는 컴포넌트
import TodoTemplate from './TodoTemplate';
import Calendar2 from '../calendar/Calendar';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

import axios from "axios";
import { async } from 'q';
import TodoItem from './TodoItem';

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components
 
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function TodoView3(){
  //선택한 투두리스트 날짜 
  const selectDay = useSelector((state)=> state.date.selectDay);
  const todoDate = new moment(selectDay).format('YYMMDD');

  //입력 내용 리스트 배열로 저장
  const [todoList, setTodoList] = useState([]);

  const [chTodoList , setChTodoList] = useState([]);

  //투두리스트 가져오기(get요청)
  //비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodo = async() => {
    try{
      const res = await axios.get("/api/todo/getTodo" , {
        params : {todoDate : todoDate,
                  userNo : 1},
      });
      console.log('전송 성공');
      setTodoList(res.data);
      //setTodoList(res.data.todo)
      //setChTodoList(res.date.chall)
    } catch(res){
      console.log("전송 실패")
    }
  }

  //컴포넌트가 렌더링될 때마다 작업을 실행하게 하는 기능
  //[]을 마지막에 추가하면 컴포넌트가 처음 렌더링 될때만 작업을 실행한다.
  //[] <- 값을 추가하면 값이 변할 때마다 작업을 실행한다.(ㅜㅜ눙뭉)
  useEffect(() => {
    fetchTodo();
  },[todoDate])


  //투두 작성 form태그 
  const insertTodo = async(inputValue, setInputValue, open, setOpen, todoDate) => {
    await axios.post('api/todo/insertTodo',
      ({ 
        userNo : 1,
        todoContent : inputValue,
        clear : false,
        value : 1,
        todoDate :  todoDate,
        todoNo : 0
      })
    ).then(function(res){
      console.log('작성 성공');
      setTodoList(res.data);
      setTodoList([
        ...todoList,
        {
          todoContent : inputValue,
          clear : false,
          todoNo : res.data.todoNo,
        }
      ])
      setInputValue('');
      setOpen(!open);
    })
  }
  
  //투두 삭제
  const onDel = async(todoNo) => {
    try{
      const res = axios.get("/api/todo/deleteTodo" , {
        params : {todoNo : todoNo}
      });
      setTodoList(res.data);
      setTodoList(todoList.filter(todo => todo.todoNo !== todoNo));
      console.log("삭제 성공!");
      //console.log("반환 된 todoList : "+ res.data);
      //console.log("삭제 후 todoList : "+todoList)
    }catch(res){
      console.log("삭제 실패")
    }
  };

  //투두 일정완료
  const onToggle = async(todoNo) => {
    axios.get('/api/todo/clearTodo', {
      params : {todoNo : todoNo}
    }).then(function(res){
      setTodoList(res.data);
      setTodoList(todoList.map(todo =>
        todo.todoNo === todoNo ? { ...todo, clear: !todo.clear } : todo
      ));
      console.log("변경 완료!");
    }).catch(function(){
      console.log("변경 실패!");
    })
  }

  //투두 수정   
  const onUpdate = async(todoNo, editeTodo, setEdite) => {
    axios.get('api/todo/updateTodo', ({
      params: {todoNo : todoNo,
              todoContent : editeTodo,}
      })
    ).then(function(){
      setTodoList(todoList.map((todo) => ({
        ...todo,
        todoContent : todo.todoNo === todoNo ? editeTodo : todo.todoContent,
      })));
      setEdite(false);
      console.log("수정 완료");
    }).catch(function(){
      console.log("수정 실패")
    })
  }

  //내일로 미루기
  const onDelay = async(todoNo) => {
    axios.get('api/todo/delayTodo', ({
      params: {todoNo : todoNo}
    })
  ).then(function(res){
    // setTodoList(todoList.map((todo) =>({
    //   ...todo
    // })));
    setTodoList(todoList.filter(todo => todo.todoNo !== todoNo));
    console.log("미루기 완료");
  }).catch(function(){
    console.log("미루기 실패")
  })
}



  return (
    <>
      <TodoTemplate>
        {/* <p onClick={click}>dd</p> */}
        <GlobalStyle />
        <TodoDate /> {/*todo날짜 컴포넌트*/}
        <TodoList todoList={todoList} onDel={onDel} onToggle={onToggle} onUpdate={onUpdate} onDelay={onDelay}/> {/*todo목록 컴포넌트*/}
        <TodoCreate insertTodo={insertTodo}/> {/*todo생성 컴포넌트*/}
      </TodoTemplate>
    </>
  );
}

 
export default React.memo(TodoView3);
