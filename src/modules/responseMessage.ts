const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NOT_FOUND: '리스트가 존재하지 않습니다',
  BAD_REQUEST: '잘못된 요청',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
  INVALID_PARAMS: '유효하지 않은 파라미터 입니다',
  NO_DATA: '존재하지 않는 data입니다',

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
  SUCCESS_UPDATE_FOLDER: '폴더 수정 성공',
  SUCCESS_DELETE_FOLDER: '폴더 수정 성공',
  SUCCESS_GET_FOLDERS: '폴더 조회 성공',
  NO_FOLDER: '존재하지 않는 Folder입니다',
  SUCCESS_GET_TOGETHER_PACKINGLIST_IN_FOLDER: '폴더 속 함께 패킹리스트 조회 성공',
  SUCCESS_GET_ALONE_PACKINGLIST_IN_FOLDER: '폴더 속 혼자 패킹리스트 조회 성공',
  SUCCESS_GET_RECENT_CREATED_LIST: '최근 생성된 리스트 조회 성공',

  //패킹리스트 공통
  NO_PACKINGLIST: '존재하지 않는 PackingList입니다',
  DUPLICATION_PACKINGLIST: '중복된 리스트 이름입니다',
  NO_UPDATEDTITLE: '존재하지 않는 UpdatedTitle입니다',
  NO_UPDATEDDATE: '존재하지 않는 UpdatedDepartureDate입니다',
  NO_UPDATEDMYTEMPLATE: '존재하지 않는 UpdatedIsSaved입니다',
  UPDATE_PACKINGLIST_TITLE_SUCCESS: '패킹리스트 제목 수정 성공',
  UPDATE_PACKINGLIST_DATE_SUCCESS: '패킹리스트 출발 날짜 수정 성공',
  UPDATE_PACKINGLIST_MYTEMPLATE_SUCCESS: '패킹리스트 나의 템플릿 여부 수정 성공',

  //혼자 패킹리스트
  CREATE_ALONEPACKINGLIST_SUCCESS: '혼자 패킹리스트 생성 성공',
  CREATE_ALONE_CATEGORY_SUCCESS: '혼자 패킹리스트 카테고리 생성 성공',
  UPDATE_ALONE_CATEGORY_SUCCESS: '혼자 패킹리스트 카테고리 수정 성공',
  DELETE_ALONE_CATEGORY_SUCCESS: '혼자 패킹리스트 카테고리 삭제 성공',
  CREATE_ALONE_PACK_SUCCESS: '혼자 패킹리스트 짐 생성 성공',
  UPDATE_ALONE_PACK_SUCCESS: '혼자 패킹리스트 짐 수정 성공',
  DELETE_ALONE_PACK_SUCCESS: '혼자 패킹리스트 짐 삭제 성공',
  READ_ALONEPACKINGLIST_SUCCESS: '혼자 패킹리스트 상세 조회 성공',
  DELETE_ALONEPACKINGLIST_SUCCESS: '폴더 속 혼자 패킹리스트 삭제 성공',

  // 함께 패킹리스트 관련
  CREATE_TOGETHER_CATEGORY_SUCCESS: '함께 패킹리스트 카테고리 생성 성공',
  UPDATE_TOGETHER_CATEGORY_SUCCESS: '함께 패킹리스트 카테고리 수정 성공',
  DELETE_TOGETHER_CATEGORY_SUCCESS: '함께 패킹리스트 카테고리 삭제 성공',
  CREATE_TOGETHER_PACK_SUCCESS: '함께 패킹리스트 짐 생성 성공',
  UPDATE_TOGETHER_PACK_SUCCESS: '함께 패킹리스트 짐 수정 성공',
  DELETE_TOGETHER_PACK_SUCCESS: '함께 패킹리스트 짐 삭제 성공',
  CREATE_TOGETHERPACKINGLIST_SUCCESS: '함께 패킹리스트 생성 성공',
  READ_TOGETHERPACKINGLIST_SUCCESS: '함께 패킹리스트 상세 조회 성공',
  DELETE_TOGETHERPACKINGLIST_SUCCESS: '폴더 속 함께 패킹리스트 삭제 성공',
  UPDATE_PACKER_SUCCESS: '함께 패킹리스트 담당자 배정 성공',

  // 카테고리
  NO_CATEGORY: '존재하지 않는 Category입니다',
  NO_LIST_CATEGORY: '리스트에 존재하지 않는 Category입니다',

  //템플릿
  NO_TEMPLATE: '존재하지 않는 Template입니다',
  GET_ALONETEMPLATE_SUCCESS: '혼자 패킹 템플릿 리스트 조회 성공',
  GET_TOGETHERTEMPLATE_SUCCESS: '함께 패킹 템플릿 리스트 조회 성공',

  // 초대 코드 관련
  SUCCESS_INVITE_TOGETHER_PACKING: '함께 패킹리스트 초대 성공',
  READ_DETAILEDTEMPLTATE_SUCCESS: '템플릿 상세조회 성공',

  // 멤버
  SUCCESS_GET_MEMBERS: '멤버 조회 성공',
};

export default message;
