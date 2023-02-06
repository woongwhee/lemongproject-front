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
import reducer from "./ToDoListPage/reducer";
import {LoginProvider} from "./Member/LoginContext";
const store = createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <Provider store={store}>
    <Routes>
        <Route path="/" element={<LoginProvider><App/></LoginProvider>} />
      <Route path="join" element={<Join />} />
      <Route path="findPwd" element={<FindPwd />} />
      <Route path="kakao" element={<KakaoLogin />} />
    </Routes>
    </Provider>
    </BrowserRouter>
);
