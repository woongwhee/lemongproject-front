import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import moment from 'moment';

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

function TodoCreate({onAdd, todoDate }) {
  const [open, setOpen] = useState(false);
 
  const onToggle = () => setOpen(!open);

  //입력창 값 저장
  const [inputValue, setInputValue] = useState('')

  //투두넘버
  const todoNo = useRef(0)

  //임시 투두 날짜
  const today = moment(todoDate).format("yyyy년 MM월 DD일");

  //const textRef = useRef()

  const onCreate = (event) => {
    setInputValue(event.target.value)
    console.log(inputValue)
  } 

  const onSubmit = (e) => {
    e.preventDefault() //새로고침 방지

    if(!inputValue) return //공백 입력 방지

    onAdd(inputValue) //입력 내용 추가

    setInputValue('')

    //textRef.current.focus();
  }

  const insertTodo = () => {
    axios({
      method: 'post',
      url: '/api/todo/insert',
      data: {
        id : todoNo.current++, 
        userNo : 1,
        date : today,
        content : inputValue,
        done : false,
        sort : 1
      }
    })
  }

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input type="text" value={inputValue} onChange={onCreate}/>
            <button onClick={insertTodo}>add</button>
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
