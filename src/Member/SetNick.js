import axios from "axios";
import { useState } from "react";


function SetNick() {

    const [nickName, setNickName] = useState();
    
    const [nickError, setNickError] = useState();

    const [isNickBtn, setIsNickBtn] = useState();

    const isJoin = isNickBtn;



    // 닉네임 중복체크
    const checkNick = async(nickName) => {
        let response = await axios.post('api/p/join/chNick',
            ({'nickName':nickName})
        )
        if(response.data.code === '2000') {
            // alert("사용가능")
            setNickError("사용 가능한 닉네임입니다.")
            // setErrorColor("chAlarm okAlarm")
            setIsNickBtn(true);
        } else {
            // alert("사용불가능")
            setNickError("중복된 닉네임입니다.")
            // setErrorColor("chAlarm noAlarm")
            setIsNickBtn(false);
        } 
    }


    // 회원가입 클릭시 데이터 전송
    const joinClick = async(nickName) => {
        let response = await axios.post('api/p/setNickJoin',
            ({
              'nickName':nickName
            })
        )
        if(response.data.code === '2000') {
            alert("어서오세요. 여러분의 꿈을 응원합니다. :)")
            document.location.href = "/"; // 회원가입 성공 시 로그인 페이지로
        } else {
            alert.log('회원가입 실패');
        }
    }


    return(
        <div>
            <h1>닉네임 설정</h1>
            {/* 닉네임 */}
            <div>
                <input type="text" id="nickName" name="nickName" placeholder="닉네임" required 
                    onChange={(e) => {setNickName(e.target.value);}} />
                <button onClick={() => {checkNick(nickName);}}>중복확인</button>
                <p>{nickError}</p>
            </div>
            <div>
                <button onClick={() => {joinClick(nickName);}} disabled={!isJoin}>
                    회원가입
                </button>
            </div>
        </div>
    )
}

export default SetNick;