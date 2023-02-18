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

        axios({
            url:'api/p/naverLogin',
            method:'GET',
            params:{accessToken:token}
        }) .then((res) => {
            if(res.data.code === '2000') {
                document.location.href = '/';
            } else {
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