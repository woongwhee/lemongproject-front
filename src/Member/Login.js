import React, { useEffect, useState} from 'react';
import axios from 'axios'; // 액시오스

function Login() {

    const [email, setEmail] = useState();
    const [userPwd, setUserPwd] = useState();

    // 로그인 클릭시 데이터 전송
    const loginClick=async(e,p)=>{
        let response = await axios.post('api/login',
        ({'email':e,'userPwd':p})
        )
        if(response.data.code==='2000') {
            console.log('성공!')
            alert("로그인에 성공하였습니다.")
            sessionStorage.setItem("email", email);
        } else {
            console.log('실패!')
            alert("잘못된 정보입니다. 다시 입력해주세요.")
        }
        document.location.href = "/findPwd"; // 페이지 이동
    }



    


    

    // 화면 설계
    return (
        <div>
            <p>아이디</p>
            <input onChange={(e) => {setEmail(e.target.value);}}/>
            <p>이메일</p>
            <input type="password" onChange={(e) => {setUserPwd(e.target.value);}}/>
            <br/>
            <button onClick={()=>{loginClick(email,userPwd);}}>
                전송
            </button>
            <br />
        </div>
    )
}


export default Login;