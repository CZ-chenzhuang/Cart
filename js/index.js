$(function(){
	$("#buy").click(function(){
		location.href = "buy.html";
	})
	$(".goodList .goodInfo .addToCart").click(function(){
		//获取goodId
		var goodId = $(this).parent().attr("data-good-id");
		//点击时获取图片
		var src = $(this).parent().first().attr("src");
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
		if(goodId in cookieObj){
			cookieObj[goodId].num++		//在的话只需要将数量增加
		}else{
			//添加新的商品
			cookieObj[goodId] = {
				"src" : src,
				"goodname" : goodName,
				"goodPrice" : goodPrice,
				"num" : 1
			}
		}
		//创建cookie
		$.cookie("cart",JSON.stringify(cookieObj),{expires : 7,path : '/'});
		
		
		//使用插件飞入效果
		
	})
})

//封装函数，将cookie字符串转为对象
function convertCookieStrToCookieObj(cookieStr){
	if(!cookieStr){
		return {};
	}else{
		return JSON.parse(cookieStr);
	}
}
