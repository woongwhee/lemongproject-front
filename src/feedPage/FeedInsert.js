import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 액시오스

function FeedInsert() {
    const [id, SetId] = useState();
    const [content, SetContent] = useState("");
    const [picture, SetPicture] = useState("");

    return (
        <div>
            <p>아이디</p>
            <input onChange={(e) => {SetId(e.target.value);}}/>
            <p>사진</p>
            <input onChange={(e) => {SetPicture(e.target.value);}}/>
            <p>피드 내용</p>
            <input onChange={(e) => {SetContent(e.target.value);}}/>
            <br/>
    <button onClick={ () => {
        axios.get('api/feed/insert', {
                params: {
                    id: id,
                    picture: picture,
                    content: content
                }
            }).catch(function () {
                console.log('실패함')
            })
        }}
    >전송</button>

        </div>
    );

}


export default FeedInsert;