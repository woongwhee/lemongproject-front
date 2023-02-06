import axios from "axios";
import React, { useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI, LOGOUT_REDIRECT_URI, KAKAO_LOGOUT_URL } from './KakaoLoginData';

function KakaoLogin() {

    const params = new URL(document.location).searchParams;
    const kakao_code = params.get('code');
    const grant_type = 'authorization_code';
    const client_id = CLIENT_ID;
    const redirect_uri = REDIRECT_URI;
    const logout_redirect_uri = LOGOUT_REDIRECT_URI;

    // 토큰 저장
    const getKakaoTocken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${kakao_code}`,
        })
            .then(res => res.json())
            .then(data => {
                if(data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    console.log(data.access_token); // 매번... 바뀐다... .. . . .. 
                } else {
                    document.location.href = '/';
                }
            });
    };


    useEffect(() => {
        if(!document.location.search) return;
        getKakaoTocken();
    }, []);
    

    const logoutKakao = () => {
        const logout = KAKAO_LOGOUT_URL;
        alert("로그아웃 되었습니다.");
        document.location.href = logout;
    }


    return(
        <div>
            카카오 로그인
            <br /> <br />
            <button onClick={() => {logoutKakao();}}>로그아웃</button>
        </div>
    )

}


export default KakaoLogin;