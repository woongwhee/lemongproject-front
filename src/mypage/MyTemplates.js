import React, {useEffect, useState} from "react";
import {Component} from "react";

import './MyPage.css';
import moment from "moment/moment";
import {FcOk} from "react-icons/fc";
import ChallengeRoomModal from "../challenge/component/ChallengeRoomModal";
import {useSelector} from "react-redux";
import {profileTemplateList} from "../template/templateApi";
import {codeHandler} from "../util/apiUtil";
import {BsFillPeopleFill, BsPencilSquare, BsTrophyFill} from "react-icons/bs";
import ProfileIcon from "./ProfileIcon";

function MyTemplates() {
    const userNo = useSelector(state => state.menu.userNo);
    const [templateList, setTemplateList] = useState([]);
    const loadTemplate = async (userNo) => {
        let result = await profileTemplateList(userNo);
        setTemplateList(result);
    }
    useEffect(
        () => {
            loadTemplate(userNo);
        }, [])
    return (
        <div className="outer_Chall" style={{overflow: 'scroll'}}>
            <div>
                {templateList.map((e, index) => {
                    return (
                        <div className="Template-Card" class="btn btn-outline-dark" style={{
                            width: '630px',
                            borderRadius: '0px',
                            height: '150px',
                            marginLeft: '40px',
                            marginTop: '10px'
                        }}>
                            <div>
                                {/* 카테고리 이미지 */}
                                <img src={e?.category?.imagePath} alt={e?.category?.categoryName} style={{
                                    width: '110px',
                                    height: '110px',
                                    marginTop: '13px',
                                    float: 'left',
                                    marginLeft: '20px'
                                }}/>
                                {/* 제목 */}
                                <b style={{
                                    fontFamily: 'NanumGothic-Regular',
                                    fontSize: '22px',
                                    float: 'left',
                                    marginTop: '15px',
                                    marginLeft: '10px'
                                }}>{e?.title}</b><br/><br/>
                                <div>
                                </div>
                                <div style={{float: 'left', marginLeft: '13px', marginTop: '5px'}}>
                                    {/* 내용 */}&nbsp;&nbsp;
                                    <div style={{float: 'left'}}><BsFillPeopleFill style={{
                                        fontSize: '17px',
                                        marginTop: '-3px',
                                        fontFamily: 'NanumGothic-Regular'
                                    }}/>&nbsp;{e?.playCount}&nbsp;&nbsp;&nbsp;</div>
                                    {/* 클리어 수 */}
                                    <div style={{float: 'left'}}><BsTrophyFill style={{
                                        fontSize: '17px',
                                        marginTop: '-3px',
                                        fontFamily: 'NanumGothic-Regular'
                                    }}/>&nbsp;{e?.clearCount}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default MyTemplates;