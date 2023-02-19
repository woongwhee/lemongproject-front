import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLoginState} from "../member/LoginContext";
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import FeedDetailView from "../feed/FeedDetailView";

// import './MyPage.css';

function MyFeed(props) {

    const [myFeedList , setMyFeedList] = useState([]);
    const [show, setShow] = useState(false);

    const userNos = useSelector((state) => state.menu.userNo);

    const [currentFeed,setCurrentFeed]=useState({});

    let {profile}=useLoginState();
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    useEffect(
        () => {
            axios.get("api/feed/selectMyFeedList" , {
                params:{
                    userNo : userNos != null ? userNos : userNo,
                }
            }).then(function(res){
                setMyFeedList(parseFeedList(res.data.result));
            }).catch(function(){
                console.log("데이터 전송 실패")
            })
        } , [userNos != null ? userNos : userNo]
    )
    const parseFeedList=(result)=>{
        return result.map(e=>{
            e.filePathList=e.filePath.split(",");
            e.photoNoList=e.photoNo.split(",")
            return e;
        })

    }
    console.log(currentFeed)

    const openFeed=(feed)=>{
        setCurrentFeed(feed);
        setShow(true);
    }

    let i = 0;
    return (
        <>
            <div className='outer_Feed' style={{overflow:'scroll'}}>
                {myFeedList.map(Feed=> (<div style={{border:'1px solid black' , width:'32.5%' , height:'32.5%' , marginLeft:'5.8px' , marginTop:'5.8px' , float:'left'}}>
                    <img className='clickFeed' src={Feed.filePathList[0]} style={{width:"100%", height:"100%"}} onClick={() => {openFeed(Feed)}}/>
                </div>))}
            </div>
        <Modal
            style={{borderRadius:'0px'}}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    디테일
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<FeedReplyInsert feedNo={feedNo}/>*/}
                <FeedDetailView Feed={currentFeed}></FeedDetailView>
            </Modal.Body>
        </Modal>
    </>
    );
}

export default MyFeed;