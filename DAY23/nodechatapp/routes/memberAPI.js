var express = require('express');
var router = express.Router();

/*
ㄴrouter.post('/login') : 로그인 기능 구현 
ㄴrouter.post('/entry') : 신규회원 가입 기능 구현 -아이디/암호체크 기능구현
ㄴrouter.post('/find') : 암호찾기 기능구현

ㄴrouter.get('/all') : 전체 회원목록 데이터 조회 
ㄴrouter.post('/create') : 신규 회원정보 데이터 등록처리
ㄴrouter.post('/modify): 기존 회원정보 데이터 수정처리 
ㄴrouter.post('/delete'),기존회원정보 데이터 삭제처리 
ㄴrouter.get('/:mid') : 단일 회원정보 데이터 조회 
*/


/* 회원가입처리 API */
// - http://localhost:3000/api/member/entry
router.post('/entry', async(req, res, next)=> {

    try{
        
    }catch(err){

    }
    
    res.json('login');
});

module.exports = router;
