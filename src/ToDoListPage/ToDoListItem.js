import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
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
 
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
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
    ${props =>
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `}
`;
 
const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `}
`;

// const[todo,setTodo]=useState();

// const fetchTodo=async()=>{
//     const response = await axios.get("/api/todo/getone");
//     setTodo(response.data);
// }

// useEffect(
//     ()=>{
//         fetchTodo();
//         return 
//     },[]
// )
 
function TodoItem({ id, done, text }) {

    const[todo, setTodo] = useState();

    const fetchTodo = async() => {
        const res = await axios.get("/api/todo/getTodo");
        console.log(res);
        setTodo(res.data[0]);
    }

    useEffect(
        () => {
            fetchTodo();
            return
        },[]
    )

    return (
        <TodoItemBlock>
            <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
            <Text done={done}>{todo.todoContent}</Text>
            <Remove>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}
 
export default TodoItem;