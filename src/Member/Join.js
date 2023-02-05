import React, { useCallback, useState } from "react";
import axios from "axios";

import './Join.css';

function Join() {

    const [userName, setUserName] = useState();
    const [nickName, setNickName] = useState();
    const [userPwd, setUserPwd] = useState();
    const [reUserPwd, setReUserPwd] = useState();
    const [email, setEmail] = useState();
    const [emailNum, setEmailNum] = useState();
    const [socialType, setSocialType] = useState("NONE");

    // 알림 색깔
    const [errorColor, setErrorColor] = useState();
    const [pwdColor, setPwdColor] = useState();
    const [rePwdColor, setRePwdColor] = useState();
    const [emailColor, setEmailColor] = useState();
    const [emailNumColor, setEmailNumColor] = useState();


    // 에러 메세지 변수
    const [nickError, setNickError] = useState();
    const [pwdError, setPwdError] = useState();
    const [rePwdError, setRePwdError] = useState();
    const [emailMs, setEmailMs] = useState();
    const [emailNumMs, setEmailNumMs] = useState();

    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isRePwd, setIsRePwd] = useState(false);
    const [isEmail, setIsEmail] = useState(false);


    // 버튼 활성화
    const [isNickBtn, setIsNickBtn] = useState(false);
    const [isEmailBtn, setIsEmailBtn] = useState(false);
    const [isEmailNumBtn, setIsEmailNumBtn] = useState(false);
    

    // 이름 공백 체크
    const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const nameCurrent = e.target.value
        setUserName(nameCurrent)

        if(nameCurrent == null) {
            setIsName(false)
        } else {
            setIsName(true)
        }
    }, [])



    // 닉네임 중복체크
    const checkNick = async(nickName) => {
        let response = await axios.post('api/p/join/chNick',
            ({'nickName':nickName})
        )
        if(response.data.code === '2000') {
            // alert("사용가능")
            setNickError("사용 가능한 닉네임입니다.")
            setErrorColor("chAlarm okAlarm")
            setIsNickBtn(true);
        } else {
            // alert("사용불가능")
            setNickError("중복된 닉네임입니다.")
            setErrorColor("chAlarm noAlarm")
            setIsNickBtn(false);
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
            setRePwdError("비밀번호가 일치하지 않습니다.")
            setRePwdColor("chAlarm noAlarm")
            setIsRePwd(false)
        }
    })


    
    // 이메일 형식 체크
    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if(!emailRegex.test(emailCurrent)) {
            setEmailMs("유효하지 않은 이메일 주소입니다.")
            setEmailColor("chAlarm noAlarm")
            setIsEmail(false)
        } else {
            setEmailMs("유효한 이메일 주소입니다.")
            setEmailColor("chAlarm okAlarm")
            setIsEmail(true)
        }
    }, [])



    // 이메일 인증 버튼
    const chEmail = async(email) => {
        let response = await axios.post('api/p/join/chEmail',
            ({'email':email})
        )
        if(response.data.code === '3006') {
            console.log("중복된 이메일")
            setEmailMs("이미 존재하는 이메일입니다.")
            setEmailColor("chAlarm noAlarm")
            setIsEmailBtn(false)
        } else if(response.data.code === '2000') {
            console.log("테스팅 중~")
            setEmailMs("인증번호가 발송되었습니다.")
            setEmailColor("chAlarm")
            setIsEmailBtn(true)
        } else {
            console.log("인증 코드 보내기 실패")
            setEmailMs("인증번호 발송에 실패하였습니다.")
            setEmailColor("chAlarm noAlarm")
            setIsEmailBtn(false)
        }
    }


    // 인증번호 확인
    const chEmailNum = async(email, emailNum) => {
        let response = await axios.post('api/p/join/chEmailNum',
            ({'email':email,
              'emailNum':emailNum
            })
        )
        if(response.data.code === '2000') {
            setEmailNumMs("인증되었습니다.")
            setEmailNumColor("chAlarm okAlarm")
            setIsEmailNumBtn(true)
        } else {
            setEmailNumMs("인증번호가 일치하지않습니다.")
            setEmailNumColor("chAlarm noAlarm")
            setIsEmailNumBtn(false)
        }
    }


    // 이메일 인증 버튼 활성화
    const isJoinBtn = isNickBtn && isEmailBtn && isEmailNumBtn && isPwd && isRePwd && isEmail && isName;



    // 회원가입 클릭시 데이터 전송
    const joinClick = async(name, nick, pwd, email, socialType) => {
        let response = await axios.post('api/p/join',
            ({'userName':name,
              'nickName':nick,
              'userPwd':pwd,
              'email':email,
              'socialType':socialType
            })
        )
        if(response.data.code === '2000') {
            alert("어서오세요. 여러분의 꿈을 응원합니다. :)")
            document.location.href = "/"; // 회원가입 성공 시 로그인 페이지로
        } else {
            alert.log('회원가입 실패');
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
                            onChange={(e) => {onChangeName(e);}} />
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
                            onChange={(e) => {
                                onChangeEmail(e);
                                setEmail(e.target.value);
                                }}/>
                        <button className="chBtn eBtn" onClick={() => {chEmail(email);}}>인증</button>
                        <p className={emailColor}>{emailMs}</p>
                    </div>
                    {/* 이메일 인증번호 */}
                    <div className="emailNumInput">
                        <input type="text" id="emailNum" name="emailNum" placeholder="이메일 인증번호 입력" required
                            onChange={(e) => {setEmailNum(e.target.value);}}/>
                        <button className="chBtn enBtn" onClick={() => {chEmailNum(email, emailNum);}}>확인</button>
                        <p className={emailNumColor}>{emailNumMs}</p>
                    </div>


                </div>
                <br />
                <div className="joinBtn">
                    <button onClick={() => {joinClick(userName, nickName, userPwd, email, socialType);}} disabled={!isJoinBtn}>
                        회 원 가 입
                    </button>
                </div>
            </div>

    )

}

export default Join;