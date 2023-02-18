// 비밀번호 재설정 페이지(맞는 사용자의 비밀번호 찾기)
import axios from 'axios';
import { useCallback, useState } from 'react';
import './FindPwd.css'
import './Join.css';
import './NewPwd.css';

function NewPwd() {

    const [newPwd, setNewPwd] = useState();
    const [newPwdCh, setNewPwdCh] = useState();


    // 알림 색깔
    const [newPwdCol, setNewPwdCol] = useState();
    const [newPwdChCol, setNewPwdChCol] = useState();


    // 에러 메세지
    const [newPwdError, setNewPwdError] = useState();
    const [newPwdChError, setNewPwdChError] = useState();


    // 유효성 검사
    const [isNewPwd, setIsNewPwd] = useState(false);
    const [isNewPwdCh, setIsNewPwdCh] = useState(false);



    // 비밀번호 체크
    const onChangeNewPwd = useCallback((e) => {
        const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[@#$%^&*()_])(?=.*[0-9]).{8,15}$/
        const pwdCurrent = e.target.value
        setNewPwd(pwdCurrent)

        if(!pwdRegex.test(pwdCurrent)) {
            setNewPwdError("8~15자 영문자, 숫자, 특수문자(@#$%^&*()_)를 사용하세요.")
            setNewPwdCol("chAlarm noAlarm")
            setIsNewPwd(false)
        } else {
            setNewPwdError("형식에 맞는 비밀번호입니다.")
            setNewPwdCol("chAlarm okAlarm")
            setIsNewPwd(true)
        }
    }, [])


    
    // 비밀번호 체크
    const onChangeNewPwdCh = useCallback((e) => {
        const pwdChCurrent = e.target.value
        setNewPwdCh(pwdChCurrent)

        if(newPwd === pwdChCurrent) {
            setNewPwdChError("비밀번호가 일치합니다.")
            setNewPwdChCol("chAlarm okAlarm")
            setIsNewPwdCh(true)
        } else {
            setNewPwdChError("비밀번호가 일치하지 않습니다.")
            setNewPwdChCol("chAlarm noAlarm")
            setIsNewPwdCh(false)
        }
    })


    // 비밀번호 확인 버튼 활성화
    const isNewPwdBtn = isNewPwd && isNewPwdCh;


    
    // 비밀번호 변경 버튼 클릭
    const newPwdClick = async(newPwd) => {
        let res = await axios.post('api/p/newPwd',
            {
                'userPwd':newPwd
            }
        )
        if(res.data.code === '2000') {
            alert("비밀번호가 재설정되었습니다.")
            document.location.href = "/";
        } else {
            alert("비밀번호 변경에 실패하였습니다.")
        }
    }


    const toMain = () => {
        window.location.href = "/"
    }


    return(
        <>

            <div className="findInfoCol"></div>

            <div>
                <div className="findInfoWrap">

                    <div className="pwdTitleArea">
                        <img className="pwdLogo" src="LemongImg/CommonImg/LemongLogo.png" alt="logo" onClick={toMain} />
                        <p className="pwdTitle">비밀번호 재설정</p>
                    </div>

                    <div className="findInput">
                        {/* 비밀번호 재설정 */}
                        <div className='newPwdInput'>
                            <span className='newPwdInputP'>비밀번호 재설정</span>
                            <input className='inputNewPwd' type="password" id="newPwd" name="newPwd" placeholder='비밀번호 입력' required
                                onChange={(e) => {onChangeNewPwd(e);}} />
                            <p className={newPwdCol}>{newPwdError}</p>
                        </div>
                        {/* 비밀번호 재입력 */}
                        <div className='reNewPwdInput'>
                            <span className='reNewPwdInputP'>비밀번호 확인</span>
                            <input className='inputReNewPwd' type="password" id="newPwdCh" name="newPwdCh" placeholder="비밀번호 재입력" required 
                                onChange={(e) => {onChangeNewPwdCh(e);}} />
                            <p className={newPwdChCol}>{newPwdChError}</p> 
                        </div>

                        {/* 재설정 버튼 */}
                        <div className="findPwdBtnArea">
                            <button className="findPwdBtn" onClick={() => {newPwdClick(newPwd);}} disabled={!isNewPwdBtn}>
                                비밀번호 재설정
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </>


    )
}


export default NewPwd;
