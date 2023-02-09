import Loading from "../template/component/Loading";
import React from "react";
import {isEmpty} from "./typeUtile";


const apiHoc = (Comp) => props => {
    console.log("이거들어옴?",props);
    let state = props.state;
    console.log("웨안뒘?",state);
    if (isEmpty(state.status)) {
        console.log("empty")
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
                <>error</>
            )

    }
}
export default apiHoc