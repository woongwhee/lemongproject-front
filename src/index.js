import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";
import Join from './Member/Join';
import FindPwd from './Member/FindPwd';
import KakaoLogin from './Member/KakaoLogin';
import {LoginProvider} from "./Member/LoginContext";
import SetNick from './Member/SetNick';
import NaverLogin from './Member/NaverLogin';
import NaverLoginBtn from './Member/NaverLoginBtn';
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
        <Route path="kakao" element={<KakaoLogin />} />
        <Route path="setNick" element={<SetNick />} />
        <Route path='naverBtn' element={<NaverLoginBtn />} />
        <Route path='naver' element={<NaverLogin />} />
        <Route path="FeedInsert" element={<FeedInsert />}/>
        <Route path="mypage" element={<MyPage />}/>
        <Route path="MypageUpdate" element={<LoginProvider><MyPageUpdate /></LoginProvider>}/>
        <Route path="ChallengeRoomCreate" element={<LoginProvider><ChallengeRoomCreate /></LoginProvider>}/>
    </Routes>
    </Provider>
  </BrowserRouter>


);
