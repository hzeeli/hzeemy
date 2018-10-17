(async function(){
    if(location.search.indexOf("rid=")!=-1){
		var rid=location.search.split("=")[1];
		var res=await $.ajax({
			url:"/room/",
			type:"get",
			data:`rid=${rid}`,
			dataType:"json"
		});
		var {rname,ername,bg,title}=res.roomDesc[0];
		var descs=res.product
		//console.log(res)
		var html="";
		for(var desc of descs){
			var {price,lname,pic,href} = desc;
			html+=`
			<li>
				<div>
					<a href="${href}">
						<img src="${pic}">
					</a>
					<div>
						<p>${lname}</p>
						<p>￥ ${price}</p>
					</div>
				</div>
			</li>
			`
		}
		$(".exhibition-shelf>ul").html(html);
		//导航背景
		var html=`
			<!--导航-->
			<div class="bread-nav">
				<span><a href="index.html">首页</a></span>
				<span>/</span>
				<span>${rname}</span>
			</div>
			<!--背景图-->
			<div class="bg">
				<div class="bg-img ${bg}"></div>
				<div class="bg-detail">
					<p>${title}</p>
					<p>LIET OF GOODS</p>
				</div>
			</div>
		`
		var parent=$("#top_room");
		parent.html(html);
		//展示架标题
		var html=`
			<span>${rname}家具</span>
			<span>/</span>
			<span>${ername} furniture</span>
		`
		var parent=$("#roomname");
		parent.html(html);
		//标签活动状态
		rid==1?$(`#1`).addClass("active"):rid==2?$(`#2`).addClass("active"):rid==3?$(`#3`).addClass("active"):rid==4?$(`#4`).addClass("active"):rid==5?$(`#5`).addClass("active"):$(`#6`).addClass("active")
	}   
	  


})()    