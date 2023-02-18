import React, {useContext, useState} from 'react';
import Carousel from "react-bootstrap/Carousel";
import FeedLoading from "./FeedLoading";

function FeedDetailPhoto({filePathList}) {



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
                        style={{height:"500px", marginTop:"100px", marginBottom:"100px"}}
                    />
                </Carousel.Item>
            );})
        return result;
    };
    return (

        <Carousel pause='hover'>
            {rendering()}
        </Carousel>

    );
}

export default FeedDetailPhoto;