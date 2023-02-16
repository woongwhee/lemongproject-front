import React from 'react';
import { FaLemon } from 'react-icons/fa';

const TitleContent = ({chMark, Mark, hdMark, day}) => {
    let isMark= (Mark.lastIndexOf(day) != -1);
    let isChMark=(chMark.lastIndexOf(day)!=-1);

    //console.log("Mark : "+Mark);
    //console.log(day);
    //console.log("isMark : "+isMark);
    //console.log(hdMark)
    let holiday=hdMark.find(e=>{
        console.log(e.holiday[2]==day)
        return e.holiday[2]==day});
    // let isHdMark=;

    return (
        <>
        <div className="dots">
            {isMark && <FaLemon className="dot"/>}
            {isChMark && <FaLemon className="dot2"/>}
        </div>
        <div className="holy">{holiday?.holidayName}</div>
        </>
    );
};

export default TitleContent;
