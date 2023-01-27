import React , {useState , useEffect , useValid} from "react";
import { Component } from "react";
import $ from 'jquery';
import axios from "axios";
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"></link>

function MyPagePwdCheck(){

    // 비밀번호 체크 하기 위해 USER비밀번호 가져오기.
    const [userPwd , setUserPwd] = useState();

    const selectUpwd = async() => {
        const response = await axios.get("api/member/selectUser");
        setUserPwd(response.data[0]);
    }
    useEffect(() => {selectUpwd()},[])

    // 사용자가 입력한 비밀번호 비교.
    const [pwd , setInputPwd] = useState({
        passwordInput1 : '',
        passwordInput2 : ''
    });  

    const handleInput = (event) => {
        const { name , value } = event.target;
        setInputPwd({
          ...pwd, 
          [name]: value,
        });
      };

    const btnCheck = () => {
        console.log(pwd)
        if(pwd.passwordInput1 === pwd.passwordInput2){
            const updatePwd = axios.get("/api/member/myPwdUpdate" , {
                params: {
                    upPwd : pwd.passwordInput1 ,
                }
            }).then(function(){
                alert("변경 완료");
            })
        }else{
            alert("다름");
        }
    }

    const check = () => {
        if(pwd.passwordInput1 !== pwd.passwordInput2){
            return <h5 style={{marginLeft: "70px" , color: "red"}}>비밀번호가 일치하지 않습니다.</h5>
        }else if(pwd.passwordInput1 === pwd.passwordInput2){
           return <h5 style={{marginLeft: "70px" , color: "green"}}>비밀번호가 일치합니다.</h5>
        }
    }

    return(
        <div>
            <form>
                <h7 style={{marginLeft: "70px"}}>PassWord Change</h7>
                <div className="outer_passChange" style={{height: '40px'}}>
                    <input
                        type="password"
                        className="form-control"
                        name='passwordInput1'
                        onChange={handleInput}
                    />
                </div>

                <br/>

                <h7 style={{marginLeft: "70px"}}>PassWord Check</h7>
                <div className="outer_passCheck" style={{height: '40px'}}>
                    <input
                        type="password"
                        className="form-control"
                        name='passwordInput2'
                        onChange={handleInput}
                    />
                </div>
                    <div>{check()}</div>
                <button type="submit" onClick={btnCheck}>확인</button>
            </form>
        </div>
    );
}

export default MyPagePwdCheck;