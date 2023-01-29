import React , {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate } from 'react-icons/md';
import axios from 'axios';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const Update = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    },
    ${Update} {
      display: initial;
    }
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
  ${todo =>
    todo.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  //background-color: pink;
  ${todo =>
    todo.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({todo, onDel, onToggle, onUpdate}) {

  //투두 삭제
  // const onDel = (todoNo) => {
  //   setTodoList(todoList.filter(todo => todo.todoNo !== todoNo));

  //   const deleteTodo = async() => {
  //     try{
  //       const res = await axios.get("/api/todo/getTodo" , {
  //         params : {todoNo : todo.todoNo},
  //       });
  //       console.log("삭제 성공!")
  //       setTodoList(res.data);
  //     } catch(res){
  //       console.log("실패")
  //     }
  //   };
  //   useEffect(
  //     () => {
  //       deleteTodo();
  //     },[]
  //   );
  // }
  
  //투두 일정완료
  // const onToggle = (todoNo) => {
  //   setTodoList(todoList.map(todo =>
  //     todo.todoNo === todoNo ? { ...todo, clear: !todo.clear } : todo
  //   ));
  // }


  return (
    <TodoItemBlock>
      {/* 완료상태 */}
      <CheckCircle clear={todo.clear} onClick={()=>onToggle(todo.todoNo)}>
        {todo.clear && <MdDone /> }
      </CheckCircle>

      {/* 내용 */}
      <Text clear={todo.clear}>{todo.todoContent}</Text>

      {/* 수정버튼 */}
      <Update onClick={()=>onUpdate(todo.todoNo)}>
        <MdCreate/>
      </Update>

      {/* 삭제버튼 */}
      <Remove >
        <MdDelete onClick={()=>onDel(todo.todoNo)} />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
