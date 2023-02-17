export type postType = {
    page: number;
    contents: string;
};

export const getPostList = (page: number): postType[] => {

    // 매개변수로 받은 페이지와 동일한 페이지 객체들만 return 해줍니다.
    return postList.filter((post: postType) => post.page === page);
};

export const postList: postType[] = [
    {
        page: 1,
        contents: '안녕하세요 1번째 글',
    },

    {
        page: 1,
        contents: '안녕하세요 2번째 글',
    },

    {
        page: 1,
        contents: '안녕하세요 3번째 글',
    },

    {
        page: 2,
        contents: '안녕하세요 4번째 글',
    },

    {
        page: 2,
        contents: '안녕하세요 5번째 글',
    },

    {
        page: 2,
        contents: '안녕하세요 6번째 글',
    },

    {
        page: 3,
        contents: '안녕하세요 7번째 글',
    },

    {
        page: 3,
        contents: '안녕하세요 8번째 글',
    },

    {
        page: 3,
        contents: '안녕하세요 9번째 글',
    },

    {
        page: 4,
        contents: '안녕하세요 10번째 글',
    },
];