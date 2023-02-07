import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Join from './Member/Join';

import {MyPage} from './mypage/MyPage';
import MyPageUpdate from './mypage/MyPageUpdate';

import ChallengeRoomCreate from './challengeChat/challengeRoomCreate';
import ChallengeChatRoom from './challengeChat/challengeChatRoom';
import FeedInsert from './feedPage/FeedInsert';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="join" element={<Join/>}/>
      <Route path="mypage" element={<MyPage />}/>
      <Route path="MypageUpdate" element={<MyPageUpdate />}/>
      <Route path="ChallengeRoomCreate" element={<ChallengeRoomCreate />}/>
      <Route path="FeedInsert" element={<FeedInsert />}/>
    </Routes>
  </BrowserRouter>

  // <ChallengeChatRoom/>


  // 페이지 자체가 이동하는 코드
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //     <Route path="expenses" element={<Expenses />} />
  //     <Route path="invoices" element={<Invoices />} />
  //     <Route path="expenses/home" element={<Home />} />
  //     {/* 페이지 내에 Link 이동을 할 때도 여기다 작성해줘야 한다. */}
  //   </Routes>
  // </BrowserRouter>

  // 페이지 내에서 컴포넌트만 변경
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} >
  //       <Route path="expenses" element={<Expenses />} />
  //       <Route path="invoices" element={<Invoices />} >
  //         <Route path=":invoiceId" element={<Invoice />} />
  //       </Route>
  //     </Route>
  //   </Routes>
  // </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
