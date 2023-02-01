import React, {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

function FeedPhoto({filePathList}) {


    const rendering = () => {
        let i = 0;
        const result = [];
        filePathList.map(path => {
                result.push(
                <Carousel.Item key={i++}>
                    <img
                        className="d-block w-100"
                        src={path}
                        alt='사진이없습니다'
                    />
                </Carousel.Item>
            );})


        return result;
    };

    return (
        <Carousel>
            {rendering()}
        </Carousel>
    );
}
export default FeedPhoto;