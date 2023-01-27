import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FeedMenu from "./feedPage/FeedMenu";
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Test from './feedPage/test';
import Test1 from './feedPage/test1.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';
import Join from './Member/Join';
import FindPwd from './Member/FindPwd';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    // <Test></Test>
    // <Test1></Test1>
    <FeedMenu></FeedMenu>
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<App />} />
    //         <Route path="join" element={<Join />} />
    //         <Route path="findPwd" element={<FindPwd />} />
    //         <Route path="feedMenu" element={<FeedMenu/>}/>
    //     </Routes>
    // </BrowserRouter>

);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
