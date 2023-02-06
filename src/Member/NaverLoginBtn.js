import axios from 'axios';
import { useEffect } from 'react';



function NaverLoginBtn() {


    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }

    const getToken = () => {
        const token = window.location.href.split("=")[1].split('&')[0]
        console.log(token)
        sessionStorage.setItem('access_Token', token)
        axios({
            url:'api/p/naverLogin',
            method:'GET',
            params:{accessToken:token}
        }) .then((res) => {
            if(res.data.code === '2000') {
                console.log('성공')
                sessionStorage.setItem("userNo", res.data.result.userNo)
                document.location.href = '/naverTest';
            } else {
                console.log('닉네임 설정하기')
                sessionStorage.setItem("userNo", res.data.result.userNo);
                document.location.href="/setNick";
            }
        })
        .catch(function() {
            console.log("실패")
        })
    }



    useEffect( () => {
        userAccessToken()
    }, [])



    return(
        <div></div>
    )

}



    




export default NaverLoginBtn;