import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import companyLogo1 from '../feedPage/img/KakaoTalk_20230124_190630482.jpg'
import companyLogo2 from '../feedPage/img/KakaoTalk_20230124_190630482_02.jpg'
import companyLogo3 from '../feedPage/img/KakaoTalk_20230124_190630482_01.jpg';
function FeedPhoto(props) {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={companyLogo1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
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
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default FeedPhoto;