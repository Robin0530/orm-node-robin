var express = require('express');
var router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


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
    res.render('login.ejs', {layout:false, resultMsg:"", adminId:"", password:""});
})



router.post('/login', async(req,res,next)=> {

  // 사용자 로그인정보 추출
    let userId = req.body.adminId;
    let userPw = req.body.password;

    var users = {
        userId,
        userPw
    }


  // DB admins 테이블에서 동일한 메일주소의 단일사용자 정보를 조회한다.
    var admin = await db.Admin.findOne({where:{admin_id:users.userId}});  

    var resultMsg = ''; 

    if (admin == null){
        resultMsg = '관리자 정보가 등록되지 않았습니다.'
    } else {

        // 패스워드가 같을때 메인페이지로 이동
        if (admin.userPw == userPw) {
            res.redirect('/');
        } else {
            resultMsg = '암호가 일치하지 않습니다.'
        }
    }

    if(resultMsg !== '') {
        res.render('login', {resultMsg, users, layout:false});
    }

});

module.exports = router;
