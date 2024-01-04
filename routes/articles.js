// 라우터 기본 주소
// http://localhost:3001/articles
var express = require('express');
var router = express.Router();

var Article = require('../schemas/article.js');
var moment = require('moment');

var searchOption = {
    board_type_code:0, 
    title:"",
    is_display_code:9
};

router.get('/list', async(req, res)=>{
    searchOption = {
        board_type_code:0, 
        title:"",
        is_display_code:9
    };
    try {
        var articles = await Article.find({});
        res.render('articles/list',{articles, searchOption, moment});
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.post('/list', async(req, res)=>{
    const { board_type_code, title, is_display_code } = req.body;
    let whereClause = {};
    if (board_type_code !== '0') {whereClause.board_type_code = board_type_code;}
    // 대소문자 구분 없이 검색하기 위해 정규식 사용
    if (title !== '') {whereClause.title = {$regex: title, $options: 'i'};}
    if (is_display_code !== '9') {whereClause.is_display_code = is_display_code;}
    try {
        var articles = await Article.find(whereClause);
        searchOption = { board_type_code, title, is_display_code }; 
        res.render('articles/list',{articles, searchOption, moment});
    } catch (err) {
        console.error("Error reading the file:", err);
        res.status(500).send("Error reading the user data.");
    }
});

router.get('/create',async(req,res)=>{
    res.render('articles/create');
});

router.post('/create',async(req,res)=>{
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var view_count = 0;
    var ip_address = '123.123.111.1';
    var is_display_code = req.body.is_display_code;
    var reg_date = Date.now();
    var reg_member_id = 1;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count,
        ip_address,
        is_display_code,
        reg_date,
        reg_member_id
    }

    await Article.create(article);

    res.redirect("/articles/list");
});

router.get('/modify/:aid',async(req,res)=>{
    var article_id = req.params.aid;
    try{
        var article = await Article.findOne({article_id});
        res.render('articles/modify', {article});
    } catch (err) {
        console.error("Error updating the file:", err);
        res.status(500).send("Error updating the user data.");
    }
});

router.post('/modify/:aid',async(req,res)=>{
    var article_id = req.params.aid;
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var view_count = 0;
    var ip_address = '123.123.111.1';
    var is_display_code = req.body.is_display_code;
    var edit_date = Date.now();
    var edit_member_id = 1;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count,
        ip_address,
        is_display_code,
        edit_date,
        edit_member_id
    }
    try {
        await Article.updateOne({article_id}, article)
        res.redirect("/articles/list");

    } catch (err) {
        console.error("Error updating the file:", err);
        res.status(500).send("Error updating the user data.");
    }
});

router.get('/delete/:aid',async(req, res)=>{
    var article_id = req.params.aid;
    try {
        await Article.deleteOne({article_id});
        res.redirect("/articles/list");
    } catch (err) {
        console.error("Error deleting the file:", err);
        res.status(500).send("Error deleting the user data.");
    }
});

module.exports = router;