import React, {useState} from 'react';
import {PacmanLoader} from "react-spinners";

function FeedLoading(props) {

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}>
            <PacmanLoader color="#36d7b7" />
        </div>
    );
}

export default FeedLoading;