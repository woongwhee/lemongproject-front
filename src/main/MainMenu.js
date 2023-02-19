import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Offcanvas from "react-bootstrap/Offcanvas";
import FeedInsert from "../feed/FeedInsert";
import ChallengeChatRoom from "../challengeChat/challengeChatRoom";
import LogoutButton from "./LogoutButton";
import {useState} from "react";

function MainMenu(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(<>

            {/*<Button variant="outlined" onClick={handleShow}>*/}
            {/*    메뉴*/}
            {/*</Button>*/}
            <IconButton aria-label="delete" size="large" onClick={handleShow} style={{float:"right"}}>
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>메뉴바</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <LogoutButton></LogoutButton>
                    <br/>
                    <FeedInsert></FeedInsert>

                    <br/>
                    <div style={{marginTop:'-500px'}}>
                        <ChallengeChatRoom/>
                    </div>
                </Offcanvas.Body>
            </Offcanvas></>
    )
}
export default MainMenu;