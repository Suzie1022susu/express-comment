var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = './public/data/';

/* 发布评论 */
router.post('/write', function(req, res, next) {
    if(!req.cookies.username) {
        return res.send({
          status: 2,
          info: '请先登录！'
        });
    }

  // var obj = {
  //   username: req.cookies.username,
  //   // content: req.param('content')
  //   content: req.body.content
  // };
  var name = req.cookies.username;
  console.log(name);
  fs.readFile(path+'data.json', (err, data) => { // 读取文件，并执行回调函数
    if (err) {
      return res.send({
        status:0,
        info: '读取评论数据失败'
      });
    }

    var arr = JSON.parse(data.toString());  // 返回数据
    var arr1 = [];
    var j = 0;
    for(var i in arr){
      
       if(arr[i].username === name ){
        arr1[j] = arr[i];
        j++;
        }

    }
    console.log(arr1);
    
    return res.send({
          status:1,
          info:arr1
    })
    
  });
});

router.post('/write_2', function(req, res, next) {
  if(!req.cookies.username) {
      return res.send({
        status: 2,
        info: '请先登录！'
      });
  }

// var obj = {
//   username: req.cookies.username,
//   // content: req.param('content')
//   content: req.body.content
// };
var name = req.cookies.username;
console.log(name);
fs.readFile(path+'data_1.json', (err, data) => { // 读取文件，并执行回调函数
  if (err) {
    return res.send({
      status:0,
      info: '读取评论数据失败'
    });
  }

  var arr = JSON.parse(data.toString());  // 返回数据
  var arr1 = [];
  var j = 0;
  for(var i in arr){
    
     if(arr[i].username === name ){
      arr1[j] = arr[i];
      j++;
      }

  }
  
  return res.send({
        status:1,
        info:arr1
  })
  
});
});

router.get('/login', function(req, res, next) {
  var name = req.param('name');
  var psw = req.param('psw');

  fs.readFile(path+'user.json', (err, data) => { // 读取文件，并执行回调函数
    if (err) {
      return res.send({
        status:0,
        info: '读取用户数据失败'
      });
    }
    var arr = JSON.parse(data.toString());  // 返回数据
    for(var i in arr) {
      if(arr[i].username == name) {
        if(arr[i].psw == psw) {
          res.cookie('username', name);
          console.log(arr);
          return res.send({
            status: 11,
            info:arr

          });
        } else {
          return res.send({
            status: 0,
            info: '密码错误haha，请重试！'
          });
        } 
      }
    }
    return res.send({
      status: 0,
      info: '没有该用户！'
    });
  }); 
}); 

router.post('/register', function(req, res, next) {
  var obj = {
    username: req.body.name,
    psw: req.body.psw
  };

  fs.readFile(path+'user.json', (err, data) => { // 读取文件，并执行回调函数
    if (err) {
      return res.send({
        status:0,
        info: '读取用户数据失败'
      });
    }

    var arr = JSON.parse(data.toString());  // 返回数据
    arr.splice(0, 0, obj); // 插入文件
    var newData = JSON.stringify(arr);

    fs.writeFile(path+'user.json', newData, function(err){
        if(err){
            return res.send({
                status:0,
                info: '添加用户数据失败'
            });
        }
        return res.send({
            status:1 
        });
    }); 
  });
}); 

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

    fs.readFile("./public/images/pro.png", 'utf8', function(err, data){
      if(err){
        res.end(404);
      }
      res.send({
            status:1,
            info:data

      })    
    });

  
})

module.exports = router;
