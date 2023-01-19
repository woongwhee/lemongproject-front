// import { Link } from "react-router-dom";


function FindPwd() {

    return(
        <div>
            <h1>비밀번호 찾기 페이지</h1>
            <h3>{sessionStorage.getItem("email")}</h3>
        </div>


    )

}

export default FindPwd;