import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoDate from './TodoDate'; //투두리스트의 날짜를 보여주는 컴포넌트
import TodoList from './TodoList'; //할일 리스트. todoItem컨포넌트를 렌더링해서 보여준다.
import TodoCreate from './TodoCreate'; //새로운 할일 등록해주는 컴포넌트
import TodoTemplate from './TodoTemplate';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

import axios from "axios";
import { codeHandler } from '../../util/apiUtil';
import { useLoginState } from '../../member/LoginContext';

//리액트 두투라이브러리 추가
// npx create-react-app react-todo
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
  //console.log(todoDate);

  //입력 내용 리스트 배열로 저장
  const [todoList, setTodoList] = useState([]);

  //챌린지 투두리스트
  const [chList , setChList] = useState([]);
  const [toggle, setToggle] = useState(false);

  //로그인 유저 정보 가져오기
  // let userNo = sessionStorage.getItem("userNo");
  
  //let {profile}=useLoginState();
  //console.log(profile);
  

  //투두리스트 가져오기(get요청)
  //비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  // const fetchTodo = async() => {
  //   try{
  //     const res = await axios.get("/api/todo/getTodo" , {
  //       params : {todoDate : todoDate,
  //                 userNo : 1},
  //     });
  //     console.log('전송 성공');
  //     setTodoList(res.data);
  //   } catch(res){
  //     console.log("전송 실패")
  //   }
  // }

  const fetchTodo = async() => {
    try{
      //console.log(todoDate);
      const res = await axios.get(`/api/todo/daily/${todoDate}`)
      let result=codeHandler(res);
      setTodoList(result.normalList);
      setChList(result.challengeList);
      //console.log(result.challengeList);
      //console.log(chList);
      console.log(result.normalList);
    } catch(result){
      setTodoList(result.data);
      setChList(result.data);
      console.log("전송 실패")
    }
  }


  //컴포넌트가 렌더링될 때마다 작업을 실행하게 하는 기능
  //[]을 마지막에 추가하면 컴포넌트가 처음 렌더링 될때만 작업을 실행한다.
  //[] <- 값을 추가하면 값이 변할 때마다 작업을 실행한다.(ㅜㅜ눙뭉)
  useEffect(() => {
    fetchTodo();
  },[todoDate, toggle])

  const no = useRef(1);

  //투두 작성 form태그 
  const insertTodo = async(inputValue, setInputValue, open, setOpen, userNo) => {
    console.log(todoDate);

    await axios.post('api/todo/insertTodo',
      ({ 
        userNo : userNo,
        todoContent : inputValue,
        clear : false,
        value : 1,
        todoDate :  todoDate,
      })
    ).then(function(res){
      console.log('작성 성공');
      console.log(res.data.result);
      setTodoList([
        ...todoList,
        {
          todoContent : inputValue,
          clear : false,
          todoNo : no.current++,
        }
      ])
      setInputValue('');
      setOpen(!open);
      console.log(todoList);
    }).catch(function(){
      console.log( "작성 실패")
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

  //데일리 투두 완료
  const onToggle = async(todoNo) => {
    axios.get('/api/todo/clearTodo', {
      params : {todoNo : todoNo}
    }).then(function(){
      setTodoList(todoList.map(todo =>
        todo.todoNo === todoNo ? { ...todo, clear: !todo.clear } : todo
      ));
      console.log("변경 완료!");
    }).catch(function(){
      console.log("변경 실패!");
    })
  }

  //챌린지 투두 완료
  const onToggleCh = async(todoNo) => {
    axios.get('/api/challenge/clearTodo', {
      params : {todoNo : todoNo}
    }).then(function(res){
      let result = codeHandler(res);
      //console.log(chList);
      
      // setChList(chList && chList.map(chTodos =>
      //   chTodos.todoList && chTodos.todoList.map(
      //     chTodo => chTodo.todoNo === todoNo ? { ...chTodo, clear : !chTodo.clear } : chTodo
      // )));

      for(let i =0; i<chList.length; i++){
        let todoList = chList[i].todoList
        for(let chTodos of todoList){
          if(chTodos.todoNo === todoNo ){
            chTodos.clear = !chTodos.clear;
      }}}
      setChList(chList);
      setToggle(!toggle);

      console.log("챌린지 완료 성공!");
      //console.log(chList);
    }).catch(function(){
      console.log("챌린지 완료 실패!");
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
    ).then(function(){
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
        <TodoList 
         todoList={todoList}
         setTodoList={setTodoList}
         chList={chList}
         onDel={onDel} 
         onToggle={onToggle} 
         onToggleCh={onToggleCh}
         onUpdate={onUpdate} 
         onDelay={onDelay}/> {/*todo목록 컴포넌트*/}
        <TodoCreate insertTodo={insertTodo}/> {/*todo생성 컴포넌트*/}
      </TodoTemplate>
    </>
  );
}

 
export default React.memo(TodoView3);
