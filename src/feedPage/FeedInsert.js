import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedInsert.css'
import Button from "react-bootstrap/Button";


function FeedInsert() {
    const [id, SetId] = useState();
    const [content, SetContent] = useState("");

    return (
        <div className="feed-insert" >
            <div className="feed-insert-body">
                <p>아이디</p>
                <input onChange={(e) => {SetId(e.target.value);}}/>

                <p>사진</p>
                <input type="file" accept="image/*"/>
                <img src="" height="200" alt="이미지 미리보기..." />
                {/*<Uploader></Uploader>*/}

                <p>피드 내용</p>
                <input onChange={(e) => {SetContent(e.target.value);}}/>
                <br/>
            <Button variant="primary" style={{float:"right"}} onClick={
                () => {
                axios.post('api/feed/insert', {
                    userNo:id,
                    feedContent:content
                    }).then(function (res){
                        console.log(res.data);
                    }).catch(function () {
                        console.log('실패함' + id, content)
                    })
                }}
            >전송</Button>
            </div>
        </div>
    );

}


export default FeedInsert;