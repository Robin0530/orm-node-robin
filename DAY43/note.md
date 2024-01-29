* WEB
* WAS

외부에서 웹 서버로 들어올때 80포트로 들어옴(항상 오픈PORT:80)

웹서버가 뚫렸을 때 WAS 서버도 같이 뚫림
(WAS 서버에 .env 말고 config.js에 DB정보들이 있으면 그대로 다 노출된다)



PuTTY 실행

1. sudo su

2. pm2로 노드 애플리케이션 시작하고 관리하기

cd /var/www/nodechatapp
cd bin
pm2 start www --name nodechatapp -i 0



----------------------------------------------------------
# 사용자 채팅 웹사이트 WAS 프록시 연결설정
server {
	listen 80;
	server_name test04.msoftware.co.kr 13.125.89.93;
	location / {
		proxy_pass http://172.31.63.9:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $http_connection;
		proxy_set_header Host $http_host;
		proxy_cache_bypass $http_upgrade;
	}
}

도메인: test01(호스트명).test.co.kr(도메인주소)
ㄴ1개의 도메인을 구매하면 구매한 업체에서 도메인주소를 관리해주는 DNS서버 서비스를 제공함
ㄴtest.co.kr 도메인을 구매했다고 가정하면: 한개당 1-2-3만원
ㄴ여러분이 원하는 호스트명을 맘껏.. 30~40개 정보 생성해서 사용할 수 있음
www.test.co.kr / www.naver.com / naver.com  --> 서비스하는 웹서버의 public ip주소
익명호스트.tset.co.kr, naver.com  --> 서비스하는 웹서버의 public ip주소
admin.test.co.kr  --> 서비스하는 웹서버의 public ip주소/A레코드로 등록
test.test.co.kr  --> 서비스하는 웹서버의 public ip주소/A레코드로 등록


ㄴDNS(Domain Name Service or Server)
ㄴ도메인주소(호스명+도메인)을 서비스하는 웹서버의 퍼블릭 IP주소 정보 맵핑서비스
ㄴ즉 사용자가 www.naver.com 도메인을 치면 해당 호스트+도메인명을 서비스하는 웹사이트가 설치된 웹서버의 IP주소를 사용자 브라우저에게 알려줘서 웹브라우저가 해당 웹서버를 찾아가게 해주는 서비스

- 이러한 서비스를 도메인 네임서비스라고 하고 담당하는 서버를 DNS서버라고 하며
도메인을 구매하면 구매업체에서 기본적으로 뮤료로 DNS서비스 관리기능을 제공합니다.


* MYSQL = MariaDB 인증모드 2가지
maria db 10.4이하에서는 리눅스 기본계정으로 마리아 db사용이 불가했고 별도의 개별 mariadb계정생성해서
사용해야했지만 10.4 이후로버전에서는 리눅스의 기본 root계정으로도 mysql접근가능..

1) UNIX 소켓 인증방식: Linux 자체 root 시스템 계정을 직접 mariadb의 기본 계정으로 사용가능

2) 일반 인증모드: 해당 mysql, mariadb에서 직접 생성한 계정으로 로그인하는 방식

grant all privileges on*.* to 'root'@'%' identified by '11qqaa..';

flush privileges;



* SSL(보안채널): Secure Socket Layer
클라이언트(웹브라우저) <--------------- http://test.co.kr:80 -----------------> 웹서버(백엔드)

통로-------------------------------------------------------------------------------------------------------------
클라이언트(웹브라우저) <--------------- https://test.co.kr:443 -----------------> 웹서버(백엔드) SSL(서버에 SSL 인증서 설치)
-----------------------------------------------------------------------------------------------------------------

유료 SSL: 보안이 좀더 강함
무료 SSL: 기본적인 보안적용. Let's Ecrypt 무료 SSL 인증서 서비스(구글 페북) 
- 서버에 SSL 인증서 설치: 인증서 파일을 서버에 웹사이트마다 설정해준다.

1) Let's Encrypt Certbot 설치

2) Cerbot을 통한 사이트별 인증서 파일 생성

3) 웹서버 웹사이트에 인증서 파일 경로 설정

4) SSL 적용하기
sudo vi /etc/nginx/nginx.conf

server {
	listen 80;
	server_name test04.msoftware.co.kr;
	return 301 https://$host$request_uri;
}

server {
	listen 443 ssl;
	server_name test04.msoftware.co.kr;

	ssl_certificate /etc/letsencrypt/live/test04.msoftware.co.kr/fullchain.pem;
	ssl_certificate_key /etc/letsencrypt/live/test04.msoftware.co.kr/privkey.pem;

	location / {
		proxy_pass http://172.31.63.9:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $http_connection;
		proxy_set_header Host $http_host;
		proxy_cache_bypass $http_upgrade;
	}
}


cd /var/www/nodechatapp
cd bin

pm2 list
# 단일 인스턴스
pm2 start www --name nodechatapp
pm2 stop nodechatapp
pm2 restart nodechatapp
pm2 delete nodechatapp


pm2 start www --name nodechatapp -i 0


cd /var/www/nodechatadmin
cd bin

pm2 delete nodechatadmin
pm2 start www --name nodechatadmin -i 0

pm2 monit

개발한 결과물을
Case1) 단일 가상서버 안에서 모든 Server SW를 설치구성하고 2개의 서비스를 제공한다.
공인 아이피: 5000 WEB->WAS 3000
공인 아이피: 5001 WEB->WAS 3001

Case2) 분산/가용성 존 기반 3Tier기반 서비스 인프라 환경에서 서비스

Case3) 오토 스케일아웃 기반 3Tier기반 인프라환경에서의 서비스