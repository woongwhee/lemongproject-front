import React from 'react'
import './Profile.css'

function Profile() {
  return (
    <div className='profile-box'>
        <div className='pro-pic'>프로필 사진</div>
        <div className='pro-nic'>닉네임</div>
        <div className='pro-post-count'>게시물</div>
        <div className='pro-following-count'>팔로잉</div>
        <div className='pro-follower-count'>팔로우</div>
        <br/><br/>
        <hr/>
        <div className='pro-intro'>소갯말</div>
    </div>
  )
}

export default Profile;