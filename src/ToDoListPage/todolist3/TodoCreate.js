import React, { useState, useRef, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

const CircleButton = styled.button`
  background: #FFEE4E;
  &:hover {
    background: #6B00A9;
  }
  &:active {
    background: #7433D0;
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

function TodoCreate({insertTodo}) {
  //투두 추가 토글
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  //투두 날짜
  let selectDay = useSelector((state)=> state.selectDay);
  const todoDate = new moment(selectDay).format('YYMMDD');

  //입력값 저장할 state
  const [inputValue, setInputValue] = useState('');

  //입력값 저장
  const onCreate = (event) => {
    setInputValue(event.target.value);
  } 

  const dispatch = useDispatch();

  function moveMark(){
    dispatch({type : 'MOVE' });
  }

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={(e)=>{e.preventDefault(); insertTodo(inputValue, setInputValue, open, setOpen, todoDate); moveMark();}}>
            <Input type="text" value={inputValue} onChange={onCreate} autoFocus/>
            {/* <button onClick={()=>{insertTodo(inputValue, setInputValue, todoDate)} } >add</button> */}
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
