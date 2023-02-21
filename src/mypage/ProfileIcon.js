import React, {useRef} from 'react';
import {USER_PROFILE} from "../util/ImagePath";
import "./ProfileIcon.css"
import '../mypage/font/font.css';
import {PopoverBody, PopoverHeader, UncontrolledPopover} from "reactstrap";
import {ProgressBar} from "react-progressbar-fancy";

const ProfileIcon = ({profile}) => {
    const {userNo,photo,nickName,profileContent}=profile
    const photoPath=photo==undefined?USER_PROFILE:photo.filePath+photo.changeName
    const img = useRef(null);
    console.log(photoPath)
    return (

        <span className="profile-icon">
            <img src={photoPath}
                 id={userNo+"profile"}
                 ref={img} alt="profile"
                 style={{width:'27px' , height:'27px' , borderRadius:'50%' , float:'left' , marginTop:'0px' , marginLeft:'5px'}}/>
            <p style={{fontFamily:'NanumGothic-Regular' , fontSize:'15px' , marginTop:'0px' , float:'left' , marginLeft:'5px'}}>{nickName}</p>
              <UncontrolledPopover
                  placement="bottom"
                  target={img}
              >
            <PopoverHeader>
                Popover Title
            </PopoverHeader>
            <PopoverBody>
            </PopoverBody>
            </UncontrolledPopover>
        </span>

    );
};

export default ProfileIcon;
