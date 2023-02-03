import axios from "axios";
import React, { useEffect, useState } from "react";
import { CLIENT_ID, REDIRECT_URI, LOGOUT_REDIRECT_URI, KAKAO_LOGOUT_URL, BACK_REDIRECT_URI, BACK_KAKAO_AUTH_URL } from './KakaoLoginData';

function KakaoLogin() {

    // 카카오 로그인 관련 변수
    // const param = new URL(document.location).searchParams;
    // const kakao_code = param.get('code'); // 인가코드 -> 이걸 백엔드으로 넘겨줘야 함

    const code = new URL(window.location.href).searchParams.get('code')

    const grant_type = 'authorization_code';
    const client_id = CLIENT_ID;
    const redirect_uri = REDIRECT_URI; //프론트 redirect 코드
    const logout_redirect_uri = LOGOUT_REDIRECT_URI;
    const back_redirect_uri = BACK_REDIRECT_URI;



    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res = await axios.get(`api/p/kakaoLogin/code=${kakao_code}`);
    //             const token = res.headers.authorization;
    //             localStorage.setItem('token', token);
    //             // document.location.href = '/';
    //         } catch(e) {
    //             console.error(e);
    //             // document.location.href = '/';
    //         }
    //     }) ();
    // }, []);
    useEffect( () => {
        axios({
            url:'/api/p/kakaoLogin',
            method:'GET',        
            params:{code:code}
        }).then((res) => {
            console.log(res.data) // access 토큰은 백엔드에서 받아옴(response의 데이터로 받아옴)
        })
        .catch(function(){
            console.log("실패")
        })
    })





    // // 토큰 저장(프론트 1)
    // const getKakaoToken = () => {
    //     fetch(`https://kauth.kakao.com/oauth/token`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded',
    //                      },
    //         body: `grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${kakao_code}`,
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if(data.access_token) {
    //                 localStorage.setItem('token', data.access_token);
    //                 console.log(data.access_token)// 매번... 바뀐다... .. . . ..
    //             } else {
    //                 document.location.href = '/';
    //             }
    //         });
    // };


    // useEffect(() => {
    //     if(!document.location.search) return;
    //     getKakaoToken();
    // }, []);


    // const t = localStorage.getItem('token');

    // try{
    //     const res = await axios.post('api/p/kakaoLogin', data, {
    //         headers: {
    //             Authorization: t,
    //         },
    //     });
    // } catch(e) {
    //     console.error(e);
    // }



    //토큰 저장(프론트2)
    // const KakaoRedirectHandler = () => {
    //     useEffect(() => {
    //         axios.post(`https://kauth.kakao.com/oauth/token?
    //                     grant_type=${grant_type}
    //                     &client_id=${client_id}
    //                     &redirect_uri=${redirect_uri}
    //                     &code=${kakao_code}`,
    //         { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     }) .then(data => {
    //         if(data.access_token){
    //             console.log(data.access_token);
    //         }
    //     })
    //     }, [])
    // }

    // 실패! 서버에 요청 처리를 할 수 없다고 뜸..!
    // redirect 주소 뒤에 code가 붙는데 그게 인식이 안되는거 같다.
    // const backKakaoToken = () => {
    //     fetch(`https://kauth.kakao.com/oauth/token`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //         body: `grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${back_redirect_uri}&code=${kakao_code}`,
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if(data.access_token) {
    //                 console.log(data.access_token);
    //             }
    //         })
    // }


    // var express = require('express')
    // var router = express.Router();
    
    // router.get('/api/p/kakoLogin', function(req, res, next) {
    //     let code = req.query.code;
    //     try {
    //         axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${back_redirect_uri}&code=${code}`,
    //         { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    //     }) .then((result) => {
    //         console.log(result.data['access_token'])
    //     }) .catch(e => {
    //         console.log(e)
    //         res.send(e);
    //     })
    //     } catch(e) {
    //         console.log(e)
    //         res.send(e)
    //     }
    // })




    //   useEffect(() => {
    //     if(!document.location.search) return;
    //     // getKakaoToken();
    //     // backKakaoToken();

    // }, []);




    // 로그아웃
    const logoutKakao = () => {
        const logout = KAKAO_LOGOUT_URL;
        alert("로그아웃 되었습니다.");
        document.location.href = logout;
    }


    return(
        <div>
            카카오 로그인
            <br />
            <br />
            <button onClick={() => {logoutKakao();}}>로그아웃</button>
        </div>
    )

}


export default KakaoLogin;