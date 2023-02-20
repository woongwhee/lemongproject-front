
import TitleInfo from './TitleInfo';
import Login from './Login';
import './MainFront.css';

function MainFront() {


    return(
        <>
            <TitleInfo />

            <Login />

            <div className="copyRightArea">
                <p>LEMONG PROJECT</p>
                <p>(c) 2023. 연필뽀개기 Inc. all rights reserved 진웅휘 | 박미선 | 송지호 | 장민석 | 한솔</p>
            </div>

            <div className='loginBackColor'></div>

        </>
    )
}


export default MainFront;
