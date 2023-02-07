import React, { useState } from 'react';
import axios from 'axios'; // 액시오스
import { Link } from 'react-router-dom';
import './Login.css';
import './Join.css';
import { KAKAO_AUTH_URL } from './KakaoLoginData';
import {useLoginDispatch} from "./LoginContext";
import profile from "../ToDoListPage/profile/Profile";
import {useAsync} from "react-async-hook";




function Login() {
    const [email, setEmail] = useState();
    const [userPwd, setUserPwd] = useState();
    const [noLoginMs, setNoLoginMs] = useState();
    const [noLoginCol, setNoLoginCol] = useState();
    const loginDispatch=useLoginDispatch();
    const loginSuccess = (result) => {
        loginDispatch({
            type: 'login',
            payload: {
                isLogin: true,
                profile:result
            }
        })
    }
    const checkLogin= async() => {
        const res = await axios.get(`/api/p/checkLogin`);
        if ( res.status != 200 ) throw new Error(res.statusText);
        if (res.data.code === '2000') {
            loginSuccess(res.data.result);
            return res;
        }
    }
    const loginClick = async (e, p) => {
        let response = await axios.post('/api/p/login',
            {
                'email': e,
                'userPwd': p
            }
        )
        if (response.data.code === '2000') {
            alert("로그인에 성공하였습니다.")
            loginSuccess(response.data.result);
            // sessionStorage.setItem("userNo", userNo);
            // document.location.href = "/findPwd"; // 페이지 이동(임시)
        } else {
            console.log('실패!')
            setNoLoginMs("잘못된 회원 정보입니다. 다시 입력해주세요.")
            setNoLoginCol("chAlarm noAlarm")
        }

    }

    const { data, error, isPending } = useAsync(checkLogin);
    if ( isPending ) return "Loading...";
    if ( error ) return `Something went wrong: ${error.message}`;
        // 로그인 클릭시 데이터 전송

        // 화면 설계
        return (

            <div className='loginArea'>
                <div className='logo'>
                    <img className='logo' src='LemongImg/CommonImg/LemongLogo.png' alt='lemongLogo'/>
                </div>
                <div className='inputArea'>
                    <input placeholder='사용자 이메일' onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <br/>
                    <input placeholder='비밀번호' type="password" onChange={(e) => {
                        setUserPwd(e.target.value);
                    }}/>
                    <p className={noLoginCol}>{noLoginMs}</p>
                    {/* <br /> */}
                    <button id='loginButton' onClick={() => {
                        loginClick(email, userPwd);
                    }}>
                        로그인
                    </button>
                </div>
                <div className='horizon'/>
                <div className='socialArea'>
                    <p>소셜 로그인</p>
                    <a href={KAKAO_AUTH_URL}>
                        <div>
                            <img className='social' src='LemongImg/SocialImg/KakaoLogin.png' alt='lemongLogo'/>
                        </div>
                    </a>
                    <div>
                        <img className='social' src='LemongImg/SocialImg/NaverLogin.png' alt='lemongLogo'/>
                    </div>
                    <br/>
                    <div className='menu'>
                        <Link to="/join" style={{textDecoration: 'none'}}>
                            회원가입
                        </Link> |{" "}
                        <Link to="/findPwd" style={{textDecoration: 'none'}}>
                            비밀번호 찾기
                        </Link>
                    </div>
                </div>

            </div>

        )

}


export default Login;