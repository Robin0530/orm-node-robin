// 채팅방 정보 관리 라우팅 기능

// 라우터의 기본주소는
// http://localhost:3000/channel/~

var express = require('express');
var router = express.Router();

const moment = require('moment');

const Channel = require('../schemas/channel');

router.get('/list', async(req, res, next)=>{

  const channel_list = {
    community_id: "",
    categoty_code:"",
    channel_name:"",
    user_limit:"",
    channel_desc:"",
    channel_state:"",
    reg_date:"",
    reg_member_id:""
  }

  const channels = await Channel.find({});
  
  res.render('channel/list.ejs',{channel_list, channels, moment});
});


// 신규 채널 등록
router.get('/create', async(req, res)=>{
  res.render('channel/create.ejs')
})

// 신규 채널 등록
router.post('/create', async(req, res)=>{

  var {categoty_code, channel_name,channel_desc,user_limit,channel_state,reg_member_id } = req.body;

  var channel = {
    community_id:1,
    categoty_code: categoty_code,
    channel_name: channel_name,
    channel_desc: channel_desc,
    channel_state: channel_state,
    reg_date: Date.now(),
    reg_member_id: 1,
    user_limit: user_limit,
  }

  const channels = await Channel.create(channel)

  res.redirect('/channel/list');
})



// 목록페이지 이동처리
router.get('/delete', async(req, res)=>{

  var channelId = req.query.id;

  const result = await Channel.deleteOne({channel_id: channelId})

  res.redirect('/channel/list')
})

router.get('/modify/:id', async(req, res)=>{
  
  var channelId = req.params.id;

  var channels = await Channel.find({channel_id: channelId})

  var channel = null;
  if (channels.length > 0 ){
    channel = channels[0]
  }

  res.render('channel/modify.ejs', {channels, channel})
})

// 목록페이지 이동처리
router.post('/modify/:id', async(req, res)=>{
  var channelId = req.params.id;

  var {categoty_code, channel_name,channel_desc,user_limit,channel_state, reg_member_id } = req.body;

  var channel = {
    community_id:1,
    categoty_code: categoty_code,
    channel_name: channel_name,
    channel_desc: channel_desc,
    channel_state: channel_state,
    reg_date: Date.now(),
    reg_member_id: 1,
    user_limit: user_limit
  }

  const result = await Channel.updateOne({channel_id: channelId}, channel);

  res.redirect('/channel/list')
})


module.exports = router;