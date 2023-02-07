// import React from 'react'

// import { connect } from 'react-redux';
// import Menubar2 from '../ToDoListPage/menubar/Menubar2'; //커넥트 시켜줄 컴포넌트
// import { pickTodo2 } from '../reducer/page';  //커넥트에 커넥트 시킬 리덕스


// const pageContainer = ({ pickTodo2 }) => {
//     return (
//         <Menubar2 onPickTodo={pickTodo2}/>
//     );
// };

// export default connect(
//     state => ({
//         menuList : state.page,
//     }),
//     dispatch => ({
//         pickTodo: () => dispatch(pickTodo2()),
//     })
// )(pageContainer);