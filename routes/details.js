const express=require("express");
const router=express.Router();
const pool=require("../pool");

//details/
router.get("/",(req,res)=>{
    var lid=req.query.lid;
    if(req.query.cm_num){
        var cm_num = req.query.cm_num;
    }else{
        var cm_num=1;
    }
    var $offset=parseInt((cm_num-1)*5);
    var obj={product:{},comments:[],pics:[],c_sumNum:[]};
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
        var sql = `SELECT id,ctime,content,user_name FROM pro_comment WHERE lid = ? ORDER BY id DESC LIMIT ?,10`
        await new Promise(function(open){
            pool.query(sql,[lid,$offset],(err,result)=>{
                if(err) console.log(err);
                obj.comments=result;
                open();
            })    
        })
        //评论总条数
        var sql = `SELECT COUNT(id) AS c FROM pro_comment WHERE lid = ? `
        await new Promise(function(open){
            pool.query(sql,[lid],(err,result)=>{
                if(err) console.log(err);
                obj.c_sumNum=result;
                open();
            })    
        })
        res.send(obj);
    })();    
})
//添加评论
router.get("/add",(req,res)=>{
    var $lid=req.query.lid;
    var $user=req.query.user;
    var $cm_value=req.query.cm_value;
    console.log($lid,$cm_value,$user)
    var sql=` INSERT INTO pro_comment VALUES(NULL,?,?,now(),?)`
    pool.query(sql,[$lid,$user,$cm_value],(err,result)=>{
        if(err) console.log(err);
        res.send({code:1,msg:"添加成功"});
    })    
})

module.exports=router;