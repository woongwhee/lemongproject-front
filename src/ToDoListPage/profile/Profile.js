import React from 'react'
import './Profile.css'
import {useLoginState} from "../../Member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

function Profile() {
    const {profile}=useLoginState();
    const {photo}=profile;
    const filePath=photo!=null?photo.filePath+"/"+photo.changeName:USER_PROFILE;

  return (
    <div className='profile-box'>
        <div className='pro-pic'><img className={"profile"} src={filePath} alt={photo?.originName}/></div>
        <div className='pro-nic'>{profile.nickName}</div>
        <div className='pro-post-count'>오늘할일: </div>
        <div className='pro-following-count'>팔로잉 : <MyFollowingCount profile={profile}/></div>
        <div className='pro-follower-count'>팔로우</div>
        <br/><br/>
        <hr/>
        <div className='pro-intro'>{profile.profileComment}</div>
    </div>
  )
}

export default Profile;