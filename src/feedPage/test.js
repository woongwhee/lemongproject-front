import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const baseUrl = "http://localhost:8080";

    const [user_username, setUser_username] = useState();
    const [user_password, setUser_password] = useState();

    useEffect(()=>{
        getUser();
    },[]);

    async function getUser(){
        await axios
            .get(baseUrl + "/" + {user_username})
            .then((response) => {
                console.log(response.data);
                setUser_username(response.data.userName);
                setUser_password(response.data.password);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const handleChange_username = (e)=>{
        e.preventDefault();
        setUser_username(e.target.value);
    }

    const handleChange_password = (e)=>{
        e.preventDefault();
        setUser_password(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(baseUrl + "/" + {user_username}, {
                userName:user_username,
                password:user_password,
            })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>username<input type="text" required={true} value={user_username} onChange={handleChange_username}></input></p>
                <p>password<input type="text" required={true} value={user_password} onChange={handleChange_password}></input></p>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}