import React , { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import { useDispatch } from 'react-redux';


const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  //border: 3px solid orange;
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  //border: 3px solid purple;
  ${todo =>
    todo.clear &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  //border: 3px solid pink;
  ${todo =>
    todo.clear &&
    css`
      color: #ced4da;
    `}
`;

function ChallTodoItem({chTodo, onToggleCh}) {

  const dispatch = useDispatch();

  function moveMark(){
    dispatch({type : 'MOVE' });
  }

 //console.log("chTodo: "+chTodo.todoList);

  return (
    <TodoItemBlock>
        {/* 완료상태 */}
        <CheckCircle clear={chTodo.clear} onClick={()=>{onToggleCh(chTodo.todoNo); moveMark();}}>
            {chTodo.clear && <MdDone /> }
        </CheckCircle>

        {/* 내용 */}
        <Text clear={chTodo.clear}>{chTodo.todoContent}</Text>
    </TodoItemBlock>
  );
}

export default React.memo(ChallTodoItem);
