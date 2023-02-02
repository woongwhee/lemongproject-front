import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({todoList, onDel, onToggle, onUpdate, onDelay, hide}) {

 

  return ( 
    <>
    <TodoListBlock>
      <p>Daily Todo-List</p>
      {todoList && todoList.map(todo =>(
      <TodoItem
        key={todo.todoNo}
        todo={todo}
        onDel={onDel}
        onToggle={onToggle}
        onUpdate={onUpdate}
        onDelay={onDelay}
      />
      ))}
    </TodoListBlock>

    <TodoListBlock>
      {todoList && todoList.map(todo =>(
        <>
        <p>Challenge Todo-List</p>
        <TodoItem
          key={todo.todoNo}
          todo={todo}
          onDel={onDel}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelay={onDelay}
        />
        </>
      ))}
    </TodoListBlock>
    </>
  );
}

export default TodoList;
