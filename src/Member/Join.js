import { useState } from "react";
import axios from "axios";

function Join() {

    const [userName, setUserName] = useState();
    const [nickName, setNickName] = useState();
    const [userPwd, setUserPwd] = useState();
    const [email, setEmail] = useState();
    const [emailNum, setEmailNum] = useState();
    
    // 회원가입 클릭시 데이터 전송
    const joinClick = async(name, nick, pwd, email) => {
        let response = await axios.post('api/join',
            ({'userName':name,
              'nickName':nick,
              'userPwd':pwd,
              'email':email
            })
        )
        if(response.data.code === '2000') {
            alert("어서오세요. 여러분의 꿈을 응원합니다. :)")
            document.location.href = "/"; // 회원가입 성공 시 로그인 페이지로
        } else {
            console.log('회원가입 실패');
        }

        /*
            동일한 회원정보가 존재할 경우(모든 데이터 일치)
            axios Request failed with status code 500
            이라는 에러가 뜬다.
            Bad Server 500 error가 뜨는데 조회는 되는데 한 개만 select가 안되다보니
            server 에러라고 뜬다.
        */
        
    }

    return(
        <div>
            <h1>회원가입 페이지</h1>
            <p>이름</p>
            <input type="text" id="userName" name="userName" placeholder="이름" required 
                onChange={(e) => {setUserName(e.target.value);}} / >
            <p>닉네임</p>
            <input type="text" id="nickName" name="nickName" placeholder="닉네임" required 
                onChange={(e) => {setNickName(e.target.value);}} />
            <button>중복확인</button>
            <p>비밀번호</p>
            <input type="password" id="userPwd" name="userPwd" placholder="비밀번호" required 
                onChange={(e) => {setUserPwd(e.target.value);}} />
            <p>비밀번호 확인</p>
            <input type="password" placeholder="비밀번호 확인"></input>
            <p>이메일 주소</p>
            <input type="email" id="email" name="email" placeholder="이메일 주소" required 
                onChange={(e) => {setEmail(e.target.value);}}/>
            <button>인증</button>
            <p>이메일 인증번호 입력</p>
            <input type="text" placeholder="이메일 인증번호 입력"></input>
            <button>확인</button>

            <br /> <br /> <br />
            
            <button onClick={() => {joinClick(userName, nickName, userPwd, email);}}>
                회원가입
            </button>

        </div>
    )

}

export default Join;