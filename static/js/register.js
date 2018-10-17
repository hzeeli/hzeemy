
var ck_email=false;
var ck_uname=false;
var ck_upwd=false;
var ck_cpwd=false;
var ck_phone=false;
function email_blur(){
    var xhr=createXhr();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var res = xhr.responseText;
            if(res=="1"){
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱已被注册');
                ck_email=false;
            }else if(res=="0"){
                $("#email-msg").html('<span class="fa-check-circle"></span>');
                ck_email=true;
            }else if(res==2){
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱未填写');
                ck_email=false;
            }else{
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱格式不正确');
                ck_email=false;
            }
        }
    }
    xhr.open("post","/user/checkEmail",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var email=$("#email").val();
    xhr.send("email="+email);
}
//uname失焦
function uname_blur(){
    var xhr =createXhr();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					var res = xhr.responseText;
					if(res=="1"){
                        $("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名已被占用");	
                        ck_uname=false;				
					}else if(res=="0"){
						$("#uname-msg").html('<span class="fa-check-circle"></span>');
						ck_uname=true;
					}else if(res=="2"){
						$("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名不能为空");
						ck_uname=false;
					}else{
                        $("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名格式不正确");
						ck_uname=false;
                    }
				}
			}
			//打开链接
			xhr.open("post","/user/checkUname",true);
			//设置消息头
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//发送请求
			var uname=$("#uname").val();
			xhr.send("uname="+uname);
}
//upwd失焦
function upwd_blur(){
    var upwd= $("#upwd").val();
    if(upwd==""){
        $("#upwd-msg").html("<span class='fa-exclamation-triangle'></span>请输入密码");
        ck_upwd=false;
    }else if(upwd.length>=6){
        $("#upwd-msg").html('<span class="fa-check-circle"></span>');
        ck_upwd=true;
    }
}
//cpwd失焦
function cpwd_blur(){
    var cpwd=$("#cpwd").val();
    var upwd= $("#upwd").val();
    if(cpwd==""){
        $("#cpwd-msg").html("<span class='fa-exclamation-triangle'></span>不能为空");
        ck_cpwd=false;
    }else if(cpwd==upwd){
        $("#cpwd-msg").html('<span class="fa-check-circle"></span>');
        ck_cpwd=true;
    }else{
        $("#cpwd-msg").innerHTML="<span class='fa-exclamation-triangle'></span>密码不正确";
        ck_cpwd=false;	
    }
}
//phone失焦
function phone_blur(){
    var phone=$("#phone").val();
    var reg=/^\d{11}$/;
    if(!reg.test(phone)){
        $("#phone-msg").html("<span class='fa-exclamation-triangle'></span>请填写正确的手机号");
        ck_phone=false;	
    }else{
        $("#phone-msg").html('<span class="fa-check-circle"></span>');
        ck_phone=true;
    }
}
//同意协议
function check(){
    if($("#checkbox").is(":checked")){//按钮已选中
        $("#form-button").attr("disabled",false);
    }else{
        $("#form-button").attr("disabled",true);
    }
}
//注册按钮
function register(){
    if(ck_cpwd&&ck_email&&ck_phone&&ck_uname&&ck_upwd){
        //创建异步对象
        var xhr=createXhr();
        //绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result=xhr.responseText;
                if(result=="1"){
                    //alert("注册成功")
                    $.alertable.alert('注册成功!正在前往登录页面……');
                    setTimeout(function(){  
                        window.location.href="login.html"
                    },2000)     
                }else{
                    //alert(result);
                    $.alertable.alert(result);
                }
            }
        }
        //打开链接
        xhr.open("post","/user/register",true);
        //设置消息头
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //发送请求
        var uname=$("#uname").val();
        var upwd= $("#upwd").val();
        var email=$("#email").val();
        var phone=$("#phone").val();
        var cpwd=$("#cpwd").val();
        xhr.send("uname="+uname+"&upwd="+upwd+"&cpwd="+cpwd+"&email="+email+"&phone="+phone);
    }else{
        $.alertable.alert("请检查注册信息");
    }		
}		