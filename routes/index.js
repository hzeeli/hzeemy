const express=require("express");
const router=express.Router();
const pool=require("../pool");

//index/
router.get("/",(req,res)=>{
  var obj={};
  var sql=`SELECT * FROM index_product ORDER BY index_product.pid ASC`;
  pool.query(sql,[],(err,result)=>{
    if(err)
      console.log(err);
    obj.product=result;
    obj.session=req.session.user;
    res.send(obj);
  })
})
//header
router.get("/header",(req,res)=>{
  var obj={};
  obj.user=req.session.user;
  res.send(obj);
})
module.exports=router;