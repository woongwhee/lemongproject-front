// import React, { useState, useCallback, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from "axios";
//
// const InfiniteScroll = (): JSX.Element => {
//     const [page, setPage] = useState(1); // 요청 할 페이지 번호 변수
//
//     const [posts, setPosts] = useState(getPostList(1));
//
//     const handleScroll = useCallback((): void => {
//         const { innerHeight } = window;
//         const { scrollHeight } = document.body;
//         const { scrollTop } = document.documentElement;
//
//         if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
//             setPosts(posts.concat(getPostList(page + 1)));
//             setPage((prevPage: number) => prevPage + 1);
//         }
//     }, [page, posts]);
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll, true);
//
//         return () => {
//             window.removeEventListener('scroll', handleScroll, true);
//         }
//     }, [handleScroll]);
//
//     return (
//         <Container>
//             {
//                 posts.map((post: postType, idx: number) => (
//                     <PostItem key={idx}>{post.contents}</PostItem>
//                 ))
//             }
//         </Container>
//     );
// };
//
// export default InfiniteScroll;
//
// const Container = styled.div`
//   width: 100%;
//   max-width: 1000px;
//   margin: 4rem auto;
// `;
//
// const PostItem = styled.div`
//   width: 100%;
//   height: 350px;
//   border: 2px solid black;
// `;
//
//
// // lib/postList.ts
// export type postType = {
//     page: number;
//     contents: string;
// };
//
// export const getPostList = (page: number): postType[] => {
//     // 매개변수로 받은 페이지와 동일한 페이지 객체들만 return 해줍니다.
//     return postList.filter((post: postType) => post.page === page);
// };
//
//
// export const postList: postType[] = [
//     {
//         page: 1,
//         contents: '안녕하세요 1번째 글',
//     },
//
//     {
//         page: 1,
//         contents: '안녕하세요 2번째 글',
//     },
//
//     {
//         page: 1,
//         contents: '안녕하세요 3번째 글',
//     },
//
//     {
//         page: 2,
//         contents: '안녕하세요 4번째 글',
//     },
//
//     {
//         page: 2,
//         contents: '안녕하세요 5번째 글',
//     },
//
//     {
//         page: 2,
//         contents: '안녕하세요 6번째 글',
//     },
//
//     {
//         page: 3,
//         contents: '안녕하세요 7번째 글',
//     },
//
//     {
//         page: 3,
//         contents: '안녕하세요 8번째 글',
//     },
//
//     {
//         page: 3,
//         contents: '안녕하세요 9번째 글',
//     },
//
//     {
//         page: 4,
//         contents: '안녕하세요 10번째 글',
//     },
// ];
// import React, { useState, useCallback, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from "axios";
// // import { getPostList, postType } from 'lib/postList';
//
// const InfiniteScroll = (): JSX.Element => {
//     const [page, setPage] = useState(1); // 요청 할 페이지 번호 변수
//
//     const [posts, setPosts] = useState(getPostList(1));
//
//     const handleScroll = useCallback((): void => {
//         const { innerHeight } = window;
//         const { scrollHeight } = document.body;
//         const { scrollTop } = document.documentElement;
//
//         if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
//             setPosts(posts.concat(getPostList(page + 1)));
//             setPage((prevPage: number) => prevPage + 1);
//         }
//     }, [page, posts]);
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll, true);
//
//         return () => {
//             window.removeEventListener('scroll', handleScroll, true);
//         }
//     }, [handleScroll]);
//
//     return (
//         <Container>
//             {
//                 posts.map((post: postType, idx: number) => (
//                     <PostItem key={idx}>{post.contents}</PostItem>
//                 ))
//             }
//         </Container>
//     );
// };
//
// export default InfiniteScroll;
//
//



    // const Ffe = () =>{
    //     const result = [];
    //     for(let i = 0; i<testStr.length; i++){
    //         result.push(
    //             <div style={{marginLeft:"500px",width:"100px", height:"100px", border:"1px solid red"}} key={i}>
    //                 {testStr[i].pageNo}
    //                 <br/>
    //                 page : {testStr[i].pageNo % 3}<br/>
    //                 {zlist[i]}
    //             </div>
    //         )
    //     }
    //     return result
    // }



    // const [ testStr, setTestStr] = useState([]);
    //
    // function callback(str) {
    //     setTestStr(str);
    // }
    //
    //
    // const [zlist, setlist ] = useState([]);
    // axios({
    //     url: '/api/feed/main',
    //     method: 'GET'
    // }).then((res) => {
    //     console.log(res.data.result)
    //     callback(res.data.result);
    //     ex()
    // }).catch(console.log("실패"))
    //
    //
    // const ex = () =>{
    //     let page = [];
    //     let count = 1;
    //     let zeroList = [];
    //     for(let k = 0; k<testStr.length; k++){
    //         zeroList.push(testStr[k].pageNo % 3);
    //         console.log(zeroList); // 1 2 0 1 2 0
    //     }
    //     for(let j = 0; j<zeroList.length; j++){
    //         if(zeroList[j] === 0){
    //             page.push(count++)
    //         }else{
    //             page.push(count)
    //         }
    //     }
    //     setlist(page);
    // }
//
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import axios from "axios";
// import {useInView} from "react-intersection-observer";
// import Feed from "./Feed1";
//
// function Test2(props) {
//
//     const [items, setItems] = useState([])
//     const [page, setPage] = useState(1)
//     const [loading, setLoading] = useState(false)
//
//     const [ref, inView] = useInView()
//
//     // const [loginUserNo, setLoginUserNo] = useState(0);
//     // useEffect(
//     //     () => {
//     //         axios({
//     //             url: '/api/feed/loginFeedUserNo',
//     //             method: 'POST'
//     //         }).then((res) => {
//     //             // console.log(res.data)
//     //             setLoginUserNo(res.data)
//     //         })
//     //     }, []
//     // );
//
//     const getItems = useCallback(async () => {
//         setLoading(true)
//         await axios.get("api/feed/main").then(
//             (res) => {
//             // console.log(res.data.result)
//             setItems(res.data.result)
//         })
//         setLoading(false)
//     }, [page])
//
//
//     useEffect(() => {
//         getItems()
//     }, [getItems])
//
//     useEffect(() => {
//         // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
//         if (inView && !loading) {
//             console.log("마지막")
//             setPage(prevState => prevState + 1)
//         }
//     }, [inView, loading])
//
//     const allList = () => {
//         let result = [];
//         for (let i = 0; i<items.length; i++){
//             result.push(
//                 <>
//                 <div style={{border:"1px solid black", width:"200px", height:"400px"}}>{items[i].feedNo}</div>
//                 {/*<Feed Feed={items[i]} loginUserNo={loginUserNo}></Feed>*/}
//                 </>
//             )
//         }
//         return result;
//     }
//
//
//
// let i = 0;
//     return (
//     <>
//         <div style={{overflow:"scroll", height:"800px"}}>
//             {/*{items?.map((e)=><Feed key={i++} {...e} loginUserNo={loginUserNo}/>)}*/}
//             {allList()}
//             <div style={{ height: "100px", backgroundColor: "red" }} ref={ref}>
//                 target
//             </div>
//         </div>
//
//
//     </>
//     );
// }
//
// export default Test2;


import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    const Posts = ({ posts, loading }) => {
        return (
            <>
                {loading && <div> loading... </div>}
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setPosts(response.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

    const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

    const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

    const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <div>
                <nav>
                    <PageUl className="pagination">
                        {pageNumbers.map((number) => (
                            <PageLi key={number} className="page-item">
                                <PageSpan onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </PageSpan>
                            </PageLi>
                        ))}
                    </PageUl>
                </nav>
            </div>
        );
    };

    return(
        <div className="App">
            <Posts posts={currentPosts(posts)} loading={loading}></Posts>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={setCurrentPage}
            ></Pagination>
        </div>
    )
}

export default App;