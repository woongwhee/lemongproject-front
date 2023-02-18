import React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardText, CardTitle} from "reactstrap";
import {useTemplateDispatch} from "../TemplateContext";
import ProfileIcon from "../../mypage/ProfileIcon";

import '../../mypage/font/font.css';

import { BsFillPeopleFill , BsPencilSquare , BsTrophyFill} from "react-icons/bs";

const TemplateCard = ({template}) => {
    const {templateNo,range,title,todoCount,clearCount,playCount,category,create,clear}=template;
    const {categoryNo,categoryName,imagePath}=category;
    const {photo,nickName,profileComment}=create;
   const dispatch=useTemplateDispatch();

    const ViewDetail= ()=>{
       dispatch({type:"DETAIL",templateNo:templateNo})
   }
    return (
        <div onClick={ViewDetail} className="Template-Card" class="btn btn-outline-dark" style={{width:'450px' , borderRadius:'0px' , height:'150px' , marginLeft:'10px' , marginTop:'10px'}}>
            <div>
            {/* 카테고리 이미지 */}
                <img src={imagePath} alt={categoryName} style={{width:'110px' , height:'110px' , marginTop:'13px' , float:'left' , marginLeft:'20px'}}/>
            {/* 제목 */}
                <b style={{fontFamily:'NanumGothic-Regular' , fontSize:'22px' , float:'left' , marginTop:'15px' , marginLeft:'10px'}}>{title}</b><br/><br/>
            <div>
            </div>
            <div style={{float:'left' , marginLeft:'13px' , marginTop:'5px'}}>
            {/* 내용 */}&nbsp;&nbsp;
                <div style={{float:'left'}}><BsFillPeopleFill style={{fontSize:'17px' , marginTop:'-3px' , fontFamily:'NanumGothic-Regular'}}/>&nbsp;{playCount}&nbsp;&nbsp;&nbsp;</div> 
            {/* 클리어 수 */}
                <div style={{float:'left'}}><BsTrophyFill style={{fontSize:'17px' , marginTop:'-3px' , fontFamily:'NanumGothic-Regular'}}/>&nbsp;{clearCount}</div>
            </div>
            {/* 만든사람 */}
                <div style={{float:'left' , marginTop:'35px' , marginLeft:'-92px'}}><BsPencilSquare style={{fontSize:'20px' , float:'left' , fontFamily:'NanumGothic-Regular'}}/><ProfileIcon profile={create}/></div>
            </div>
        </div>
    );
};

export default TemplateCard;
