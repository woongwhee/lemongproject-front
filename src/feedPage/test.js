import React, {useReducer, useState} from 'react';

 const ACTION_TYPES ={
     deposit : 'deposit',
     withdraw : 'withdraw'
 }

const reducer = (state, action) => {
    switch (action.type){
        case 'deposit': return state + action.payload;
        case 'withdraw' : return state - action.payload;
        default : return state;
    }
}

function Test(props) {
    const [number, setNumber] = useState(0);
    const [money, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            <h2>useReducer 은행</h2>
            <p>잔고 : {money} 원</p>
            <input type="number"
                   value={number}
                   onChange={(e)=> setNumber(parseInt(e.target.value))}
                   step="1000"
                   />
            <button onClick={()=>{dispatch({type:"deposit", payload:number})}}>예금</button>
            <button onClick={()=>{dispatch({type:"withdraw", payload:number})}}>출금</button>
        </div>
    );
}

export default Test;