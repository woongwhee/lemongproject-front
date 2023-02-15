import React , { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { FaRegLemon, FaLemon } from 'react-icons/fa';
import 'animate.css';

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover{
    transform : scale(1.02);
  }

  animation : fadeIn;
  animation-duration: 2s;
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  color : #9795f0;
  //color : #B360DF;

  border-radius: 16px;
  border: 2.5px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  background-origin: border-box; //배경위치 시작지점 : 
  background-clip: content-box, border-box; //배경이미지를 잘라낼 위치

  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  cursor: pointer;
  &:hover{
    transform : scale(1.05);
  }
  ${chTodo =>
    chTodo.clear &&
    css`
      border-radius: 16px;
      border: 2.5px solid transparent;
      background-image: linear-gradient(#fff, #fff), linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
      background-origin: border-box; //배경위치 시작지점 : 
      background-clip: content-box, border-box; //배경이미지를 잘라낼 위치
      color: #B360DF;
      font-size: 18px;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  color: #495057;
  ${todo =>
    todo.clear &&
    css`
      color: #ced4da;
    `}
`;

function ChallTodoItem({chTodo, onToggleCh}) {

  //const [chTodo2, setTog] = useState(true);

  const dispatch = useDispatch();

  function moveMark(){
    dispatch({type : 'MOVE' });
  }

  // const onChangeToggle = () => {
  //   setTog(!chTodo2);
  // }

  //console.log(chTodo);

  return (
    <TodoItemBlock className='animate__animated animate__fadeIn'>
        {/* 완료상태 */}
        <CheckCircle clear={chTodo.clear} onClick={()=>{onToggleCh(chTodo.todoNo); moveMark();}}>
          {chTodo.clear ? <FaLemon /> : <FaRegLemon /> }
        </CheckCircle>

        {/* 내용 */}
        <Text clear={chTodo.clear}>{chTodo.todoContent}</Text>
    </TodoItemBlock>
  );
}

export default React.memo(ChallTodoItem);
