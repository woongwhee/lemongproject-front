import React, {useRef} from 'react';
import {USER_PROFILE} from "../util/ImagePath";
import "./ProfileIcon.css"
import {PopoverBody, PopoverHeader, UncontrolledPopover} from "reactstrap";
const ProfileIcon = ({profile}) => {
    const {userNo,photo,nickName,profileContent}=profile
    const photoPath=photo==undefined?USER_PROFILE:photo.filePath+photo.changeName
    const img = useRef(null);
    console.log(photoPath)
    return (

        <span className="profile-icon">
            <img src={photoPath} id={userNo+"profile"} ref={img} alt="profile"/>
            <p>{nickName}</p>
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
