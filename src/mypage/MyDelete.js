import React , {useState , useEffect , useValid} from "react";
import { Component } from "react";
import axios from "axios";

import Logo from './image/레몽 로고.png';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function MyDelete(){

    // 비밀번호 체크 하기 위해 USER비밀번호 가져오기.
    const [userPwd , setUserPwd] = useState();

    const selectUpwd = async() => {
        const response = await axios.get("api/member/selectUser");
        setUserPwd(response.data[0]);
    }
    useEffect(() => {selectUpwd()},[])

    // 비밀번호 체크 후 탈퇴를 하기위한 비밀번호 값 저장
    const [pwdcheck , setPwdCheck] = useState({
        passwordCheck1 : '' ,
        passwordCheck2 : ''

    });

    const handleInput = (event) => {
        const {name , value} = event.target;

        setPwdCheck({
            ...pwdcheck,
            [name] : value ,
        });
    };

    const DeleteUser = () => {
        const deleteUser = axios.get("/api/member/deleteUser").then(function(){
            alert("변경 완료");
        });
    }

    return (
        <div className="App">
        <div class="container p-5">
            
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{float:'right' , marginRight:'25px' , borderRadius:'0'}}>
             회원 탈퇴
             </button>
            
             <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog" style={{margin:'auto' , marginTop:'50px'}}>
                <div class="modal-content" style={{width:'1000px' , height:'800px' , borderRadius:'0'}}>
                   <div class="modal-header">
                   <h1>회원탈퇴</h1>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                   <div class="modal-body">
                   <form>
                      <div class="mb-3">
                        <img src={Logo} style={{width:'500px' , marginLeft:'200px'}}></img>
                        <br/><br/><br/>
                         <label for="exampleInputEmail1" class="form-label">Password</label>
                         <input type="password" class="form-control" name="passwordCheck1" onChange={handleInput}/>
                      </div>
                      <div class="mb-3">
                         <label for="exampleInputPassword1" class="form-label">Password Check</label>
                         <input type="password" class="form-control" name="passwordCheck2" onChange={handleInput}/>
                      </div>
                            <br/>
                            {pwdcheck.passwordCheck1 === pwdcheck.passwordCheck2 && 
                            <button type="button" class="btn btn-primary" style={{marginLeft:'430px' , borderRadius: '0'}}
                            onClick={DeleteUser}>회원탈퇴</button>}
                   </form>
                   </div>
                </div>
             </div>
             </div>
             </div>
          
        </div>
      );

}

export default MyDelete;