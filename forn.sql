

/**商品分类**/
CREATE TABLE pro_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);

/**商品列表**/
CREATE TABLE pro_list(
  lid INT PRIMARY KEY AUTO_INCREMENT,   #商品编号
  family_id INT,              #所属家族编号
  price DECIMAL(6,2),        #价格
  color VARCHAR(64),           #颜色
  lname VARCHAR(32),          #商品名称
  pic VARCHAR(128),            #中图片路径
  href VARCHAR(128),         #商品链接
  descr VARCHAR(128),          #简介
  detail VARCHAR(124000),      #详情
  sell_count  INT             #售卖数量
);

/**图片列表**/
CREATE TABLE pro_pic(
	tid INT PRIMARY KEY AUTO_INCREMENT, 
	lid INT,
	sm VARCHAR(64),
	md VARCHAR(64),
	lg VARCHAR(64)
);


/**用户信息**/
CREATE TABLE my_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**购物车条目**/
CREATE TABLE shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);


/****首页轮播广告商品****/
CREATE TABLE index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64)
);

/****首页商品****/
CREATE TABLE index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,  #
  pname VARCHAR(64),						#商品名称
  price VARCHAR(12),					#商品价格
  pic VARCHAR(128),						#商品图片路径
  href VARCHAR(128)						#商品链接
);

/******家具类别页面元素******/
CREATE TABLE room(
  rid INT PRIMARY KEY AUTO_INCREMENT,  #
  rname VARCHAR(64),						#类别名称
  ername VARCHAR(64),       #英文名
  bg VARCHAR(64),						#背景图片路径
  title VARCHAR(128)						#标题
);

/*商品大图详情介绍内容*/
CREATE TABLE pro_details(
  did INT PRIMARY KEY AUTO_INCREMENT,  #
  lid INT,
  d1 VARCHAR(128),						
  d2 VARCHAR(128),						
  d3 VARCHAR(128),					
  d4 VARCHAR(128),
  t1  VARCHAR(128),
  t2  VARCHAR(128),
  t3  VARCHAR(128),
  t4	VARCHAR(128)					
);

/*商品评论*/
CREATE TABLE pro_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,  
  lid INT,
  user_name VARCHAR(64),
  ctime DATETIME,
  content VARCHAR(256)			
);

/*******************/
/******数据导入******/
/*******************/

/*商品大图详情介绍内容*/
INSERT INTO pro_details VALUES
(null,1,'Mikado是兴起于欧洲的“游戏棒”运动，在日本，Mikado则是天皇的称呼。','Mikado椅腿端部的撞色与椅背上方的“皇冠”造型，将东西方文化趣味般地结合在一起。','JMT意大利皮革制作，坐感舒适；精致工艺，环保与经久耐用。','宽：460mm    深：490mm   高：755mm','img/details/1-detail-1.jpg','img/details/1-detail-2.jpg','img/details/1-detail-3.jpg','img/details/1-detail-4.jpg'),
(null,27,'规格：长14cm 宽14cm 高7cm','净重：1.47kg','材料：陶瓷/高硼硅玻璃','适用场景：厨房','img/details/27-detail-1.jpg','img/details/27-detail-2.jpg','img/details/27-detail-3.jpg','img/details/27-detail-4.jpg'),
(null,28,'因形如日本太卷寿司（Futo-Maki）而得名的Sushi沙发是设计师Erling Torvits难得的沙发作品。','干练内敛的线条将座椅、椅背和扶手融为一体，深受大众喜爱。','Kvadrat面料制作，精致工艺技术；环保耐用，卓越的体验。','材料：美国白橡木，天然饰面   软包：REMIX 2   色号：612&632','img/details/28-detail-1.jpg','img/details/28-detail-2.jpg','img/details/28-detail-3.jpg','img/details/28-detail-4.jpg'),
(null,29,'狐狸先生与 Melinki 系列的其余设计拥有独特的个性与持久的新引力，其设计之初的目的就是为了吸引时尚前卫的消费者。','从那时起，狐狸先生已经成为 Scion 具代表性的设计之一，并且具有自己的生命、个性与忠实追随者。','从马克杯、餐垫到地毯，如今狐狸先生系列已经发展出了很多的家居配饰，为大众的生活带来每天的乐趣','生产技术：手工制造，包括纱线环节。印度机械相对落后，很多产品都是靠手工制作，因此其手工技艺是非常高超的，也正是因为这个原因，荷兰公司选择将手工地毯在印度生产。','img/details/29-detail-1.jpg','img/details/29-detail-2.jpg','img/details/29-detail-3.jpg','img/details/29-detail-4.jpg');

/**商品分类家族**/
INSERT INTO pro_family VALUES
(NULL,'客厅'),
(NULL,'卧室'),
(NULL,'厨房'),
(NULL,'浴室'),
(NULL,'餐厅');

/******家具类别页面元素******/
INSERT INTO room VALUES
(NULL,'客厅','livingroom','bg-living','装扮你梦想中的客厅'),
(NULL,'卧室','bedroom','bg-bed','专为家里最爱的房间打造'),
(NULL,'厨房','kitchen','bg-kitchen','迎接全新的厨房吧'),
(NULL,'浴室','bathroom','bg-bath','找到一间浴室，让你的晨间时光清新愉悦'),
(NULL,'餐厅','dinning room','bg-dinner','分享美食与欢聚时刻'),
(NULL,'全部','my','bg-all','我的家具');




/**商品列表**/
INSERT INTO pro_list VALUES
(NULL,2,399.00,'蓝色','扶手椅','img/goods/product_list1.jpg','details.html?lid=1','【简约流线设计扶手椅，采用全新环保材料，坚硬耐用】','<div><img src="img/details/1-detail-1.jpg"></div><div><p>Mikado是兴起于欧洲的“游戏棒”运动，在日本，Mikado则是天皇的称呼。</p></div><div><img src="img/details/1-detail-2.jpg"></div><div><p>Mikado椅腿端部的撞色与椅背上方的“皇冠”造型，将东西方文化趣味般地结合在一起。</p></div><div><img src="img/details/1-detail-3.jpg"></div><div><p>材料：Natural beech    软包：Milano  色号：5146</p></div><div><img src="img/details/1-detail-4.jpg"></div></div>',21),
(NULL,3,205.00,'黑色','黑色置物架','img/goods/product_list2.jpg','details.html?lid=2','【轻巧便携设计置物架，采用优质环保材料，坚硬耐用】','',32),
(NULL,3,29.00,'粉色','收纳盆','img/goods/product_list3.jpg','details.html?lid=3','【大口简约收纳盆，采用优质耐用环保材料，合理储物】','',23),
(NULL,4,366.00,'黑色','洁具套件','img/goods/product_list4.jpg','details.html?lid=4','【超值精选全套洁具套件，限时抢购】','',43),
(NULL,1,2659.00,'灰色','布艺单人沙发','img/goods/product_list5.jpg','details.html?lid=5','【单人布艺沙发-北欧风格，限时抢购】','',543),
(NULL,2,899.00,'黑色','单门镜柜','img/goods/product_list6.jpg','details.html?lid=6','【简约派风格-单门镜柜，一柜多用，火热促销中】','',432),
(NULL,4,69.00,'白色','化妆镜','img/goods/product_list7.jpg','details.html?lid=7','【可折叠圆形化妆镜，照亮你的美】','',422),
(NULL,4,69.00,'灰色','衣物收纳','img/goods/product_list8.jpg','details.html?lid=8','【长筒型布艺收纳袋，给闲置衣服一个家】','',152),
(NULL,4,69.00,'白色','置物挂件','img/goods/product_list9.jpg','details.html?lid=9','【多功能浴室置物挂件，一物多用，超划算】','',531),
(NULL,3,8.00,'黑色','门把手','img/goods/product_list10.jpg','details.html?lid=10','【门把手，坚固耐用】','',314),
(NULL,3,275.00,'白色','木质置物架','img/goods/product_list11.jpg','details.html?lid=11','【精选原木设计，纯工艺打造】','',465),
(NULL,1,299.00,'黑色','落地灯','img/goods/product_list12.jpg','details.html?lid=12','【几何元素设计，精致工艺打造】','',321),
(NULL,1,2999.00,'灰色','单人沙发B','img/goods/product_list13.jpg','details.html?lid=13','【北欧风单人沙发，简单舒适】','',121),
(NULL,1,399.00,'灰色','边桌','img/goods/product_list14.jpg','details.html?lid=14','【小巧便携，简易式边桌】','',542),
(NULL,1,3559.00,'灰色','单人皮沙发','img/goods/product_list15.jpg','details.html?lid=15','【北欧风真皮沙发，简单舒适】','',225),
(NULL,2,219.00,'黑色','台灯F','img/goods/product_list16.jpg','details.html?lid=16','【简约流线型落地灯，独具风格】','',277),
(NULL,1,2999.00,'灰色','单人沙发A','img/goods/product_list17.jpg','details.html?lid=17','【北欧风单人沙发，简单舒适】','',214),
(NULL,2,219.00,'黑色','台灯','img/goods/product_list18.jpg','details.html?lid=18','【节能型台灯】','',623),
(NULL,2,289.00,'黑色','双层边桌','img/goods/product_list19.jpg','details.html?lid=19','【小巧便携，简易式边桌】','',441),
(NULL,2,1599.00,'白色','靠背椅','img/goods/product_list20.jpg','details.html?lid=20','【简单·舒适·单人--背靠椅】','',542),
(NULL,4,49.00,'黑色','置物架','img/goods/product_list21.jpg','details.html?lid=21','【可折叠伸缩式置物架，超值优惠】','',231),
(NULL,1,369.00,'灰色','休闲座椅','img/goods/product_list22.jpg','details.html?lid=22','【简单舒适的单人休闲座椅】','',553),
(NULL,5,499.00,'白色','小餐桌','img/goods/product_list23.jpg','details.html?lid=23','【简约便携休闲椅，火热促销中】','',353),
(NULL,5,199.00,'白色','餐椅','img/goods/product_list24.jpg','details.html?lid=24','【简约便携休闲椅，火热促销中】','',632),
(NULL,2,1650.00,'灰色','实木抽屉柜','img/goods/product_list25.jpg','details.html?lid=25','【中国风实木抽屉柜，真材实料】','',363),
(NULL,2,4650.00,'白色','定制衣柜','img/goods/product_img_md-26.1.jpg','details.html?lid=26','【休闲区与储物柜的结合，增强空间收纳的同时也有一个休闲的去处，现代简洁的风格设计采用蓝绿色的搭配让空间更加大方】','',573),
(NULL,5,499.00,'白色','下午茶套装','img/goods/product_list27.1.jpg','details.html?lid=27','【简单的色彩，圆润的线条，金色描边，没有过多的装饰，恬静而美好。】','<div><img src="img/details/27-detail-1.jpg"></div><div><p>Mikado是兴起于欧洲的“游戏棒”运动，在日本，Mikado则是天皇的称呼。</p></div><div><img src="img/details/27-detail-2.jpg"></div><div><p>Mikado椅腿端部的撞色与椅背上方的“皇冠”造型，将东西方文化趣味般地结合在一起。</p></div><div><img src="img/details/27-detail-3.jpg"></div><div><p>材料：Natural beech    软包：Milano  色号：5146</p></div><div><img src="img/details/27-detail-4.jpg"></div></div>',261),
(NULL,1,9918.00,'自然色','Sushi 沙发','img/goods/product_list28.1.jpg','details.html?lid=28','【干练内敛的线条将座椅、椅背和扶手融为一体，深受大众喜爱。】','<div><img src="img/details/28-detail-1.jpg"></div><div><p>Mikado是兴起于欧洲的“游戏棒”运动，在日本，Mikado则是天皇的称呼。</p></div><div><img src="img/details/28-detail-2.jpg"></div><div><p>Mikado椅腿端部的撞色与椅背上方的“皇冠”造型，将东西方文化趣味般地结合在一起。</p></div><div><img src="img/details/28-detail-3.jpg"></div><div><p>材料：Natural beech    软包：Milano  色号：5146</p></div><div><img src="img/details/28-detail-4.jpg"></div></div>',622),
(NULL,1,2152.00,'自然色','羊毛地毯','img/goods/product_list29.1.jpg','details.html?lid=29','【有趣又时尚的狐狸先生 Melinki 系列】','<div><img src="img/details/29-detail-1.jpg"></div><div><p>Mikado是兴起于欧洲的“游戏棒”运动，在日本，Mikado则是天皇的称呼。</p></div><div><img src="img/details/29-detail-2.jpg"></div><div><p>Mikado椅腿端部的撞色与椅背上方的“皇冠”造型，将东西方文化趣味般地结合在一起。</p></div><div><img src="img/details/29-detail-3.jpg"></div><div><p>材料：Natural beech    软包：Milano  色号：5146</p></div><div><img src="img/details/29-detail-4.jpg"></div></div>',411);



/*********商品图片*********/
INSERT INTO pro_pic VALUES
(NULL,1,'img/goods/product_img_sm-1.jpg','img/goods/product_list1.jpg','img/goods/product_img_lg-1.jpg'),
(NULL,1,'img/goods/product_img_sm-1.2.jpg','img/goods/product_list1.2.jpg','img/goods/product_img_lg-1.2.jpg'),
(NULL,1,'img/goods/product_img_sm-1.3.jpg','img/goods/product_list1.3.jpg','img/goods/product_img_lg-1.3.jpg'),
(NULL,1,'img/goods/product_img_sm-1.4.jpg','img/goods/product_list1.4.jpg','img/goods/product_img_lg-1.4.jpg'),
(NULL,1,'img/goods/product_img_sm-1.5.jpg','img/goods/product_list1.5.jpg','img/goods/product_img_lg-1.5.jpg'),
(NULL,2,'img/goods/product_img_sm-2.jpg','img/goods/product_list2.jpg','img/goods/product_img_lg-2.jpg'),
(NULL,2,'img/goods/product_img_sm-2.2.jpg','img/goods/product_list2.2.jpg','img/goods/product_img_lg-2.2.jpg'),
(NULL,2,'img/goods/product_img_sm-2.3.jpg','img/goods/product_list2.3.jpg','img/goods/product_img_lg-2.3.jpg'),
(NULL,3,'img/goods/product_img_sm-3.jpg','img/goods/product_list3.jpg','img/goods/product_img_lg-3.jpg'),
(NULL,3,'img/goods/product_img_sm-3.2.jpg','img/goods/product_list3.2.jpg','img/goods/product_img_lg-3.2.jpg'),
(NULL,3,'img/goods/product_img_sm-3.3.jpg','img/goods/product_list3.3.jpg','img/goods/product_img_lg-3.3.jpg'),
(NULL,4,'img/goods/product_img_sm-4.jpg','img/goods/product_list4.jpg','img/goods/product_img_lg-4.jpg'),
(NULL,5,'img/goods/product_img_sm-5.jpg','img/goods/product_list5.jpg','img/goods/product_img_lg-5.jpg'),
(NULL,6,'img/goods/product_img_sm-6.jpg','img/goods/product_list6.jpg','img/goods/product_img_lg-6.jpg'),
(NULL,7,'img/goods/product_img_sm-7.jpg','img/goods/product_list7.jpg','img/goods/product_img_lg-7.jpg'),
(NULL,8,'img/goods/product_img_sm-8.jpg','img/goods/product_list8.jpg','img/goods/product_img_lg-8.jpg'),
(NULL,9,'img/goods/product_img_sm-9.jpg','img/goods/product_list9.jpg','img/goods/product_img_lg-9.jpg'),
(NULL,10,'img/goods/product_img_sm-10.jpg','img/goods/product_list10.jpg','img/goods/product_img_lg-10.jpg'),
(NULL,11,'img/goods/product_img_sm-11.jpg','img/goods/product_list11.jpg','img/goods/product_img_lg-11.jpg'),
(NULL,12,'img/goods/product_img_sm-12.jpg','img/goods/product_list12.jpg','img/goods/product_img_lg-12.jpg'),
(NULL,13,'img/goods/product_img_sm-13.jpg','img/goods/product_list13.jpg','img/goods/product_img_lg-13.jpg'),
(NULL,14,'img/goods/product_img_sm-14.jpg','img/goods/product_list14.jpg','img/goods/product_img_lg-14.jpg'),
(NULL,15,'img/goods/product_img_sm-15.jpg','img/goods/product_list15.jpg','img/goods/product_img_lg-15.jpg'),
(NULL,16,'img/goods/product_img_sm-16.jpg','img/goods/product_list16.jpg','img/goods/product_img_lg-16.jpg'),
(NULL,17,'img/goods/product_img_sm-17.jpg','img/goods/product_list17.jpg','img/goods/product_img_lg-17.jpg'),
(NULL,18,'img/goods/product_img_sm-18.jpg','img/goods/product_list18.jpg','img/goods/product_img_lg-18.jpg'),
(NULL,19,'img/goods/product_img_sm-19.jpg','img/goods/product_list19.jpg','img/goods/product_img_lg-19.jpg'),
(NULL,20,'img/goods/product_img_sm-20.jpg','img/goods/product_list20.jpg','img/goods/product_img_lg-20.jpg'),
(NULL,21,'img/goods/product_img_sm-21.jpg','img/goods/product_list21.jpg','img/goods/product_img_lg-21.jpg'),
(NULL,22,'img/goods/product_img_sm-22.jpg','img/goods/product_list22.jpg','img/goods/product_img_lg-22.jpg'),
(NULL,23,'img/goods/product_img_sm-23.jpg','img/goods/product_list23.jpg','img/goods/product_img_lg-23.jpg'),
(NULL,24,'img/goods/product_img_sm-24.jpg','img/goods/product_list24.jpg','img/goods/product_img_lg-24.jpg'),
(NULL,25,'img/goods/product_img_sm-25.jpg','img/goods/product_list25.jpg','img/goods/product_img_lg-25.jpg'),
(NULL,26,'img/goods/product_img_sm-26.1.jpg','img/goods/product_img_md-26.1.jpg','img/goods/product_img_lg-26.1.jpg'),
(NULL,26,'img/goods/product_img_sm-26.2.jpg','img/goods/product_img_md-26.2.jpg','img/goods/product_img_lg-26.2.jpg'),
(NULL,26,'img/goods/product_img_sm-26.3.jpg','img/goods/product_img_md-26.3.jpg','img/goods/product_img_lg-26.3.jpg'),
(NULL,26,'img/goods/product_img_sm-26.4.jpg','img/goods/product_img_md-26.4.jpg','img/goods/product_img_lg-26.4.jpg'),
(NULL,26,'img/goods/product_img_sm-26.5.jpg','img/goods/product_img_md-26.5.jpg','img/goods/product_img_lg-26.5.jpg'),
(NULL,26,'img/goods/product_img_sm-26.6.jpg','img/goods/product_img_md-26.6.jpg','img/goods/product_img_lg-26.6.jpg'),
(NULL,27,'img/goods/product_img_sm-27.1.jpg','img/goods/product_list27.1.jpg','img/goods/product_img_lg-27.1.jpg'),
(NULL,27,'img/goods/product_img_sm-27.2.jpg','img/goods/product_list27.2.jpg','img/goods/product_img_lg-27.2.jpg'),
(NULL,27,'img/goods/product_img_sm-27.3.jpg','img/goods/product_list27.3.jpg','img/goods/product_img_lg-27.3.jpg'),
(NULL,27,'img/goods/product_img_sm-27.4.jpg','img/goods/product_list27.4.jpg','img/goods/product_img_lg-27.4.jpg'),
(NULL,27,'img/goods/product_img_sm-27.5.jpg','img/goods/product_list27.5.jpg','img/goods/product_img_lg-27.5.jpg'),
(NULL,27,'img/goods/product_img_sm-27.6.jpg','img/goods/product_list27.6.jpg','img/goods/product_img_lg-27.6.jpg'),
(NULL,28,'img/goods/product_img_sm-28.1.jpg','img/goods/product_list28.1.jpg','img/goods/product_img_lg-28.1.jpg'),
(NULL,28,'img/goods/product_img_sm-28.2.jpg','img/goods/product_list28.2.jpg','img/goods/product_img_lg-28.2.jpg'),
(NULL,28,'img/goods/product_img_sm-28.3.jpg','img/goods/product_list28.3.jpg','img/goods/product_img_lg-28.3.jpg'),
(NULL,28,'img/goods/product_img_sm-28.4.jpg','img/goods/product_list28.4.jpg','img/goods/product_img_lg-28.4.jpg'),
(NULL,28,'img/goods/product_img_sm-28.5.jpg','img/goods/product_list28.5.jpg','img/goods/product_img_lg-28.5.jpg'),
(NULL,29,'img/goods/product_img_sm-29.1.jpg','img/goods/product_list29.1.jpg','img/goods/product_img_lg-29.1.jpg'),
(NULL,29,'img/goods/product_img_sm-29.2.jpg','img/goods/product_list29.2.jpg','img/goods/product_img_lg-29.2.jpg'),
(NULL,29,'img/goods/product_img_sm-29.3.jpg','img/goods/product_list29.3.jpg','img/goods/product_img_lg-29.3.jpg'),
(NULL,29,'img/goods/product_img_sm-29.4.jpg','img/goods/product_list29.4.jpg','img/goods/product_img_lg-29.4.jpg');


/**用户信息**/
INSERT INTO my_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', 'img/avatar/default.png', '丁伟', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');

/****首页轮播广告商品****/
INSERT INTO index_carousel VALUES
(NULL, 'img/index/banner1.png','轮播广告商品1'),
(NULL, 'img/index/banner2.png','轮播广告商品2'),
(NULL, 'img/index/banner3.png','轮播广告商品3'),
(NULL, 'img/index/banner4.png','轮播广告商品4');

/****首页商品****/
INSERT INTO index_product VALUES
(NULL,'扶手椅','¥ 399.00','img/goods/product_list1.jpg','details.html?lid=1'),
(NULL,'Sushi 沙发','¥ 9,918.00','img/goods/product_list28.1.jpg','details.html?lid=28'),
(NULL,'下午茶套装','¥ 499.00','img/goods/product_list27.1.jpg','details.html?lid=27'),
(NULL,'羊毛地毯','¥ 2,152.00','img/goods/product_list29.1.jpg','details.html?lid=29'),
(NULL,'布艺单人沙发','¥ 2,659.00','img/goods/product_list5.jpg','details.html?lid=5'),
(NULL,'单门镜柜','¥ 995.00','img/goods/product_list6.jpg','details.html?lid=6'),
(NULL,'化妆镜','¥ 69.00','img/goods/product_list7.jpg','details.html?lid=7'),
(NULL,'衣物收纳','¥ 69.00','img/goods/product_list8.jpg','details.html?lid=8'),
(NULL,'置物挂件','¥ 69.00','img/goods/product_list9.jpg','details.html?lid=9'),
(NULL,'门把手','¥ 8.00','img/goods/product_list10.jpg','details.html?lid=10'),
(NULL,'木质置物架','¥ 275.00','img/goods/product_list11.jpg','details.html?lid=11'),
(NULL,'落地灯','¥ 299.00','img/goods/product_list12.jpg','details.html?lid=12');

INSERT INTO pro_comment VALUES
(NULL,1,'匿名用户',now(),'商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1，商品1评论内容1'),
(NULL,1,'匿名用户',now(),'商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2，商品1评论内容2'),
(NULL,1,'匿名用户',now(),'商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3，商品1评论内容3'),
(NULL,1,'匿名用户',now(),'商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4，商品1评论内容4'),
(NULL,2,'匿名用户',now(),'商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，商品2评论内容1，'),
(NULL,2,'匿名用户',now(),'商品2评论内容2，商品2评论内容2，商品2评论内容2，商品2评论内容2，商品2评论内容2，商品2评论内容2，商品2评论内容2，商品2评论内容2，'),
(NULL,2,'匿名用户',now(),'商品2评论内容3，商品2评论内容3，商品2评论内容3，商品2评论内容3，'),
(NULL,2,'匿名用户',now(),'商品2评论内容4，商品2评论内容4，商品2评论内容4，商品2评论内容4，商品2评论内容4，'),
(NULL,3,'匿名用户',now(),'商品3评论内容1'),
(NULL,4,'匿名用户',now(),'商品4评论内容1'),
(NULL,5,'匿名用户',now(),'商品5评论内容1'),
(NULL,6,'匿名用户',now(),'商品6评论内容1'),
(NULL,7,'匿名用户',now(),'商品7评论内容1'),
(NULL,8,'匿名用户',now(),'商品8评论内容1'),
(NULL,9,'匿名用户',now(),'商品9评论内容1'),
(NULL,10,'匿名用户',now(),'商品10评论内容1'),
(NULL,11,'匿名用户',now(),'商品11评论内容1'),
(NULL,12,'匿名用户',now(),'商品12评论内容1'),
(NULL,13,'匿名用户',now(),'商品13评论内容1'),
(NULL,14,'匿名用户',now(),'商品14评论内容1'),
(NULL,15,'匿名用户',now(),'商品15评论内容1'),
(NULL,16,'匿名用户',now(),'商品16评论内容1'),
(NULL,17,'匿名用户',now(),'商品17评论内容1'),
(NULL,18,'匿名用户',now(),'商品18评论内容1'),
(NULL,19,'匿名用户',now(),'商品19评论内容1'),
(NULL,20,'匿名用户',now(),'商品20评论内容1'),
(NULL,21,'匿名用户',now(),'商品21评论内容1'),
(NULL,22,'匿名用户',now(),'商品22评论内容1'),
(NULL,23,'匿名用户',now(),'商品23评论内容1'),
(NULL,24,'匿名用户',now(),'商品24评论内容1'),
(NULL,25,'匿名用户',now(),'商品25评论内容1'),
(NULL,26,'匿名用户',now(),'商品26评论内容1'),
(NULL,27,'匿名用户',now(),'商品27评论内容1'),
(NULL,28,'匿名用户',now(),'商品28评论内容1'),
(NULL,29,'匿名用户',now(),'商品29评论内容1');