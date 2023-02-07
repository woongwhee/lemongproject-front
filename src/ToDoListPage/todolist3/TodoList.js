import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import ChallTodoItem from './ChallTodoItem';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({todoList, setTodoList, chList, onDel, onToggle, onToggleCh, onUpdate, onDelay}) {

  //const chTodos = chList[0].todoList;
  //console.log(chTodos);
  let arr = [];
  const onDragStart = () => {
    arr.push(todoList);
    // console.log("기존리스트"+arr);
  }
  
  const onDragEnd = (res) => {
    console.log(res);
    if (!res.destination) return;
    
    const dndTodoList = [...todoList];
    const [reorderedItem] = dndTodoList.splice(res.source.index, 1);
    dndTodoList.splice(res.destination.index, 0, reorderedItem);
    setTodoList(dndTodoList);

    //console.log(dndTodoList);
    arr.push(dndTodoList);
    //console.log("추가 후"+arr);

    axios.post('api/todo/dndTodo', {
      originArr : arr[0],
      changeArr : arr[1],
    }).then(function(){
      //setTodoList(dndTodoList);
      arr = [];
      console.log("최종"+arr);
      console.log("dnd 완료");
    }).catch(function(){
      console.log("dnd 실패")
    })
    
  }

  return ( 
    <>
    <p>Daily Todo-List</p>
    <DragDropContext onDragStart={(res)=> onDragStart(res)} onDragEnd={onDragEnd} >
      <Droppable droppableId="drop-area">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}>
            {todoList && todoList.map((todo, index) =>(
              <Draggable draggableId={String(todo.todoNo)} index={todo.value} key={todo.todoNo}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TodoItem
                    key={todo.todoNo}
                    todo={todo}
                    onDel={onDel}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelay={onDelay}
                    index={todo.value}
                  />
                  </div>
                )}
              </Draggable>
              ))}
              {provided.placeholder} 

              {chList && chList.map(chTodos => (
                chTodos.todoList.map(chTodo => 
                  <ChallTodoItem
                  key={chTodo.todoNo}
                  chTodo={chTodo}
                  onToggleCh={onToggleCh}
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
