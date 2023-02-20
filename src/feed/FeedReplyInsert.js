import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import CloseButton from "react-bootstrap/CloseButton";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useLoginState} from "../member/LoginContext";
import "./FeedReply.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import swal from 'sweetalert';
import moment from "moment";

function FeedReplyInsert(props) {

    const Feed = props.Feed;
    // console.log(Feed);

    const feedNo = props.Feed.feedNo;

    const [replyContent, SetReplyContent] = useState(''); // CONTENT

    const [replyCount, setReplyCount] = useState(0) // REPLY CONTENT

const [ testStr, setTestStr ] = useState([]);

    props.setReplyCount(replyCount);

    let {profile} = useLoginState();
    let loginUserNo = profile.userNo




    // const deleteReplyAlert = (e, replyNo, feedNo) =>{
    //     if(res === "success"){
    //         return(
    //             swal({
    //             title: "댓글을 삭제 하시겠습니까?",
    //             text: "",
    //             icon: "warning",
    //             buttons: true,
    //             dangerMode: true,
    //         })
    //             .then((willDelete) => {
    //                 if (willDelete) {
    //                     swal("댓글이 삭제 되었습니다!", {
    //                         icon: "success",
    //
    //                     });
    //                 } else {
    //                     swal("댓글 삭제를 취소하셨습니다!");
    //                 }
    //             })
    //             )
    //     }else{
    //         return(swal("댓글 삭제를 취소하셨습니다!"))
    //     }
    // }

    const deleteReply = async (replyNo, feedNo) => {
        await axios.post('api/feed/deleteReply',
            {
                replyNo:replyNo,
                feedNo:feedNo
            }).then(function (res){
            // deleteReplyAlert(res.data.Java);
            getReplyList();
        })
    }

    //                                             댓글쓴사람
    const deleteReplyButton = (replyNo, feedNo, replyUserNo) =>{
        if(loginUserNo === replyUserNo){
            return(
                <CloseButton onClick={()=>{deleteReply(replyNo,feedNo)}}/>
            )
        }else{
            return(<p></p>)
        }
    }


    const deleteReplyManagerButton = (replyNo, feedNo) =>{
        if(loginUserNo === Feed.userNo){
            return(
                <IconButton aria-label="delete" size="small">
                    <DeleteForeverIcon fontSize="small" onClick={()=>{deleteReply(replyNo,feedNo)}}/>
                </IconButton>
            )
        }else{
            return(" ");
        }
    }

    const replyList2 = () =>{
        const result = [];
        for(let i =0; i<testStr.length; i++){
            result.push((
                <div key={i}>
                    <ListGroup.Item>
                        <div style={{marginLeft:"10px", height:"60px"}}>
                            {testStr[i].nickName} : {testStr[i].replyContent}
                            <div style={{float:"right"}}>
                                {deleteReplyButton(testStr[i].replyNo, feedNo, testStr[i].userNo)}
                            </div>
                            <div>
                                <div style={{float:"left"}}>{new moment(testStr[i].replyAt).format('YY.MM.DD HH:mm')}</div>
                                <div>{deleteReplyManagerButton(testStr[i].replyNo, feedNo)}</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </div>
            ))
        }
        return result;
    }

    // 댓글 가져오기 
    useEffect(
        () => {
            axios({
                url: '/api/feed/listReply',
                method: 'GET',
                params:{
                    feedNo:feedNo
                }
            }).then((res) => {
                // console.log(res.data.result)
                setTestStr(res.data.result) // [7개]
            })
        },[]
    );

    const getReplyList=()=>{
        axios({
            url: '/api/feed/listReply',
            method: 'GET',
            params:{
                feedNo:feedNo
            }
        }).then((res) => {
            // callback(res.data);
            // console.log(res.data.result) // [7개]
            setTestStr(res.data.result) // [7개]
            // console.log(Json.userNo);

        })
    }

    // 댓글 수
    useEffect(
        () => {
            axios({
                url: '/api/feed/countReply',
                method: 'GET',
                params:{
                    feedNo:feedNo
                }
            }).then((res) => {
                // console.log(res.data) // [7개]
                setReplyCount(res.data)
            })
        }, []
    );
    const getReplyCount=()=>{
        axios({
            url: '/api/feed/countReply',
            method: 'GET',
            params:{
                feedNo:feedNo
            }
        }).then((res) => {
            // console.log(res.data) // [7개]
            setReplyCount(res.data)
        })
    }
    
    // 댓글 쓰기
    const replyInsert=()=>{
        axios.post('api/feed/insertReply',{
            feedNo:feedNo,
            replyContent:replyContent
        }).then(function (res){
            SetReplyContent('');
            getReplyList();
        }).catch(function (){
            console.log('실패함');
        })
    }

    let i = 0;
    return (
        <>
    <div>
        <div className="FeedReplyInsert-body">
            <ListGroup variant="flush">
                {replyList2()}
            </ListGroup>
        </div>
        <div>
            <Box
                sx={{
                    height: 30
                }}
            />
            <TextField fullWidth label="댓글입력" id="fullWidth"
                       onChange={(e)=> {SetReplyContent(e.target.value);}}
                       value={replyContent}
            />
        </div>
            <Button style={{marginTop:"40px", float:"right"}}
                    onClick={() =>{
                        replyInsert();
                        getReplyList();
                        getReplyCount();
                    }}
        >댓글쓰기</Button>
    </div>
        <div style={{clear:"both"}}></div>
    </>

    );
}

export default FeedReplyInsert;