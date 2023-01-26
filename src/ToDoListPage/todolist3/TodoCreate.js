import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate({onAdd}) {
  //투두 추가 토글
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  //투두 날짜
  const selectDay = useSelector((state)=> state.selectDay)

  //입력값 저장할 state
  const [inputValue, setInputValue] = useState('')

  //입력값 저장
  const onCreate = (event) => {
    setInputValue(event.target.value)
    console.log(inputValue)
  } 

  //작성한 todo내용 화면에 표시
  const onSubmit = (e) => {
    e.preventDefault() //새로고침 방지
    if(!inputValue) return //공백 입력 방지
    onAdd(inputValue) //입력 내용 추가
    setInputValue('') //입력 후 input 비워주기

  }

  //작성한 todo 서버로 전송
  const insertTodo = async(inputValue) => {
    let response = await axios.post('api/todo/insertTodo',
      ({ 
        'userNo' : 1,
        'todoContent' : inputValue,
        'clear' : false,
        'sort' : 1,
        'todoDate' : today
      })
    )
    if(response.data.code === '2000') {
      console.log('삽입 화면 오케이');
      let newTodo=response.data.result;
      onAdd(newTodo);
    }
  }

  //로그인 userno정보 
  let userNo = sessionStorage.getItem("userNo");


  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input type="text" value={inputValue} onChange={onCreate}/>
            <button onClick={()=>{insertTodo(inputValue)}}>add</button>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
