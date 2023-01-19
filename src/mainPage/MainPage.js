import React from 'react';
// import './Main.css';

function MainPage() {
    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    return(

        <div className="outer">
            {/* 캘린더 영역 */}
            <div className="outer_date">
                <Profile/>
                <br/><br/>
                <Calendar/>
            </div>

            {/*메인menubar */}
            <MenuBar/>
            

            {/*사이드바 영역 */}
            <div className="outer_menu">
                <div className="menuBtn">
                    <button className="mybtn1" style={{backgroundImage: `url(${btnLogo})`}}
                        onClick={() => setMenuClick((!menuClick))}></button>
                    {/* <button className="mybtn1" style={{backgroundImage: `url(${plusLogo})` , height}}></button> */}
                </div>
                {/* {menuClick === true ? <Mymenu/> : null} */}
            </div>
        </div>
    );
};

export default MainPage;
