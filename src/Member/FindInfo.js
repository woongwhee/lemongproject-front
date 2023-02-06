// 비밀번호 찾기 첫 페이지(이름, 이메일, 인증번호)

import React, { useCallback, useState } from "react";
import axios from "axios";

import '../styles/FindInfo.css'
import '../styles/Join.css'


function FindInfo() {

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [emailNum, setEmailNum] = useState();


    // 알림 색깔
    const [emailColor, setEmailColor] = useState();
    const [emailNumColor, setEmailNumColor] = useState();


    // 에러 메세지 변수
    const [emailMs, setEmailMs] = useState();
    const [emailNumMs, setEmailNumMs] = useState();


    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);


    // 버튼 활성화
    const [isEmailBtn, setIsEmailBtn] = useState(false);
    const [isEmailNumBtn, setIsEmailNumBtn] = useState(false);


    // 이름 공백 체크
    const changeName = useCallback((e) => {
        const nameCurrent = e.target.value
        setUserName(nameCurrent)

        if(nameCurrent == null) {
            setIsName(false)
        } else {
            setIsName(true)
        }
    }, [])


    // 이메일 형식 체크
    const changeEmail = useCallback((e => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if(!emailRegex.test(emailCurrent)) {
            setEmailMs("유효하지 않은 이메일 주소입니다.")
            setEmailColor("chAlarm noAlarm")
            setIsEmail(false)
        } else {
            setEmailMs("유효한 이메일 주소입니다.")
            setEmailColor("chAlarm okAlarm")
            setIsEmail(true)
        }
    }, []));


    // 이메일 인증 버튼
    const chEmail = async(email) => {
        let response = await axios.post('api/p/findPwd/chEmail',
            ({'email':email})
        )
        if(response.data.code === '2000') {
            console.log("테스팅 중~")
            setEmailMs("인증번호가 발송되었습니다.")
            setEmailColor("chAlarm")
            setIsEmailBtn(true)
        } else {
            console.log("인증 코드 보내기 실패")
            setEmailMs("인증번호 발송에 실패하였습니다.")
            setEmailColor("chAlarm noAlarm")
            setIsEmailBtn(false)
        }
    }
    // 인증번호 확인
    const chEmailNum = async(email, emailNum) => {
        let response = await axios.post('api/p/findPwd/chEmailNum',
            ({'email':email,
              'emailNum':emailNum
            })
        )
        if(response.data.code === '2000') {
            setEmailNumMs("인증되었습니다.")
            setEmailNumColor("chAlarm okAlarm")
            setIsEmailNumBtn(true)
        } else {
            setEmailNumMs("인증번호가 일치하지않습니다.")
            setEmailNumColor("chAlarm noAlarm")
            setIsEmailNumBtn(false)
        }
    }
    // 버튼 활성화 여부
    const toNewPwd = isName && isEmail && isEmailBtn && isEmailNumBtn
    return(
        <div>
            <div className="findInfoWrap">
                <div>
                    <p>비밀번호 찾기</p>
                </div>
                
                <div className="findInput">
                    {/* 이름 */}
                    <div className="findName">    
                        <p>이름</p>
                        <input type="text" id="userName" name="userName" placeholder="이름을 입력하세요." required 
                            onChange={(e) => {changeName(e);}}/>
                    </div>
                    {/* 이메일 */}
                    <div className="findEmail">
                        <p>이메일</p>
                        <input type="text" id="email" name="email" placeholder="이메일을 입력하세요." required 
                            onChange={(e) => {changeEmail(e);}}/>
                        <button onClick={() => {chEmail(email);}}>인증</button>
                        <p className={emailColor}>{emailMs}</p>
                    </div>
                    {/* 인증번호 확인 */}
                    <div className="findEmailNum">
                        <p>인증번호</p>
                        <input type="text" id="code" name="code" placeholder="인증번호를 입력하세요." required 
                            onChange={(e) => {setEmailNum(e.target.value);}} />
                        <button onClick={() => {chEmailNum(email, emailNum);}}>확인</button>
                        <p className={emailNumColor}>{emailNumMs}</p>
                    </div>

                    <div>
                        <button disabled={!toNewPwd}>비밀번호 재설정</button>
                    </div>
                </div>

            </div>
        </div>
    )


}


export default FindInfo;