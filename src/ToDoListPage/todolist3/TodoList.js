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

function TodoList({todoList, setTodoList, chList, onDel, onToggle, onUpdate, onDelay}) {

//  const onDragStart = (res) => {
    //const originArr = todoList.map(todo => todo.todoNo);
    //arr.push(res.draggableId); //선택한 투두 no
    console.log(todoList);
    //console.log(res);
//  }
  
  const onDragEnd = (res) => {
    if (!res.destination) return;
    
    const dndTodoList = [...todoList];
    const [reorderedItem] = dndTodoList.splice(res.source.index, 1);
    dndTodoList.splice(res.destination.index, 0, reorderedItem);
    setTodoList(dndTodoList);
    console.log(dndTodoList);

    //const changeArr = todoList.map(todo => todo.todoNo);

    // console.log("시작 인덱스"+res.source.index);
    // console.log("도착 인덱스"+res.destination.index);
    //console.log(res);
    //console.log(res.source);
    //console.log(res.destination);
    //console.log(dndTodoList);

    // const originValue = res.source.index;
    // const changeValue = res.destination.index;

    // todoList.map((todo,res)=>{
    //   if(todo.todoNo=== res.destination){
    //     todo.value = changeValue;
    //   }
    // })

    // axios.get('api/todo/dndTodos', {
    //   params : { dndTodoNo : res.draggableId,
    //               value : res.destination.index }
    // }).then(function(){
    //   console.log("최종"+arr);
    //   console.log("dnd 완료");
    // }).catch(function(){
    //   console.log("dnd 실패")
    // })

    axios.post('api/todo/dndTodo3', ({
       dndTodoList : dndTodoList 
    })).then(function(){
      console.log("dnd 완료");
    }).catch(function(){
      console.log("dnd 실패")
    })

    // axios.post('api/todo/dndTodo', ({
    //  dndTodo : changeArr.join(',')
    // })).then(function(){
    //   console.log("최종"+arr);
    //   console.log("dnd 완료");
    // }).catch(function(){
    //   console.log("dnd 실패")
    // })

    
  }

  return ( 
    <>
    <p>Daily Todo-List</p>
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="drop-area">
        {provided => (
          <TodoListBlock {...provided.droppableProps} ref={provided.innerRef}>
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
