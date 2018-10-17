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
var lid = params.lid;
if(params.cm_num){
    var cm_num=params.cm_num;
}else{
    var cm_num=1;
}
(async function(){
    if(lid){
        var res=await $.ajax({
        url:"/details/",
        type:"get",
        data:"lid="+lid+"&cm_num="+cm_num,
        dataType:"json"
        });
        var {product,comments,pics,c_sumNum}=res;
        var sumPage=Math.ceil(res.c_sumNum[0].c/5);
        //图片
        var html="";
        for(var p of pics){
            var {sm,md,lg}=p;
            html+=`<li><img src="${sm}" data-md="${md}" data-lg="${lg}"></li>`;
        }
        var ul=document.querySelector("#thumbs>div>ul");
        ul.innerHTML=html;
        ul.style.width=`${62*(pics.length+1)}px`;
        var mdImg=document.querySelector("#mdImg");
        mdImg.src=pics[0].md;
        var lgDiv=document.getElementById("lgDiv");
        lgDiv.style.backgroundImage=`url(${pics[0].lg})`;

        //规格
        var html="";
        var {family_id,price,color,lname,descr,detail,sell_count}=product[0];
        switch(family_id){
            case 1:
            family_id="客厅";break;
            case 2:
            family_id="卧室";break;
            case 3:
            family_id="厨房";break;
            case 4:
            family_id="浴室";break;
            default:
            family_id="餐厅";
        }
        html=`
            <p>${lname}</p>
            <p class="fg-div"></p>
            <p>￥ ${price}</p>
            <p>${descr}</p>
            <!--颜色分类-->
            <div class="tabs">
                <p>颜色</p>
                <div>
                    <div class="active">
                        <img src="${sm}">
                        <span>${color}</span>
                    </div>
                </div>
            </div>
            <!--加入购物车-->
            <div class="shop-car clear">
                <a href="">加入购物车</a>
                <div class="fl buttons">
                    <input type="button" value="-" class="reduce">
                    <input type="text" placeholder="1">
                    <input type="button" value="+" class="add">
                </div>
            </div>
            <div class="pro_meta">
                <span>商品编号：</span>
                <span class="cred">000${lid}</span>
                <span>销量：</span>
                <span class="cred">${sell_count}</span>
            </div>
            <div>
                <span>分类：</span>
                <span class="cred">${family_id}</span>
            </div>
        `
        $("#spec").html(html);
        console.log($("#spec"));
        //详情
        $("#content1").html(detail);
        //导航分类
        var html=`
            <span><a href="index.html">首页</a></span>
            <span>/</span>
            <span>${family_id}</span>
            <span>/</span>
            <span>${lname}</span>
        `
        $(".bread-nav").html(html);
        //加载评论
        var html="";
        for(var c of comments){
            var {user_name,ctime,content}=c;
            ctime=new Date(ctime).toLocaleString();
            html+=`
            <div class="content-inner">
            <div class="content-title">
                <span>${user_name}</span>
                <span>${ctime}</span>
            </div>
            <div class="content-text">
                ${content}
            </div>
        </div>
            `;
        }
        $("#commentList").html(html)
        
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
        $("#page_btn_list").on("click","[data-toggle=item]",function(e){
            e.preventDefault();
            var $item=$(this);
            if($item.html()=="上一页"&&cm_num>1){
                cm_num--;
            }else if($item.html()=="下一页"&&cm_num<3){
                cm_num++;
            }else if(parseInt($item.html())){
                cm_num=parseInt($item.html())
            }
            window.location.href="details.html?lid="+lid+"&cm_num="+cm_num; 
        })
        if(cm_num!==1){
            $("#content3").addClass("active").siblings().removeClass("active");
            $(".desc .tabs").children().eq(2).addClass("active").children().addClass("active").parent().siblings().removeClass("active").children().removeClass("active");
            $(".slide-box").css("left",115*2);
        }
        //分页按钮激活
        var ba=parseInt(cm_num);
        $("#page_btn_list").children().eq(ba).addClass("bactive");
        

        //添加评论
        $.ajax({
            url:"/index/header",
            type:"get",
            dataType:"json",
            success:function(res){
                var user=res.user;
                $("#cm_btn").click(function(){
                    var cm_value=$("#cm_text").val();
                    if(cm_value.length>5&&user){
                        var res = $.ajax({
                            url:"/details/add",
                            type:"get",
                            dataType:"json",
                            data:"cm_value="+cm_value+"&user="+user+"&lid="+lid
                        })
                        window.location.reload();  
                    }else if(cm_value<5){
                        $.alertable.alert("评论内容太少了亲");
                    }else if(!user){
                        var isGoLogin=confirm("请您先登录再发表评论");
                        if(isGoLogin){
                            window.location.href="login.html"
                        }
                    }                    
                })
            }
        })        
        /*标签切换*/
        $(".tabs").click(function(e){
            e.preventDefault();
            var $tar=$(e.target);
            $tar.addClass("active");
            $tar.parent().siblings().children().removeClass("active");
            if($tar.is("[data-toggle=tab]")){
                var n =$tar.parent().index();
                $(".slide-box").css("left",115*n);
            }
            var id=$tar.attr("href");
            $(id).addClass("active").siblings().removeClass("active");
        })
        /*放大镜*/
        
        var $prev=$("#thumbs>img:first-child");
        var $next=$("#thumbs>img:last-child");
        var $ul=$prev.next().children();
        $lis=$prev.next().children().children();
        var moved=0;
        var liwidth=62;
        $prev.addClass("disabled");  
        if($ul.children().length<3||$ul.children().length==3){
            $next.addClass("disabled");     
        } 
        $prev.click(function(){
        var $prev=$(this);
            if(!$prev.is(".disabled")){
                moved--;
                $ul.css("marginLeft",-moved*liwidth);
                $next.removeClass("disabled");
            }
            if(moved==0){
                $prev.addClass("disabled");
            }   
        })
        $next.click(function(){
            var $next=$(this);
            if(!$next.is(".disabled")){
                moved++;
                $ul.css("marginLeft",-moved*liwidth);
                $prev.removeClass("disabled")
                if($ul.children().length-3==moved){
                $next.addClass("disabled");
                }
            }
        })
        
        //hover小图播大图
        var $mImg =$("#mdImg");  //中图元素
        var $lgDiv=$("#lgDiv");    //大Div元素
        $ul.on("mouseover","img",function(){
            var $img=$(this);
            var md=$img.attr("data-md");//中图片路径
            var lg=$img.attr("data-lg");//大div背景图路径
            $mImg.attr("src",md)
            $lgDiv.css("backgroundImage",`url(${lg})`)
        })
        //镜片
        var $mask=$("#mask")
        var $smask=$("#superMask");
        //msize镜片高宽  smsize中图高宽  max允许top/left的范围
        var msize=125,smsize=250,MAX=smsize-msize;
        $smask
        .hover( //中图鼠标进入，
        function(){
            $mask.toggleClass("d-none");  //镜片显示
            $lgDiv.toggleClass("d-none"); //大图显示
        }
        )
        .mousemove(
        function(e){//鼠标在中图中移动
            var top=e.offsetY-msize/2;
            var left=e.offsetX-msize/2;
            if(top<0) top=0; else if(top>MAX) top=MAX;
            if(left<0) left=0; else if(left>MAX) left=MAX;
            //镜片定位
            $mask.css({
            top,
            left
            })
            //大图背景图定位
            $lgDiv.css("backgroundPosition",`${-12/5*left}px ${-12/5*top}px`);
        }
        )   
    }
})()
