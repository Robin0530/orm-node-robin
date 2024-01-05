// 게시글 정보 관리 각종 웹페이지 요청과 응답처리 라우터 전용파일
// http://localhost:3000/article

var express = require('express');
var router = express.Router();

// 날짜변환
var moment = require('moment')

// db객체 불러오기
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;
// SQL을 직접 사용할 경우 (현재 router.get('/list')) 
var sequelize = db.sequelize;
const {QueryTypes} = sequelize;


// 게시글 목록 조회 웹페이지 요청 및 응답 라우팅메소드
// http://localhost:3000/article/list
router.get('/list', async(req,res) =>{

    /* 
        searchOption을 router.post('/list')에만 넣으면 에러뜸
        ==> 왜냠 list.ejs에서 받아오는 라우터는 router.get('/list')와 router.post('/list') 총 2개인데
        router.post('/list') 에만 searchOption이 있으면 get에서는 동일한 변수가 없으니 에러뜸
    */
    var searchOption = {
        boardTypeCode:"0",
        title:"",
        isDisplayCode:"9"
    }

    // STEP1: DB에서 모든 게시글 데이터 목록을 조회해옵니다.
    // db.Article.findAll()메소드는 article테이블의 모든 데이터를 조회하는
    // SELECT article_id,,, FROM article WHERE is_dispaly_code=1 AND view_count != 0; SQL쿼리로 변환되어 DB서버에 전달되어 실행되고 그결과물을 반환한다.
    // models에서 불러올경우 (ORM으로 할 경우) -----
    // var articles = await db.Article.findAll(
    //     {
    //         attributes: ['article_id', 'board_type_code', 'title', 'article_type_code', 'view_count', 'is_display_code', 'reg_date', 'reg_member_id'],
    //         order: [['article_id', 'DESC']] // DESC 오름차순(3,2,1), ASC 내림차순(1,2,3)
    //     }
    // );
    // ---- 여기까지
    

    // SQL 문으로 직접 할 경우 ---- // 하기 전 workbench에서 쿼리문 맞는지 확인해보기
    // var sqlQuery = `SELECT article_id, board_type_code, title, article_type_code, view_count, ip_address, is_display_code, reg_date, reg_member_id FROM article WHERE is_display_code = 1 ORDER BY article_id DESC;`

    // var articles = await sequelize.query(sqlQuery, {
    //     raw: true,
    //     type: QueryTypes.SELECT,
    // })
    // --- 여기까지
    

    // 이건 잘 모르겠음. 다시 학습해보기---
    var articles = await sequelize.query("CALL SP_CHAT_ARTICLE_DISPLAY (:P_CHANNEL_ID)",
        { replacements: { P_DISPLAY_CODE: 1 } }
    );
    //--- 여기까지


    // select count(*) from Articles;
    var articleCount = await db.Article.count();
    

    // STEP2: 게시글 전체 목록을 list.ejs뷰에 전달한다.
    res.render('article/list.ejs', {articles, searchOption, articleCount, moment});
});


// 게시글 목록에서 조회옵션 데이터를 전달받아 조회옵션기반 게시글 목록 조회 후
// 게시글 목록 페이지에 대한 요청과 응답처리
router.post('/list', async(req,res) => {

    // step1: 사용자가 선택/입력한 조회옵션 데이터를 추출한다.
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    var searchOption = {
        boardTypeCode,
        title,
        isDisplayCode
    }

    // step2: 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서 게시글 목록을 재조회한다.
    // SELECT * FROM article WHERE board_type_code = 1; SQL구문으로 변환되어 DB서버에 전달실행
    var articles = await db.Article.findAll({where:{board_type_code:searchOption.boardTypeCode}});

    // select count(*) from Articles;
    var articleCount = await db.Article.count();

    // step3: 게시글 목록 페이지 list.ejs에 데이터 목록을 전달한다.
    res.render('article/list.ejs', {articles, searchOption, articleCount});
})



// 신규 게시글 등록 웹페이지 요청 및 응답 라우팅 메소드
router.get('/create', async(req,res) =>{
    res.render('article/create.ejs');
})

// 신규 게시글 사용자 등록정보 처리 요청 및 응답 라우팅 메소드
router.post('/create', async(req,res) =>{

    // step1: 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    // step2: 추출된 사용자 입력데이터를 단일 게시글 json 데이터로 구성해서
    // DB article테이블에 영구적으로 저장처리한다.
    // 저장처리후 article테이블에 저장된 데이터 반환됩니다.

    // 등록할 게시글 데이터
/*
     * 중요!! 테이블에 저장/수정할 데이터소스는 반드시 데이터모델의 속성명을 이용해야한다.
     * 조심하기! article 모델 컬럼에 값이 반드시 들어와야하는값(IS NOT NULL)
     */
    var article = {
        board_type_code: boardTypeCode,
        title,
        contents,
        view_count: 0,
        ip_address: "111.111.222.222",
        article_type_code: articleTypeCode,
        is_display_code: isDisplayCode,
        reg_member_id: 1,
        reg_date: Date.now()
    };

    // 게시글 정보를 article테이블에 저장하고 저장된 값을 다시 반환받는다.
    // var registedArticle = await db.Article.create(article);
    await db.Article.create(article);

    // step3: 등록처리후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list'); // redirect는 링크주소~ 까먹지말자
})




// 기존 게시물 삭제처리 요청 및 응답 라우팅메소드
// http://localhost:3000/article/delete?aid=3
router.get('/delete', async(req,res) =>{

    // step1: 삭제하려는 게시글 고유번호를 추출한다.
    var articleIdx = req.query.aid;

    // step2: 게시번호기반으로 실제 DB article 테이블에서 데이터를 삭제처리한다.
    var deletedCnt = await db.Article.destroy({where:{article_id:articleIdx}});

    // step3: 게시글 목록 페이지로 이동시킨다.
    res.redirect('/article/list');
})



// 와일드카드라서 밑에 배치~
// 기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅메소드
// localhost:3000/article/modify/1
// get
router.get('/modify/:aid', async(req,res) =>{

    // step1: 선택한 게시글 고유번호를 파라메터 방식으로 URL을 통해 전달받음
    var articleIdx = req.params.aid;

    // step2: 해당 게시글 번호에 해당하는 특정 단일게시글 정보를 DB article테이블에서
    // 조회해온다.

    var article = await db.Article.findOne({where:{article_id:articleIdx}});

    // 단일 게시글에 동적 속성기반 댓글목록 속성추가
    article.comments = [{coment_id:1, comment:'댓글1'},{coment_id:2, Comment:'댓글2'}]

    // step3: 단일 게시글 정보를 뷰에 전달한다.
    res.render('article/modify.ejs', {article});
})

// 기존 게시글 사용자 수정정보 처리 요청과 응답 라우팅 메소드
// localhost:3000/article/modify/1
// post
router.post('/modify/:aid', async(req,res) =>{

    // 게시글 고유번호 URL 파라메터에서 추출하기
    var articleIdx = req.params.aid;

    // step1: 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    // step2: 추출된 사용자 입력데이터를 단일 게시글 json 데이터로 구성해서
    // DB article테이블에 수정처리한다.
    // 수정처리하면 처리건수값이 반환된다.

    // 등록할 게시글 데이터
    var article = {
        article_id: articleIdx,
        board_type_code: boardTypeCode,
        title,
        contents,
        article_type_code: articleTypeCode,
        is_display_code: isDisplayCode,
        edit_member_id: register,
        edit_date:Date.now()
    }

    // DB article테이블의 컬럼내용들 수정처리하고 수정건수 반환받기
    // db.Article.update(수정할데이터 조건)는
    // UPDATE article SET board_type_code=1, title='', content
    var updatedCount = await db.Article.update(article,{where:{article_id:articleIdx}});

    // step3: 수정처리후 게시글 목록 웹페이지로 이동처리
    res.redirect('/article/list');
    
});

module.exports = router;