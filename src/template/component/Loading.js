import React, {useState} from 'react';
import {PacmanLoader} from "react-spinners";

function Loading(props) {

    return (
        <div
            >
            <PacmanLoader color="#36d7b7" size={80} />
        </div>
    );
}

export default Loading;