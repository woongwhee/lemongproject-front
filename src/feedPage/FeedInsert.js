import React, { useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FeedPhoto from "./FeedPhoto";
import FeedPictureInsert from "./FeedPictureInsert";


function FeedInsert() {
    const [userNo, SetUserNo] = useState();
    const [content, SetContent] = useState("");

    const [insertPhotoNo, setInsertPhotoNo] = useState([]);

    const getPhotoNo = (getPhotoNo) => {
        setInsertPhotoNo(getPhotoNo);
    }

    const [key, setKey] = useState('home'); // css useState
    return (
        <div className="feed-insert" >
            <div className="feed-insert-body">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3">
                    <Tab eventKey="home" title="사진">
                        <FeedPictureInsert getPhotoNo={getPhotoNo}></FeedPictureInsert>
                        <h1>{insertPhotoNo}</h1>
                    </Tab>
                    <Tab eventKey="profile" title="피드내용">
                        <p>아이디</p>
                        <input onChange={(e) => {SetUserNo(e.target.value);}}/>
                        <p>피드 내용</p>
                        <input onChange={(e) => {SetContent(e.target.value);}}/>
                        <br/>
                    </Tab>
                </Tabs>
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