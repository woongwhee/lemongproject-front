import React from 'react'
import './Profile.css'
import {useLoginState} from "../../Member/LoginContext";

function Profile() {
    const profile=useLoginState().profile;
    const photo=profile.photo;

  return (
    <div className='profile-box'>
        <div className='pro-pic'>{photo&&<img className={"profile"} src={photo.filePath+"/"+photo.changeName} alt={photo.originName}/>}</div>
        <div className='pro-nic'>{profile.nickName}</div>
        <div className='pro-post-count'>오늘할일: </div>
        <div className='pro-following-count'>팔로잉</div>
        <div className='pro-follower-count'>팔로우</div>
        <br/><br/>
        <hr/>
        <div className='pro-intro'>{profile.profileComment}</div>
    </div>
  )
}

export default Profile;