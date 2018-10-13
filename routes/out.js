//引入所需的模块
const pool =require('../pool.js');
const express=require('express');
//使用express路由
const router =express.Router();
//登出
router.get("/",(req,res)=>{
	req.session.destroy();//销毁session退出登录
	res.send("<script>location.href='login.html'</script>")
})


//导出
module.exports=router;