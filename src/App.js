
import MainPage from "./main/MainPage";
import {useLoginState} from "./member/LoginContext";
import Login from "./member/Login";


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