import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment/moment';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {todo} from '../../reducer/page';
import {codeHandler} from "../../util/apiUtil";
import TitleContent from "./TitleContent";
import {isEmpty} from "../../util/typeUtile";

function Calendar2() {

    //날짜 선택 리덕스
    const dispatch = useDispatch();

    //date타입으로 그대로 전달
    //날짜 클릭시 dispatch로 변경 값이 전달된다.
  //date타입으로 그대로 전달
  //날짜 클릭시 dispatch로 변경 값이 전달된다.
  const selectDay = e => {
    dispatch(
      { type : 'SELECTDAY' , payload : {selectDay : e}},
    );
    dispatch({type:'menu'})
  };

    //데일리 투두 캘린더에 마크 표시
    const [mark, setMark] = useState([]);//챌린지 투두 캘린더에 마크 표시
    const [chMark, setChMark] = useState([]);
    const [holidayMark, setHdMark] = useState([]);
    // 투두 변동 시 캘린더 마크 변동
    const moveMark = useSelector(state => state.mark);
    const [month, setMonth] = useState(new moment(new Date()).format("MM"));//챌린지 투두 캘린더에 마크 표시

    //투두리스트가 존재하는 날짜 가져오기
    const calTodo = () => {
        axios.get("/api/todo/calTodo", {
            params: {userNo: 1},
        }).then(function (res) {
            setMark(res.data);
            //console.log("캘린더 데이터"+res.data);
        }).catch(function () {
            console.log("오류 발생")
        })
    }

    useEffect(() => {
        loadMark();
    }, [moveMark])



    //챌린지 삭제,완료시 캘린더 마크 변동
    const calChTodo = () => {
        axios.get("/api/chTodo/calChTodo"
        ).then(function (res) {
            setChMark(res.data);
            //console.log("캘린더 데이터"+res.data);
        }).catch(function (res) {
            console.log("오류 발생")
            console.log(res.data);
        })
    }
    const loadMark = async () => {
        let month = new moment(new Date).format("YYMMDD");
        const res = await axios.get(`/api/todo/getMonth/${month}`);
        let {challengeDayList, holidayList, todoDayList} = codeHandler(res);
        setChMark(challengeDayList);
        setMark(todoDayList);
        setHdMark(holidayList);
    }
    const onViewChange = async ({activeStartDate}) => {
        let month = new moment(activeStartDate).format("YYMMDD");
        setMonth(activeStartDate.getMonth());
        const res = await axios.get(`/api/todo/getMonth/${month}`);
        let {challengeDayList, holidayList, todoDayList} = codeHandler(res);
        setChMark(challengeDayList);
        setMark(todoDayList);
        setHdMark(holidayList);
    }
    return (
        <div>
            {/* onChange: 값이 변경 될 때마다 호출되는 함수로
      날짜가 클릭될 때 onSelectDay 함수를 호출해주었다. 
      선택한 값은 event 값에 배열로 들어가게 된다. */}
            <Calendar
                onChange={selectDay} //선택한 날짜 todolist에 보내기
                formatDay={(locale, date) => moment(date).format("DD")} //달력날짜에 '일' 삭제
                tileContent={(e) => {
                    let date=e.date;
                    if(date.getMonth()!=month||isEmpty(mark)&&isEmpty(chMark)&&isEmpty(holidayMark)){
                        return (<></>)
                    }
                    return(<TitleContent chMark={chMark} Mark={mark} hdMark={holidayMark} day={date.getDate()}/>)

                }}

                onActiveStartDateChange={onViewChange}
                onClickDay={() => dispatch(todo())}
            />
        </div>
    );

}

export default React.memo(Calendar2);