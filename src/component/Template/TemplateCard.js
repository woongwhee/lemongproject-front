import React from 'react';
import {Card} from "react-bootstrap";

function TemplateCard(props) {

    let hi=[1,2,3,4,5];
    return(<>   
     {hi.map(e=> <Card>  <h1>{e}</h1></Card>)}</>)
}

export default TemplateCard;