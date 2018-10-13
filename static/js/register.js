var isRegister=false;
function email_blur(){
    var xhr=createXhr();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var res = xhr.responseText;
            if(res=="1"){
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱已被注册');
                isRegister=false;
            }else if(res=="0"){
                $("#email-msg").html('<span class="fa-check-circle"></span>');
                isRegister=true;
            }else if(res==2){
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱未填写');
                isRegister=false;
            }else{
                $("#email-msg").html('<span class="fa-exclamation-triangle"></span>邮箱格式不正确');
                isRegister=false;
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
						$("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名已被占用");	isRegister=false;				
					}else if(res=="0"){
						$("#uname-msg").html("√");
						isRegister=true;
					}else if(res=="2"){
						$("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名不能为空");
						isRegister=false;
					}else{
                        $("#uname-msg").html("<span class='fa-exclamation-triangle'></span>用户名格式不正确");
						isRegister=false;
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
        isRegister=false;
    }else if(upwd.length>=6){
        $("#upwd-msg").html("√");
        isRegister=true;
    }
}
//cpwd失焦
function cpwd_blur(){
    var cpwd=$("#cpwd").val();
    var upwd= $("#upwd").val();
    if(cpwd==""){
        $("#cpwd-msg").html("<span class='fa-exclamation-triangle'></span>不能为空");
        isRegister=false;
    }else if(cpwd==upwd){
        $("#cpwd-msg").html('√');
        isRegister=true;
    }else{
        $("#cpwd-msg").innerHTML="<span class='fa-exclamation-triangle'></span>密码不正确";
        isRegister=false;	
    }
}
//phone失焦
function phone_blur(){
    var phone=$("#phone").val();
    var reg=/^\d{11}$/;
    if(!reg.test(phone)){
        $("#phone-msg").html("<span class='fa-exclamation-triangle'></span>请填写正确的手机号");
        isRegister=false;	
    }else{
        $("#phone-msg").html('√');
        isRegister=true;
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
    if(isRegister==true){
        //创建异步对象
        var xhr=createXhr();
        //绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result=xhr.responseText;
                if(result=="1"){
                alert("注册成功")
                window.location.href="http://localhost:3000/Login.html"
                }else{
                    alert(result);
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
        alert("请检查注册信息");
    }		
}		