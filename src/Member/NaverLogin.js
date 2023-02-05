

function NaverLogin() {

    const main = () => {
        document.location.href = '/';
    }


    return(
        <div>
            <h1>네이버 로그인</h1>
            <button onClick={main}>로그아웃 버튼 만들기</button>
        </div>
    )

}


export default NaverLogin;