// import React, { Component } from "react";
// import './Menubar2.css';
// import FeedList from "./FeedList";
// import ChallengeList from "./ChallengeList";
// import TemplateView from "./TemplateView";
// import TodoView3 from "../todolist3/TodoView";
// import { useSelector } from "react-redux";
// // import Menubar3 from "./Menubar3";
// import { MyPage } from "../../mypage/MyPage";
//
// import { useLoginState } from "../../Member/LoginContext";
//
// //const selectTodo = useSelector(state => state.value);
//
//
// const menuList = {
//   0: <TodoView3 />,
//   1: <FeedList />,
//   2: <ChallengeList />,
//   3: <TemplateView />
// }
//
//
// class Menubar2 extends Component{
//
//   constructor(props) {
//     super();
//
//     this.state = {
//       menu: 4,
//     };
//   }
//
//   changeMenu = (menuIndex) =>{
//     this.setState({menu : menuIndex});
//   }
//
//   render(){
//     return(
//         // <Menubar3></Menubar3>
//       <div className="menubar-box">
//         <div className="menuBar">
//           <ul className="tabs">
//             {pickTodo ?
//             <>
//             <li className="active" >TodoList</li>
//             <li className="" onClick={() => {this.changeMenu(1); other();}}>Feed</li>
//             <li className="" onClick={() => {this.changeMenu(2); other();}}>Challenge</li>
//             <li className="" onClick={() => {this.changeMenu(3); other();}}>Template</li>
//             </>
//             :
//             <>
//             <li className={`${this.state.menu === 0? 'active': ''}`} onClick={() => this.changeMenu(0)}>TodoList</li>
//             <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => {this.changeMenu(1); other();}}>Feed</li>
//             <li className={`${this.state.menu === 2? 'active': ''}`} onClick={() => {this.changeMenu(2); other();}}>Challenge</li>
//             <li className={`${this.state.menu === 3? 'active': ''}`} onClick={() => {this.changeMenu(3); other();}}>Template</li>
//             </>
//             }
//           </ul>
//         </div>
//         {pickTodo ?
//         <div className="contentArea">
//           {menuList[0]}
//         </div>
//         :
//         <div className="contentArea">
//           {menuList[this.state.menu]}
//         </div>
//        }
//       </div>
//     )
//   }
// }
//
// //mapStateToProps함수를 이용해 state props값을 가져온다.
// const mapStateToProps = state => {
//   //console.log("메뉴바"+state.page.menuList2);
//   return{
//     menuList2 : state.page.menuList2,
//   }
// };
//
// const mapDispatchToProps = (dispatch) => ({
//   todo : () => dispatch(todo()),
//   other: () => dispatch(other()),
// });
//
// //클래스 컴포넌트에서는 useSelector대신 connect로 state값을 가져와야한다.
// // export default connect(mapStateToProps, mapDispatchToProps)(Menubar2);