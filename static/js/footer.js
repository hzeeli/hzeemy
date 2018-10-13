$(function(){
    $(`<link rel="stylesheet" href="css/footer.css">`).appendTo("head");
    $.ajax({
        url:"footer.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("footer")
        }
    })
});
$(window).scroll(function(){
    if($(window).scrollTop()<=100){
        $("#go-top").fadeOut(500);
    }else{
        $("#go-top").fadeIn(500);
    }
});  
function goTop(){
    $("body,html").animate({scrollTop:0},700);
}