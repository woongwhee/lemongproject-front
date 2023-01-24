import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// 부트스트랩
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyFeedDetails(){

     // userNo에 해당하는 feed값 db에서 가져오기
     const [myFeed , setMyFeed] = useState();
        
     const selectMyFeed = async() => {
         const response = await axios.get("/api/feed/selectMyFeed");
         console.log(response.data);

         setMyFeed(response.data[0]);
         
     }
     useEffect(() => {selectMyFeed()},[])

    return (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>{myFeed?.feedNo}</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>{myFeed?.feedContent}</p>
              <br></br>
              <h1>{myFeed?.feedAt}</h1>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
}

export default MyFeedDetails;