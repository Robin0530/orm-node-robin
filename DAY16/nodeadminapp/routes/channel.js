const express = require('express');
const router = express.Router();


/* 
채팅방 목록
- http://localhost:3001/channel/list
- get
*/
router.get('/list', async(req, res) => {
    var channels = [
        {
            channelIdx: 1,
            title: "1번 채팅방 입니다.",
            contents: "1번째 채팅방 내용입니다.",
            view_cnt: 100,
            display: "Y",
            ipaddress: "111.111.111.111",
            registDate: Date.now(),
            registMemberId: "robin",
        },
        {
            channelIdx: 2,
            title: "2번째 채팅방 입니다.",
            contents: "2번째 채팅방 내용입니다.",
            view_cnt: 200,
            display: "Y",
            ipaddress: "222.111.111.111",
            registDate: Date.now(),
            registMemberId: "robin",
        },
        {
            channelIdx: 3,
            title: "3번째 채팅방 입니다.",
            contents: "3번째 채팅방 내용입니다.",
            view_cnt: 300,
            display: "Y",
            ipaddress: "123,111,111,111",
            registDate: Date.now(),
            registMemberId: "robin",
        },
    ]  
    res.render('channel/list', {channels, currentUrl:'/channel/list'});
});



router.get('/create', async(req, res) => {
    res.render('channel/create', {currentUrl:'/channel/list'});
});



router.post('/create', async(req, res) => {

    res.redirect('/channel/list');
});



router.get('/modify', async(req, res) => {
    res.render('channel/modify', {currentUrl:'/channel/list'});
});



router.post('/modify', async(req, res) => {

    res.redirect('/channel/list');
});



router.get('/delete', async(req, res) => {

    res.redirect('/channel/list');
});

module.exports = router;
