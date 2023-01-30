import React , {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate, MdOutlineCreate, MdClear } from 'react-icons/md';
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
  background-color: pink;
  ${todo =>
    todo.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({todo, onDel, onToggle, onUpdate}) {
  
  //수정 모드 확인하기 위한 값
  const [edite, setEdite] = useState(false);
  
  //수정된 투두 content
  const [editeTodo, setEditeTodo] = useState(todo.todoContent);

  //수정버튼을 눌렀을 때 수정모드 on
  const onClickEdite = () => {
    setEdite(true);
  }

  //새로 값이 입력되면 setEditeTodo에 내용을 저장
  const onEditeTodo = (e) => {
    setEditeTodo(e.target.value);
  }




  return (
    <TodoItemBlock>
      {/* 완료상태 */}
      <CheckCircle clear={todo.clear} onClick={()=>onToggle(todo.todoNo)}>
        {todo.clear && <MdDone /> }
      </CheckCircle>

      {/* 내용 */}
      {edite ? (
        //edite버튼을 눌렀을 때 input태그가 뜬다.
          <input type="text" value={editeTodo} onChange={onEditeTodo}/>
      ) : (
        //edite버튼을 누르지 않은 상태에서는 일반 text창이 뜬다.
        <Text clear={todo.clear}>{todo.todoContent}</Text>
      )}

      {/* 수정버튼 */}
      <Update>
        {!todo.clear ? ( //완료된 투두일 경우 수정 버튼이 뜨지 않게 한다.
          edite ? (
            // eidte가 true면(onClickEdite버튼을 누르면) 작성버튼을 눌렀을 때 update()를 실행
            <MdCreate onClick={()=>onUpdate(todo.todoNo, editeTodo, setEdite)}/>
          ) : (
            //버튼 클릭시 MdCreate버튼으로 바뀜
            <MdOutlineCreate onClick={onClickEdite}/>
          )
        ) : null} 
      </Update>

      {/* 삭제버튼 */}
      <Remove >
        <MdClear onClick={()=>onDel(todo.todoNo)} />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
