$(".qa-list").on("click",".qa-title",e=>{
    $(e.target).toggleClass("title-active")
    .children().toggleClass("icon-plus").toggleClass("icon-minus")
    .parent().next(".qa-content").toggleClass("in")
    .parent().siblings().children(".qa-title").removeClass("title-active").children(".icon-minus").toggleClass("icon-minus").toggleClass("icon-plus")
    .parent().next().removeClass("in")
})
