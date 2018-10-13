const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  	//http://localhost:3000/room/?rid=1
  	var rid=req.query.rid;
  	var obj={roomDesc:{},product:{}};
		(async function(){
			//标题
			var sql="SELECT * FROM room where rid = ?";
			await new Promise(function(open){
				pool.query(sql,[rid],(err,result)=>{
					if(err) console.log(err);
					obj.roomDesc=result;
					open();
				})
			})
			//商品列表
			if(rid!=6){
				var sql = "SELECT * FROM pro_list where family_id = ?"
				await new Promise(function(open){
					pool.query(sql,[rid],(err,result)=>{
						if(err) console.log(err);
						obj.product=result;
						open();
					})
				})
			}else{
				var sql = "SELECT * FROM pro_list"
				await new Promise(function(open){
					pool.query(sql,(err,result)=>{
						if(err) console.log(err);
						obj.product=result;
						open();
					})
				})
			}
			
		res.send(obj);
		})()
	

	  
})

module.exports=router;