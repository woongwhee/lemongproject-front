import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import ChallTodoItem from './ChallTodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import './TodoList.css';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 17px;
  padding-bottom: 48px;
  overflow-y: auto;
`;



function TodoList({todoList, setTodoList, chList, onDel, onToggle, onUpdate, onDelay}) {
  console.log(chList);
  //console.log(todoList);
  //const copyChList = [...chList];
  //console.log(copyChList[0]);

  //const [ch] = copyChList.map(todo => todo.todoList);
  //console.log(ch);

  //console.log(chList[0].todoList);
  // const [todoListArr] = chList[0].todoList;
  // console.log(todoListArr);
  
  const onDragEnd = (res) => {
    if (!res.destination) return;
    
    const dndTodoList = [...todoList];
    const [reorderedItem] = dndTodoList.splice(res.source.index, 1);
    dndTodoList.splice(res.destination.index, 0, reorderedItem);
    setTodoList(dndTodoList);
    console.log(dndTodoList);


    axios.post('api/todo/dndTodo', ({
       dndTodoList : dndTodoList 
    })).then(function(){
      console.log("dnd 완료");
    }).catch(function(){
      console.log("dnd 실패")
    })
    
  }

  return ( 
    <>
    {todoList === null ? <p>Daily Todo-List</p> : ""}
    
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="drop-area">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef} >
            {todoList && todoList.map((todo, index) =>(
              <Draggable draggableId={String(todo.todoNo)} index={index} key={index} >
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TodoItem
                    key={todo.todoNo}
                    todo={todo}
                    onDel={onDel}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelay={onDelay}
                    index={index}
                  />
                  </div>
                )}
              </Draggable>
              ))}
              {provided.placeholder} 

              
              {chList === null ? <p>챌린지예용</p> : ""}
              {chList && chList.map(chTodos => (
                chTodos.todoList.map(chTodo => 
                  <ChallTodoItem
                  key={chTodo.todoNo}
                  chTodo={chTodo}
                  />
                )
              ))}
          </TodoListBlock>
        )}
        
      </Droppable>
    </DragDropContext>



    {/* <TodoListBlock>
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
    </TodoListBlock> */}

    {/* <TodoListBlock>
    {chList && <p>Challenge Todo-List</p>}
    {chList && chList.map(chTodos => (
      chTodos.todoList.map(chTodo => 
        <>
        <ChallTodoItem
        key={chTodo.todoNo}
        chTodo={chTodo}
        onToggle={onToggle}
        />
        </>
      )
    ))}
    </TodoListBlock> */}


    </>
  );
}


export default TodoList;
