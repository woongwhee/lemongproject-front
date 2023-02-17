import Loading from "../template/component/Loading";
import React from "react";
import {isEmpty} from "./typeUtile";


const apiHoc = (Comp) => props => {
    let state = props.state;
    if (isEmpty(state.status)) {
        return <Comp {...props}></Comp>
    }
    switch (state.status) {
        case 'loading':
            return <Loading/>;
        case 'success':
            return <Comp {...props} result={state.result}/>
        case 'error':
        default:
            return (
                <h1>error</h1>
            )

    }
}
export default apiHoc