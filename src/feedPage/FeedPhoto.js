import React, {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import companyLogo1 from '../feedPage/img/KakaoTalk_20230124_190630482.jpg'
import companyLogo2 from '../feedPage/img/KakaoTalk_20230124_190630482_02.jpg'
import companyLogo3 from '../feedPage/img/KakaoTalk_20230124_190630482_01.jpg';

function FeedPhoto({filePath}) {
    const [getFilePath,setFilePath] = useState('')

useEffect(()=>{
    setFilePath(filePath);

})

    return (
        <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={getFilePath}
                        alt='사진이없습니다'
                    />
                </Carousel.Item>

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

