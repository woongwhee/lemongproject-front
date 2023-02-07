import React, {useEffect, useState} from 'react';
import axios from "axios";
import FeedReplyList from "./FeedReplyList";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import FeedReplyResultList from "./FeedReplyResultList";
import Carousel from "react-bootstrap/Carousel";
import FeedLoading from "./FeedLoading";
import Feed from "./Feed1";
import FeedDetailPhoto from "./FeedDetailPhoto";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './FeedDetail.css'
import FeedReplyInsert from "./FeedReplyInsert";

function FeedDetail(props) {

    const [ testStr, setTestStr ] = useState();

    const Feed = props.Feed;

    function callback(str) {
        setTestStr(str);
    }

    useEffect(()=>{axios({
        url:'/api/feed/detailFeed',
        params:{feedNo:Feed.feedNo}
    }).then((res)=>{
        console.log(res.data)
        callback(res.data)
        setLoading(false);
    })
    }, [])
    const [loading, setLoading] = useState(true);
    let i=0;
    return (
        <>
            <div className="container">
                <div className="photoArea">
                    {loading ? <FeedLoading/> : testStr?.map(e => <FeedDetailPhoto key={i++} {...e} />)}
                </div>
                <div className="detailRight">
                <div className="contentArea" style={{border:"1px solid blue"}}>
                    피드내용
                    {Feed}
                </div>
                <FeedReplyInsert Feed={Feed}></FeedReplyInsert>
                </div>
            </div>
        </>


    );
}

export default FeedDetail;