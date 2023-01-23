import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";

function FeedUpdate(props) {
    const [isOpen, setOpen] = useState(false);
    const openClick = () => {
        setOpen(true);
    };
    const closeClick = () => {
        setOpen(false);
    };
    const feedNo = props.feedNo;
    const content = props.feedContent
    const [newContent, setContent] = useState('');


    return (
        <>
        <button onClick={openClick}>업데이트</button>
        <Modal isOpen={isOpen} ariaHideApp={false} >
            <div>
            <button onClick={closeClick}>모달 닫기</button>
            </div>
            <div>
            원래 피드 내용 : {content} <br/>
            새로운 피드 내용 : <input type="text" onChange={(e)=> {setContent(e.target.value);}}/>
            </div>
            <button onClick={
                () => {axios.post(
                'api/feed/updateFeed',
                {feedNo:feedNo, feedContent:newContent}
                ).catch(function () {
                    console.log('실패함')
                    console.log(feedNo);
                    console.log(newContent);
                }).then(function (res){
                    console.log(res.data)
                    alert('업테이트성공')
                })
                }}>수정하기</button>
        </Modal>
        </>
    );
}

export default FeedUpdate;
