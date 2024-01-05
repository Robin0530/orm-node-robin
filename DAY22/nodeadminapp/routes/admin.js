var express = require('express');
var router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;

/* 
관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공
- http://localhost:3001/admin/list
- get
*/
router.get('/list', async (req, res, next) => {

    var option = {
        admin_member_id: "1",
        admin_name:"",
        email:"",
        telephone:"",
        dept_name:"",
        reg_date:"",
    }

    var admins = await db.Admin.findAll(
        {
            attributes: ['admin_member_id', 'company_code', 'admin_id', 'admin_password', 'admin_name', 'email', 'telephone', 'dept_name', 'used_yn_code', 'reg_user_id', 'reg_date', 'edit_user_id', 'edit_date'],
            order:[['admin_id', 'DESC']]
        }
    )

    res.render('admin/list.ejs', { admins, option, currentUrl: '/admin/list'});
});

/* 
관리자 사이트 관리자 계정 생성 페이지
- http://localhost:3001/admin/create
- get
*/
router.get('/create', async (req, res) => {
    res.render('admin/create.ejs', { currentUrl: '/admin/list' });
});

/* 
관리자 사이트 관리자 계정 생성 후 정보 전달?
- http://localhost:3001/admin/create
- post
*/
router.post('/create', async (req, res) => {
    // 생성 처리 로직
    res.redirect('/admin/list');
});

/* 
관리자 사이트 관리자 계정 수정 페이지
- http://localhost:3001/admin/modify
- get
*/
router.get('/modify', async (req, res) => {
    res.render('admin/modify', { currentUrl: '/admin/list' });
});

router.post('/modify', async (req, res) => {
    // 수정 처리 로직
    res.redirect('/admin/list');
});

/* 
관리자 사이트 관리자 계정 삭제 페이지
- http://localhost:3001/admin/delete
- get
*/
router.get('/delete', async (req, res) => {
    res.redirect('/admin/list');
});

module.exports = router;