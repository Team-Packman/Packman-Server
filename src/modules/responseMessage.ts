const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NOT_FOUND: '존재하지 않는 자원',
  BAD_REQUEST: '잘못된 요청',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',

  // 토큰 관련
  NULL_VALUE_TOKEN: '토큰이 없습니다',
  INVALID_TOKEN: '잘못된 토큰입니다',
  SUCCESS_GET_TOKEN: '소셜 로그인 토큰 생성',

  SUCCESS_SOCIAL_LOGIN: '소셜 로그인 성공',

  // 유저 관련
  SUCCESS_CREATE_USER: '유저 생성 성공',
  FAIL_CREATE_USER: '유저 생성 실패',

  NO_USER: '존재하지 않는 User입니다',
  SUCCESS_GET_USER: '유저 조회 성공',
  SUCCESS_UPDATE_USER: '유저 수정 성공',

  // 폴더 관련
  SUCCESS_CREATE_FOLDER: '폴더 생성 성공',

  //패킹리스트 공통
  NO_PACKINGLIST: '존재하지 않는 PackingList입니다',
  DUPLICATION_PACKINGLIST: '중복된 리스트 이름입니다',

  //혼자 패킹리스트
  CREATE_ALONEPACKINGLIST_SUCCESS: '혼자 패킹리스트 생성 성공',

  // 함께 패킹리스트 관련
  SUCCESS_CREATE_TOGETHER_CATEGORY_SUCCESS: '함께 패킹리스트 카테고리 생성 성공',
  CREATE_TOGETHERPACKINGLIST_SUCCESS: '함께 패킹리스트 생성 성공',
  SUCCESS_UPDATE_TOGETHER_CATEGORY_SUCCESS: '함께 패킹리스트 카테고리 수정 성공',

  // 카테고리
  NO_CATEGORY: '존재하지 않는 Category입니다',
  NO_LIST_CATEGORY: '리스트에 존재하지 않는 Category입니다',
};

export default message;
