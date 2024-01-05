var express = require('express');
var router = express.Router();


/* 
암호 찾기 웹페이지 요청 및 응답 
- http://localhost:3000/chat
- get
*/
router.get('/chat', async(req, res, next)=> {

    var channel = [
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
    res.render('chat/index', { channel: channel });
});

module.exports = router;
