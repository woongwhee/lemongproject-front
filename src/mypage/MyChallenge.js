import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';

import './MyPage.css';
import '../mypage/font/font.css';

import Chat from "../challengeChat/testChating";

function MyChallenge(props){

    let{userNo}=props;

    // 현재 내가 참여하고 있는 챌린지 리스트
    const [myChallList , setMyChallList] = useState();

    // 챌린지 상세보기
    const [detailChallenges , setDetailChallenges] = useState();

    const [chatRoomNo , setChatRoomNo] = useState();

    const [challGo , setChallGo] = useState();

    const [showChatRoom , setShowChatRoom] = useState(false);

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    const chatData = [];
    chatData.push(chatRoomNo);
    chatData.push(userNo);
    console.log(chatData)

    function handleSubmit(event) {
        event.preventDefault(); 
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
    }

    useEffect(
        () => {
            axios.get("/api/challenge/myChallengeList" , {
                params:{
                    userNo: userNos == null ? userNo : userNos,
                }
            }).then(function(res){
                console.log(res + "데이터 전송 완료");
                const data = res.data.result;
                console.log(data);
                setMyChallList(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        
        } , [userNos == null ? userNo : userNos]
    )

    function ChallengeDetail(e){
        console.log(e + "통과되는거 확인");
        setChatRoomNo(e);
        axios.get("/api/challenge/detailChallenge" , {
            params:{
                challNo : e ,
            }
        }).then(function(res){
            console.log(res + "데이터 전송 완료");
            console.log(res.data.result);
            const data = res.data.result;
            setDetailChallenges(data);
        }).catch(function(){
            console.log("데이터 전송 실패");
        }) 
    
    }

    function chatRoomCreate(){
        return <Chat chatData={chatData}/>
    }
    

    let i = 0;

    return(
        <div className="outer_Chall">
            <div>
               {myChallList?.map(e => <div key={i++} {...e} className="outer_myChallList" class="btn btn-outline-dark" onClick={() => {ChallengeDetail(e?.challengeNo);}} style={{borderRadius:'0' , width:'100%'}} data-bs-toggle="modal" data-bs-target={"#exampleModalChallenge"}>
                    <h1 style={{float:'left' , fontFamily:'Lobster-Regular'}} key={i++} {...e}><b>{e?.challenge?.challengeTitle}</b></h1> <br/><br/><br/> 
                    <h4 style={{float:'left' , fontFamily:'NanumGothic-Regular' , fontSize:'23px'}} key={i++} {...e}><span>{e?.challenge?.challengeInfo}</span></h4> <br/><br/>
                    <h4 style={{float:'left' , fontFamily:'NanumGothic-Regular'}} key={i++} {...e}><b>{moment(e?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(e?.endDate).format('YYYY년 MM월 DD일')}</b></h4>
                    <img src="/LemongImg/category/daily.png" style={{width:'150px' , float:'right' , marginTop:'-115px'}}></img>
                </div>)}   
            </div>
            <div className="App">
        <div class="container p-5">
             
        <div class="modal fade" id="exampleModalChallenge" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
             <div class="modal-content" style={{width:'1000px' , height:'900px' , borderRadius:'0'}}>
                   <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   {detailChallenges?.map(e => <div key={i++} {...e} className="outer_chall" onClick={chatRoomCreate}>
                        <h1 style={{fontSize:'25px'}} key={i++} {...e}><b>{e?.challengeTitle}</b></h1>
                        <h3 style={{fontSize:'20px'}} key={i++} {...e}>{moment(e?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(e?.endDate).format('YYYY년 MM월 DD일')}</h3>
                        <h5 key={i++} {...e}><b style={{fontSize:'20px'}}>STATUS : </b><b style={{color:'blue' , fontSize:'20px'}}>{e?.status}</b></h5>
                        {/* <button class="btn btn-dark" style={{fontSize:'23px' , marginTop:'-145px' , border:'0' , borderRadius:'0'
                            , marginLeft:'700px' , fontFamily:'NanumGothic-Regular'}} onClick={() => {setShowChatRoom(!showChatRoom); setChallGo(e?.challengeNo);}}>채팅방 입장</button> */}
                   </div>)}
                   <div class="modal-body">
                   <form onSubmit={handleSubmit}>
                      <div class="mb-3">
                         <div>
                            <div className="outer_all">
                                <div className="outer_1">
                                    <div className="outer_top3">
                                        <div className="outer_t3">
                                            <h1>Top3</h1>
                                        </div>
                                        <div className="outer_t1">
                                            <h1>Top1</h1>
                                        </div>
                                        <div className="outer_t2">
                                            <h1>Top2</h1>
                                        </div>
                                    </div>
                                    <div className="outer_rank">
                                        <h1>나머지 랭킹</h1>
                                    </div>
                                </div>
                                <div className="outer_2">
                                    {/* <ChallengeChatRoom challengeData={challengeData}/> */}
                                    {/* <Chat/> */}
                                    {/* <Chat chatData={chatData}/> */}
                                    {chatRoomCreate()}
                                </div>
                            </div>
                         </div>
                      </div>

                   </form>
                   </div>
                </div>
             </div>
             </div>
             </div>
        </div>
        </div>
    )
};

export default MyChallenge;
