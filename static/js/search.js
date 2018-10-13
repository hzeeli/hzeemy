function Getparams() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
    }
    //console.log(theRequest)
    return theRequest;
}
var params={};
params=Getparams();
var kw=params.kw;
var pno=params.pno;
var co=params.co;
var po = params.po;
(async function(){ 
    var res=await $.ajax({
      url:"/search/list",
      type:"get",
      data:"kw="+kw+"&pno="+pno+"&po="+po+"&co="+co,
      dataType:"json"
    });
    //console.log(res);
    var html="";
    var pros=res.product;
    var sumPage=Math.ceil(res.sumPage[0].c/10);
    if(res.product[0]){
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
                        <span>￥ ${price}</span>
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
    $(".main>.container>.res-inner").html(html);
    //生成分页按钮
    var html2=`
    <li><button data-toggle="item">上一页</button></li>
    `;
    for(var i=1;i<=sumPage;i++){
        html2+=`<li><button data-toggle="item">${i}</button></li>
        `
    }
    html2+=`<li><button data-toggle="item">下一页</button></li>`
    $("#page_btn_list").html(html2);
    //绑定按钮事件
    $("#p-order")[0].onclick=function(){
        console.log(11)
        if(po==0||po==2){
            po=1;
        }else if(po==1){
            po=2;
        }
        window.location.href="search.html?kw="+kw+"&pno=1&po="+po+"&co=0";  
    }
    $("#c-order")[0].onclick=function(){
        console.log(11)
        if(co==0||co==2){
            co=1;
        }else if(co==1){
            co=2;
        }
        window.location.href="search.html?kw="+kw+"&pno=1&po=0&co="+co;  
    }
    $(".page_btn>ul").on("click","[data-toggle=item]",function(e){
        e.preventDefault();
        var $item=$(this);
        if($item.html()=="上一页"&&pno>1){
            pno--;
        }else if($item.html()=="下一页"&&pno<3){
            pno++;
        }else if(parseInt($item.html())){
            pno=parseInt($item.html())
        }
        window.location.href="search.html?kw="+kw+"&pno="+pno+"&po="+po+"&co="+co; 
    })
    //分页按钮激活
    var ba=parseInt(pno);
    $("#page_btn_list").children().eq(ba).addClass("bactive")
})()
//查找标题
$("#res-1").html("查找"+kw+"结果");
//
if(po==1){
    $("#p-order").children().toggleClass("fa-minus").toggleClass("fa-chevron-up")
}else if(po==2){
    $("#p-order").children().toggleClass("fa-minus").toggleClass("fa-chevron-down")
}else if(co==1){
    $("#c-order").children().toggleClass("fa-minus").toggleClass("fa-chevron-up")
}else if(co==2){
    $("#c-order").children().toggleClass("fa-minus").toggleClass("fa-chevron-down")
}
//搜索
function search2(){
    var kw= $("#search-text2").val();
    //console.log(kw)
    window.location.href="search.html?kw="+kw+"&pno=1&po=0&co=0"
}
$("#search-text2").bind('keypress',function(e){
    if(e.keyCode == "13"){
        search2();
    }
});
//
