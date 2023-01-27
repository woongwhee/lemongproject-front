import React, { useCallback, useState } from "react";
import axios from "axios";

import '../styles/Join.css';

function Join() {

    const [userName, setUserName] = useState();
    const [nickName, setNickName] = useState();
    const [userPwd, setUserPwd] = useState();
    const [reUserPwd, setReUserPwd] = useState();
    const [email, setEmail] = useState();
    const [emailNum, setEmailNum] = useState();

    // 알림 색깔
    const [errorColor, setErrorColor] = useState();
    const [pwdColor, setPwdColor] = useState();
    const [rePwdColor, setRePwdColor] = useState();


    // 에러 메세지 변수
    const [nickError, setNickError] = useState();
    const [pwdError, setPwdError] = useState();
    const [rePwdError, setRePwdError] = useState();

    // 유효성 검사
    const [isPwd, setIsPwd] = useState(false);
    const [isRePwd, setIsRePwd] = useState(false);
    

    // 닉네임 중복체크
    const checkNick = async(nickName) => {
        let response = await axios.post('api/member/join/chNick',
            ({'nickName':nickName})
        )
        if(response.data.code === '2000') {
            // alert("사용가능")
            setNickError("사용 가능한 닉네임입니다.")
            setErrorColor("chAlarm okAlarm")
        } else {
            // alert("사용불가능")
            setNickError("중복된 닉네임입니다.")
            setErrorColor("chAlarm noAlarm")
        } 
    }


    // 비밀번호 체크
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    const onChangeRePwd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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


    // 이메일 인증 버튼
    // const chEmail = async(email) => {
    //     let response = await axios.post('api/chEmail',
    //         ({'email':email})
    //     )

    // }


    // 회원가입 클릭시 데이터 전송
    const joinClick = async(name, nick, pwd, email) => {
        let response = await axios.post('api/member/join',
            ({'userName':name,
              'nickName':nick,
              'userPwd':pwd,
              'email':email
            })
        )
        if(response.data.code === '2000') {
            alert("어서오세요. 여러분의 꿈을 응원합니다. :)")
            document.location.href = "/"; // 회원가입 성공 시 로그인 페이지로
        } else {
            console.log('회원가입 실패');
        }

        /*
            동일한 회원정보가 존재할 경우(모든 데이터 일치)
            axios Request failed with status code 500
            이라는 에러가 뜬다.
            Bad Server 500 error가 뜨는데 조회는 되는데 한 개만 select가 안되다보니
            server 에러라고 뜬다.
        */ 
    }


    return(
            <div className="JoinArea">
                <div className="logo">
                    <img className="logo" src="LemongImg/CommonImg/LemongLogo.png" alt="lemongLogo" />
                </div>
                <h3 className="intro">당신의 꿈에 한 발짝 더 나아가보세요</h3>
                
                <div className="profInput">
                    {/* 이름 */}
                    <div className="nameInput">    
                        <input type="text" id="userName" name="userName" placeholder="이름" required 
                            onChange={(e) => {setUserName(e.target.value);}} />
                    </div>
                    {/* 닉네임 */}
                    <div className="nickInput">
                        <input type="text" id="nickName" name="nickName" placeholder="닉네임" required 
                            onChange={(e) => {setNickName(e.target.value);}} />
                        <button className="chBtn nickBtn" onClick={() => {checkNick(nickName);}}>중복확인</button>
                        <p className={errorColor}>{nickError}</p>
                    </div>
                    {/* 비밀번호 */}
                    <div className="pwdInput">
                        <input type="password" id="userPwd" name="userPwd" placeholder="비밀번호" required 
                            onChange={(e) => {
                                onChangePassword(e);
                                setUserPwd(e.target.value);
                            }} />
                        <p className={pwdColor}>{pwdError}</p>
                    </div>
                    {/* 비밀번호 확인 */}
                    <div className="rePwdInpt">
                        <input type="password" placeholder="비밀번호 확인" 
                            onChange={(e) => {onChangeRePwd(e);}} />
                        <p className={rePwdColor}>{rePwdError}</p>
                    </div>
                    {/* 이메일 */}
                    <div className="emailInput">
                        <input type="email" id="email" name="email" placeholder="이메일 주소" required 
                            onChange={(e) => {setEmail(e.target.value);}}/>
                        <button className="chBtn eBtn">인증</button>
                        <p className="chAlarm">인증번호가 발송되었습니다.</p>
                    </div>
                    {/* 이메일 인증번호 */}
                    <div className="emailNumInput">
                        <input type="text" placeholder="이메일 인증번호 입력" />
                        <button className="chBtn enBtn">확인</button>
                        <p className="chAlarm noAlarm">인증번호가 일치하지 않습니다.</p>
                        <p className="chAlarm okAlarm">인증되었습니다.</p>
                    </div>


                </div>
                <br />
                <div className="joinBtn">
                    <button onClick={() => {joinClick(userName, nickName, userPwd, email);}}>
                        회 원 가 입
                    </button>
                </div>
            </div>

    )

}

export default Join;