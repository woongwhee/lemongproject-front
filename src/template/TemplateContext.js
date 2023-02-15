import React, { createContext, useReducer, useContext, useRef } from 'react';

const TemplateStateContext = createContext(null);
const TemplateDispatchContext = createContext(null);
const TemplateNextIdContext = createContext(null);


function templateReducer(state, action) {
    switch (action.type) {
        case 'DETAIL':
            return {index:1,templateNo:action.templateNo,list: state.list};
        case 'LIST' :
            return initialParam;
        case 'CATEGORY' :
            return {...state,categoryNo: action.categoryNo}
        case 'ADD_CATEGORY' :
            return {...state,categories: action.categories}
        case 'WRITE':
            return {...state,index:2};
        default:
            return state;
    }
}

// state가 undefined이면 initialState를 기본값으로 사용
const initialParam = {
    index: 0,
    templateNo: null,
    categoryNo:0
};

export function TemplateProvider({ children }) {
    const [state, dispatch] = useReducer(templateReducer, initialParam);
    const nextId = useRef(6);

    return (
        <TemplateStateContext.Provider value={state}>
            <TemplateDispatchContext.Provider value={dispatch}>
                <TemplateNextIdContext.Provider value={nextId}>
                    {children}
                </TemplateNextIdContext.Provider>
            </TemplateDispatchContext.Provider>
        </TemplateStateContext.Provider>
    );
}

export function useTemplateState() {
    return useContext(TemplateStateContext);
}

export function useTemplateDispatch() {
    return useContext(TemplateDispatchContext);
}
export function useTemplateNextId() {
    return useContext(TemplateNextIdContext);
}
