//todoDate 값 넘겨줄 redux기능 추가

//const SELECTDAY = 'date/SELECTDAY';
//export const selectDay = (e) => ({type : SELECTDAY, payload: {selectDay : e}});


export default function date(state, action) {
// currentState: 현재 state값
// action : 어떻게 state값을 바꿀 것인가

    const today = new Date();

    if(state === undefined){
        return {
            selectDay : today,
        };
    }

    switch(action.type) {
        case 'SELECTDAY' :
            return action.payload;
        default :
            return state
    }
}

