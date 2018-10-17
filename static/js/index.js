(async function(){
    var res=await $.ajax({
        url:"/index/",
        type:"get",
        dataType:"json"
    });
    var parent=document.querySelector(
        ".exhibition-shelf>ul"
      );
    var user=res.session;
    console.log(res)
    for(var i=0;i<res.product.length;i++){
        var {pname,price,pic,href}=res.product[i];
        var html=`
        <li class="wow bounceIn animated">
            <div>
                <a href="${href}">
                    <img src='${pic}'>
                </a>
                <div>
                    <p>${pname}</p>
                    <p>${price}</p>
                </div>
            </div>
        </li>
        `;
        parent.innerHTML+=html;
    };

    //轮播图
    var bannerImgs=$("[data-load=bannerImgs]"),
    bannerInds=$("[data-load=bannerInds]"),
    banner=$("#banner"),
    n=0,//当前图片下标
    trans=300,
    interval=3000,
    timer=null,
    LIWIDTH=banner.width();
    $(".banner_ul>li").css("width",LIWIDTH);
    bannerImgs.css("width",LIWIDTH*bannerImgs.children().length);
    bannerInds.children().first().addClass("hover");
    $(window).resize(function (){
        LIWIDTH=banner.width();
        $(".banner_ul>li").css("width",LIWIDTH);
        bannerImgs.css("width",LIWIDTH*bannerImgs.children().length);
    })
    //移动一次的函数
    function moveOnce() {
        n++;
        if(n==bannerImgs.children().length){
            bannerInds.children().eq(0).addClass("hover")
            bannerInds.children().eq(3).removeClass("hover")
            setTimeout(()=>{    
                //快速将最后一张切到第一张；
                bannerImgs.css("transition",'');
                bannerImgs.css("left",0);
                n=0;
                setTimeout(()=>{
                    bannerImgs.css("transition",'all .'+trans/100+'s linear');
                },100)
            },100);
        }else{
            var left=-n*LIWIDTH;
            bannerImgs.css("left",left);
            bannerInds.children().eq(n-1).removeClass("hover")
            bannerInds.children().eq(n).addClass("hover")
        }
    }
    //定时器连续调用
    timer=setInterval(moveOnce,interval);
    //鼠标移入移出事件
    banner.hover(function () {
            clearInterval(timer);
            timer=null;
        },
        function () {
            timer=setInterval(moveOnce,interval);
        }
    )
    //为每个下标绑定单击事件，下标索引i 必须用let 声明，形成闭包
    for(let i=0;i<bannerInds.children().size();i++){
        bannerInds.children().eq(i).click(function () {
            n=i;
            bannerImgs.css("left",-n*LIWIDTH);
            bannerInds.find(".hover").removeClass("hover")
            bannerInds.children().eq(n).addClass("hover")
        })
    }
    //左按钮事件
    $("[data-move=left]").click(function (e) {
        e.preventDefault();
        if(n>0){
            n--;
            bannerImgs.css("left",-n*LIWIDTH);
            bannerInds.children().eq(n).addClass("hover").siblings().removeClass("hover")
        }else{
            //快速将第一张切到最后一张
            bannerImgs.css("transition",'');
            n=bannerImgs.children().length-1;
            bannerImgs.css("left",-n*LIWIDTH);
            bannerInds.children().eq(n).addClass("hover").siblings().removeClass("hover")
            setTimeout(()=>{
                bannerImgs.css("transition",'all .'+trans/100+'s linear');   
            },100)
        }
    })
    //右按钮点击事件
    $("[data-move=right]").click(function (e) {
        e.preventDefault();
        if(n<bannerImgs.children().length-1){
            n++;
            bannerImgs.css("left",-n*LIWIDTH);
            bannerInds.children().eq(n).addClass("hover").siblings().removeClass("hover")
        }else{
            bannerInds.children().first().addClass("hover").siblings().removeClass("hover");
            bannerImgs.css("transition",'');
            n=0;
            bannerImgs.css("left",0);
            setTimeout(()=>{
                bannerImgs.css("transition",'all .'+trans/100+'s linear');
            },100)
        }
    })
})()
