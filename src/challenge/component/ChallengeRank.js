import React from 'react';
import ProfileIcon from "../../mypage/ProfileIcon";

import  {  CircularProgressbar ,  buildStyles  }  from  'react-circular-progressbar' ;
import 'react-circular-progressbar/dist/styles.css';

import '../../mypage/font/font.css';

import {ProgressBar} from "react-progressbar-fancy";

const ChallengeRank = ({playerList,toggle}) => {
    return (
        <div className="outer_1">
           
            <div className="outer_rank" style={{overflow:'scroll'}}>
                <h1 style={{fontFamily:'Lobster-Regular' , marginLeft:'200px'}}>Rank</h1>
                
                {playerList.length > 2 &&
                    playerList.map(user => {
                        return (
                            <>
                                <div style={{marginLeft:'40px' , marginTop:'-30px'}}>
                                    <div style={{float:'left' , width:'300px' , marginTop:'50px'}}><ProfileIcon profile={user}/></div>
                                    <div style={{float:'left' , width:'300px' , marginTop:'-30px'}}><ProgressBar score={user.percent} progressColor='purple' progressWidth='400px' /></div>
                                </div>
                            </>
                        )
                    })

                }
            </div>
        </div>
    );
};

export default ChallengeRank;
