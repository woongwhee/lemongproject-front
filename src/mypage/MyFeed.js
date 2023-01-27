import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import FeedLogo from './image/feedImg.jpg';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function MyFeed(){

        // userNo에 해당하는 feed값 db에서 가져오기
        const [myFeed , setMyFeed] = useState();
        
        const selectMyFeed = async() => {
            const response = await axios.get("/api/feed/selectMyFeed");
            console.log(response.data);

            setMyFeed(response.data[0]);
            
        }
        useEffect(() => {selectMyFeed()},[])

        // userNo에 대항하는 reply값 db에서 가져오기
        const [myReply , setMyReply] = useState();

        const selectMyReply = async() => {
            const response = await axios.get("/api/reply/selectReply");
            console.log(response.data);
            setMyReply(response.data[0]);
        }
        useEffect(() => {selectMyReply()},[])


        return(
            <div className="outer_Feed">
                {
                    [1,2,3].map(function(){
                        return(
                            // <Link to="/MyFeedDetails">
                            <div className="outer_feedThum" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                
                                <img src={FeedLogo} className="outer_feedThum" style={{width:'226px' , height:'210px'}}/>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" style={{marginTop:'50px' , marginLeft:'350px'}}>
                                        <div class="modal-content" style={{width:'1500px' , height:'800px' , borderRadius:'0'}} >
                                            <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                            <form>
                                                <div class="mb-3">
                                                    <div className="outer_sub">
                                                        <div className="outer_feedImg">
                                                        <img src={FeedLogo} style={{width:'875px' , height:'603px'}}></img>
                                                
                                                        <div className="outer_feedHart">
                                                            <h3>♥123,456</h3>
                                                            <h3 style={{float:'right' , marginTop:'-43px'}}>2023-01-24</h3>
                                                        </div> 
                                                        </div>
                                                             
                                                        <div className="outer_feedContent">
                                                        <h5>{myFeed?.feedContent}</h5>
                                                        </div>
                                                        <div className="outer_feedReply">
                                                            <p>{myReply?.replyContent}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </form>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                            // </Link>
                    )
                })
             }
             
        </div>
        
    )
};

export default MyFeed;

