import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Join from './Member/Join';
import FindPwd from './Member/FindPwd';

// import Expenses from './testingPage/Expenses';
// import Invoices from './testingPage/Invoices';
// import Home from './testingPage/Home';
// import Invoice from './testingPage/Invoice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="join" element={<Join />} />
      <Route path="findPwd" element={<FindPwd />} />
    </Routes>
  </BrowserRouter>


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
// reportWebVitals();

// export default axios.create({
//   baseURL : "http://localhost:50000",
//   header: {
//     Authorization: 'bearer accessKey'
//   }
// });

