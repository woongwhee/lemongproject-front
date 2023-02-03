import React from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import 'moment/locale/ko';
import Calendar2 from '../calendar/Calendar';
import { useSelector } from 'react-redux';

const TodoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TasksLeft = styled.div`
  color: #20c997;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

function TodoDate() {

  const selectDay = useSelector((state) => state.date.selectDay)
  //console.log(selectDay);
 

  return (
    <TodoHeadBlock>
      <h1>{moment(selectDay).format('MM월 DD일')}</h1>
      <div className="day">{moment(selectDay).format('ddd요일')}</div>
      {/* <div className="tasks-left">할 일 2개 남음</div> */}
    </TodoHeadBlock>
  );
}

export default React.memo(TodoDate);
