// import React, {useState} from 'react';
// import FeedInsert from "./FeedInsert";
// import FeedBody from "./FeedBody";
// import Button from "react-bootstrap/Button";
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Menubar2 from "../todo/menubar/Menubar2";
// function FeedMenu(props) {
//
//     // const [feedpage,setFeedPage]=useState(false);
//     // const pageOn = () => {setFeedPage(true);}
//     // const pageOff= () => {setFeedPage(false);}
//
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//
//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 메뉴
//             </Button>
//             <Offcanvas show={show} onHide={handleClose} placement="end">
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title>메뉴바</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <Button>Feed Insert</Button>
//                 </Offcanvas.Body>
//             </Offcanvas>
//             {/*{feedpage === true ? <FeedBody/> :  <FeedInsert/>}*/}
//         </>
//     )
//
//
//
//
//
// }
//
// export default FeedMenu;