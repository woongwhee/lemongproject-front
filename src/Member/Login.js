import React, { useState } from 'react';
import axios from 'axios'; // 액시오스
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {

    const [email, setEmail] = useState();
    const [userPwd, setUserPwd] = useState();

    // 로그인 클릭시 데이터 전송
    const loginClick = async(e,p) => {
        let response = await axios.post('api/member/login',
            ({'email':e,
              'userPwd':p
            })
        )
        if(response.data.code === '2000') {
            console.log('성공!')
            const userNo = response.data.result.userNo;
            alert("로그인에 성공하였습니다.")
            sessionStorage.setItem("userNo", userNo);
            document.location.href = "/findPwd"; // 페이지 이동(임시)
        } else {
            console.log('실패!')
            alert("잘못된 정보입니다. 다시 입력해주세요.")
        }
        
    }
    

    // 화면 설계
    return (
        
        <div className='loginArea'>
            <div className='logo'>
                <img className='logo' src='LemongImg/CommonImg/LemongLogo.png' alt='lemongLogo' />
            </div>
            <div className='inputArea'>
                <input placeholder='사용자 이메일' onChange={(e) => {setEmail(e.target.value);}}/>
                <br />
                <input placeholder='비밀번호' type="password" onChange={(e) => {setUserPwd(e.target.value);}}/>
                <br />
                <button id='loginButton' onClick={()=>{loginClick(email,userPwd);}}>
                    로그인
                </button>
            </div>
            <div className='horizon' />
            <div className='socialArea'>
                <p>소셜 로그인</p>
                <div>
                    <img className='social' src='LemongImg/SocialImg/KakaoLogin.png' alt='lemongLogo' />
                </div>
                <div>
                <img className='social' src='LemongImg/SocialImg/NaverLogin.png' alt='lemongLogo' />
                </div>
                <br />
                <div className='menu'>
                    <Link to="/join" style={{ textDecoration: 'none' }}>
                        회원가입
                    </Link> |{" "}
                    <Link to="/findPwd" style={{ textDecoration: 'none' }}>
                        비밀번호 찾기
                    </Link>
                </div>
            </div>

        </div>

    )
}


export default Login;