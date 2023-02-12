import React , {useState , useEffect, use} from "react";
import axios from "axios";

// import cImage from'./image/물통.jpg';
// import ChallengeChatRoom from "./challengeChatRoom";
// import Chat from "./testChating";
import ChallengeChatRoom from "../challengeChat/challengeChatRoom";
import './challenge.css';

// 날짜 포맷
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';
import Chat from "./testChating";

import { useLoginState } from "../Member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

function ChallengeRoomCreate(){

    // 검색 버튼 클릭 시 새로고침되서 현재 페이지로 되돌아오는 거 방지하는 함수.
    function handleSubmit(event) {
        event.preventDefault(); 
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
    }

    // 나중에 로그인 한 사용자가 참여하고 있는 challNo로 변경.
    const challNo = 3000;

    let {profile}=useLoginState();
    console.log(profile);
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    // CHALLENGE_NO에 해당하는 정보를 가져오기.
    const [challengeData , setChallengeData] = useState();

    const [detailChallenges , setDetailChallenges] = useState();

    const [showChatRoom , setShowChatRoom] = useState(false);

    const [chatRoomNo , setChatRoomNo] = useState();

    const [challGo , setChallGo] = useState();

    useEffect(
        () => {
            axios.get("/api/challenge/selectChallenge" , {
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                console.log(data);
                setChallengeData(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        } , []
    )
    console.log(challGo)
    console.log(chatRoomNo)
   

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

    // 챌린지 참여 하면 해당하는 채팅방 생성되서 참여
    function challengeGo(e){

        axios.get("/api/challenge/challengeGo" , {
            params:{
                challNo : e ,
                userNo : userNos ,
            }
        }).then(function(res){
            console.log(res.data.result + "데이터 전송 성공");
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    // function ChatRoom(e){
    //     window.location.href = "http://localhost:3000/ChatRoom?ChatRoomNo="+e;
    //     return <Chat/>
    // }

    let i = 0;

    return(
        <div className="App">
        <div class="container p-5">
            
        {challengeData?.map(e => <div class="btn btn-outline-dark" onClick={() => {ChallengeDetail(e?.challengeNo);}} style={{width:'850px' , height:'250px' , borderRadius:'0' , marginTop:'10px'}} data-bs-toggle="modal" data-bs-target={"#exampleModalChallenge"}>
                <div className="thum" key={i++} {...e}>
                    <br/><br/>
                    <h1 style={{float:'left'}} key={i++} {...e}><b>{e?.challengeTitle}</b></h1> <br/><br/><br/> 
                    <h4 style={{float:'left'}} key={i++} {...e}><span>{e?.challengeInfo}</span></h4> <br/><br/><br/>
                    <h4 style={{float:'left'}} key={i++} {...e}><b>{moment(e?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(e?.endDate).format('YYYY년 MM월 DD일')}</b></h4>
                    {/*<img src={cImage} alt="썸네일" style={{width:'270px' , height:'297px' , marginTop:'-235px' , marginLeft:'565px'}}/>*/}
                </div>
             </div>)}
             
        <div class="modal fade" id="exampleModalChallenge" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
             <div class="modal-content" style={{width:'1000px' , height:'1430px' , borderRadius:'0'}}>
                   <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   {detailChallenges?.map(e => <div key={i++} {...e} className="outer_chall" >
                        <h1 style={{fontSize:'25px'}} key={i++} {...e}><b>{e?.challengeTitle}</b></h1>
                        <h3 style={{fontSize:'20px'}} key={i++} {...e}>{moment(e?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(e?.endDate).format('YYYY년 MM월 DD일')}</h3>
                        <h5 key={i++} {...e}><b style={{fontSize:'20px'}}>STATUS : </b><b style={{color:'blue' , fontSize:'20px'}}>{e?.status}</b></h5>
                        <button class="btn btn-dark" style={{fontSize:'23px' , marginTop:'-95px' , border:'0' , borderRadius:'0'
                            , marginLeft:'855px' , fontFamily:'NanumGothic-Regular'}} onClick={() => {challengeGo(e?.challengeNo);}}>참여하기</button>
                        <button class="btn btn-dark" style={{fontSize:'23px' , marginTop:'-145px' , border:'0' , borderRadius:'0'
                            , marginLeft:'700px' , fontFamily:'NanumGothic-Regular'}} onClick={() => {setShowChatRoom(!showChatRoom); setChallGo(e?.challengeNo);}}>채팅방 입장</button>
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
                                    {showChatRoom === true ? <Chat chatRoomNo={chatRoomNo} /> : null}
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
    );
};

export default ChallengeRoomCreate;