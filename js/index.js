$(function() {
	initcart();
	$("#buy").click(function() {
		location.href = "buy.html";
	})
	$(".goodList .goodInfo .addToCart").click(function(evt) {
		//获取goodId
		var goodId = $(this).parent().attr("data-good-id");
		//点击时获取图片
		var goodSrc = $(this).siblings('img').attr("src");
		//商品名称
		var goodName = $(this).prev().prev().html();
		//商品单价
		var goodPrice = parseInt($(this).prev().html());

		/*
		 设计cookie
		 cooiekey : cart
		 cookievalue :
		 {
		 	"sp1" : {
		 		goodId : "...",
		 		goodName : "....",
		 		goodPrice : "..."
		 	}
		 	"sp2" : {
		 		goodId : "...",
		 		goodName : "....",
		 		goodPrice : "..."
		 	}
		 	"sp3" : {
		 		goodId : "...",
		 		goodName : "....",
		 		goodPrice : "..."
		 	}
		 }
		 要考虑到在点击购物时，以前该商品是否加入过购物车，		1.加入过，只需要把数量加1  
		 2.没加过，就将商品的所有信息都加一次
		 */
		//so先获取现有的cookie:
		var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
		//上面将获取的cookie，统一转为字符串，如果没有也要转为空的字符串，用于后面的将字符串转为对象
		//将cookie字符串转为对象
		var cookieObj = convertCookieStrToCookieObj(cookieStr);
		//判断商品是否在cookie中
		if(goodId in cookieObj) {
			cookieObj[goodId].num++ //在的话只需要将数量增加
		} else {
			//添加新的商品
			cookieObj[goodId] = {
				"goodSrc": goodSrc,
				"goodname": goodName,
				"goodPrice": goodPrice,
				"num": 1
			}
		}
		//创建cookie
		$.cookie("cart", JSON.stringify(cookieObj), {
			expires: 7,
			path: '/'
		});

		//使用插件飞入效果
		var $img = $(this).siblings('img').clone().css({
			width: 50,
			height: 50
		});
		$img.fly({
			start: {
				left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
				top: event.pageY //开始位置（必填）
			},
			end: {
				left: $('#buy').offset().left, //结束位置（必填）
				top: $('#buy').offset().top, //结束位置（必填）
				width: 0, //结束时宽度
				height: 0 //结束时高度
			},
			onEnd: function() { //结束回调
				var $buy = $('#buy');
				var re = /(\d+)/;
				var num = parseInt(re.exec($buy.val())[1]);
				$buy.val("购物车(" + (num + 1) + ")");
				$img.remove();
			}
		});
		
	})
})

//封装函数，将cookie字符串转为对象
function convertCookieStrToCookieObj(cookieStr){
	if(!cookieStr) {
		return {};
	} else {
		return JSON.parse(cookieStr);
	}
}
//初始化页面的购物车的个数
function initcart(){
	var cookieStr = $.cookie("cart") ? $.cookie("cart") : '';
	var cookieObj = convertCookieStrToCookieObj(cookieStr);
	var num = 0;
	for(var key in cookieObj){
		num += cookieObj[key].num
	}
	$('#buy').val("购物车(" + num + ")");
}
