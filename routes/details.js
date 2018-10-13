const express=require("express");
const router=express.Router();
const pool=require("../pool");

//details/
router.get("/",(req,res)=>{
    var lid=req.query.lid;
    var obj={product:{},comments:[],pics:[]};
    (async function(){
        //图片
        var sql=`SELECT * FROM pro_pic WHERE lid=?`;
        await new Promise(function(open){
            pool.query(sql,[lid],(err,result)=>{
                if(err) console.log(err);
                obj.pics=result;
                open();
            })    
        })
        //规格
        var sql=`SELECT family_id,price,color,lname,descr,detail,sell_count FROM pro_list WHERE lid = ?`;
        await new Promise(function(open){
            pool.query(sql,[lid],(err,result)=>{
                if(err) console.log(err);
                obj.product=result;
                open();
            })    
        })
        //评论
        var sql = `SELECT id,ctime,content,user_name FROM pro_comment WHERE lid = ? ORDER BY id DESC`
        await new Promise(function(open){
            pool.query(sql,[lid],(err,result)=>{
                if(err) console.log(err);
                obj.comments=result;
                open();
            })    
        })
        res.send(obj);
    })();    
})

module.exports=router;