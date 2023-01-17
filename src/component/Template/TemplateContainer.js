import TemplateCard from "./TemplateCard";
import {useState} from "react";


const TemplateContainer=(props)=>{

    const[a,b]=useState("");


    return(
        <TemplateCard {...props}/>
    )
}

