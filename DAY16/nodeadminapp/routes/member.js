const express = require('express');
const router = express.Router();



router.get('/list', async(req, res) => {
    res.render('member/list', {currentUrl:'/member/list'});
});



router.get('/create', async(req, res) => {
    res.render('member/create', {currentUrl:'/member/list'});
});



router.post('/create', async(req, res) => {
  // 생성 처리 로직
res .redirect('/member/list');
});



router.get('/modify', async(req, res) => {
    res.render('member/modify', {currentUrl:'/member/list'});
});



router.post('/modify', async(req, res) => {
  // 수정 처리 로직
    res.redirect('/member/list');
});



router.get('/delete', async(req, res) => {
  // 삭제 처리 로직
    res.redirect('/member/list', {currentUrl:'/member/list'});
});



module.exports = router;
