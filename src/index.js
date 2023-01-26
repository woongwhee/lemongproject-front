import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FeedMenu from "./feedPage/FeedMenu";
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Test from './feedPage/test';
import Test1 from './feedPage/test1.js';
import Login from "./Member/Login";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    // <Test></Test>
    <Login></Login>
    // <Test1></Test1>
    // <FeedMenu></FeedMenu>

);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
