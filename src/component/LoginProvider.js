
import LoginContext from "../context/LoginContext";
const LoginProvider = ({children}) => {

    const setLoggedUser = (data) => {
        setState(prevState => (
            {
                ...prevState,
                loggedUser: data
            }
        ))
    }

    const setLoggedIn = () => {
        setState(prevState => (
            {
                ...prevState,
                loggedIn: !prevState.loggedIn
            }
        ))
    }

    const initialState = {
        loggedUser: {},
        loggedIn: false,
        setLoggedUser,
        setLoggedIn
    }

    const [state, setState] = useState(initialState);

    return (
        <LoginContext.Provider value={state}>
            {children}
        </LoginContext.Provider>
    )
}