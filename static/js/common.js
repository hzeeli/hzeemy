//声明函数$
//function $(id){
//   return document.getElementById(id);
//};
//创建xhr异步对象
function createXhr(){
    var xhr=null;
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}