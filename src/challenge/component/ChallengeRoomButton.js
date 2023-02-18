import React, {useEffect, useState} from 'react';
import {RoomDetail} from "../challengeApi";
import ChallengeRoomModal from "../component/ChallengeRoomModal";
import {codeHandler} from "../../util/apiUtil";
import {useAsync} from "react-async-hook";
import {templateCategory} from "../../template/templateApi";
import CategoryModal from "../../template/component/CategoryModal";
import {AsyncButton} from "../../util/AsyncButton";

const ChallengeRoomButton = ({challengeNo}) => {

    let [detail, setDetail] = useState();
    let [isOpen,setIsOpen]=useState(false);
    const toggle=()=>{
        setIsOpen(e=>!e);
    }
    const loadDetail = async () => {
        const res = await RoomDetail(challengeNo);
        res.playerList.sort((a, b) => a.percent - b.percent);
        await setDetail(res);
        setIsOpen(true);
    }
    const state=useAsync(RoomDetail,challengeNo);
    useEffect(() => {
        loadDetail();
        return () => {
        };
    }, [challengeNo]);
    if(challengeNo==0)return <>...</>
    return (<>
            <ChallengeRoomModal detail={detail} state={state} isOpen={isOpen}toggle={toggle}> </ChallengeRoomModal>
        </>
    );
};

export default ChallengeRoomButton;
