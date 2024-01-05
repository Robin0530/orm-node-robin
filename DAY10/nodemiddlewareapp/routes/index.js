var express = require('express');
var router = express.Router();

// 미들웨어 함수 참조하기
const {checkParams, checkQueryKey} =require('./middleware.js');

// 라우터 미들웨어 함수샘플3
// index.js 라우터가 실행될때마다 실행되는 미들웨어함수
router.use(function(req,res,next) {
  console.log("index.js 라우터 미들웨어 함수 샘플1:",Date.now());
  next();
});

// 해당 라우터에서 해당 호출 주소 체계와 일치하는 경우 매번 실행됨
// localhost:3000/sample/computer
router.use('/sample/:id',function(req,res,next) {
  console.log("index.js라우터 미들웨어 함수 샘플2 = Request.URL=",req.originalUrl);
  next();
}, function(req,res,next) {
  console.log("indext 라우터 미들웨어 함수3-Request Type:", req.method);
  res.send(req.method);
})


/* 메인페이지 요청과 응답처 리 라우팅 메소드 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 파라메터 id값이 존재하는 체크하는 미들웨어 함수 적용하기
router.get("/test/:id", checkParams, function (req, res) {
  res.render("index", { title: "Express" });
});


// 쿼리스트링 catrgory키값이 존재하는지 체크하는 미들웨어 함수 적용하기
// localhost:3000/product?catrgory=computer&stock=100
router.get("/product", checkQueryKey, function (req, res) {
  res.render("index", { title: "Express" });
});

module.exports = router;
