var express = require('express');
var router = express.Router();

/* 
로그인 웹페이지 요청 및 응답 
- http://localhost:3000/login
- get
*/
router.get('/login', async(req, res, next)=> {
  res.render('login');
});


/* 
로그인 처리 요청 및 응답,로그인 완료 후 채팅 페이지 이동처리
- http://localhost:3000/login
- get
*/
router.post('/login', async(req, res, next)=> {
  res.redirect('/chat');
});



/* 
회원가입 웹페이지 요청 및 응답 
- http://localhost:3000/entry
- get
*/
router.get('/entry', async(req, res, next)=> {
  res.render('entry');
});


/* 
회원가입 처리 요청 및 응답,회원가입 완료 후 로그인 페이지 이동처리
- http://localhost:3000/entry
- post
*/
router.post('/entry', async(req, res, next)=> {
  res.redirect('/login');
});





/* 
암호 찾기 웹페이지 요청 및 응답 
- http://localhost:3000/find
- get
*/
router.get('/find', async(req, res, next)=> {
  res.render('find');
});


/* 
암호찾기 처리 요청 및 응답,암호 찾기 완료 후 로그인 페이지 이동처리
- http://localhost:3000/find
- post
*/
router.post('/find', async(req, res, next)=> {
  res.redirect('/login'); 
});


router.get('/chat', async(req,res)=> {
  res.render('chat');
})

module.exports = router;
