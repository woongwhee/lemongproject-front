import React from 'react'
import './Menubar.css'
import { Component } from 'react';
//tab 기능 import(todolist/Feed/Challenge/Template)
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

class Menubar extends Component{

  constructor(props){
      super(props);
      this.state = {
          TabState: 1
      }
      
  }

  toggle = (tabNum) => {
      if(this.state.TabState !== tabNum) this.setState({TabState : tabNum});
      //탭 클릭시 state안의 tabState에 저장되어 있는 값과 tabNum이 일치하지 않으면 클릭한 탭이 표시되도록 번호를 저장
  }

  render(){
    return(
      <div className='menubar-box'>
        <Nav tabs>
          <NavItem>
            <NavLink onClick={() => {this.toggle("1")}}>ToDoList</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => {this.toggle("2")}}>Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => {this.toggle("3")}}>Challenge</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => {this.toggle("4")}}>Template</NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.TabState}>
          {/*
            변경된 상태값을 <TabContent>태그의 activeTab속성에 할당함
            activeTab에 저장된 값과 TabPane의 id와 비교하여 일치하는 영영을 표시해줌
          */}
          <TabPane tabId="1"><h1>여기 투두페이지</h1></TabPane>
          <TabPane tabId="2"><h1>여기 피드페이지</h1></TabPane>
          <TabPane tabId="3"><h1>여기 챌린지페이지</h1></TabPane>
          <TabPane tabId="4"><h1>여기 템플릿페이지</h1></TabPane>
        </TabContent>
      </div>
    )
  }

}

export default Menubar;