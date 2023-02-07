import Loading from "../template/component/Loading";
import React from "react";
import {isEmpty} from "./typeUtile";


 const apiHoc = (Comp) => (props) => {
     console.log(props.stateus);
    if (isEmpty(props.stateus)) {
        console.log("empty")
        return <Comp {...props}></Comp>
    }
    switch (props.stateus) {
        case 'loading':
            return <Loading/>;
        case 'success':
            return <Comp {...props}/>
        case 'error':
        default:
            return (
                <>error</>
            )

    }
}
export default apiHoc