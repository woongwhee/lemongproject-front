import React from 'react';

const TitleContent = ({chMark, Mark, hdMark, day}) => {
    let isMark= (Mark.lastIndexOf(day)>=0);
    let isChMark=(chMark.lastIndexOf(day)>=0);

    console.log(hdMark)
    let holiday=hdMark.find(e=>{
        console.log(e.holiday[2]===day)
        return e.holiday[2]===day});
    // let isHdMark=;
    return (
        <div className="flex justify-center items-center absoluteDiv">
            {isMark && <div className="dot">점</div>}
            {isChMark && <div className="dot2">점</div>}
            <div className="holiday">{holiday?.holidayName}</div>
        </div>
    );
};

export default TitleContent;
