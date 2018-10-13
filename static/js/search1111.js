(async function(){
    var kw=location.search.split("=")[1];
    var res=await $.ajax({
      url:"/search/list",
      type:"get",
      data:`kw=${kw}`,
      dataType:"json"
    });
    //console.log(res);
    var html="";
    var pros=res.msg;
    //console.log(res.msg);
    if(res.msg[0]){
        for(var p of pros){
            var {lname,descr,pic,price,href,sell_count}=p;
            html+=`
            <div class="res-text clear">
                <div class="fl res-img">
                    <a href="${href}">
                        <img src="${pic}">
                    </a>
                </div>
                <div class="fl res-desc">
                    <p>
                        <a href="${href}">
                            <span>${lname}</span>
                        </a>
                        <span>${price}</span>
                        <span>销量：${sell_count}</span>
                        <a href="${href}">查看详情</a>
                    </p>
                    <p>${descr}</p>
                </div>
            </div>
            `
        }     
    }else{
        html=`
        <div class="res-text clear">
            <h1 class="nores">没有找到"${kw}"的相关的商品</h1>
        </div>    
        `    
    }
    $(".main>.container>.res-inner").html(html)    
})()
//分页查看
var pno=location.search.split("pno=")[1];
$(".page_btn>ul").on("click","[data-toggle=item]",function(e){
    e.preventDefault();
    var $item=$(this);
    if(!pno) pno=1;
    //console.log($item.html());
    if($item.html()=="上一页"&&pno>1){
        pno--;
    }else if($item.html()=="下一页"&&pno<3){
        pno++;
    }else if(parseInt($item.html())){
        pno=parseInt($item.html())
    }
    console.log(pno);
    (async function(){
        var kw=location.search.split("=")[1];
        var res=await $.ajax({
          url:"/search/list",
          type:"get",
          data:"kw="+kw+"&pno="+pno,
          dataType:"json"
        });
        var html="";
        var pros=res.msg;
        for(var p of pros){
            var {lname,descr,pic,price,href,sell_count}=p;
            html+=`
            <div class="res-text clear">
                <div class="fl res-img">
                    <a href="${href}">
                        <img src="${pic}">
                    </a>
                </div>
                <div class="fl res-desc">
                    <p>
                        <a href="${href}">
                            <span>${lname}</span>
                        </a>
                        <span>${price}</span>
                        <span>销量：${sell_count}</span>
                        <a href="${href}">查看详情</a>
                    </p>
                    <p>${descr}</p>
                </div>
            </div>
            `
        }
        $(".main>.container>.res-inner").html(html)  
    })()      
})
//按价格
var po=0;
function price_order(){
    po++;
    (async function(){
        var kw=location.search.split("=")[1];
        //console.log("按价格排");
        var res=await $.ajax({
            url:"/search/price",
            type:"get",
            data:"kw="+kw+"&po="+po, 
            dataType:"json"
        })
        //console.log(res);
        var html="";
        var pros=res.msg;
        for(var p of pros){
            var {lname,descr,pic,price,href,sell_count}=p;
            html+=`
            <div class="res-text clear"> 
                <div class="fl res-img">
                    <img src="${pic}">
                </div>
                <div class="fl res-desc">
                    <p>
                        <span>${lname}</span>
                        <span>${price}</span>
                        <span>销量：${sell_count}</span>
                        <a href="${href}">查看详情</a>
                    </p>
                    <p>${descr}</p>
                </div>
            </div>
            `
        } 
        $(".main>.container>.res-inner").html(html)      
    })()
}
//按销量
var co=0;
function count_order(){
    co++;
    (async function(){
        var kw=location.search.split("=")[1];
        var res=await $.ajax({
            url:"/search/count",
            type:"get",
            data:"kw="+kw+"&co="+co, 
            dataType:"json"
        })
        //console.log(res);
        var html="";
        var pros=res.msg;
        for(var p of pros){
            var {lname,descr,pic,price,href,sell_count}=p;
            html+=`
            <div class="res-text clear"> 
                <div class="fl res-img">
                    <img src="${pic}">
                </div>
                <div class="fl res-desc">
                    <p>
                        <span>${lname}</span>
                        <span>${price}</span>
                        <span>销量：${sell_count}</span>
                        <a href="${href}">查看详情</a>
                    </p>
                    <p>${descr}</p>
                </div>
            </div>
            `
        } 
        $(".main>.container>.res-inner").html(html)      
    })()
}