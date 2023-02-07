import React from 'react';
import axios from "axios";

function Test(props) {
    const onChange = (e) => {
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append('file', img);
        console.log(img)
    }
    return (
        <>
        <div>
            <input type='file'
                   accept='image/jpg,impge/png,image/jpeg,image/gif'
                   name='profile_img'
                   onChange={onChange}>
            </input>
        </div>
        </>
    );
}

export default Test;