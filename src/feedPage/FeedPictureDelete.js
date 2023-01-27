import React, {useState} from 'react';
import axios from "axios";

function FeedPictureDelete({photoNo,getData}) {
    // const photoNo = props.photoNo; // 부모 photoNo 저장

    const [photoDelete, setPhotoDelete] = useState();

    getData(photoDelete);

    function callback(str){
        setPhotoDelete(str);
    }

    return (
        <button onClick={ () => { axios({
            url:'api/feed/deleteFeedPhoto',
            method:'GET',
            params:{photoNo:photoNo}
            },
        ).then(function (res){
            console.log('성공');
            console.log(res.data);
            callback(res.data.Java);
        }).catch(function (res){
            console.log(photoNo);
        })
        }}>
            삭제
        </button>
    );
}

export default FeedPictureDelete;