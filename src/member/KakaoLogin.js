import axios from "axios";
import React, { useEffect, useState } from "react";


function KakaoLogin() {

    // 카카오 로그인 관련 변수
    // const param = new URL(document.location).searchParams;
    // const kakao_code = param.get('code'); // 인가코드 -> 이걸 백엔드으로 넘겨줘야 함

    const code = new URL(window.location.href).searchParams.get('code')


    // 백엔드로 인가 코드 전달
    useEffect( () => {
        axios({
            url:'/api/p/kakaoLogin',
            method:'GET',        
            params:{code:code}
        }).then((res) => {
            if(res.data.code === '2000') { // 로그인
                console.log(res.data.result)
                document.location.href = "/";
            } else { // 닉네임 설정
                console.log('닉네임 설정하기');
                console.log(res.data.result);
                console.log(res.data.result.userNo);
                document.location.href="/setNick";
            }
        })
        .catch(function(){
            console.log("실패")
        })
    })



    return(


        <div>
        </div>
    )

}


export default KakaoLogin;