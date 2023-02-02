import React, {useState} from 'react'
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import axios from "axios";

//캘린더 라이브러리 추가 해주기
//npm install react-calendar
//npm install moment --save

//redux 추가
//npm install react-redux

//useQuery설치
//npm install react-query

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

  //날짜 데이터 저장
  const [mark, setMark] = useState([]);

  //투두리스트가 존재하는 날짜 가져오기
  const calTodo = async() => {
    try{
      const res = await axios.get("/api/todo/calTodo" , {
        params : {userNo : 1},
      });
      setMark(res.data)
      //console.log("캘린더 데이터"+res.data)
    } catch(res){
      console.log("전송 실패")
    }
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