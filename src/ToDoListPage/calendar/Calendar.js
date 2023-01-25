import React, {useState} from 'react'
import './Calendar.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment';

//캘린더 라이브러리 추가 해주기
//npm install react-calendar
//npm install moment --save

function Calendar2() {
  const [todoDate, setValue] = useState(new Date());
  console.log(todoDate)

  // const todoDate = {
  //   date : new Date()
  // }

  // onSelectDate = date => {
  //   setTodoDate({
  //     date : moment(date).format("YYYY년 MM월 DD일")
  //   })
  // }
  return (
    <div>
      <Calendar onChange={setValue} todoDate={todoDate}/>
      <div>
        {moment(todoDate).format("YYYY년 MM월 DD일")} 
      </div>
    </div>
  );

}

export default Calendar2;