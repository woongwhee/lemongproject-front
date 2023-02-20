import React from 'react';
import ProfileIcon from "../../mypage/ProfileIcon";

import  {  CircularProgressbar ,  buildStyles  }  from  'react-circular-progressbar' ;
import 'react-circular-progressbar/dist/styles.css';

import {ProgressBar} from "react-progressbar-fancy";

const ChallengeRank = ({playerList,toggle}) => {
    return (
        <div className="outer_1">
            <div className="outer_top3">
                <div className="outer_t3">
                    <h1>Top3</h1>
                    {playerList.length > 2 && <><div style={{marginLeft:'42px' , position:'absolute' , marginTop:'50px'}}><ProfileIcon profile={playerList[2]} close={toggle}/></div>
                        <div style={{ width: '130px', height: '130px' , marginLeft:'15px' , marginTop:'-30px'}}>
                            <CircularProgressbar 
                                value={playerList[2].percent} text={`${playerList[2].percent}%`}
                                styles={{
                                    text: {
                                        // Text color
                                        fill: 'black',
                                        // Text size
                                        fontSize: '16px',
                                        fontFamily: 'Lobster-Regular' ,
                                        },
                                        // Customize background - only used when the `background` prop is true
                                        background: {
                                        fill: '#C103FB',
                                        },
                                }}/>    
                        </div></>}
                </div>
                
                <div className="outer_t1">
                    <h1>Top1</h1>
                    {playerList.length > 0 && <><div style={{marginLeft:'42px' , position:'absolute' , marginTop:'50px'}}><ProfileIcon profile={playerList[0]} close={toggle}/></div>
                        <div style={{ width: '130px', height: '130px' , marginLeft:'15px' , marginTop:'-30px'}}>
                            <CircularProgressbar 
                                value={playerList[0].percent} text={`${playerList[0].percent}%`}
                                styles={{
                                    text: {
                                        // Text color
                                        fill: 'black',
                                        // Text size
                                        fontSize: '16px',
                                        fontFamily: 'Lobster-Regular' ,
                                        },
                                        // Customize background - only used when the `background` prop is true
                                        background: {
                                        fill: '#C103FB',
                                        },
                                }}/>    
                        </div></>}
                </div>
                
                <div className="outer_t2">
                    <h1>Top2</h1>
                    {playerList.length > 1 && <><div style={{marginLeft:'42px' , position:'absolute' , marginTop:'50px'}}><ProfileIcon profile={playerList[1]} close={toggle}/></div>
                        <div style={{ width: '130px', height: '130px' , marginLeft:'15px' , marginTop:'-30px'}}>
                            <CircularProgressbar 
                                value={playerList[1].percent} text={`${playerList[1].percent}%`}
                                styles={{
                                    text: {
                                        // Text color
                                        fill: 'black',
                                        // Text size
                                        fontSize: '16px',
                                        fontFamily: 'Lobster-Regular' ,
                                        },
                                        // Customize background - only used when the `background` prop is true
                                        background: {
                                        fill: '#C103FB',
                                        },
                                }}/>    
                        </div></>}

                </div>
            </div>
            <div className="outer_rank" style={{overflow:'scroll'}}>
                <h1>나머지 랭킹</h1>
                {playerList.length > 2 &&
                    playerList.filter((e, index) => index > 2).map(user => {
                        return (
                            <>
                                <div style={{marginLeft:'50px' , marginTop:'-30px'}}>
                                    <div style={{float:'left' , width:'300px' , marginTop:'50px'}}><ProfileIcon profile={user}/></div>
                                    <div style={{float:'left' , width:'300px' , marginTop:'-30px'}}><ProgressBar score={user.percent}/></div>
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
