var express = require('express');
var router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


/* 
게시글 정보관리 라우팅 기능 제공
- http://localhost:3001/article/list
- get
*/
router.get('/list', async(req, res) => {

  var articles = [
    {
      articleIdx: 1,
      title: "1번째 게시글 입니다.",
      contents: "1번째 게시글 내용입니다.",
      view_cnt: 100,
      display: "Y",
      ipaddress: "111.111.111.111",
      registDate: Date.now(),
      registMemberId: "robin",
    },
    {
      articleIdx: 2,
      title: "2번째 게시글 입니다.",
      contents: "2번째 게시글 내용입니다.",
      view_cnt: 200,
      display: "Y",
      ipaddress: "222.111.111.111",
      registDate: Date.now(),
      registMemberId: "robin",
  },
  {
      articleIdx: 3,
      title: "3번째 게시글 입니다.",
      contents: "3번째 게시글 내용입니다.",
      view_cnt: 300,
      display: "Y",
      ipaddress: "123,111,111,111",
      registDate: Date.now(),
      registMemberId: "robin",
  },
  ]  
  res.render('article/list', {articles, currentUrl: '/article/list'});

});


/* 
신규 게시글 등록 웹페이지
- http://localhost:3001/article/create
- get
*/
router.get('/create', async(req, res) => {
  res.render('article/create', {currentUrl: '/article/list'});
});


/* 
게시글 목록 웹페이지로 이동
- http://localhost:3001/article/create
- post
*/
router.post('/create', async(req, res) => {
  res.redirect('/article/list');
});



/* 
게시글 수정
- http://localhost:3001/article/modify
- get
*/
router.get('/modify', async(req, res) => {
  res.render('article/modify', {currentUrl: '/article/list'});
});


router.post('/modify', async(req, res) => {
  res.redirect('/article/list');
});



/* 
게시글 삭제
- http://localhost:3001/article/delete
- get
*/
router.get('/delete', async(req, res) => {
  // 삭제 처리 로직
  res.redirect('/article/list');
});




module.exports = router;