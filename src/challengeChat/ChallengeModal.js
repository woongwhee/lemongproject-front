import { Modal, ModalHeader } from "reactstrap"
// import Chat from "../mypage/chat"
import axios from "axios";
import { useLoginState } from "../Member/LoginContext";
const ChallengeModal=({toggle,isOpen,result})=>{

    const {challengeNo,challengeTitle,playerList,chatList}=result;
    const {userNo}=useLoginState.profile;
    console.log(userNo);
    function chatRoomCreate(){
        // return <Chat chatData={chatData}/>
    }

    // function ChallengeDetail(e){
    //     console.log(e + "통과되는거 확인");
    //     setChatRoomNo(e);
    //     axios.get("/api/challenge/detailChallenge" , {
    //         params:{
    //             challNo : e ,
    //         }
    //     }).then(function(res){
    //         console.log(res + "데이터 전송 완료");
    //         console.log(res.data.result);
    //         const data = res.data.result;
    //         // setDetailChallenges(data);
    //     }).catch(function(){
    //         console.log("데이터 전송 실패");
    //     }) 
    
    // }

    return(
    <Modal isOpen={isOpen} toggle={toggle}>
    <div class="modal fade" id="exampleModalChallenge" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
    <div class="modal-content" style={{width:'1000px' , height:'900px' , borderRadius:'0'}}>
         <ModalHeader toggle={toggle}></ModalHeader>
          <div className="outer_chall" >
               <h1 style={{fontSize:'25px'}} ><b>{challengeTitle}</b></h1>
               {/* <button class="btn btn-dark" style={{fontSize:'23px' , marginTop:'-145px' , border:'0' , borderRadius:'0'
                   , marginLeft:'700px' , fontFamily:'NanumGothic-Regular'}} onClick={() => {setShowChatRoom(!showChatRoom); setChallGo(e?.challengeNo);}}>채팅방 입장</button> */}
          </div>
          <div class="modal-body">
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
                           {chatList.map((item,index)=> 
                           <div key={index} className={userNo === userNo ? 'me' : 'other'}>
                        <span><b>{item.name}</b></span> [ {item.date} ]<br/>
                        <span>{item.msg}</span>
                        </div>)}
                       </div>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </div>
    </div>
    </Modal>
    )


}

export default ChallengeModal;

