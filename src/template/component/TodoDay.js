import React from 'react';

const TodoDay = ({todoList,day}) => {
    return (
        <div className="days" data-day={day} id={"day"+day}>
            <p className="dayCount">{day}일</p>
            {
                todoList?.map((todo,i)=>{
                    return(<p className="content" date-day={day}>{i+1+"."}{todo.content}</p>)
                })
            }
        </div>
    );
};

export default TodoDay;
