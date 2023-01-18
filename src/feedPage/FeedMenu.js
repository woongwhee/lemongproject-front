import React, {useState} from 'react';
import Feed from "./Feed";
import FeedInsert from "./FeedInsert";
import FeedBody from "./FeedBody";
import './FeedMenu.css'
function FeedMenu(props) {

    const [feedpage,setFeedPage]=useState(true);
    const [feedInsert,setFeedInsert]=useState(false);



    const pageOn=()=>{
        setFeedPage(true);
        setFeedInsert(false);
    }
    const insertOn=()=>{
        setFeedPage(false);
        setFeedInsert(true);
    }



    if (feedpage){return (
        <div id="header">
            <button onClick={pageOn}>피드메인</button>
            <button onClick={insertOn}>Feed Insert</button>
            <FeedBody/>
        </div>
    );}
    if (feedInsert){return (
        <div id="header">
            <button onClick={pageOn}>피드메인</button>
            <button onClick={insertOn}>Feed Insert</button>
            <FeedInsert/>
        </div>
    );}
}

export default FeedMenu;