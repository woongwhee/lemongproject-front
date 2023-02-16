export const CLIENT_ID = '6c1bbd8efca92b427aff16845e3336d1';
export const REDIRECT_URI = 'http://localhost:3000/kakao';
export const LOGOUT_REDIRECT_URI = 'http://localhost:3000';
// export const BACK_REDIRECT_URI = 'http://localhost:8081/api/p/kakaoLogin';
// 인가 코드 + 토큰을 받아오는 uri -> 프론트로 받아오기

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
// export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
// export const BACK_KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${BACK_REDIRECT_URI}&response_type=code`