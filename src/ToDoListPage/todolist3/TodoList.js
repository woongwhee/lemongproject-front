import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import ChallTodoItem from './ChallTodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({todoList, onDel, onToggle, onUpdate, onDelay}) {

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

    {/* <TodoListBlock>
      {chTodoList && chTodoList.map(chTodo =>(
        <>
        <p>Challenge Todo-List</p>
        <ChallTodoItem
          key={chTodo.todoNo}
          chTodo={chTodo}
          onToggle={onToggle}
        />
        </>
      ))}
    </TodoListBlock> */}
    </>
  );
}

export default TodoList;
