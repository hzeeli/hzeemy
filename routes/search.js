//加载模块
const express=require("express");
const pool=require("../pool");
//创建路由对象
const router = express.Router();

//1.发送搜索结果商品列表给前端
router.get("/list",(req,res)=>{
    //console.log(req.query)
    var obj={sumPage:0,product:{}};
    var pno = req.query.pno;
    var po=req.query.po;
    var co=req.query.co;
    var $offset=parseInt((pno-1)*10);
    var $kw ='%'+ req.query.kw+'%';
    (async function(){
        if(po==0&&co==0){
            var sql = "SELECT lname,descr,pic,price,href,sell_count FROM pro_list WHERE lname LIKE ? LIMIT ?,10";
        }else if(po==1&&co==0){
            var sql = "SELECT lname,descr,pic,price,href,sell_count FROM pro_list WHERE lname LIKE ? ORDER BY `pro_list`.`price` ASC LIMIT ?,10";
        }else if(po==2&&co==0){
            var sql = "SELECT lname,descr,pic,price,href,sell_count FROM pro_list WHERE lname LIKE ? ORDER BY pro_list.price DESC LIMIT ?,10";
        }else if(co==1&&po==0){
            var sql = "SELECT lname,descr,pic,price,href,sell_count FROM pro_list WHERE lname LIKE ? ORDER BY pro_list.sell_count ASC LIMIT ?,10";
        }else if(co==2&&po==0){
            var sql = "SELECT lname,descr,pic,price,href,sell_count FROM pro_list WHERE lname LIKE ? ORDER BY pro_list.sell_count DESC LIMIT ?,10";
        }
        await new Promise(function(open){
            pool.query(sql,[$kw,$offset],(err,result)=>{
                if(err) throw err;
                //console.log(result)
                obj.product=result;
                open();
            })
        })
        var sql= "SELECT COUNT(lid) AS c FROM pro_list WHERE lname LIKE ?"
        await new Promise(function(open){
            pool.query(sql,[$kw],(err,result)=>{
                if(err) throw err;
                //console.log(result)
                obj.sumPage=result;
                open();
            })
        })
        res.send(obj)
    })()        
})
//导出对象
module.exports=router;