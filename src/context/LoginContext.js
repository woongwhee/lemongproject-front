import { createContext } from "react";

const LoginContext = createContext({
    loggedUser: {
        nickName: '',
        profileComment: '',
        photo: ''
    },
    loggedIn: false,
    setLoggedUser: () => {},
    setLoggedIn: () => {}
});

export default LoginContext;