// 사용자 계정 정보 관리 라우팅 기능

var express = require('express');
var router = express.Router();


// 날짜변환
var moment = require('moment');

// MongoDB ODB 모델 참조하기
const Admin = require('../schemas/admin');


router.get('/list', async(req, res, next)=>{
  

  const admins = await Admin.find({});

  res.render('admin/list',{ admins, moment});
});

// 조회버튼
router.post('/list', async(req,res)=> {

  var {admin_name, email, telephone} = req.body;

  var searchOption = {
    admin_name,
    email,
    telephone
  };

  const admins = await Admin.find(searchOption);

  res.render('admin/list', {searchOption, admins, moment })

})


router.get('/create', async(req, res)=>{
  res.render('admin/create')
})


// 관리자 생성
router.post('/create', async(req, res)=>{

  var {dept_name, admin_name, email, telephone, admin_id, admin_password } = req.body;

  var admins = {
    company_code:1,
    dept_name: dept_name,
    admin_name,
    email,
    telephone,
    admin_id,
    admin_password,
    reg_user_id: 1,
    reg_date: Date.now()
  };

  await Admin.create(admins);

  res.redirect('/admin/list')
})


// 삭제
router.get('/delete/:id', async(req, res)=>{

  var adminId = req.params.id;

  await Admin.deleteOne({admin_member_id: adminId});

  res.redirect('/admin/list');
});



// 수정처리
router.get('/modify/:id', async(req, res)=>{
  var admindId = req.params.id;

  var admin = await Admin.findOne({admin_member_id: admindId})

  res.render('admin/modify', {admin})
})

router.post('/modify/:id', async(req, res)=>{
  var adminId = req.params.id;

  var {dept_name, admin_name, email, telephone, admin_id, admin_password } = req.body;

  var admin = {
    company_code:1,
    dept_name: dept_name,
    admin_name,
    email,
    telephone,
    admin_id,
    admin_password,
    reg_user_id: 1,
    reg_date: Date.now()
  };

  await Admin.updateOne({admin_member_id: adminId}, admin)

  res.redirect('/admin/list')
})

module.exports = router;