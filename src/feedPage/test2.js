// import React, {useEffect, useState} from 'react';
// import axios from "axios";
// import {Pagination} from "swiper";
// import styled from "styled-components";
//
// function Test2(props) {
//
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage, setPostsPerPage] = useState(10);
//
//     const Posts = ({ posts, loading }) => {
//         return (
//             <>
//                 {loading && <div> loading... </div>}
//                 <ul>
//                     {posts.map((post) => (
//                         <li key={post.id}>{post.title}</li>
//                     ))}
//                 </ul>
//             </>
//         );
//     };
//
//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             const response = await axios.get(
//                 "https://jsonplaceholder.typicode.com/posts"
//             );
//             setPosts(response.data);
//             setLoading(false);
//         };
//         fetchData();
//     }, []);
//
//     // console.log(posts);
//
//     const indexOfLast = currentPage * postsPerPage;
//     const indexOfFirst = indexOfLast - postsPerPage;
//     const currentPosts = (posts) => {
//         let currentPosts = 0;
//         currentPosts = posts.slice(indexOfFirst, indexOfLast);
//         return currentPosts;
//     };
//
//     const PageUl = styled.ul`
//   float: left;
//   list-style: none;
//   text-align: center;
//   border-radius: 3px;
//   color: white;
//   padding: 1px;
//   border-top: 3px solid #186ead;
//   border-bottom: 3px solid #186ead;
//   background-color: rgba(0, 0, 0, 0.4);
// `;
//
// const PageLi = styled.li`
//   display: inline-block;
//   font-size: 17px;
//   font-weight: 600;
//   padding: 5px;
//   border-radius: 5px;
//   width: 25px;
//   &:hover {
//     cursor: pointer;
//     color: white;
//     background-color: #263a6c;
//   }
//   &:focus::after {
//     color: white;
//     background-color: #263a6c;
//   }
// `;
//
//     const PageSpan = styled.span`
//   &:hover::after,
//   &:focus::after {
//     border-radius: 100%;
//     color: white;
//     background-color: #263a6c;
//   }
// `;
//
//     const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//         const pageNumbers = []; // 10 페이지
//         for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//             pageNumbers.push(i); // 100개 / 10
//         }
//         return (
//             <div>
//                 <nav>
//                     <PageUl className="pagination">
//                         {pageNumbers.map((number) => (
//                             <PageLi key={number} className="page-item">
//                                 <PageSpan onClick={() => paginate(number)} className="page-link">
//                                     {number}
//                                 </PageSpan>
//                             </PageLi>
//                         ))}
//                     </PageUl>
//                 </nav>
//             </div>
//         );
//     };
//
//     return (
//         <div className="App">
//             <Posts posts={currentPosts(posts)} loading={loading}></Posts>
//             <Pagination
//                 postsPerPage={postsPerPage} // 10 으로 나누기
//                 totalPosts={posts.length} // 100개
//                 paginate={setCurrentPage}
//             ></Pagination>
//         </div>
//     );
// }
//
// export default Test2;


// import axios from "axios";
// import {useEffect, useState} from "react";
//
// const [loading, setLoading] = useState(true); // 로딩중인지 아닌지를 담기위한 state
// const [instaData, setInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
// const [instaPaging, setInstaPaging] = useState<IPagingData>({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장
// const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
//
// const fetchMoreInstaFeeds = async () => {
//     // 추가 데이터를 로드하는 상태로 전환
//     setFetching(true);
//
//     // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
//     await axios.get(instaPaging.next)
//         .then((response) => {
//             const fetchedData = response.data.data; // 피드 데이터 부분
//             // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
//             const mergedData = instaData.concat(...fetchedData);
//             setInstaData(mergedData);
//         });
//     // 추가 데이터 로드 끝
//     setFetching(false);
// };
//
// // 스크롤 이벤트 핸들러
// const handleScroll = () => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const clientHeight = document.documentElement.clientHeight;
//     if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
//         // 페이지 끝에 도달하면 추가 데이터를 받아온다
//         fetchMoreInstaFeeds();
//     }
// };
//
// useEffect(() => {
//     // scroll event listener 등록
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//         // scroll event listener 해제
//         window.removeEventListener("scroll", handleScroll);
//     };
// });
//
// const fetchInstaFeeds = async () => {
//     // 로딩중인 상태로 전환
//     setLoading(true);
//
//     await axios
//         .get("api/feed/main")
//         .then((response) => {
//             // GET 요청으로 받아온 데이터를 state에 잘 넣어줍니다
//             setInstaData(response.data.data);
//             setInstaPaging(response.data.paging);
//         })
//         .catch((error) => {
//             // Error 핸들링
//             console.log(error);
//         });
//     // 로딩중이지 않은 상태로 전환
//     setLoading(false);
// };
//
// // 컴포넌트가 마운트되면 해당 함수를 호출해서 초기 데이터를 받아옵니다.
// useEffect(() => {
//     fetchInstaFeeds();
// }, []);

import axios from "axios";
import {useState} from "react";

const [loading, setLoading] = useState(true); // 로딩중인지 아닌지를 담기위한 state
const [instaData, setInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
const [instaPaging, setInstaPaging] = useState({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장

const fetchInstaFeeds = async () => {
    // 로딩중인 상태로 전환
    setLoading(true);

    await axios
        .get('api/feed/main')
        .then((response) => {
            // GET 요청으로 받아온 데이터를 state에 잘 넣어줍니다
            setInstaData(response.data.result);
            setInstaPaging(response.data.result.length);
        })
        .catch((error) => {
            // Error 핸들링
            console.log(error);
        });
    // 로딩중이지 않은 상태로 전환
    setLoading(false);
};

// 컴포넌트가 마운트되면 해당 함수를 호출해서 초기 데이터를 받아옵니다.
useEffect(() => {
    fetchInstaFeeds();
}, []);