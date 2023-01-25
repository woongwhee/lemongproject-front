import React, { useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FeedPhoto from "./FeedPhoto";
import FeedPicture from "./FeedPicture";


function FeedInsert() {
    const [id, SetId] = useState();
    const [content, SetContent] = useState("");
    const [key, setKey] = useState('home');
    return (
        <div className="feed-insert" >
            <div className="feed-insert-body">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3">
                    <Tab eventKey="home" title="사진">
                        <FeedPicture></FeedPicture>
                    </Tab>
                    <Tab eventKey="profile" title="피드내용">
                        <p>아이디</p>
                        <input onChange={(e) => {SetId(e.target.value);}}/>
                        <p>피드 내용</p>
                        <input onChange={(e) => {SetContent(e.target.value);}}/>
                        <br/>
                    </Tab>
                </Tabs>
                    <Button variant="primary" style={{float:'right', marginTop:'20%'}} onClick={
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