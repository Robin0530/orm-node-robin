const express = require('express');
const router = express.Router();

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


router.get('/list', async(req, res) => {
    res.render('message/list', {currentUrl:'/message/list'});
});


router.get('/create', async(req, res) => {
    res.render('message/create', {currentUrl:'/message/list'});
});



router.post('/create', async(req, res) => {
  // 생성 처리 로직
    res.redirect('/message/list');
});



router.get('/modify', async(req, res) => {
    res.render('message/modify', {currentUrl:'/message/list'});
});


router.post('/modify', async(req, res) => {
  // 수정 처리 로직
    res.redirect('/message/list');
});


router.get('/delete', async(req, res) => {
  // 삭제 처리 로직
    res.redirect('/message/list');
});

module.exports = router;
