import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import Logo from './image/레몽 로고.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import '../mypage/font/font.css';
import './MyPage.css';

function MyDelete(props){

    let{myprofile}=props;
    console.log(myprofile + "정보 넘어옴")

    // 비밀번호 체크 하기 위해 USER비밀번호 가져오기.
    const [userPwd , setUserPwd] = useState();

    const selectUpwd = async() => {
        const response = await axios.get("api/member/selectUser");
        setUserPwd(response.data[0]);
    }
    useEffect(() => {selectUpwd()},[])

    // 비밀번호 체크 후 탈퇴를 하기위한 비밀번호 값 저장
    const [pwdcheck , setPwdCheck] = useState({
        passwordCheck1 : '' ,
        passwordCheck2 : ''

    });

    const handleInput = (event) => {
        const {name , value} = event.target;

        setPwdCheck({
            ...pwdcheck,
            [name] : value ,
        });
    };

    const DeleteUser = () => {
        const deleteUser = axios.get("/api/member/deleteUser").then(function(){
            alert("변경 완료");
        });
    }

    return (
        <div className="App">
        <div class="container p-5">
            
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModa7" style={{float:'right' , marginRight:'-3px' , borderRadius:'100px'}}>
             회원 탈퇴
             </button>
            
             <div class="modal fade" id="exampleModa7" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'700px' , height:'1000px' , borderRadius:'0'}}>
                   <div class="modal-header">
                   <h1 style={{fontFamily:'Lobster-Regular' , fontSize:'50px' , margin:'auto' , marginLeft:'210px'}}>Withdrawal</h1>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                   <form>
                      <div class="mb-3">
                        {/* <img src={Logo} style={{width:'300px' , marginLeft:'200px'}}></img> */}

                        <div className="delete_user_content">
                            <div id="delete_outer" style={{marginTop:'30px',}}>
                                <div style={{marginTop:'25px'}}>
                                    <img src={myprofile?.photo?.filePath+myprofile?.photo?.changeName} style={{marginLeft:'0px' , width:'60px' , height:'60px' , marginTop:'-17px'}} className="profileImg"></img><span style={{marginTop:'-40px' , marginLeft:'7px'}}><b style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px'}}>{myprofile?.nickName}</b></span>
                                    <span style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px'}}>
                                        님, 안녕하세요! <br/>계정을 삭제하려고 하신다니 아쉽습니다. <br/>
                                        회원탈퇴 버튼을 누르면 <b style={{color:'red'}}>사진 , 댓글 , 좋아요 친구 관계를 포함한 모든 데이터가 영구적으로 삭제</b>되어 복구할 수 없게 됩니다. 이후 다른 Lemong계정을 만들 때 같은 사용자 이름으로 다시 가입할 수 없습니다.
                                    </span>
                                </div>
                            </div>
                            <br/>
                            <p style={{fontSize:'23px' , fontFamily:'NanumGothic-Regular'}}><b>🗸 회원탈퇴</b></p>
                            <div id="delete_outer1" style={{marginTop:'10px',}}>
                                <div style={{marginTop:'25px'}}>
                                    <span style={{fontFamily:'NanumGothic-Regular' , fontSize:'17px'}}>
                                       <b> - 신용정보의 수집/처리 및 이용 등에 관한 기록 보존 이유 : 신용정보의 이용 및 보호에 관한 법률 보존기간 / 3년</b><br/><br/>
                                       <b> - 소비자의 불만 또는 분쟁처리에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 보존 기간 /3년</b> <br/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <br/><br/>
                         <label for="exampleInputEmail1" class="form-label" style={{fontFamily:'SourceSansPro-Light'}}><b>Password</b></label>
                         <input type="password" class="form-control" name="passwordCheck1" onChange={handleInput} style={{borderRadius:'0'}}/>
                      </div>
                      <div class="mb-3">
                         <label for="exampleInputPassword1" class="form-label" style={{fontFamily:'SourceSansPro-Light'}}><b>Password Check</b></label>
                         <input type="password" class="form-control" name="passwordCheck2" onChange={handleInput} style={{borderRadius:'0'}}/>
                      </div>
                            <br/>
                            {pwdcheck.passwordCheck1 === pwdcheck.passwordCheck2 && 
                            <button type="button" class="btn btn-dark" style={{marginLeft:'290px' , borderRadius: '0' , fontFamily:'NanumGothic-Regular'}}
                            onClick={DeleteUser}>회원탈퇴</button>}
                   </form>
                   </div>
                </div>
             </div>
             </div>
             </div>
        </div>
      );

}

export default MyDelete;