import React from 'react';
import ProfileIcon from "../../mypage/ProfileIcon";

const ChallengeRank = ({playerList,toggle}) => {
    return (
        <div className="outer_1">
            <div className="outer_top3">
                <div className="outer_t3">
                    <h1>Top3</h1>
                    {playerList.length > 2 && <><ProfileIcon
                        profile={playerList[2]} close={toggle}/>{playerList[2].percent}</>}
                </div>
                <div className="outer_t1">
                    <h1>Top1</h1>
                    {playerList.length > 0 && <><ProfileIcon profile={playerList[0]} close={toggle}/>
                        {playerList[0].percent}</>}
                </div>
                <div className="outer_t2">
                    <h1>Top2</h1>
                    {playerList.length > 1 && <><ProfileIcon
                        profile={playerList[1]} showNick={false}/>{playerList[1].percent}% </>}
                </div>
            </div>
            <div className="outer_rank">
                <h1>나머지 랭킹</h1>
                {playerList.length > 2 &&
                    playerList.filter((e, index) => index > 2).map(user => {
                        return (
                            <>
                                <ProfileIcon profile={user}/>
                                {user.percent}
                            </>
                        )
                    })

                }
            </div>
        </div>
    );
};

export default ChallengeRank;
