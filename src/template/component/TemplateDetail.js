import React, {useEffect} from 'react';
import {Async} from "../../util/apiUtil";
import apiHoc from "../../util/apiHoc";
import StartSingleBtn from "./StartSingleBtn";
import StartMultiBtn from "./StartMultiBtn";
import {CLEAR_MARK} from "../../util/ImagePath";
import ChallengeReadyCard from "../../challenge/component/ChallengeReadyCard";
import GoBackButton from "./GoBackButton";
import ReviewArea from "./ReviewArea";

import { IoBookSharp } from "react-icons/io5";
import { FaRegLemon , FaRegCommentDots} from "react-icons/fa";

import TempImg from '../../mypage/image/템플릿 상세보기 배경.jpg';

import '../../mypage/font/font.css';
import '../../template/style/TemplateJiho.css';

const TemplateDetail = (state) => {
    const template=state.result;
    const {title,templateNo,content,clear,challengeList,reviewList}=template;

    console.log(template)
 
    let i = 0;
    return (
        <div>
            <div>
            <div style={{height:'750px' , position:'absolute'}}>
                <GoBackButton/><br/>
                
                <div>
                <div style={{marginLeft : '90px'}}>

                    <div className='temp_title' style={{marginTop:'-30px'}}>
                        <p style={{fontSize:'35px' , fontFamily:'PTSansNarrow-Regular'}}><b>{title}</b></p>
                        <div style={{marginTop:'-50px' , marginLeft:'280px'}}>
                            <StartSingleBtn templateNo={templateNo}/>
                            <StartMultiBtn templateNo={templateNo}/>
                        </div>
                        <hr style={{width:'90%'}}/>
                        <img src={TempImg} style={{ width:'90%'}} />
                    
                    <div style={{border:'1px solid red' , width:'70%' , marginLeft:'55px' , height:'70px' , marginTop:'-350px'}}>
                        <div style={{position:'relative'}}>
                            <div><IoBookSharp style={{fontSize:'25px' , marginTop:'20px'}}/> <p style={{fontSize:'25px' , marginTop:'-32px' , fontFamily:'Lobster-Regular' , marginLeft:'30px'}}>Challenge Introduction</p><br/></div>
                            <div style={{marginLeft:'60px' , marginTop:'-40px'}}>
                                <textarea style={{fontFamily:'NanumGothic-Regular' , width:'50%' , height:'230px' , border:'0px' , resize:'none'}} value={"- "+content}></textarea>
                            </div>
                        </div>
                         {/* 리스트 보여주기 투명 스크롤로 */}
                         <div style={{marginTop:'20px'}}>
                            <p style={{fontFamily:'Lobster-Regular' , fontSize:'25px' , marginTop:'-425px' , marginLeft:'695px' , color:'white' , width:'70%'}}>Challenge List</p>

                            <div className='Tempscroll' style={{width:'250px' , height:'350px' , overflow:'scroll' , marginLeft:'610px' , marginTop:'35px'}}>
                            {template?.todoList?.map(e => <div key={i++} {...e}>
                                <p style={{color:'white' , fontFamily:'NanumGothic-Regular' , marginTop:'5px'}} key={i++} {...e}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaRegLemon style={{marginTop:'-4px'}}/>&nbsp;{e?.content}</p>
                            </div>)}
                            </div>
                         </div>
                    </div>

                    </div>

                    </div>

                    {clear&&<img className={"clear-img"} src={CLEAR_MARK} alt="templateClear"/>}

                    <div className={"template-header"}></div>
                        {clear&&<img src={CLEAR_MARK} alt="clear-mark"/> }
                    <div>
                        <div>
                            {challengeList.map(challenge=><ChallengeReadyCard challenge={challenge}/>)}
                        </div>
                        <div style={{marginTop:'-13px' , marginLeft:'-80px' , position:'relative'}}>
                            <FaRegCommentDots style={{fontSize:'23px' , marginLeft:'210px' , marginTop:'160px'}}/>
                            <ReviewArea reviewlist={reviewList} templateNo={templateNo}/>
                        </div>
                    </div>
                </div>
  
            </div>
            </div>
            
        </div>
    );
};

export default apiHoc(TemplateDetail);
