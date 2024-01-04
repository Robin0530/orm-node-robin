USE modu_chat;

# 주석
# member 테이블의 전체컬럼(*) 데이터 조회
SELECT * FROM member;

# CREATE DATA - 데이터등록/INSERT 구문
# INSERT INTO member(컬럼1,컬럼2,...)VALUES(컬럼1의 등록값, 컬럼2의 값...);
INSERT INTO member (email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_date, reg_date, reg_member_id)
VALUES ('test@test.co.kr', '1234', '이보람', '', '01022565224', 1, 1, '910530', NOW(), 1);
INSERT INTO member (email, member_password, name, profile_img_path, telephone, entry_type_code, use_state_code, birth_date, reg_date, reg_member_id)
VALUES ('test4@test.co.kr', '1234', '이보람4', '', '01022565224', 1, 1, '910530', NOW(), 1);

# READ DATA-데이터조회/ SELECT 구문
SELECT * FROM member;
SELECT * FROM member WHERE email='test@test.co.kr';
SELECT * FROM member WHERE entry_type_code = 1 AND name='이보람';
SELECT * FROM member WHERE entry_type_code = 1 OR use_state_code = 0;
# member_id가 3보다 큰 row를 조회하는데 내가 원하는 컬럼만 가져오기 ( member_id,email,name,telephone )
SELECT member_id,email,name,telephone FROM member WHERE member_id>=3;
SELECT * FROM member WHERE name IN('이보람2', '이보람5');
SELECT * FROM member WHERE name Like '%5%'; # 패턴매칭  가% 가로 시작하는 모든항목, %가% 가가 포함된 모든데이터, %가 가로 끝나는 모든 데이터
SELECT * FROM member ORDER BY member_id DESC;
SELECT * FROM member ORDER BY member_id ASC;

# UPDATE DATA - 데이터수정/ UPDATE 구문
UPDATE member SET name = '이보람5', profile_img_path='http://naver.com' WHERE member_id=5;
UPDATE member SET use_state_code=0 WHERE member_id > 2;


# DELETE DATA - 데이터삭제/DELETE 구문
DELETE FROM member WHERE email='test4@test.co.kr';
DELETE FROM member WHERE email='test4@test.co.kr' AND member_id = '4';
SELECT * FROM member;