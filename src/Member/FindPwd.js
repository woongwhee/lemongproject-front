// 1. FindInfo.js 보여주기
// 2. 버튼 클릭시 동일한 페이지에서 ReNamePwd.js 컴포넌트로 전환

import FindInfo from "./FindInfo";


function FindPwd() {
    

    return(
        <div>
            {/* <h1>비밀번호 찾기 페이지</h1>
            <h2>{sessionStorage.getItem("userNo")}</h2> */}
            <FindInfo />
        </div>


    )

}

export default FindPwd;