# DBMS 기초
<br>

## 1. DMBS의 유형
1. DBMS & RDBMS
    * DATA: 세상에 널려있음. 형태도 가지각색
    * 정보: 의미있는 데이터 > 의미있는 데이터인 정보는 일반적으로 관리 
      * 관리를 어떻게 할것인가? 정보의 수집과 표시: 정보관리시스템(웹사이트, ERP(회계,영업,생산,경영관리...), 그룹웨어(메일, SMS), 모바일앱) > 각종 정보관리시스템에 의해 수집된 데이터(의미있는 가치있는) 데이터는 소중히, 안정적, 영구적, 영속적으로 관리되어야 한다 = DBMS


     * DBMS
       * 데이터관리 SW시스템
     * RDBMS(Relational Database Management System=Software=Service)
       * 테이블간의 관계 기반으로 데이터를 저장 관리하는 DBMS (<span style="color:red">정형 데이터를 테이블간의 관계 기반</span>으로 체계적으로 데이터의 <span style="color:red">무결성</span>을 담보해주는 DBMS)
       * 테이블: 실제 관심사/정보주제에 따라 나누어 데이터의 구조를 미리 정의해서 정해진 구조에 데이터를 넣고 관리하는 주체..
          - 사용자정보: 메일주소, 이름, 전화관리
          - 주문정보: 주문번호, 이름, 주문금액
          - 주문상품정보: 주문번호, 상품번호, 상품명, 단가, 수량
          - 배송정보: 주문번호, 주소, 배송상태
          - 결제정보: 주문번호, 결제번호, 결제방식, 결제금액, 결제상태, 결제일시
       * RDBMS가 아직도 1990년도부터 해서 지금도 핵심 데이터(정보)관리 수단으로 이용되는 이유..
         * 모든 정보관리 시스템은 RDMBS를 기반으로 정보를 아직도 관리합니다.
         * 왜?? RDBMS를 느려도 사용하는 이유? => 데이터 무결성을 지켜주는 최고의 방법을 제공
         * RDMBS를 제대로 사용하면 쓰레기 데이터를 안만들고 안정적인 고품질의 데이터를 관리해주는 각종 수단과 방법을 제공

     * 데이터중에 의미있는 데이터(Data)를 정보(Information)라 말하고 현대의 대부분 정보관리시스템은 RDBMS를 통해 영구적으로 데이터를 저장 관리한다.
        * 정형(정해져 있는 형태)데이터: 데이터를 관리할때 데이터구조(형태)를 미리 정해놓고 정해진 구조의 데이터에 실제 데이터를 넣고 관리한다.

        * 비정형(미리 형태(구조)가 정의되지 않은데이터): 미리 데이터의 구조(형태)를 정해두지 않고 관리될수 있는 데이터

    * 무결성: 데이터에 정보에 결함이 발생하지 않게하는 성질
      * 결함이 없는 데이터의 성질
      * 결함이 없는 데이터 = 양질의 데이터
  
2. RDBMS (정형데이터관리) & NOSQL DB(비정형데이터 관리)
   * RDB는 정형 데이터를 HDD/SDD에 데이터를 저장하고 관리한다. MySQL, MS SQL, Oracle

3) NO SQL DB
   * NO SQL DB유형 : **DOCUMENT DATABASE**, WIDE COLUMN DATABASE, KEY-VALUE DATABASE, GRAPH DATABASE
   * Document DB: XML, JSON 문서 포맷의 데이터를 저장하는 NOSQL DB: 조회속도가 좋다. Mongo DB, AZURE COSMOS DB
   * KEY-VALUE DB: KEY, VALUE 형태의 구조로 데이터를 관리하는 NO SQL DB: REDIS <br>
 **요즘은  Mongo DB, REDIS 도 필수**


## 2. DMBS의 유형
1. TABLE간의 관계기반 정형 데이터 관리
    * DATABASE(Schema), TABLE 기반으로 미리 정해진 데이터의 구조(정형데이터) 기반 데이터를 관리
    * TABLE에 각종 데이터 <span style="color:red">유형별 컬럼(항목)을</span> 생성해 <span style="color:red">데이터 구조를 미리 정의</span> 사용
    * 영구적인 데이터 보관 및 관리가 주요 목적
    * 테이블간의 관계설정(정규화) 및 <span style="color:red">구조 수립</span>이 성능이 큰 영향을 미룬다.

2. RDBMS Database 논리구조
* DataBases
    - Table
      - Rows: 로우-실제 하나의 데이터셋을 말한다. ex) 사용자 데이터중에 이보람의 데이터(이보람의 나이,메일,전화번호 등)
        - Columns: 컬럼(테이블에 미리 정의된 관리항목 구조)