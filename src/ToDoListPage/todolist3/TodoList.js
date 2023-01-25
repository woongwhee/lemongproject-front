import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({todoList, onDel, onToggle, onUpdate}) {
  
  return (
    <TodoListBlock>
      {todoList.map(todo => (
        <TodoItem
          // id={todo.id}
          // content={todo.text}
          //done={todo.done}
          key={todo.id}
          todo={todo}
          onDel={onDel}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
