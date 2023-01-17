import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyPage } from './mypage/MyPage';
import MainPage from './mainPage/MainPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <MainPage/>
  <MyPage/>
=======
  // <React.StrictMode>
  //   <MainPage/>
  // </React.StrictMode>
>>>>>>> 68070044ecab981d1b157de8a28646eb8bc05240
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
