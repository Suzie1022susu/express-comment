var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = './public/images/';

router.get('/images', function(req, res, next){
    if(!req.cookies.username) {
        return res.send({
          status: 2,
          info: '请先登录！'
        });
    }

    var obj = {
        username: req.cookies.username,
        // content: req.param('content')
      };
      console.log("aa");

      fs.readFile(path + "pro.png", 'utf8', function(err, data){
        if(err){
          res.end(404);
        }
        res.send({
              status:1,
              info:data

        })    
      });

    
})