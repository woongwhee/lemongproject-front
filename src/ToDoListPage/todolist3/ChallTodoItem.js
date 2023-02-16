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
  box-sizing : border-box;
  width: 32px;
  height: 32px;
  //color : #9795f0;
  //color: #B360DF;
  color : #FFEE4E;

  border-radius: 20px;
  border: 3px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  background-origin: border-box;  
  background-clip: content-box, border-box; 

  // border: 2.5px solid linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  // background : linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);

  font-size: 18px;
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
      width: 36px;
      height: 36px;
      margin-left : -3px;

      border : 2.5px solid white;
      //border: 2.5px solid linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
      background : linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);

      //color: #B360DF;
      color : #FFEE4E;
      color : #FDFD36;
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
          {/* {chTodo.clear ? <FaLemon /> : <FaRegLemon /> } */}
          <FaLemon /> 
        </CheckCircle>

        {/* 내용 */}
        <Text clear={chTodo.clear}>{chTodo.todoContent}</Text>
    </TodoItemBlock>
  );
}

export default React.memo(ChallTodoItem);
