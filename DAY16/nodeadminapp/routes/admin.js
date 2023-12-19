var express = require('express');
var router = express.Router();


/* 
관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공
- http://localhost:3001/admin/list
- get
*/
router.get('/list', async(req, res, next) => {
    res.render('admin/list.ejs')
});


/* 
관리자 사이트 관리자 계정 생성 페이지
- http://localhost:3001/admin/create
- get
*/
router.get('/create', async(req, res)=> {
    res.render('admin/create.ejs')
});


/* 
관리자 사이트 관리자 계정 생성 후 정보 전달?
- http://localhost:3001/admin/create
- post
*/
router.post('/create', async(req, res) => {
    // 생성 처리 로직
    res.redirect('/admin/list');
});


/* 
관리자 사이트 관리자 계정 수정 페이지
- http://localhost:3001/admin/modify
- get
*/
router.get('/modify', async(req, res) => {
    res.render('admin/modify');
});



router.post('/modify', async(req, res) => {

    res.redirect('/admin/list');
});



/* 
관리자 사이트 관리자 계정 삭제 페이지
- http://localhost:3001/admin/delete
- get
*/
router.get('/delete', async(req, res) => {

    res.redirect('/admin/list');
});



module.exports = router;