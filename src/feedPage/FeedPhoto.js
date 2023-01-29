import React, {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

function FeedPhoto({filePath}) {

    const [getFilePath,setFilePath] = useState('')
    useEffect(()=>{
        setFilePath(filePath);
    })

    const list = getFilePath.split(",");



    const rendering = () => {
        const result = [];
        for (let i = 0; i < list.length; i++) {
            result.push(
                <Carousel.Item key={i}>
                    <img
                        className="d-block w-100"
                        src={list[i]}
                        alt='사진이없습니다'
                    />
                </Carousel.Item>
            );
        }

        return result;
    };

    return (
        <Carousel>
            {rendering()}
        </Carousel>
    );
}

export default FeedPhoto;
            {/*<Carousel.Item>*/}
            {/*    <img*/}
            {/*        className="d-block w-100"*/}
            {/*        src={companyLogo1}*/}
            {/*        alt="First slide"*/}
            {/*    />*/}
            {/*</Carousel.Item>*/}
            {/*<Carousel.Item>*/}
            {/*    <img*/}
            {/*        className="d-block w-100"*/}
            {/*        src={companyLogo2}*/}
            {/*        alt="Second slide"*/}
            {/*    />*/}

            {/*</Carousel.Item>*/}
            {/*<Carousel.Item>*/}
            {/*    <img*/}
            {/*        className="d-block w-100"*/}
            {/*        src={companyLogo3}*/}
            {/*        alt="Third slide"*/}
            {/*    />*/}
            {/*</Carousel.Item>*/}

