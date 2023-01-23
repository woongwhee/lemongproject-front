import React, {useState} from 'react';
import './Feed.css'
import Modal from 'react-modal'
import FeedReplyInsert from './FeedReplyInsert';
import FeedUpdate from "./FeedUpdate";
function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt}=props;

    const [isOpen, setOpen] = useState(false);
    const openClick = () => {
        setOpen(true);
    };
    const closeClick = () => {
        setOpen(false);
    };


    const [like, setLike] = useState(0)

    return (
        <div className="te">
            <div className="a">
                <p>피드시간 : {feedAt}</p>
                <FeedUpdate feedNo={feedNo}feedContent={feedContent}/>
                <button>삭제하기</button>
            </div>

            <div className="b">
                <p>피드번호 : {feedNo}</p>
                {/*<img src={feedImg} alt="feedImg"/>*/}

            </div>
            <div className="f">
                <span className="c">
                    <span>이름 : {userNo}</span>
                </span>

                <span className="d">

                    <button onClick={ () => {setLike(like + 1); }}> ♡ </button>
                    <span>좋아요수 : {like}</span> <br/>

                    <button onClick={openClick}>📢</button>
                    <Modal isOpen={isOpen} feedNo={feedNo}
                           ariaHideApp={false} >
                        <button onClick={closeClick}>모달 닫기</button>
                            <FeedReplyInsert feedNo={feedNo}/>
                    </Modal>
                </span>
            </div>
            <div className="e">
                <p>피드내용 : {feedContent}</p>
            </div>
        </div>
    );
}

export default Feed;