## 디버깅
- 디버거 : 버그 잡는 소프트웨어 (디버깅 도와주는 소프트웨어)
- breakpoint(중단점) : 코드가 한줄한줄 실행하는것 확인
- F10 : 한줄한줄 실행되게 하는 명령어
- F5 : 마지막까지 한번에 실행 (중단점이 있으면 걸림. 없는곳만 한번에 실행)

## 시작
- npm init : 초기설정
  - npm init 실행 후 순차적으로 정보 입력하면 package.json 생성

- 신규 패키지 설치 : npm install 패키지명 or npm i 패키지명
  설치위치 (npm install은 내 프로젝트 폴더에 설치)
 
  => npm install moment

- npm i 하면 node_modules 폴더와 package-lock.json 설치된다.
- npm i 로 설치한 모듈은 node_modules 안에 설치된다.
- package.json 안에 설치한 모듈들 정보가 기재된다.

- 설치된 패키지 삭제 : npm uninstall [패키지명]

- 패키지 여러개 설치 : npm i [패키지명] [패키지명]

## package-lock.json
- 어떤패키지가 어떤 패키지에 의존해서 사용하는것 확인 (버전 확인가능)
- 패키지 설치 시 패키지와 패키지간의 종속성이 있을 수 있는데, 
그때 패키지간의 의존성을 확인 할 수 있다(버전 확인)

 ex
- a설치 개발 c1 패키지로 개발
- b설치 개발 c2 패키지로 개발

* node.js에서는 require()예약어를 통해 지정한 설치된 노드패키지를 참조합니다.
* 노드 모듈폴더 삭제 시에도 package.json에 설치했던 라이브러리 내역이 남아있기 때문에
npm i 명령어로 패키지 복원 가능하다.

"dependencies": {

    "dotenv": "^16.3.1",
    "moment": "^2.29.4"
}

* 설치하는 노드패키지의 용도 2가지
    (1) 서비스를 위한 개발용도 패키지
     - 서비스를 위해 반드시 필요한 패키지
     - npm i 패키지
     - npm i - g 패키지명

    (2) 개발할때만 사용하는 패키지
    - 개발용 패키지
    - 개발 생산성/효율성 제고를 위한 패키지 설치
    - npm i [패키지명] --save-dev
  
* 전역패키지 설치
    - npm install -global [패키지명]
    - npm i -g [패키지명]


# NVM
## 1. NVM 설치
  - nvm이란? 용도는 동일한 컴퓨터에 여러 버전의 Node Framework을 설치하고 관리하고자 할때 사용
  - nvm 명령어
  nvm version : 버전 확인
  nvm ls :설치된 버전 목록 확인
  
