var express = require('express');
var router = express.Router();

var moment = require('moment');


// 멤버리스트 조회
router.get('/list', async(req, res, next)=> {

    res.render('member/list', {layout:"layout"});

});

router.post('/list', async(req, res, next)=> {

    res.redirect('/member/list', {layout:"layout"});

});


// 멤버 생성
router.get('/create', async(req, res, next)=> {

    res.render('member/create');

});

router.post('/create', async(req, res, next)=> {

    res.redirect('/member/create');

});



// 멤버 수정
router.get('/modify/:id', async(req, res, next)=> {

    var memberId = req.params.id;

    res.render('member/modify');

});

router.post('/modify/:id', async(req, res, next)=> {
    
    var memberId = req.params.id;

    res.redirect('/member/modify');

});


// 멤버 삭제
router.get('/delete', async(req, res, next)=> {

    var memberId = req.query.id;

    res.render('member/delete');

});