var express = require('express');
var router = express.Router();

// bcryptjs 단방향 암호화 패키지 참조하기
const bcrypt = require('bcryptjs');

// 양방향 암호화 알고리즘 패키지 참조하기
const AES = require('mysql-aes');

var moment = require('moment');

var db = require('../models/index');

var sequelize = db.sequelize;
const { QueryTypes } = sequelize;


/* 
기능: 관리자 계정 목록조회 웹페이지 요청
호출주소: http://localhost:3001/admin/list
 */
router.get('/list', async(req, res, next)=> {

    var searchOption = {
        companyCode:"0",
        adminid:"",
        userYnCode:"9"
    }

    // 
    // var admins = await db.Admin.findAll();
    var sqlQuery =`SELECT company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email), '${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id 
    FROM admin_member;`

    var admins = await sequelize.query(sqlQuery,{
        raw: true,
        type: QueryTypes.SELECT,
    });

    res.render('admin/list.ejs', {admins, searchOption});
});


/* 
기능: 관리자 계정 등록처리 웹페이지 요청
호출주소: http://localhost:3001/admin/create
 */
router.get('/create', async(req, res, next)=> {
    res.render('admin/create.ejs');
});



/* 
기능: 관리자 계정 등록처리 라우팅메소드
호출주소: http://localhost:3001/admin/create
 */
router.post('/create', async(req, res, next)=> {

    // STEP1: 관리자가 입력한 관리자 계정입력정보 수집하기

    var companyCode = req.body.companyCode;
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var usedYnCode = req.body.usedYnCode;
    var dept_name = req.body.dept_name;

    // 관리자 옴호화 해시알고리즘 기반 단방향 암호화 적용하기
    // bcrypt.hash('암호화할문자', 암호화변환횟수)
    var encryptedPassword = await bcrypt.hash(admin_password, 12);

    // 메일주소/전화번호 개인정보를 양방향 암호화(AES)적용하기
    // AES.encrypt('사용자입력개인정보',암호화보안키값)
    var encryptedEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
    var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

    // 추출된 데이터를 기반으로 DB 입력 객체 생성
    var admin = {
        company_code: companyCode,
        admin_id,
        admin_password: encryptedPassword,
        admin_name,
        email: encryptedEmail,
        telephone: encryptedTelephone,
        used_yn_code: usedYnCode,
        dept_name,
        reg_date: Date.now(),
        reg_member_id: 1,
        edit_date: Date.now(),
        edit_member_id: 1
    };


    await db.Admin.create(admin);

    res.redirect('/admin/list');
});


/* 
기능: 관리자 계정 정보 확인 및 수정처리 웹페이지 요청
호출주소: http://localhost:3001/admin/modify/1
 */
router.get('/modify/:aid', async(req, res, next)=> {

    var aid = req.params.aid;

    var admin =await db.Admin.findOne({where:{admin_member_id:aid}})

    // AES.decrypt('양방향 암호화된 DB')
    admin.email = AES.dcrypt(admin.email, process.env.MYSQL_AES_KEY);
    admin.telephone = AES.dcrypt(admin.telephone, process.env.MYSQL_AES_KEY);

    res.render('admin/modify.ejs', {admin});
});


/* 
기능: 관리자 계정 등록처리 웹페이지 요청
호출주소: http://localhost:3001/admin/modify
 */
router.post('/modify/:id', async(req, res, next)=> {
    res.redirect('/admin/modify');
});


module.exports = router;
