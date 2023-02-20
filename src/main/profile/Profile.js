import React from 'react'
import './Profile.css'
import {useLoginState} from "../../member/LoginContext";
import {useDispatch} from 'react-redux';
import MyFollowingCount from '../../mypage/MyFollowingCount';
import {USER_PROFILE} from "../../util/ImagePath";
import {MENU_PROFILE} from "../../reducer/menu";

import '../../mypage/font/font.css';
// import '../../main/calendar/Calendar.css';

function Profile() {
    const {profile}=useLoginState();
    const {userNo,photo}=profile;

    const filePath=photo!=null?photo?.filePath+"/"+photo?.changeName:USER_PROFILE;
    const dispatch = useDispatch();
    const selectUserNo = () => {
        console.log(userNo);
        dispatch(
            {type : MENU_PROFILE , userNo:userNo} ,
        )
  };

  // const userNos = useSelector((state) => state.userNo.selectUserNo);

  return (
    <div className='profile-box' >
        {/* <div className='pro-pic' onClick={selectUserNo}><img className={"profile"} src={filePath} alt={photo?.originName}/></div>
        <div className='pro-nic'>{profile.nickName}</div>
        <div className='pro-following-count'><p>팔로잉 : </p></div>
        <div className='pro-follower-count'><p>팔로우 : </p></div>
        <br/><br/>
        <hr/>
        <div className='pro-intro'>{profile.profileComment}</div> */}

        <div onClick={selectUserNo} className='react-calendar2' style={{margin: 'auto', height:'160px' , marginLeft:'90px' , marginTop:'20px', border: '0px solid orange'}}>
            {/* 메인페이지 프로필 이미지(클릭 시 마이 홈으로 이동) */}
          <div className='pro-pic' onClick={selectUserNo} style={{marginTop:'33px' , marginLeft:'20px'}}>
              <img className={"profile"} src={filePath} alt={photo?.originName}/>
          </div>
            <div className='pro-nic'><b><p style={{marginTop:'35px', fontSize:'18px'}}>{profile.nickName}</p></b></div>
            <div className='pro-following-count' style={{marginTop:'65px' , marginLeft:'-135px' , height:'30px', fontFamily:'NanumGothic-Regular' , border: '0px solid pink'}}><p>팔로잉 </p></div>
            <div className='pro-following-count' style={{marginTop:'65px' , marginLeft:'-30px' ,  height:'30px', fontFamily:'NanumGothic-Regular' , border: '0px solid pink'}}><p>팔로워  </p></div>
          
          <div className='pro-intro'><p style={{float:'left', width:'70%', marginTop:'0px' ,paddingLeft:'28px', border: '0px solid pink', margin: 'auto'}}>{profile?.profileComment}</p></div>
          
        </div>
    </div>
  )
}

export default Profile;