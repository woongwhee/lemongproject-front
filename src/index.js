import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";
import Join from './member/Join';
import FindPwd from './member/FindPwd';
import KakaoLogin from './member/KakaoLogin';
import {LoginProvider} from "./member/LoginContext";
import SetNick from './member/SetNick';
import NewPwd from './member/NewPwd';

import NaverLoginBtn from './member/NaverLoginBtn';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from "./reducer";

import {MyPage} from './mypage/MyPage';
import MyPageUpdate from './mypage/MyPageUpdate';
import Chat from './challengeChat/testChating';

import ChallengeRoomCreate from './challengeChat/challengeRoomCreate';
import ChallengeChatRoom from './challengeChat/challengeChatRoom';
import FeedInsert from './feedPage/FeedInsert';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducer);
root.render(
    <BrowserRouter>
    <Provider store={store}>
    <Routes>
        <Route path="/" element={<LoginProvider><App/></LoginProvider>} />
        <Route path="join" element={<Join />} />
        <Route path="findPwd" element={<FindPwd />} />
        <Route path="newPwd" element={<NewPwd />} />
        <Route path="kakao" element={<KakaoLogin />} />
        <Route path="setNick" element={<SetNick />} />
        <Route path='naver' element={<NaverLoginBtn />} />
        <Route path="FeedInsert" element={<FeedInsert />}/>
        <Route path="mypage" element={<MyPage />}/>
        <Route path="MypageUpdate" element={<LoginProvider><MyPageUpdate /></LoginProvider>}/>
        <Route path="ChallengeRoomCreate" element={<LoginProvider><ChallengeRoomCreate /></LoginProvider>}/>
    </Routes>
    </Provider>
  </BrowserRouter>

);
