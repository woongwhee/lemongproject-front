import React from "react";
import styled from "styled-components";
 
const TodoTemplateBlock = styled.div `
    width: 512px;
    max-width : 100%;
    height: 726px;
    max-height : 100%;
 
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
    box-shadow: 0 0 38px #e9ecef;
    box-shadow: 0 0 38px #dadee1;
 
    margin: 0 auto;
 
    margin-top: 46px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
`;

 
function TodoTemplate({ children }) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>
}
 
export default TodoTemplate;