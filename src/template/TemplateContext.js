import React, { createContext, useReducer, useContext, useRef } from 'react';

const TemplateStateContext = createContext(null);
const TemplateDispatchContext = createContext(null);
const TemplateNextIdContext = createContext(null);


function templateReducer(state, action) {
    switch (action.type) {
        case 'ROAD':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

// state가 undefined이면 initialState를 기본값으로 사용
const initialTemplate = [
];

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(templateReducer, initialTemplate);
    const nextId = useRef(5);

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
