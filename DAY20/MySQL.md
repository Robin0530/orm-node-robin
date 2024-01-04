MySQL Client Tools

DB Client <-----------> DB Server(MySQL, MariaDB, Oracle, MSSQL...) <br>
MySQL Workbench <----------> MySQL Server=MariaDB Server <br>
HeidiSQL <br>
Node Application <----------> MySQL<br>
    ㄴ SQL구문 작성해서 DB서버로 전송 ---> MySQL에서 클라이언트에서 보내준 SQL구문을 파싱, 구문분석, 실행, 결과반환... <br>
    <--- SQL 실행결과를 클라이언트에 전송한다.(등록한 경우 등록데이터, 수정한 경우 수정건수, 삭제한 경우 삭제건수, 조회한 경우는 조회결과) <br>
Python App <br>
IOS/Android App <br>

RDBMS <br>
* Databases(Schemes): 하나의 작은 시스템당 하나의 DB, 또는 큰 시스템의 하나의 업무단위 (ERP=생산관리 DB, 인사DB, 회계DB, 영업관리), 하나의 서버를 업무단위로 사용 <br>
    -- DB Object --
    * Tables: 실제 사용자 데이터가 저장되고 관리되는 객체
        - member, member_config, product, article, chat... 실제 존재하는 데이터를 관리를 해야하는 데이터테이블
    * Views: 가상의 테이블이라고 하며 실제 물리적으로 Table처럼 존재하지는 않지만 여러테이블 또는 특정 구조의 테이블 구조가 필요한 경우 가상의 테이블을 만들어서 테이블처럼 사용가능하다. <br> 주로 여러개 흩어져있는 테이블간의 관계를 이용해 자주사용하는 데이터 구조를 가사으이 테이블로 만들어 사용한다.
    * Procedures: Stored Procedure(저장프로시저) 는 자주 사용되는 장문의 SQL쿼리를(비지니스 로직이 SQL구문안에 담긴 경우) DB서버에 저장해두고 사용하는 방법
    * Functions: DB함수라고 하고 SQL코드를 재사용하고 싶은경우 DB서버에 SQL함수를 만들어서 SQL코드를 재사용가능하다.
        - 단일값 함수와 목록형 함수 두가지로 개발가능



---
전체 게시글 목록 조회표시: 총 비용: 100
* Frontend(React.js) <-----5%-------> Backend(Node RestFul) <-----70%-------> DB Server(Database) <br>
게시글 목록표시 ------> 게시글 목록 요청 ------> 게시글 목록조회 SQL작성 전송 ------> 게시글 테이블 조회 결과 반환<br> <-표시 10%----- 10% <------ 반환결과 10% <br>

---
* MySQL 기초 사용법
1. Database(schema) 생성
   - 소문자, 언더바 조합으로 DB명을 만든다
   - 예약어는 대문자

2. Table 생성
   - 데이터를 실제 저장 관리하는 DB객체
   - 컬럼은 데이터 관리 항목인데 로우는 각 항목으로 구성된 실제 데이터를 말한다.
* 테이블생성 제1원칙: 프라이머리키 생성(PK) - 각각의 데이터를 구분해주는 키, 하나의 테이블에 한개이상 프라이머리키가 있어야한다.(복합키)

3. 컬럼 정의 및 데이터 유형
   - 문자형 데이터 유형
     - CHAR(5): 문자열 고정길이 (Char(1) GENDER:F,M / Char(6) 생년월일: 910530 등 성별이나 성별의 문자길이처럼 고정된 것) -- 기본적으로 고정길이만큼 디스크길이를 지정하기 때문에 반드시 안에 값을 다 채워넣어야한다. 안채우더라도 공간을 사용하기 때문에 빈공간 차지-낭비, 성능을 떨어뜨리는 원인 (고정길이로 지정하는 의미: 반드시 값이 들어와야 하는것, 관리목적상-중요한 데이터. 필수옵션 이라는 의미..!!)
     - VARCHAR(5): 문자열 가변길이. 가변길이형은 사용하지 않은 영역은 반환한다. 입력한 값만큼 사용한다. 사용자가 입력해도 되고 안해도 되는 옵션형태라면 VARCHAR형으로 지정하기
     - TEXT: 긴 문자열 1000자리 이상 문자열생성
   - 숫자형 데이터 유형
     - INT: 정수형
     - TINYINT: -127~128 까지의 정수형, 실수형(DECIMAL, DOUBLE)
   - 날짜형 데이터 유형
     - DATATIME: 날짜시간
     - DATE: 날짜만
     - TIME: 시간형
   - 불린형(true/false, 0 or 1) 데이터유형 TINYINT(1)

* A 알파벳 문자(A) 하나를 저장하는 크기 1Byte = 8bit
* 유니코드 문자(가) 하나는 2Byte = 16bit 사용
---
* MySQL 기초 사용
1. RDBMS의 중요목표
    - 저장된 데이터는 결함이 없어야하는 <span style="color:red">데이터 무결성 원칙</span>을 보장되어야한다.
      - 데이터 무결성이란: 데이터 무결성은 데이터의 정확성, 일관성, 유효성이 유지되는 것을 의미합니다.
    - 각종 제약(Contraint Key)조건을 이용해 데이터 무결성을 유지한다.
    - <span style="color:red">PrimaryKey는 모든 테이블에 반드시 하나 이상</span> 존재한다.
      - PrimaryKey: 각각의 데이터(Row)를 구분해주는 키
    - 대표적인 제약조건으로는 PrimaryKey, ForignKey(반드시 다른테이블에 참조하는 키가 있어야한다.)

2. 컬럼 주요 키워드
    - PRIMARY KEY(PK): 유일키
    - NOT NULL(NN): 데이터가 반드시 들어와야하면 체크
      - NULL & NOT NULL의 차이
        - NULL: 널널하다. 즉 데이터가 들어와도 되고, 안들어와도되는 컬럼
        - NOT NULL: 널널하면 안된다. 반드시 데이터가 들어와야하는 컬럼
    - UNIQYE KEY(UK): 유니크키. 유일한 키. 데이터의 유일성
    - Binary(B)
    - Unsigned(UN): 숫자 반드시 양수만 받아야한다. 숫자 자료형인경우 음수영역은 무시하고 0부터 ~해당 숫자 저장(음수값이 들어가는 안되는 컬럼)
    - Zero File(ZF): 숫자의 자릿수 고정 INT(4) 1이 입력된경우 0001
    - AUTO_INCREMENT(AI): Row가 생성될때마다 숫자가 1씩 추가(자동 숫자증가)
    - Generated(G) 
  

3. 주요 키
   - <span style="color:red">PRIMARY KEY(PK): 유일키</span>
   - <span style="color:red">UNIQYE KEY(UK): 유니크키</span>
   - <span style="color:red">Forign KEY: 참조키: 반드시 다른테이블에 참조하고 있는 키가 있어야 한다.</span>
   - INDEX KEY: 인덱스키
   - NON CLUSTED INDEX KEY
   - CLUSTED INDEX

---
* MySQL 기초 사용
1. SQL(Structured Query Language)
    - 구조회된 질의 언어
2. C/R/U/D SQL: 데이터를 직접 다루는 SQL
    - CREATE: INSERT INTO 스키마명. 테이블명(컬럼1, 컬럼2) VALUSE (값, 값2);
    - READ: SELECT * FROM 스키마명. 테이블명;
    - UPDATE: UPDATE 스키마명.테이블명 SET 컬럼명='값';
    - DELETE: DELETE 스티마명.테이블명;



* 하나의 시스템(웹시스템=정보관리시스템)을 개발하는 단계
  1. 요구사항접수
  2. 요구사항정의
  3. 분석단계
  4. 설계단계 <br>
   --- 1~4 시스템에 대한 모델링 단계 ---
        - 모델링 단계에서 사용하는 국제표준 모델링언어 UML(Unified Modeling Language)=Diagram 그림으로 표현하는 언어
        - 모델링 전용 툴 사용
  5. 개발단계-테스트단계 <br>
   --- 5 개발 단계 ---
        - 개발언어
        - 개발툴 사용(VSCODE 등)
  6. 배포-운영관리단계
  7. 기획-디자인-설계-개발
  8. 테스트
  9.  배포/운영관리
* 워터폴 개발방법론: 한단계 끝나면 다음단계 끝나면 다음단계... => 프로젝트 산으로 갑니다
* 애자일 개발방법론: 워터폴 개발방법론의 업데이트버전. 핵심 기능들을 몇개 추리고 해당 기능위주로 빠르게 분석/설계는 간단히 빠르게 프로토 타입을 개발하고 완성해가능 방법론

<br>

* 시스템 개발분야
  - SI분야 - 정부, 관공서에서 발주
  - WebAgency 분야
  - Solution 분야
  - 서비스, 플랫폼 분야

---
ERD Entity Realation Diagram
- UML 언어중에 Data, Table에 대한 분석/설계 시 사용됨
- Entity(Table)관계를 그림으로 표시하는 것
---
* 관계형 데이터베이스가 데이터가 많아지면(Row가 많아진다) 조회 속도가 급격하게 떨어진다.
조회 속도가 떨어지는 이유???
* Table Full Scan을 통한 데이터 조회
100만건에 데이터가 있다고 가정하면 1번부터 name이 홍길동인지 아닌지를 100만건 데이터를 모두 조회해서 일치하는 결과를 반환한다.

* Table Full Scan 조회 비효율을 개성하기 위한 방법 = Index
---
* ORM 기반 개발 방식2가지
1. Code First 방식(Model First) 방식
  - 모델 코드를 먼저 만들고 만든 모델을 기반으로 해당 Database에 물리적 테이블을 생성
  - ORM 기본방식(추천방식)

2. DB First 방식
  - DB에 물리적 테이블을 먼저 만들거나 이미 만들어진 테이블 기반으로 모델을 생성해서 모델 기반 프로그래밍하는 기법
  - 특수한 경우만 사용(기존에 이미 DB를 사용하고 있는 경우)

---
config.json
{
  <!-- 내 로컬 DB서버 -->
  "development": {
    "username": "root",       <!-- 내DB서버계정 -->
    "password": "11qqaa..",   <!-- 내DB서버비밀번호 -->
    "database": "modu_chat",  <!-- 내DB서버의 스키마명-->
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
---

* ORM을 효율적으로 효율적으로 사용하는 방법??
  * 단순 C/R/U/D는 ORM으로 처리, 특히 C/U/D/는 ORM으로 필수처리
  * 단순조회(단일테이블에 대한 단일건 조회/다중건 조회) - ORM처리(findOne, fineAll) 조건도 단순한경우

그런데 여러개의 테이블을 조인해서 많은 컬럼을 가져오거나
조회조건, 그룹핑, 컴퓨팅(계산), 통계, 로직처리등이 필요한 복잡한 쿼리는 그냥 SQL ORM을 통해 전달해 사용하는것이 더 효율적이다.

진짜로 길고 로직이 있는 SQL 구문은 SP(저장프로시저)를 통해 처리하는것도 고민해봐야한다.