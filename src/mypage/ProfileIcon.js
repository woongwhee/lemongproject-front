import React, {useRef} from 'react';
import {USER_PROFILE} from "../util/ImagePath";
import "./ProfileIcon.css"
import {PopoverBody, PopoverHeader, UncontrolledPopover} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_MY_PROFILE, MENU_PROFILE} from "../reducer/menu";
const ProfileIcon = ({profile,close,showNick=true}) => {
    const {userNo,photo,nickName,profileContent}=profile
    const photoPath=photo==undefined?USER_PROFILE:photo.filePath+photo.changeName
    const img = useRef(null);
    const dispatch = useDispatch();
    const selectUserNo = () => {
        dispatch(
            {type : MENU_PROFILE, userNo}
        )
        close();
    };
    console.log(photoPath)
    return (

        <span className="profile-icon">
            <img src={photoPath} id={userNo+"profile"} ref={img} alt="profile"/>
            {showNick&&<p>{nickName}</p>}
              <UncontrolledPopover
                  placement="bottom"
                  target={img}>
            <PopoverHeader>
                <div onClick={selectUserNo}>허걱스</div>
            </PopoverHeader>
            <PopoverBody>
            </PopoverBody>
            </UncontrolledPopover>

        </span>

    );
};

export default ProfileIcon;
