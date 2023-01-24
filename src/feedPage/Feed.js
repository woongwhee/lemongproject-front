import React, {useState} from 'react';
import './Feed.css'
import Modal from 'react-modal'
import FeedReplyInsert from './FeedReplyInsert';
import FeedReply from './FeedReply';
import FeedUpdate from "./FeedUpdate";
import Button from 'react-bootstrap/Button';
import FeedDelete from "./FeedDelete";
import Carousel from 'react-bootstrap/Carousel';
import companyLogo1 from '../img/KakaoTalk_20230124_190630482.jpg';
import companyLogo2 from '../img/KakaoTalk_20230124_190630482_02.jpg';
import companyLogo3 from '../img/KakaoTalk_20230124_190630482_01.jpg';



function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt}=props;

    const [heart, setHeart] = useState('🤍');

    const [like, setLike] = useState(0)

    return (
        <div className="feed-container">
            <div className="feed">
                <div className="feed-header">
                    <div className="feed-header-left">
                        피드시간 : {feedAt}
                    </div>
                    <div className="feed-header-right">
                        <FeedUpdate feedNo={feedNo}feedContent={feedContent}/>
                        <FeedDelete feedNo={feedNo}/>
                    </div>
                </div>

                <div className="feed-photo">
                    <p>피드번호 : {feedNo}</p>
                    <span>이름 : {userNo}</span>
                    {/*<img className="photo" src="https://images.unsplash.com/photo-1659482023691-04d925fb35fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>*/}
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={companyLogo1}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={companyLogo2}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={companyLogo3}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="feed-body">
                    <div className="feed-header-left">
                        <button onClick={ () => {setLike(like + 1); }}>🤍</button>
                        <button onClick={ () => {setHeart('❤')}}>{heart}</button>
                        <FeedReply feedNo={feedNo}></FeedReply>
                    </div>
                    <div className="feed-header-right">
                        좋아요 : {like}
                    </div>
                </div>

                <div className="feed-content">
                    <p>{userNo}(닉네임) : {feedContent}</p>
                </div>
            </div>
        </div>

    );
}

export default Feed;