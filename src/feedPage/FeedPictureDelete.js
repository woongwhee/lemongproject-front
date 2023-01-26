import React from 'react';
import axios from "axios";

function FeedPictureDelete(props) {
    const photoNo = props.photoNo;
    return (
        <button onClick={ () => { axios({
            url:'api/feed/deleteFeedPhoto',
            method:'GET',
            params:{photoNo:photoNo}
            },
        ).then(function (res){
            console.log('성공');
        }).catch(function (res){
            console.log(photoNo);
        })
        }}>
            삭제
        </button>
    );
}

export default FeedPictureDelete;