// import { Link } from "react-router-dom";


function FindPwd(props) {
    
    return(
        <div>
            <h1>비밀번호 찾기 페이지</h1>
            <h2>{sessionStorage.getItem("userNo")}</h2>
        </div>


    )

}

export default FindPwd;