
(async function(){
    if(location.search.indexOf("lid=")!=-1){
        var lid=location.search.split("=")[1];
        var res=await $.ajax({
        url:"/details/",
        type:"get",
        data:`lid=${lid}`,
        dataType:"json"
        });
        
        var {product,comments,pics}=res;
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
        //评论
        //console.log(comments)
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
