import Login from './member/Login';
import {useLoginState} from "./member/LoginContext";
import MainPage from "./main/MainPage";


function App() {
    let {isLogin} = useLoginState();
    // const [loading, setLoading] = useState(true);
    return (
        <>
            {isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}
            {/*{isLogin ? setLoading(false) : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? setLoading(false) : isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? <FeedLoading/>*/}
        </>
    )

}
export default App;