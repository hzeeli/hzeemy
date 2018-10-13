//引入所需的模块
const pool =require('../pool.js');
const express=require('express');
//使用express路由
const router =express.Router();
//往router中添加路由
//checkEmail(验证登录邮箱)
router.post("/checkEmail",(req,res)=>{
    var $email=req.body.email;
    if(!$email){
        res.send("2")//邮箱为空
        return;
	}
	var reg=/^[^.@]+@[^.@]+\.(com|cn|net)(\.cn)?$/;
	if(reg.test($email)){
		var sql='select uid from my_user where email =?';
		pool.query(sql,[$email],(err,result)=>{
			if(result.length>0){
				res.send("1");//邮箱已被注册
			}else{
				res.send("0");
			}
		})
	}else{
		res.send("3")//邮箱格式不对
	}
    
})
//checkUname
router.post("/checkUname",(req,res)=>{
	var $uname=req.body.uname;
	if(!$uname){
		res.send("2");//用户名为空
		return;
	}
	var reg=/^\w{3,12}$/;
	if(reg.test($uname)){
		var sql = 'select uid from my_user where uname=?'
		pool.query(sql,[$uname],(err,result)=>{
			if(result.length>0){
				res.send("1");//用户名已被占用
			}else{
				res.send("0");//用户名可用
				}
		})
	}else{
		res.send("3");//用户名格式不对
	}
	
})

//注册
router.post("/register",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var sql='insert into my_user values(null,?,?,?,?,null,null,null)';
	pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
		if (err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}
	})
})

//登录
router.post("/login",(req,res)=>{
	var {email,upwd}=req.body;
	if(req.body.email.indexOf("@")!==-1){	
		var sql='select uname from my_user where email=? and upwd=?';
		pool.query(sql,[email,upwd],(err,result)=>{
			if(err) console.log(err);
			if(result.length>0){
				req.session.user=result[0].uname;
				res.send("1")
			}else{
				res.send("0") 
			}					
		})
	}else{
		var sql='select uid from my_user where uname=? and upwd=?';
		pool.query(sql,[email,upwd],(err,result)=>{
			if(err) console.log(err);
			if(result.length>0){
				req.session.user=email//email=>uname(实为)
				res.send("1")
			}else{
				res.send("0") 
			}				
		})
	}
	
});



//导出
module.exports=router;