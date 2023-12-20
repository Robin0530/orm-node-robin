var express = require('express');
var router = express.Router();

/* 관리자 사이트 메인-대시보드*/
router.get('/', function(req, res, next) {
  res.render('index', { currentUrl:'/'});
});

/* 
공통기능 제공(관리자 사이트 로그인/메인-대시보드)
- http://localhost:3001/login
- get
- 로그인 페이지
*/
router.get('/login', async(req,res,next) =>{
  res.render('login.ejs');
})



router.post('/login', async(req,res,next)=> {
  let userId = req.body.adminId;
  let userPw = req.body.password;

  var member = {
    userId,
    userPw
  };

  console.log(`유저 input id, pw 정보 ${member}`);
  res.redirect('/')
})

module.exports = router;
