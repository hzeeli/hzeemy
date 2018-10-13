$(function(){
    //引入头部文件
    $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("header");
            //console.log(res)
            $("#search-text").bind('keypress',function(e){
                if(e.keyCode == "13"){
                    search();
                }
            });
        }
    })
    //登录信息
    $.ajax({
        url:"/index/header",
        type:"get",
        dataType:"json",
        success:function(res){
            var user=res.user;
            window.onload=function(){
                var parent=document.getElementsByClassName("top-bar-right")[0];
                if(user!=undefined){    
                    parent.innerHTML=`
                        <span><a href="#" class="pr"> <span class="icon-user"></span>欢迎${user}</a></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="pr" id="user-out" onclick="user_out()"><span class="icon-signin"></span>登出</span>
                    `
                }else{
                    parent.innerHTML=`
                        <span><a href="login.html" class="pr"> <span class="icon-user"></span> 登录</a></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><a href="register.html" class="pr"> <span class="icon-signin"></span> 注册</a></span>
                    `
                }                              
            }  
        }
    })
    
});
//登出
function user_out(){
    if(confirm("确认注销？"))
        window.location.href="/logout"
}
function width_open(){
    $(".nav-bar>.search>input").css("width",300);
};
function width_close(){
    $(".nav-bar>.search>input").css("width",160);
};
//搜索按钮
function search(){
    var kw= $("#search-text").val();
    //console.log(kw)
    window.location.href="search.html?kw="+kw+"&pno=1&po=0&co=0"
}
//滚动显示头部导航
$(window).scroll(function(){
    if($(window).scrollTop()<=100){
        $("header>.nav-bar").removeClass("show-nav");
    }else{
        $("header>.nav-bar").addClass("show-nav")
    }
});