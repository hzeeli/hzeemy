//引入项目所需的包
const express = require('express');
const user = require('./routes/user.js');
const index = require("./routes/index");
const room = require("./routes/room")
const details=require("./routes/details");
const logout=require("./routes/out");
const search=require("./routes/search");

const bodyParser = require('body-parser');
var session=require("express-session");
var cookieParser=require("cookie-parser");
//1.使用express构建服务器
var app = express();
app.listen(3306,()=>{
    console.log('ok');
});
//2.托管静态资源
app.use(express.static('./static'));


//3.配置body-parser
app.use(bodyParser.urlencoded({
 extended:false
}));
app.use(cookieParser()); 
app.use(session({
    secret:'8452',//加密session
    cookie:{maxAge:60*30*1000},//设置过期时间
    resave:false,//强制保存session
    saveUninitialized:true//强制将未初始化的session储存
}))




//4.使用路由器管理所有用户模块下的路由

//把路由器挂载到/user下 
app.use('/user',user);

app.use('/details',details);
app.use("/index",index);
app.use("/room",room);
app.use("/logout",logout);
app.use("/search",search);