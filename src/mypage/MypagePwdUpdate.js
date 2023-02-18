import React , {useState , useEffect , useCallback} from "react";
import axios from "axios";

import { confirmAlert } from "react-confirm-alert";
import './react-confirm-alert.css';

import {useDispatch, useSelector} from 'react-redux';


// <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
// rel="stylesheet" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"></link>

function MyPagePwdCheck(){

     // 비밀번호 체크
     const onChangePassword = useCallback((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[@#$%^&*()_])(?=.*[0-9]).{8,15}$/
        const passwordCurrent = e.target.value
        setUserPwd(passwordCurrent)

        if(!passwordRegex.test(passwordCurrent)) {
            setPwdError("8~15자 영문자, 숫자, 특수문자(@#$%^&*()_)를 사용하세요.")
            setPwdColor("chAlarm noAlarm")
            setIsPwd(false);
        } else {
            setPwdError("형식에 맞는 비밀번호입니다.")
            setPwdColor("chAlarm okAlarm")
            setIsPwd(true)
        }
    }, [])

    // 비밀번호 일치 체크
    const onChangeRePwd = useCallback((e) => {
        const passwordReCurrent = e.target.value
        setReUserPwd(passwordReCurrent)

        if(userPwd === passwordReCurrent) {
            setRePwdError("비밀번호가 일치합니다.")
            setRePwdColor("chAlarm okAlarm")
            setIsRePwd(true)
        } else {
            setRePwdError("비밀번호가 일치하지않습니다.")
            setRePwdColor("chAlarm noAlarm")
            setIsRePwd(false)
        }
    })

    // 알림 색상
    const [pwdColor, setPwdColor] = useState();
    const [rePwdColor, setRePwdColor] = useState();

    // 에러 메세지 변수
    const [pwdError, setPwdError] = useState();
    const [rePwdError, setRePwdError] = useState();

    const [userPwd, setUserPwd] = useState();
    const [reUserPwd, setReUserPwd] = useState();

    // 유효성 검사
    const [isPwd, setIsPwd] = useState(false);
    const [isRePwd, setIsRePwd] = useState(false);

    // const userNo = sessionStorage.getItem("userNo");
    const userNos = useSelector((state) => state.userNo.selectUserNo);

    const btnCheck = () => {
        if(userPwd === reUserPwd){
            axios.get("/api/member/myPwdUpdate" , {
                params:{
                    updatePwd : userPwd ,
                }
            }).then(function(res){
                console.log("데이터 전송 성공 + success");
                console.log(userPwd);
                // alert("비밀번호가 변경되었습니다.");
                confirmAlert({
                    title: "Success",
                    message: "변경이 완료되었습니다.",
                    buttons: [
                      {
                        label: "Yes" ,
                        onClick: () =>  window.location.href = "http://localhost:3000/MyPageUpdate"
                      }
                    ]
                  })
            }).catch(function(){
                console.log("데이터 전송 실패");
                console.log(userPwd);
                // alert("비밀번호 변경에 실패하였습니다.");
                confirmAlert({
                    title: "Fail",
                    message: "변경에 실패하였습니다.",
                    buttons: [
                      {
                        label: "Yes" ,
                        onClick: () =>  window.location.href = "http://localhost:3000/MyPageUpdate"
                      }
                    ]
                  })
            })
        }
    }

     // 비밀번호 변경 알람
     const submitUpPwd = () => {
        confirmAlert({
          title: "Password Update",
          message: "비밀번호를 변경하시겠습니까?",
          buttons: [
            {
              label: "Yes",
              onClick: () => btnCheck()
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            }
          ]
        });
      }

    return(
        <div>
            <form>
                <h6 style={{marginLeft: "70px"}}><b>PassWord Change</b></h6>
                <div className="outer_passChange" style={{height: '40px'}}>
                    <input
                        type="password"
                        className="form-control"
                        name='passwordInput1'
                        onChange={(e) => {
                            onChangePassword(e);
                            setUserPwd(e.target.value);
                        }} style={{borderRadius:'0'}}/>
                    <b><p style={{fontSize:'18px' , fontFamily:'SourceSansPro-Light'}} className={pwdColor}>{pwdError}</p></b>
                </div>

                <br/><br/>

                <h6 style={{marginLeft: "70px"}}><b>PassWord Check</b></h6>
                <div className="outer_passCheck" style={{height: '40px' , width:'75%'}}>
                    <input
                        type="password"
                        className="form-control"
                        name='passwordInput2'
                        onChange={(e) => {onChangeRePwd(e);}} style={{borderRadius:'0'}}/>
                        <b><p style={{fontSize:'18px' , fontFamily:'SourceSansPro-Light'}} className={rePwdColor}>{rePwdError}</p></b>
                    </div>
                <button type="button" class="btn btn-primary" style={{borderRadius:'100px' , marginTop:'-71px' , marginLeft:'644px'}} onClick={submitUpPwd}>변경</button>
            </form>
        </div>
    );
}

export default MyPagePwdCheck;