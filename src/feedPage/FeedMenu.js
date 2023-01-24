import React, {useState} from 'react';
import FeedInsert from "./FeedInsert";
import FeedBody from "./FeedBody";
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
function FeedMenu(props) {

    const [feedpage,setFeedPage]=useState(true);
    const pageOn = () => {setFeedPage(true);}
    const pageOff= () => {setFeedPage(false);}


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                메뉴
            </Button>

            <Offcanvas show={show} onHide={handleClose}>

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>메뉴바</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Button onClick={pageOn}>피드메인</Button> <br/><br/><br/>
                    <Button onClick={pageOff}>Feed Insert</Button>
                </Offcanvas.Body>
            </Offcanvas>
            {feedpage === true ? <FeedBody/> :  <FeedInsert/>}





        </>
    )





}

export default FeedMenu;