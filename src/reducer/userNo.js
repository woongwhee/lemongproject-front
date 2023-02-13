
import axios from "axios";

function userNo (state, action) {

    switch(action.type) { 
        case 'SELECTUSER_PROFILE' :
            return action.payload;
        case 'SELECTUSERNO_MY' :
            return action.payload;
        default :
            return state;
    }
   
}

export default userNo;
