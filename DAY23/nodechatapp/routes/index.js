var express = require('express');
var router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


/* 임시메인 */
router.get('/', async(req, res, next)=>{
  res.render('channel/chat.ejs', {layout:"baseLayout"});
  // res.render('channel/chat.ejs', {layout:false});
});


/* 회원가입 웹페이지 요청과 응답 */
router.get('/entry', async(req, res, next)=>{
  res.render('entry');
});


/* 회원가입 웹페이지 요청과 응답 */
router.post('/entry', async(req, res, next)=>{

  // STEP1: 회원가입페이지에서 사용자가 입력한 회원정보 추출
  var email = req.body.email;
  var password = req.body.password;

  // STEP2: DB신규 회원등록처리



  // 등록완료시 로그인 페이지로 이동시키기
  res.redirect('/login');
});


/* 로그인 웹페이지 요청과 응답 */
router.get('/login', async(req, res, next)=>{
  res.render('login', {msg:"",email:"",password:"", layout:"authLayout"});
});


/* 로그인 사용자 입력정보 처리 요청과 응답 */
router.post('/login', async(req, res, next)=>{

  var memberEmail = req.body.email;
  var memberPassword = req.body.password;

  // DB 테이블에서 정보 조회
  var member = await db.Member.findOne({where:{email:memberEmail}});

  var msg = ''

  if(member == null) {
    msg = '사용자 정보를 찾을 수 없습니다. 가입 후 이용바랍니다.'
  } else {
    if(member.password = memberPassword) {
      res.redirect('/chat');
    } else {
      msg = '암호가 일치하지 않습니다.'
    }
  }

  if(msg !== '') {
    res.render('login', {msg, memberEmail, memberPassword})
  }
});


/* 암호찾기 웹페이지 요청과 응답 */
router.get('/find', async(req, res, next)=>{
  res.render('find', {msg:"", email:"", layout:"authLayout"});
});

/* 암호찾기 사용자 입력정보 처리 요청과 응답 */
router.post('/find', async (req, res, next) => {
  try {
    var Email = req.body.email;

    // DB에서 찾기
    var email = await db.Member.findOne({ where: { email: Email } });

    var msg = '';

    if (!email || email.email !== Email) {
      msg = '등록된 메일이 없습니다. 가입 후 이용 바랍니다.';

    } else if (email.email == Email) {
      msg = '메일찾기완료';
    }

    if (msg !== '') {
      res.render('find', { msg, email, layout: "authLayout" })
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



/* 회원가입 웹페이지 요청과 응답 */
router.get('/entry', async(req, res, next) => {
  res.render('login');
});


/* 회원가입 입력정보 처리 요청과 응답 */
router.post('/entry', async(req, res, next) => {

  const {email, password, name, telephone} = req.body;



  res.redirect('/login');
});

module.exports = router;
