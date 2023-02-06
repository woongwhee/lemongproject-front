import { useEffect } from 'react';
import { Client_Id, Naver_CallBack_URL } from './NaverData';


function NaverLoginBtn() {


    const { naver } = window;
    const NAVER_CLIENT_ID = Client_Id;
    const NAVER_CALLBACK_URL = Naver_CallBack_URL;


    const initializeNaverLogin = () => {
        const nLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: '47' },
        });
        nLogin.init();

        // 프론트에서 회원정보를 가지고 올 경우?
        // 이 내부에서 작성하면 된다.
        nLogin.getLoginStatus(async function(status) {
            if(status) {
                const userId = nLogin.user.getEmail()
                const userName = nLogin.user.getName()
                console.log(userId)
                console.log(userName)
            }
        })
    };


    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }

    const getToken = () => {
        const token = window.location.href.split("=")[1].split('&')[0]
        console.log(token)
        sessionStorage.setItem('access_Token', token)
        
    }


    const handleNaverClick = () => {
        const naverLoginButton = document.getElementById("naverIdLogin_loginButton");
        if(naverLoginButton) naverLoginButton.click();
    }


    useEffect( () => {
        initializeNaverLogin()
        userAccessToken()
    }, [])



    return(
        <div>
            <div id="naverIdLogin" style={{display: "none"}}></div> 
            <div>
                <img className='social' src='LemongImg/SocialImg/NaverLogin.png' alt='lemongLogo' 
                    onClick={handleNaverClick} />
            </div>
            {/* id 값이 naverIdLogin인 div가 반드시 있어야 한다. */}
        </div>
    )

}



    




export default NaverLoginBtn;