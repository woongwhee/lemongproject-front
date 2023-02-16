// import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
//
// const RandomCat = () => {
//
//     const [list, setList] = useState([]);
//     const [page, setPage] = useState(1);
//     const [load, setLoad] = useState(1);
//     const preventRef = useRef(true);
//     const obsRef = useRef(null);
//
//     useEffect(()=> {
//         getDog();
//         const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
//         if(obsRef.current) observer.observe(obsRef.current);
//         return () => { observer.disconnect(); }
//     }, [])
//
//     useEffect(()=> {
//         getDog();
//     }, [page])
//
//     const obsHandler = ((entries) => {
//         const target = entries[0];
//         if(target.isIntersecting && preventRef.current){
//             preventRef.current = false;
//             setPage(prev => prev+1 );
//         }
//     })
//
//     const getDog = useCallback(async() => { //글 불러오기
//         console.log('고양이 사진 불러오기');
//         setLoad(true); //로딩 시작
//         const res = await axios({method : 'GET', url : `https://api.thecatapi.com/v1/images/search`});
//         console.log(res.data);
//         if(res.data){
//             setList(prev=> [...prev, {...res.data[0]} ]); //리스트 추가
//             preventRef.current = true;
//         }else{
//             console.log(res); //에러
//         }
//         setLoad(false); //로딩 종료
//     }, [page]);
//
//     return(
//         <>
//             <div className="wrap min-h-[100vh]" style={{height:"500px",overflow:"scroll"}}>
//                 {
//                     list &&
//                     <>
//                         {
//                             list.map((li)=>
//                                 <img key={li.id} className="opacity-100 mx-auto mb-6" src={li.url} alt={li.dke} width={'500px'} height={'300px'} />
//                             )
//                         }
//                     </>
//
//                 }
//                 {
//                     load &&
//                     <div className="py-3 bg-blue-500 text-center">로딩 중</div>
//                 }
//                 <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">옵저버 Element</div>
//             </div>
//         </>
//     )
// }
//
// export default RandomCat

import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import Feed from "./Feed1";

function Test1(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    const [loginUserNo, setLoginUserNo] = useState(0);
    useEffect(
        () => {
            axios({
                url: '/api/feed/loginFeedUserNo',
                method: 'POST'
            }).then((res) => {
                // console.log(res.data)
                setLoginUserNo(res.data)
            })
        }, []
    );


    const Posts = ({ posts, loading }) => {
        return (
            <>
                {loading && <div> loading... </div>}
                <div>
                    {posts.map((post) => (
                        <div>{post.feedContent}</div>
                        // <Feed Feed={post} loginUserNo={loginUserNo}/>
                    ))}
                </div>
            </>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get(
                "api/feed/main/0"
            );
            setPosts(response.data.result);
            setLoading(false);
        };
        fetchData();
    }, []);

    const indexOfLast = currentPage * postsPerPage;  //  1 * 10 마지막 인덱스
    const indexOfFirst = indexOfLast - postsPerPage; // 10 - 10 처음 인덱스
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
//                          나눌숫자 10      총게시물갯수
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


    return (
        <div className="App">
            <Posts posts={currentPosts(posts)} loading={loading}></Posts>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={setCurrentPage}
            ></Pagination>
        </div>
    );
}

export default Test1;