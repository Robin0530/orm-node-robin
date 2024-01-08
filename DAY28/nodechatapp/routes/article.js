var express = require('express');
var router = express.Router();

// 날짜변환
var moment = require('moment');


/* 
게시글 정보관리 라우팅 기능 제공
- http://localhost:3000/article/list
- get
- 게시글 목록 정보조회 웹페이지 요청 라우팅메소드
*/
router.get('/list', async(req, res, next) => {

    // article 테이블의 모든 게시글 목록을 조회해온다.
    // var articles = await db.Article.findAll({})

// 조회결과 모든 게시글 데이터를 뷰에 전달.
    res.render('article/list');

});

/*
- 게시글 목록 정보조회 처리 라우팅메소드
- http://localhost:3000/article/list
- post
   */
router.post('/list', async(req, res, next)=> { 


    res.render('article/list')
});



/* 
- 신규 게시글 등록 웹페이지를 요청하는 라우팅메소드
- http://localhost:3000/article/create
- get
*/
router.get('/create', async(req, res, next) => {
    res.render('article/create');
});


/* 
- 신규 게시글 등록 웹페이지를 요청하는 라우팅메소드
- http://localhost:3000/article/create
- get
*/
router.post('/create', async(req, res, next) => {
    res.redirect('/article/create'); 
});


/* 
*** 쿼리스트링 방식 ***
- 게시글 삭제
- http://localhost:3000/article/delete/delete?aid=1
- get
*/
router.get('/delete', async(req, res, next) => {

    res.render('article/modify');

})


/* 
- 게시글 수정 웹페이지를 요청하는 라우팅메소드
- http://localhost:3000/article/modify/1
- get
*/
router.get('/modify/:id', async(req, res, next) => {

    var articleId = req.params.id;

    res.render('article/modify');
})


/* 
- 게시글 정보를 수정처리하는 라우팅메소드
- http://localhost:3000/article/modify/1
- post
*/
router.post('/modify/:id', async(req, res, next) => {

    var articleId = req.params.id;

    res.redirect('/article/list');
})


module.exports = router;