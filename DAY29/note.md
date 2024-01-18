# 암호화란??
* 플레인한(plain) 일반적인 데이터/텍스트/정보를 알아볼수 없는 문자열(난독화)

----------------------------> 암호화 (알아볼수있는 문자를 못알아보게 만드는것)<br>
이보람=f12345678weq65451237eddwq987e4ew65q<br>
복호화(알아볼수없는 문자를 알아볼수있게 만드는것)<-------------------------<br>

* 단방향 암호화는.. 데이터를 암호화하고 복호화 불가능한 기법
  * 회원 가입시 회원계정 암호
    * 시스템 개발자나 운영자도 DBA도 사용자의 암호는 알 수 없어야 한다.

    * 암호화는 가능하고 복호화가 불가능한 암호화 기법
    * 단방향 암호화 알고리즘: 해시 알고리즘
    * 4~5가지 업계 표준 해시 단방향 암호화 기법이 존재
        * SHA1, MD5, HSA256, SHA512... (뒤로 갈수록 암호화가 복잡하고 세진다--> 해킹이 어려워짐)
    * bcryptjs (비크립트js)


* 양방향 암호화
  * 암호화도 가능하고 복호화 가능한 기법
    * 중요한 개인정보중 DB에 저장시 암호화하고 시스템(어플리케이션)에서 사용시 복호화해서 보여줄때 사용하는 기법
    * 시스템과 시스템간 중요 데이터를 주고받을때
    * 양방향 암호화시에는 반드시 암호화 보안키값이 존재하고 해당 보안키값으로 암호화하고 복호화가 가능함
    * 회원 주요 개인정보: 전화번호, 주소지, 생년월일, 주민번호...
      * ** 최악의 경우 DB가 털릴수 있다고 가정하고 개발하고 운영해야한다.
      * ** DB가 해킹되었을때 주요 개인정보를 암호화 키값 없이는 해커도 복호화가 불가능하다.

<br>
<br>


---

# 우리가 개발하는 2가지 방식에 대한 이해

1) 100% 서버측 기술사용(Server Side): MVC패턴 - FORM기반 화면 및 데이터 처리 방식
  - NO RESTful 방식
  - 관리자 웹사이트

2) 프론트엔드(AJAX)-백엔드(RESTFul)기반으로 개발하는 방식
  - 2.1) 사용자 웹사이트 프론트엔드(AJAX)-백엔드(RESTful)기반 개발방식-풀스택
  - 2.2) 사용자 웹사이트도 100% 서버사이드 기술로 개발이 가능함

<br>
<br>

---

# CORS 이슈
* 동일 출처(프론트엔트리소스) 동일 출저 데이터 백엔드리소스(RESTAPI) 위반

* 프론트엔드 웹페이지와 백엔드 RESTAPI 가 같은 도메인주소(서버)에서 제공되는 경우는 CORS 이슈가 발생안함.

* 그러나 RESTFUL을 호출하는 클라이언트(모바일앱/타사사이트/프론트엔드 다른도메인사이트/로컬컴퓨터)등
  

* Client 
  - Mobile Natvie App
  - Mobile Cross Platform APP(Flutter...)  
  - RESTful을 서비스하는 동일 어플리케이션내 WebPage 타사 웹페이지
  - 로컬컴퓨터에서 직접 띄운 웹페이지
* RESTFul Backend
  - RESTFul Data Backend Service

* CORS 문제를 해결하려면 서버에서 클라이언트로 응답을 보낼때 응답헤더에 Accress-Control-Allow-Origin이라는 헤더를 넣어주어 RESTful 서비스 도메인과 다른 클라이언트의 주소에서의 요청을 허락하게 한다.

<br>
<br>

---

# AWS Cloud 특징
* 서비스명 --- 서비스단위
* EC2(가상서버)

<br>
<br>

---

# 인증과 권한
* 인증(Authentication, Authentification): 웹사이트 시스템사용자가 누구인지를 파악하는 행위
  * 누구인지를 파악하는 기능이 필요: 로그인이란 행위를 통해 사용자 인증 시행
  * 로그인
    * 사용자가 직접 해당 사이트에 회원가입하여 로그인하는 경우(메일주소/암호): 직접가입로그인
    * 이미 검증된 빅테크, 글로벌/포탈 사이트의 내가 회원가입한 정보를 이용해 로그인하는 경우: SNS 로그인

* 권한(Authorization)
  * 해당 시스템에 인증된 사용자가 해당 시스템의 어떤 기능/어떤 데이터에 대해 접근가능한지, 사용가능하는지에 대한 정책(Policy) 
  * 권한 기본적으로 인증(로그인)이 선행되어야 한다.
  * 사용자가 요청하는 웹페이지 또는 데이터(Restful API)를 해당사용자가 접근이 가능할지, 사용가능하게 할지에 대한 정책을 프로그램으로 구현하는 것

CASE1) 프론트엔드/ 백엔드 나눠진 시스템(사용자 채팅웹사이드-HTML)에서의 인증과 권한
  * JWT 토큰(JSON데이터-웹브라우저 클라이언트에 저장됨) 기반 인증과 권한 구현

CASE2) 100% 서버사이드 기술(세션(로만(MVC) 기반 시스템(관리자웹사이트)의 사용자 인증과 권한
  * 서버세션(서버메모리에 저장되는 사용자 인증정보) 기반 인증과 권한 구현

<br>
<br>

---
# JWT(JSON Web Token) 토큰?
## 1. JWT 토큰이란?
  * JSON 형식의 특정 데이터를 암호화/난독화하여 변조 불가능하게 만든 암호화된 토큰
    * 일반적인 경우는 난독화만 한다.
    * 변조즉시 파기
  * 회원으로 인증된 사용자에게 JWT토큰을 발급하여 발급된 토큰을 기반으로 허가가 필요한 OPEN API 라우팅 호출시 인증수단으로 활용
  
* JWT 토큰의 형식
  * HEADER: 토큰 종류와 해시알고리즘 정보 제공(암호화/난독화)
  * PAYLOAD: 토큰으로 저장하는 <span style="color:red">실제 데이터인 JSON 데이터</span>를 인코딩하여 저장하는 영역
  * SIGNATURE: 일련의 문자열로 서버에서 발급해준 <span style="color:red">특정 문자열로 시그니처 값을 통해 서버의 값과 비교해 토큰이 변조되었는지 여부를 확인할 수 있는 값 </span>설정

## 2. JWT 토큰 용도
  * 이기종 시스템간의 <span style="color:red">데이터 상호 교환</span>을 통한 시스템 통합 수단으로 사용
    * 시스템 통합(SI=System Intergation)용도로 JWT 토큰을 주로 사용한다.
  * JWT토큰은 기본적으로 변조불가능하고 난독화/복호화 사용이 간편해 각종 시스템간 데이터 교환 표준 포맷으로 사용됨
  * 프론트엔드/백엔드 분리 환경에서 프론트엔드의 사용자 인증 및 인증정보 유지 수단으로 주로 사용됨
  * 기본적으로 JWT토큰은 항상 토큰값을 확인이 가능하므로 개인정보나 보안과 관련된 내용의 데이터를 토큰화 사용하는 것은 지양 해야함.

## 3. JWT 사용자 인증 토큰 발급/사용 프로세스
* 프론트엔드 백엔드로 나뉘어진 시스템의 경우 프론트엔드 사용자 인증(로그인) 후 백엔드에서 로그인 한 사용자 정보(JSON)를 포함한 JWT 인증토큰으로 발급해줌으로써 프론트엔드에서 백엔드 RESTful 서비스를 요청시 사용자 인증

* HTTP 통해 데이터를 전달하는 경우
  * HEADER
    * 쿼리스트링?KEY
    * 기타정보(HEADER.AUTHORIZTION=JWT토큰)
  * BODY
    * JSON
  
<br>
<br>

---
# JWT토큰/RESTFul 기능 구현시 주의사항
* 모든 REST API 기능에 매번 <span style="color:red">JWT 토큰 인증 체크 및 권한 체크 기능 구현방식 보다는 미들웨어 방식 </span>권장.
* 모든 REST API 기능에서 <span style="color:red">try-catch 구문을</span> 통한 예외처리 필요
* 모든 <span style="color:red">REST API 기능구현시 반환결과값을 동일 포맷</span>으로 통일하여 프론트엔드와 정해진 규칙기반 통신 필요

<br>
<br>

---
# 세션 개념 및 적용 프로세스
## 1. 서버 세션이란?
* 클라이언트와 서버 간의 연결정보를 <span style="color:red">서버와 클라이언트(쿠키-세션(서버메모리)에 보관 사용하는 메커니즘) 양측에 보관 사용하는 매커니즘</span>을 말한다. 해당 연결정보는 서버상에는 일반적으로 메모리에 클라이언트는 쿠키등을 이용해 저장한다.

* 일반적으로 사용자가 웹사이트에 인증(로그인)시 로그인한 <span style="color:red">사용자의 정보는 서버의 메모리에 서버세션 형태로 저장</span>하고 서버에 저장된 세션에 대한 세션 키값 정도를 웹 브라우저의 쿠키(텍스트파일)형태로 보관한다.
* 클라이언트는 서버에서 발급해준 쿠키를 기반으로 서버에 기능 요청시 본인 인증정보를 쿠키를 통해 전달하며
* 서버는 전달받은 쿠키의 키값을 통해 서버메모리상 에 보관된 사용자 정보 확인이 가능하다.
* 서버상에 사용자 정보를 저장하는 세션저장 방식은 다양하다(서버메모리/서버내 파일/RDBMS,NOSQL)
* 클라이언트상에 보관되는 세션의 키저장방식 또는 다양하다.(쿠키(보안상취약),세션스토리지,로컬스토리지...)