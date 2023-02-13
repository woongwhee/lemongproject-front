import React from 'react';

const TitleContent = ({chMark, Mark, hdMark, day}) => {
    let isMark= (Mark.lastIndexOf(day) >= 0);
    let isChMark=(chMark.lastIndexOf(day)>=0);

    //console.log("Mark : "+Mark);
    //console.log("isMark : "+isMark);
    //console.log(hdMark)

    let holiday=hdMark.find(e=>{
        console.log(e.holiday[2]===day)
        return e.holiday[2]===day});
    // let isHdMark=;

    return (
        <div className="flex justify-center items-center absoluteDiv">
            {<div className="dot"></div>}
            {isChMark && <div className="dot2"></div>}
            <div className="holiday">{holiday?.holidayName}</div>
        </div>
    );
};

export default TitleContent;
