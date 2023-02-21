import {USER_PROFILE} from "../../util/ImagePath";

const Photo = ({photo,classname,style}) => {
    const loadDefault=(e)=>{
        e.target.src=USER_PROFILE;
    }

    return <img className={classname} style={style} src={photo != null ? photo?.filePath + "/" + photo?.changeName : USER_PROFILE} onError={loadDefault}/>
}


export default Photo