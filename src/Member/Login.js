import React, { useState} from 'react';
import axios from 'axios'; // 액시오스

function Login() {
    const [email, setEmail] = useState();
    const [userPwd, setUserPwd] = useState();
    const loginClick=async(e,p)=>{

    let response = await axios.post('api/login',({
             'email':e,'userPwd':p
        }))
    if(response.code==='2000'){console.log('성공!')}
    else{console.log('실패!')}
    }
    
    return (
        <div>
            <p>아이디</p>
            <input onChange={(e) => {setEmail(e.target.value);}}/>
            <p>이메일</p>
            <input onChange={(e) => {setUserPwd(e.target.value);}}/>
            <br/>
    <button onClick={()=>{
        loginClick(email,userPwd);
    }}>전송</button>

        </div>
    );

}


export default Login;