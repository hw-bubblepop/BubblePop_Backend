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

> age : Number

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

> chatroom : Object ID Array (ChatRoom 오브젝트 id 참조)

> accountType : 사용자 회원가입 타입, String

> star : String ID Array

    0 : 연애
    1 : 스포츠
    2 : 시사
    3 : 여행/맛집
    4 : 패션/뷰티
    5 : 컬쳐
    6 : 인테리어/디자인
    7 : 건강/다이어트
    8 : 자동차
    9 : IT/모바일
    10 : IT개발/기획
    11 : TV
    12 : 동물
    13 : 게임

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

> thumbnail : 최근 설정한 썸네일 경로, String Array

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

> owner : String

> chattype : String (private or public or open)

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

    location : location code

    star : 관심사 array

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

* /user/update/nickname : Edit User nickname, POST

> Requiring

    id : _id

    nickname : nickname

> Return

    401 : DB Error

    200 : Success

* /user/update/password : Edit User Password, POST

> Requiring

    id : _id

    password : password

> Return

    401 : DB Error

    200 : Success

* /user/update/location : Edit User location, POST

> Requiring

    id : _id

    location : location Number Value

> Return

    401 : DB Error

    200 : Success

* /user/update/age : Edit User age, POST

> Requiring

    id : _id

    age : age

> Return

    401 : DB Error

    200 : Success

* /user/update/card : Edit User card Thumbnail route, POST

> Requiring

    id : _id

    thumbnail : New Thumbnail Route

> Return

    401 : DB Error

    200 : Success


* /payment/add : Add Payment Info, POST

> Requiring

    owner : card owner

    exchange : card exchange

    number : card number

> Return

    401 : DB Error

    200 : Success

* /payment/update : Update Payment Info, POST

> Requiring

    owner : card owner

    exchange : card exchange

    number : card number

> Return

    401 : DB Error

    200 : Success

* /payment/delete : Delete Payment Info, POST

> Requiring

    id : _id

> Return

    401 : DB Error

    200 : Success

* /chat/private/list : Get User's private chat list

> Requiring

    id : user_id

> Return

    401 : DB Error

    200 : Success, private Chat List

* /chat/public/list : Get User's public and openchat list

> Requiring

    id : user_id

> Return

    401 : DB Error

    200 : Success, public chat list

* /chat/create : Create Chatroom on DB (For ChatServer)

> Requiring

    chattype : Chatroom's type (public or private or open)

    title : Chatroom's title

> Return

    401 : DB Error

    200 : Success

* /chat/create/open : Create OpenChatroom on DB (For ChatServer)

> Requiring

    title : CHatroom's title

    thumbnail : Chatroom's thumbnail (File Upload)

    serial : Openchat Serial

> Return

    401 : DB Error

    200 : Success

* /chat/leave : Leave Chatroom (For ChatServer)

> Requiring

    chat_room_id : chatroom id

    user_id : user id

> Return

    401 : DB Error

    200 : Success

* /chat/adduser : Update User Chatroom info (For ChatServer)

> Requiring

    chat_room_id : chatroom id

    user_id : User id

> Return

    401 : DB Error

    200 : Success

* /chat/setowner : Set Chatroom owner (For ChatServer)

> Requiring

    chat_room_id : chatroom id

    user_id : User id

> Return

    401 : DB Error

    200 : Success


* /study/create : create Study

> Requiring

    title : study title

    description : study description

    category : study category

    location : Study location address

    date : study Date

    thumbnail : Study thumbnail file (file upload)

> Return

    401 : DB Error

    200 : Success

* /study/edit : Edit Study Info

> Requiring

    title : study title

    description : study description

    category : study category

    location : Study location address

    date : study Date

    thumbnail : Study thumbnail file (file upload)

> Return

    401 : DB Error

    200 : Success

* /study/list : get study lists

> Requiring

    Nothing

> Return

    401 : DB Error

    200 : Success

* /study/delete : delete study

> Requiring

    id : study _id

> Return

    401 : DB Error

    200 : Success

* /party/create : create party

> Requiring

    title : party title

    description : party description

    category : party category

    location : party location address

    date : party Date

    thumbnail : party thumbnail file (file upload)

> Return

    401 : DB Error

    200 : Success

* /party/list : get party lists

> Requiring

    nothing

> Return

    401 : DB Error

    200 : Success


* /party/edit : edit party info

> Requiring

    title : party title

    description : party description

    category : party category

    location : party location address

    date : party Date

    thumbnail : party thumbnail file (file upload)

> Return

    401 : DB Error

    200 : Success


* /party/delete : delete party

> Requiring

    id : party _id

> Return

    401 : DB Error

    200 : Success

* /heavencard/create : create heavencard

> Requiring

    description : 한줄소개

    position : position

    organization : organization name

    phone : phone number

    email : email

    thumbnail : Heavencard Thumbnail file (file upload)

> Return

    401 : DB Error

    200 : Success

* /heavencard/:id : get heavencard info

> Requiring

    id (url param) : heavencard id

> Return

    401 : DB Error

    200 : Success

* /heavencard/edit/detail : edit heavencard detail info

> Requiring

    description : 한줄소개

        position : position

        organization : organization name

        phone : phone number

        email : email

> Return

    401 : DB Error

    200 : Success

* /heavencard/edit/detail : edit heavencard detail info

> Requiring

    thumbnail : New Thumbnail File (file upload)

> Return

    401 : DB Error

    200 : Success



