
import TitleInfo from './TitleInfo';
import Login from './Login';
import './MainFront.css';
import {useAsync} from "react-async-hook";
import axios from "axios";
import {useLoginDispatch} from "./LoginContext";

function MainFront() {
    return(
        <>
            
            
            <TitleInfo />


            <Login />

             <div className='loginBackColor'></div>

        </>
    )
}


export default MainFront;
