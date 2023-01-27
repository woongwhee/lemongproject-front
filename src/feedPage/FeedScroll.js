import React, {useCallback, useEffect} from "react"
import { useInView } from "react-intersection-observer"
import axios from "axios";

function FeedScroll(props) {

    const FeedScroll = () => {
        const [items, setItems] = useState([])
        const [page, setPage] = useState(1)
        const [loading, setLoading] = useState(false)
        const [ref, inView] = useInView()

        const getItems = useCallback(async () => {
            setLoading(true)
            await axios.get({url:"/api/feed/feedCount"}).then(
                (res) => {setItems(prevState => [...prevState, res])
            })
            setLoading(false)
        },[page])

        useEffect(()=> {
            getItems()
        }, [getItems()])

        useEffect(() => {
            // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
            if (inView && !loading) {
                setPage(prevState => prevState + 1)
            }
        }, [inView, loading])

        return (
            <div ref={ref}>
                Element {inView.toString()}
            </div>
        );
    }
}

export default FeedScroll;