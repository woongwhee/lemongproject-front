import axios from "axios";
import { useState } from "react";

import './FindPwd.css';
import './SetNick.css';


function SetNick() {

    const [nickName, setNickName] = useState();
    const [nickError, setNickError] = useState();
    const [isNickBtn, setIsNickBtn] = useState(false);

    const [errorColor, setErrorColor] = useState();

    const isJoin = isNickBtn;


    // 닉네임 중복체크
    const checkNick = async(nickName) => {
        if(nickName === null) {
            setNickError("닉네임을 입력해주세요.")
            setErrorColor("chAlarm noAlarm")
            setIsNickBtn(false)
        } else {
            let response = await axios.post('api/p/join/chNick',
                ({'nickName':nickName})
            )
            if(response.data.code === '2000') {
                setNickError("사용 가능한 닉네임입니다.")
                setErrorColor("chAlarm okAlarm")
                setIsNickBtn(true);
            } else {
                setNickError("중복된 닉네임입니다.")
                setErrorColor("chAlarm noAlarm")
                setIsNickBtn(false);
            } 
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
            sessionStorage.clear();
            document.location.href = "/"; // 회원가입 성공 시 로그인 페이지로
        } else {
            alert.log('회원가입 실패');
        }
    }


    return(

        <>
            <div className="findInfoCol"></div>

            <div>

                <div className="setNickWrap">
                    <div>
                        <img className="setNickLogo" src="LemongImg/CommonImg/LemongLogo.png" alt="logo" />
                        <p className="pwdTitle">닉네임 설정</p>
                    </div>
                    {/* 닉네임 */}
                    <div className="findInput">
                        
                    
                        <div className="setNickInputArea">
                            <input className="setNickInput" type="text" id="nickName" name="nickName" placeholder="닉네임을 입력해주세요." required
                                onChange={(e) => {setNickName(e.target.value);}} />
                            <button className="chBtn enBtn" onClick={() => {checkNick(nickName);}}>중복확인</button>
                            <p className={errorColor}>{nickError}</p>
                        </div>

                        <div className="findPwdBtnArea">
                            <button className="findPwdBtn" onClick={() => {joinClick(nickName);}} disabled={!isJoin}>
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SetNick;