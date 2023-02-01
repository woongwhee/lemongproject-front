import React, {useState} from 'react'
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';

//캘린더 라이브러리 추가 해주기
//npm install react-calendar
//npm install moment --save

//redux 추가
//npm install react-redux

function Calendar2() {
  //기본적으로 캘린더가 선택할 수 있게 넣어줄 value
  const [value, setValue] = useState(new Date());
 
  const dispatch = useDispatch();

  //date타입으로 그대로 전달
  //날짜 클릭시 dispatch로 변경 값이 전달된다.
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
    </div>
  );

}

export default Calendar2;