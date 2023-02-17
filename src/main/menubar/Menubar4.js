import React, {Component} from "react";
import './Menubar2.css';
import FeedList from "./FeedList";
import ChallengeList from "./ChallengeList";
import TemplateView from "./TemplateView";
import {useDispatch, useSelector} from "react-redux";
import {MENU_CHALLENGE, MENU_FEED, MENU_MY_PROFILE, MENU_TEMPLATE} from "../../reducer/menu";
import {MyPage} from "../../mypage/MyPage";
import TodoView3 from "../../todo/todolist3/TodoView";

const menuList = {
    0: <TodoView3/>,
    1: <FeedList/>,
    2: <ChallengeList/>,
    3: <TemplateView/>
}

const Menubar4 = (props) => {
    const menu = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const changeMenu = (index) => {
        dispatch({
            type: index
        })
    }
    const getContent=(index)=>{
        switch (index){
            case 0: return <TodoView3/>;
            case 1: return <FeedList/>;
            case 2:return  <ChallengeList/>;
            case 3: return <TemplateView/>;
            case 4: return <MyPage userNo={menu.menuParam} />;
        }
    }
    return (
        <div className="menubar-box">
            <div className="menuBar">
                <ul className="tabs">
                    <li className={`${menu.index === 1 ? 'active' : ''}`} onClick={() => changeMenu(MENU_FEED)}>Feed
                    </li>
                    <li className={`${menu.index === 2 ? 'active' : ''}`}
                        onClick={() => changeMenu(MENU_CHALLENGE)}>Challenge
                    </li>
                    <li className={`${menu.index === 3 ? 'active' : ''}`}
                        onClick={() => changeMenu(MENU_TEMPLATE)}>Template
                    </li>
                </ul>
                <button onClick={() => changeMenu(MENU_MY_PROFILE)}>응애</button>
            </div>
            <div className="contentArea">
                {getContent(menu.index)}
            </div>
        </div>
    )
}


export default Menubar4;