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
import reducer from "./reducer";
import {LoginProvider} from "./Member/LoginContext";
import SetNick from './Member/SetNick';
import NaverLogin from './Member/NaverLogin';
import NaverLoginBtn from './Member/NaverLoginBtn';
import 'bootstrap/dist/css/bootstrap.css';

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
    </Routes>
    </Provider>
  </BrowserRouter>


);
