import React , {useState , useEffect} from "react";
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
import {Chat} from "@mui/icons-material";

function ChallengeRoomCreate(){

    // 검색 버튼 클릭 시 새로고침되서 현재 페이지로 되돌아오는 거 방지하는 함수.
    function handleSubmit(event) {
        event.preventDefault(); 
        // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다! 
    }

    // 나중에 로그인 한 사용자가 참여하고 있는 challNo로 변경.
    const challNo = 3000;

    // CHALLENGE_NO에 해당하는 정보를 가져오기.
    const [challengeData , setChallengeData] = useState();
    
    useEffect(
        () => {
            axios.get("/api/challenge/selectChallenge" , {
                params:{
                    challNo : challNo ,
                }
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

    return(
        <div className="App">
         <ChallengeChatRoom/>
        <div class="container p-5">
            
             <div class="btn btn-outline-dark" style={{width:'850px' , height:'300px' , borderRadius:'0' , position:'absolute'}} data-bs-toggle="modal" data-bs-target={"#exampleModalChallenge"}>
                <div className="thum">
                <br/><br/>
                <h1 style={{float:'left'}}><b>{challengeData?.challengeTitle}</b></h1> <br/><br/><br/> 
                <h4 style={{float:'left'}}><span>{challengeData?.challengeInfo}</span></h4> <br/><br/><br/>
                <h4 style={{float:'left'}}><b>{moment(challengeData?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(challengeData?.endDate).format('YYYY년 MM월 DD일')}</b></h4>
                    {/*<img src={cImage} alt="썸네일" style={{width:'270px' , height:'297px' , marginTop:'-235px' , marginLeft:'565px'}}/>*/}
                </div>
             </div>
            
             <div class="modal fade" id="exampleModalChallenge" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'1000px' , height:'1430px' , borderRadius:'0'}}>
                   <div class="modal-header">
                   <h1><b>{challengeData?.challengeTitle}</b></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div className="outer_chall">
                        <h3>{moment(challengeData?.startDate).format('YYYY년 MM월 DD일')} ㅡ  {moment(challengeData?.endDate).format('YYYY년 MM월 DD일')}</h3>
                        <h5><b style={{fontSize:'25px'}}>STATUS : </b><b style={{color:'blue' , fontSize:'25px'}}>{challengeData?.status}</b></h5>
                   </div>
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
                                    {/*<Chat/>*/}
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