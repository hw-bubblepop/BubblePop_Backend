# Bubblepop_Backend
STAC2017 Project BubblePop Backend
=========
## Database Schema

### User Schema

> _id : String

> thumbnail : String

> email : String

> password : String

> nickname : String

> age : String

> location : Number

    0 : 서울
    1 : 경기
    2 : 수원
    3 : 인천
    4 : 천안
    5 : 대전
    6 : 전주
    7 : 광주
    8 : 대구
    9 : 부산
    10 : 울산
    11 : 창원
    12 : 평택
    13 : 세종
    14 : 충북
    15 : 충남
    16 : 전북
    17 : 전남
    18 : 경북
    19 : 강원
    20 : 경남
    21 : 제주
    22 : 해외

> heavencard : Object (Heavencard 오브젝트 참조)

> payment : Object ID Array (Payment 오브젝트 참조)

> reservation : Object ID Array (Reservation 오브젝트 id 참조)

> study : Object ID Array (Study 오브젝트 id 참조)

> party : Object ID Array (Party 오브젝트 id 참조)

> friends : Object ID Array (User 오브젝트 id 참조)

> privateChat : 1대1 채팅 Object ID Array (ChatRoom 오브젝트 id 참조)

> publicChat : 단체채팅 및 오픈채팅 Object ID Array (ChatRoom 오브젝트 id 참조)

> accountType : 사용자 회원가입 타입, String


### PaymentSchema

> _id : String

> owner : 카드 명의자, String

> exchange : 은행명, String

> number : 카드 번호, String

### HeavenCardSchema

> _id : String

> description : String

> position : 직책, String

> organization : 조직명, String

> phone : String

> email : String

> thumbnail : 최근 설정한 썸네일 경로, String

> balance : 카드 잔액, Number

> cardHistory : 결제내역, Object Array(?)

> cardOrder : 명함 주문

### ReservationSchema

> _id : String

> date : 일시, String

> time : 예약 시간, String

> location : 예약 장소 주소, String

### PartySchema

> _id : String

> title : String

> description : String

> thumbnail : String

> like : Number

> comment : Object Array (Comment Object id 참조)

> date : string

> category : Number

    0 : 교육
    1 : 강연
    2 : 세미나/컨퍼런스
    3 : 문화/예술
    4 : 취미활동
    5 : 소모임/친목행사
    6 : 공모전
    7 : 전시/박람회
    8 : 패션/뷰티
    9 : 이벤트/파티
    10 : 여행
    11 : 후원금 모금
    12 : 등산
    13 : 봉사활동
    14 : 공연/전시
    15 : 음악/악기
    16 : 낚시
    17 : 차/오토바이
    18 : 자전거
    19 : 취미, 여가, 여행
    20 : 사교/인맥
    21 : 기타

### StudySchema

> _id : String

> title : String

> description : String

> category : Number

    0 : 생활,노하우
    1 : 지식, 동향
    2 : 레저, 스포츠
    3 : 스터디/자기계발
    4 : 음악/악기
    5 : 사진/카메라
    6 : 요리/레시피
    7 : 여행/캠핑
    8 : 전공/커리어
    9 : 책/독서
    10 : 차/오토바이
    11 : 패션/쇼핑
    12 : 리빙/라이프
    13 : 기타

### CommentSchema

> _id : String

> writer : String

> content : String

### ChatRoomSchema

> _id : String

> title : String

> member : Object Array (User Object id 참조)

> lastChat : String

> lastChatTime : String

> thumbnail : String

### BoardSchema

> _id : String

### MemorySchema

> _id : String

### BoothSchema

> _id : String

> location : String

> title : String

> address : String

====================

## API Docs (All Value Input is req.body)

* /auth/register : POST

> Requiring

    thumbnail(file) : profile pic file

    email : email

    password : password

    nickname : nickname

    age : age

> Return

    403 : DB Error

    401 : User Data Exists

    200 : Success, User Schema Return



* /auth/login : POST

> Requiring

    email : email

    password : password

> Return

    401 : Unvalid User Info

    404 : Can't find User Data

    403 : DB Error

    200 : Success

* /user/edit/profile : Edit User profile, POST




