import React, {useState} from 'react'
import './Calendar.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';

//캘린더 라이브러리 추가 해주기
//npm install react-calendar
//npm install moment --save

//redux 추가
//npm install react-redux

function Calendar2(props) {
  //기본적으로 캘린더가 선택할 수 있게 넣어줄 value이다.
  const [value, setValue] = useState(new Date());
 
  const dispatch = useDispatch();

  //문자열 타입으로 변환하여 전달
  // const onSelectDay = e => {
  //   dispatch(
  //     { type : 'SELECTDAY' , payload : moment(e).format('YYYY년 MM월 DD일')},
  //   )
  // }

  //date타입으로 그대로 전달
  const onSelectDay = e => {
    dispatch(
      { type : 'SELECTDAY' , payload : {selectDay : e}},
    )
  }

  return (
    <div>
      {/* onChange: 값이 변경 될 때마다 호출되는 함수로 
      날짜가 클릭될 때 onSelectDay 함수를 호출해주었다. 
      선택한 값은 event 값에 배열로 들어가게 된다. */}
      <Calendar onChange={onSelectDay} />
      {/* <div>
        {moment(value).format("YYYY년 MM월 DD일")} 
      </div> */}
    </div>
  );

}

export default Calendar2;