function login(){
    var xhr =createXhr();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var res = xhr.responseText;
                if(res=="1"){
                    alert("登陆成功")
                    window.location.href="index.html"
                }else{
                    alert("邮箱或密码错误");
                }
        }
    }
    xhr.open("post","/user/login",true)
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var email=$("#email").val();
    var upwd=$("#upwd").val();
    var formdata="email="+email+"&upwd="+upwd;
    xhr.send(formdata);
}