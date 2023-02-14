
import axios from "axios";

function userNo (state, action) {
        // axios.get("/api/member/userData").then(function(res){
        //     console.log(res.data.result + "데이터 가져오기 성공");
        //     const data = res.data.result;
        //     // initialState.myNo.push(data);
        //     // console.log(initialState.myNo + 'dd');
        //      console.log(data);
            //  setMyNo(data);
            // return data;
            // console.log("ff" + usr)
            // usr += data;
        // })
        // let usr = 0;
        // currentState: 현재 state값
        // action : 어떻게 state값을 바꿀 것인가

        if(state === undefined){
            // console.log(initialState.myNo[0] + 'dd123132132132132');
        return {
            selectUserNo : state ,
        };
    }

    switch(action.type) { 
        case 'SELECTUSERNO' :
            return action.payload;
        case 'SELECTUSERNO-MY' :
            return action.payload;
        default :
            return state;
    }
   
}

export default userNo;
