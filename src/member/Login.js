import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import './Join.css';
import { KAKAO_AUTH_URL } from './KakaoLoginData';
import { Client_Id, Naver_CallBack_URL } from './NaverData';
import {useLoginDispatch} from "./LoginContext";
// import profile from "../todo/profile/Profile";
import {useAsync} from "react-async-hook";
import swal from 'sweetalert';

function Login() {

    useEffect( () => {
        initializeNaverLogin()
    }, [])
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
    const checkLogin=async ()=>{
        const res = await axios.get(`/api/p/checkLogin`);
        if ( res.status != 200 ) throw new Error(res.statusText);
        if (res.data.code === '2000') {
            loginSuccess(res.data.result);
            return res;
        }
    }
        const { data, error, isPending } = useAsync(checkLogin);

    const [email, setEmail] = useState();
    const [userPwd, setUserPwd] = useState();
    const [noLoginMs, setNoLoginMs] = useState();
    const [noLoginCol, setNoLoginCol] = useState();
    const [loginHeight, setLoginHeight] = useState("loginArea loginAreaHeight");

    if ( isPending ) return "Loading...";
    if ( error ) return `Something went wrong: ${error.message}`;





    const initializeNaverLogin = () => {
        const nLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: '47' },
        });
        nLogin.init();
    }

    const handleNaverClick = () => {
        const naverLoginButton = document.getElementById("naverIdLogin_loginButton");
        if(naverLoginButton) naverLoginButton.click();
    }

    const loginClick = async (e, p) => {
        let response = await axios.post('/api/p/login',
            {
                'email': e,
                'userPwd': p
            }
        )
        if (response.data.code === '2000') {
            // alert("로그인에 성공하였습니다.")
            swal("로그인에 성공하였습니다.", "", "success");
            loginSuccess(response.data.result);
        } else {
            console.log('실패!')
            setNoLoginMs("잘못된 회원 정보입니다. 다시 입력해주세요.")
            setNoLoginCol("newChAlarm noAlarm")
            setLoginHeight("loginArea newLoginAreaHeight")
        }
        
    }


    // 네이버 로그인
    const { naver } = window;
    const NAVER_CLIENT_ID = Client_Id;
    const NAVER_CALLBACK_URL = Naver_CallBack_URL;




    // 화면 설계
    return (
        <div className={loginHeight}>
            <div className='logo'>
                <img className='logo' src='LemongImg/CommonImg/LemongLogo.png' alt='lemongLogo' />
            </div>
            <div className='inputArea'>
                <input placeholder='이메일을 입력해주세요.' onChange={(e) => {setEmail(e.target.value);}}/>
                <br />
                <input placeholder='비밀번호를 입력해주세요.' type="password" onChange={(e) => {setUserPwd(e.target.value);}}/>
                <p className={noLoginCol}>{noLoginMs}</p>
                {/* <br /> */}
                <button id='loginButton' onClick={()=>{loginClick(email,userPwd);}}>
                    로그인
                </button>
            </div>
            <div className='horizon' />
            <div className='socialArea'>
                <p>소셜 로그인</p>
                <a href={KAKAO_AUTH_URL}>
                    <div>
                        <img className='social' src='LemongImg/SocialImg/KakaoLogin.png' alt='lemongLogo' />
                    </div>
                </a>
                <div id="naverIdLogin" style={{display: "none"}}></div>
                <div>
                    <img className='social' src='LemongImg/SocialImg/NaverLogin.png' alt='lemongLogo'
                        onClick={handleNaverClick} />
                </div>
                {/* id 값이 naverIdLogin인 div가 반드시 있어야 한다. */}
                <br />
                <div className='menu'>
                    <Link to="/join" className='toLink'>
                        회원가입
                    </Link> |{" "}
                    <Link to="/findPwd" className='toLink'>
                        비밀번호 찾기
                    </Link>
                </div>

            </div>

        </div>

    )
}


export default Login;