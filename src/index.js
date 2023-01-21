import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyPage } from './mypage/MyPage';
import MainPage from './mainPage/MainPage'
import App from "./App";
import FeedBody from "./feedPage/FeedBody";
import FeedInsert from "./feedPage/FeedInsert";
import FeedMenu from "./feedPage/FeedMenu";
import Uploader from "./feedPage/Uploader";
import FeedReplyInsert from "./feedPage/FeedReplyInsert";
import FeedReplyList from "./feedPage/FeedReplyList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Feed></Feed>
    // <App></App>
    // <FeedInsert/>
    <FeedMenu></FeedMenu>
    // <Uploader/>
    // <FeedReplyInsert/>
    // <FeedReplyList></FeedReplyList>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
