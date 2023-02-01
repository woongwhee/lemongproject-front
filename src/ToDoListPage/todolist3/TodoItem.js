import React , {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate, MdOutlineCreate, MdClear } from 'react-icons/md';
import { GiOrangeSlice }  from "react-icons/gi";

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
  // display: none;
`;

const Update = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: #dee2e6;
font-size: 24px;
cursor: pointer;
background-color: skyblue;
  &:hover {
    color: #ff6b6b;
  }
  //display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 3px solid orange;
  &:hover {
    ${Remove} {
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
  border: 3px solid purple;
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
  border: 3px solid pink;
  ${todo =>
    todo.clear &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({todo, onDel, onToggle, onUpdate, onDelay}) {
  
  //수정 모드 확인하기 위한 값
  const [edite, setEdite] = useState(false);
  
  //수정된 투두 content
  const [editeTodo, setEditeTodo] = useState(todo.todoContent);

  //내일로 미루기 화면 hide
  const [hide , setHide] = useState(false);

  //수정버튼을 눌렀을 때 input창으로 변환
  const onClickEdite = () => {
    setEdite(true);
  }

  //수정하기 취소 버튼
  const onClickEditex = () => {
    setEdite(false);
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
        //수정버튼을 눌렀을 때 input태그가 뜬다.
        <input type="text" value={editeTodo} onChange={onEditeTodo}/>
      ) : (
        //수정버튼을 누르지 않은 상태에서는 일반 text창이 뜬다.
        <Text clear={todo.clear}>{todo.todoContent}</Text>
      )}

      {/* 수정버튼 */}
      {!todo.clear ? ( 
        edite ? (
          <> {/* 수정하기 버튼을 누르면 나오는 버튼들 */}
          <Update>
            <MdCreate onClick={()=>onUpdate(todo.todoNo, editeTodo, setEdite)}/> {/* 수정 완료 버튼 */}
          </Update>
          <Remove >
            <MdClear onClick={onClickEditex} /> {/* 수정 취소 버튼 */}
          </Remove>
          </>
        ) : (
          <> {/* 일반적으로 투두 생성시 나오는 버튼들 */}
          <GiOrangeSlice onClick={()=>{onDelay(todo.todoNo, hide , setHide)}}/> {/* 내일로 미루기 */}
          <Update>
            <MdOutlineCreate onClick={onClickEdite}/> {/* 수정하기 버튼 */}
          </Update>
          </>
        )
      ) : null} {/* 완료된 투두일 경우 수정 버튼이 뜨지 않게 한다. */}

      {/* 삭제버튼   */}
      {edite ? 
        //수정시에는 삭제버튼이 보이지 않게
        null : (
          <Remove >
            <MdClear onClick={()=>onDel(todo.todoNo)} />
          </Remove>
        )
      } 
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
