import { useState } from "react";
import axios from "axios";

import '../styles/Join.css';

function Join() {

    const [userName, setUserName] = useState();
    const [nickName, setNickName] = useState();
    const [userPwd, setUserPwd] = useState();
    const [email, setEmail] = useState();
    const [emailNum, setEmailNum] = useState();
    
    // 회원가입 클릭시 데이터 전송
    const joinClick = async(name, nick, pwd, email) => {
        let response = await axios.post('api/join',
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
                        <button className="chBtn nickBtn">중복확인</button>
                        <p className="chAlarm noAlarm">중복된 닉네임입니다.</p>
                        <p className="chAlarm okAlarm">사용가능한 닉네임입니다.</p>
                    </div>

                    {/* 비밀번호 */}
                    <div className="pwdInput">
                        <input type="password" id="userPwd" name="userPwd" placeholder="비밀번호" required 
                            onChange={(e) => {setUserPwd(e.target.value);}} />
                        <p className="chAlarm">8~15자 영문자, 숫자, 특수문자(@#$%^&*_)를 사용하세요.</p>
                    </div>
                    {/* 비밀번호 확인 */}
                    <div className="rePwdInpt">
                        <input type="password" placeholder="비밀번호 확인" />
                        <p className="chAlarm noAlarm">조건에 맞는 비밀번호를 입력하세요.</p>
                        <p className="chAlarm noAlarm">비밀번호가 일치하지 않습니다.</p>
                        <p className="chAlarm okAlarm">비밀번호가 일치합니다.</p>
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