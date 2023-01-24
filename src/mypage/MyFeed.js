import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyFeed(){

        // userNo에 해당하는 feed값 db에서 가져오기
        const [myFeed , setMyFeed] = useState();
        
        const selectMyFeed = async() => {
            const response = await axios.get("/api/feed/selectMyFeed");
            console.log(response.data);

            setMyFeed(response.data[0]);
            
        }
        useEffect(() => {selectMyFeed()},[])

        return(
            <div className="outer_Feed">
                {
                    [1,2].map(function(){
                        return(
                            <Link to="/MyFeedDetails">
                                <div className="outer_feedThum">
                                    <p> {myFeed?.userNo}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
};

export default MyFeed;

