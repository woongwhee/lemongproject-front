import {useLoginDispatch} from "../member/LoginContext";
import axios from "axios";
import Button from "@mui/material/Button";

function LogoutButton() {
    const dispatch= useLoginDispatch();

    const logout=async ()=>{
        await axios.get("/api/member/logout");

        dispatch({
            type:"logout"
        });
    }
    return (
        <Button onClick={logout}>
            ๋ก๊ทธ์์
        </Button>

    );
}
export default LogoutButton;