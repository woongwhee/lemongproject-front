import axios from 'axios';
import { useEffect } from 'react';
import {useLoginDispatch} from "./LoginContext";



function NaverLoginBtn() {


    useEffect( () => {
        userAccessToken()
    }, [])


    const loginDispatch = useLoginDispatch();
    const loginSuccess = (result) => {
        loginDispatch({
            type: 'login',
            payload: {
                isLogin: true,
                profile: result,
                socialType:"NAVER"
            }
        })
    }


    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }

    const getToken = () => {
        const token = window.location.href.split("=")[1].split('&')[0]
        // sessionStorage.setItem('access_Token', token)
        axios({
            url:'api/p/naverLogin',
            method:'GET',
            params:{accessToken:token}
        }) .then((res) => {
            if(res.data.code === '2000') {
                console.log('성공')
                console.log(res.data.result)
                document.location.href = '/';
            } else {
                console.log('닉네임 설정하기')
                // sessionStorage.setItem("userNo", res.data.result.userNo);
                document.location.href="/setNick";
            }
        })
        .catch(function() {
            console.log("실패")
        })
    }





    return(
        <div></div>
    )

}



    




export default NaverLoginBtn;