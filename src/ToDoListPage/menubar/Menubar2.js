import React, { Component } from "react";
import './Menubar2.css';
import FeedList from "./FeedList";
import ChallengeList from "./ChallengeList";
import TemplateView from "./TemplateView";
import TodoView3 from "../todolist3/TodoView";

import { connect } from 'react-redux';
import { other, todo } from "../../reducer/page";

const menuList = {
  0: <TodoView3 />,
  1: <FeedList />,
  2: <ChallengeList />,
  3: <TemplateView />
}


class Menubar2 extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      menu: 0,
    };
  }

  changeMenu = (menuIndex) =>{
    this.setState({menu : menuIndex});
  }


  render(){
    const pickTodo = this.props.menuList2;
    //console.log("pick me:"+ pickTodo);
    const {other} = this.props;

    return(
      <div className="menubar-box">
        <div className="menuBar">
          <ul className="tabs">
            {pickTodo ? 
            <>
            <li className="active" >TodoList</li>
            <li className="" onClick={() => {this.changeMenu(1); other();}}>Feed</li>
            <li className="" onClick={() => {this.changeMenu(2); other();}}>Challenge</li>
            <li className="" onClick={() => {this.changeMenu(3); other();}}>Template</li>
            </>
            : 
            <>
            <li className={`${this.state.menu === 0? 'active': ''}`} onClick={() => this.changeMenu(0)}>TodoList</li>
            <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => {this.changeMenu(1); other();}}>Feed</li>
            <li className={`${this.state.menu === 2? 'active': ''}`} onClick={() => {this.changeMenu(2); other();}}>Challenge</li>
            <li className={`${this.state.menu === 3? 'active': ''}`} onClick={() => {this.changeMenu(3); other();}}>Template</li>
            </>
            }
          </ul>
        </div>
        {pickTodo ? 
        <div className="contentArea">
          {menuList[0]}
        </div> 
        :
        <div className="contentArea">
          {menuList[this.state.menu]}
        </div>
       } 
      </div>
    )
  }
}

//mapStateToProps함수를 이용해 state props값을 가져온다.
const mapStateToProps = state => {
  //console.log("메뉴바"+state.page.menuList2);
  return{
    menuList2 : state.page.menuList2,
  }
};

const mapDispatchToProps = (dispatch) => ({
  todo : () => dispatch(todo()),
  other: () => dispatch(other()),
});

//클래스 컴포넌트에서는 useSelector대신 connect로 state값을 가져와야한다.
export default connect(mapStateToProps, mapDispatchToProps)(Menubar2);