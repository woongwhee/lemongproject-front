import image1 from './MainImg/feed.png';
import image2 from './MainImg/rank.png';
import image3 from './MainImg/templateimg.png';
import image4 from './MainImg/todoimg.png';
import monitor from './MainImg/monitor.png';

import './TitleInfo.css';

import Carousel from 'react-bootstrap/Carousel';




function TitleInfo() {


    return(

        <div className='TitleInfoWrap'>
                <div className='sdiv1'>
                    <Carousel className="CarouselMain" indicators={false} controls={false} interval={5000} fade={true}>
                        <Carousel.Item>
                            <img className="d-block w-100 CarouselInnerImg" src={image1} alt="First slide" />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className="d-block w-100 CarouselInnerImg" src={image2} alt="Second slide" />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className="d-block w-100 CarouselInnerImg" src={image3} alt="Third slide" />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img className="d-block w-100 CarouselInnerImg" src={image4} alt="First slide" />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className='sdiv2'>
                    <img className='monitorImg' src={monitor} alt="mointor Img loading fail" />
                </div>    

        </div>
    )

}


export default TitleInfo;


