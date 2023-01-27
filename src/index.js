import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyPage } from './mypage/MyPage';
import MyPageUpdate from './mypage/MyPageUpdate';
import TemplateCard from './component/Template/TemplateCard';
// import MainPage from './mainPage/MainPage'
import MyPageProfile from './mypage/MyPageProfile';
import MyPagePwdCheck from './mypage/MypagePwdUpdate';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MyFeedDetails from './mypage/MyFeedDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  // <MainPage/>

 <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
          <Route path='MyFeedDetails' element={<MyFeedDetails/>}>

          </Route>
          <Route path='MyPageUpdate' element={<MyPageUpdate/>}>

          </Route>
      </Routes>
 </BrowserRouter>

  // <>
  // {/* // // <TemplateCard></TemplateCard> */}
  // // {/* <MyPageUpdate/> */}
  // {/* // <MyPageProfile/> */}
  // // {/* <MyPagePwdCheck/> */}
  // {/* </> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
