import React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardText, CardTitle} from "reactstrap";
import {useTemplateDispatch} from "../TemplateContext";

const TemplateCard = ({template}) => {
    const {templateNo,range,title,todoCount,clearCount,playCount,category,create}=template;
    const {categoryNo,categoryName,imagePath}=category;
    const {photo,nickName,profileComment}=create;
   const dispatch=useTemplateDispatch();

    const ViewDetail= ()=>{
       dispatch({type:"DETAIL",templateNo:templateNo})
   }
    return (
        <div onClick={ViewDetail} className="Template-Card">

            <div className="Card-Img">
            <img src={imagePath} alt={categoryName} />
            </div>
            <div className="Card-Content">
            {title}
            </div>
            <div className="playCount">
                참여중:{playCount}<br/>완료:{clearCount}
            </div>
            <div className="">
                만든놈 {nickName}
            </div>
        </div>
    );
};

export default TemplateCard;
