import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import Button from "react-bootstrap/Button";
import FeedPictureInsert from "./FeedPictureInsert";
import FeedUpdate from "./FeedUpdate";


function FeedInsert() {
    const [userNo, SetUserNo] = useState();
    const [content, SetContent] = useState("");

    const [insertPhotoNo, setInsertPhotoNo] = useState([]);

    // const getPhotoNo = (getPhotoNo) => {
    //     setInsertPhotoNo(getPhotoNo);
    // }
    return (
        <div className="feed-insert" >
            <div className="feed-insert-body">
            <FeedPictureInsert setInsertPhotoNo={setInsertPhotoNo}></FeedPictureInsert>
            <h1>{insertPhotoNo}</h1>

            <p>아이디</p>
            <input onChange={(e) => {SetUserNo(e.target.value);}}/>
            <p>피드 내용</p>
            <input onChange={(e) => {SetContent(e.target.value);}}/>
            <br/>

            <Button className="feed-insert-button" variant="success" onClick={
                () => {
                axios.post('api/feed/insert', {
                    userNo:userNo,
                    feedContent:content,
                    photoNo:insertPhotoNo
                    }).then(function (res){
                        console.log(res.data);
                        window.location.reload();
                    }).catch(function () {
                        console.log('실패함' + userNo, content)
                    })
                }}
            >전송</Button>

            </div>

        </div>
    );

}


export default FeedInsert;