// 사용자 정보처리를 위한 RESTFul 데이터 요청과 응답처리 전용 라우터 파일
var express = require('express');
var router = express.Router();

// 모델영억의 db객체를 참조합니다.
var db = require('../models/index');


/* 
- 회원 로그인 처리 전용 RESTFul API
- http://localhost:3000/api/member/login
*/
router.post('/login', async(req, res, next)=> {

    var apiResult = {
        code: 200,
        data: null,
        result: ""
    };

    try {

        // STEP1: 사용자 로그인정보 추출
        var email = req.body.email;
        var password = req.body.password;

        // STEP2: DB members 테이블에서 동일한 메일주소의 단일사용자 정보를 조회한다.
        // db.Member.findOne(해당 컬럼과 동일한 조건설정) ORM메소드는
        // SELECT * FROM members WHERE email='사용자입력메일주소값'; 으로 SQL구문을 백엔드 환경에서 동적으로 만들어서
        // MySQL 서버로 전달해 실행하고 조회결과물을 반환받는다.
        var member = await db.Member.findOne({where:{email:email}});

        // STEP3: 로그인 처리 로직구현 
        var resultMsg = '';

        if (member == null ){
            resultMsg = '동일한 메일주소가 존재하지 않습니다.';

            apiResult.code = 400;
            apiResult.data = null;
            apiResult.result = resultMsg;

        } else {

            // db에 저장된 조회된 사용자의 암호값과 사용자가 입력한 암호값이 일치하면
            if (member.password == password) {
                resultMsg = '로그인 성공';
                
                apiResult.code = 200;
                apiResult.data = member;
                apiResult.result = resultMsg;

            } else {
                resultMsg = '암호가 일치하지 않습니다.';

                apiResult.code = 400;
                apiResult.data = null;
                apiResult.result = resultMsg;
            }
        }

    }catch (err) {
        // DB를 못찾거나하는 에러 발생시

        resultMsg = '서버에러발생 관리자에게 문의하세요.';

        apiResult.code = 400;
        apiResult.data = null;
        apiResult.result = resultMsg;

    }

    res.json(apiResult);
});

module.exports = router;
