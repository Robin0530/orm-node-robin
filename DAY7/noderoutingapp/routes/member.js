var express = require('express');
var router = express.Router();

// 약관동의
router.get('/join', function (req, res) {

    res.render('member/join');
})

// 로그인
router.get('/entry', function (req, res) {

    res.render('member/entry');
})

// 회원가입
router.post('/entry', function (req, res) {
    res.redirect('/auth/login');
})


module.exports = router;