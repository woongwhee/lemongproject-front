import React from "react";
import styled from "styled-components";
import TodoItem from "./ToDoListItem";
import { useEffect, useState } from "react";
import axios from "axios";
 
const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-x: auto;
`;
 
function TodoList() {

    // const[todo, setTodo] = useState();

    // const fetchTodo = async() => {
    //     const res = await axios.get("/api/todo/getTodo");
    //     console.log(res);
    //     setTodo(res.data[0]);
    // }

    // useEffect(
    //     () => {
    //         fetchTodo();
    //         return
    //     },[]
    // )

    return (
        <TodoListBlock>
            <TodoItem text="프로젝트 생성하기" done={true} />
            <TodoItem text="컴포넌트 스타일링 하기" done={true} />
            <TodoItem text="Context 만들기" done={false} />
            <TodoItem text="기능 구현하기" done={false} />
        </TodoListBlock>
    );
}
 
export default TodoList;