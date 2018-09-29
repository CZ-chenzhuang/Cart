$(function() {
	var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
	if(!cookieStr) {
		$(".blank").css("display", "block");
	} else {
		var cookieObj = converCookieStrToCookieObj(cookieStr);
		for(var key in cookieObj) {
			var good = cookieObj[key];
			console.log(good.goodPrice);
			var str = `
				<ul class="goodInfo" data-good-id="${key}">
				<li><img src="${good.goodSrc}" /></li>
				<li>${good.goodname}</li>
				<li>${good.goodPrice}</li>
				<li class="num">
					<a href="javascript:;" class="minus">-</a>
					<input type="text" name="" id="" value="${good.num}" />
					<a href="javascript:;" class="plus">+</a>
				</li>
				<li class="total">${good.num * good.goodPrice}</li>
				<li><a href="javascript:;" class="del">删除</a></li>
			</ul>
			`;
			$('.cartList').append(str);
		}
		
		//减
		$(".goodInfo .minus").click(function(){
			//获取id
			 var id = $(this).parents('.goodInfo').attr('data-good-id');
			 //获取cookie
			 var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
			 var cookieObj = converCookieStrToCookieObj(cookieStr);
			 if(cookieObj[id].num > 1){
				 cookieObj[id].num --;			 	
			 }
			 $.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
			 $(this).next().val(cookieObj[id].num);
			 $(this).parent().next().html(cookieObj[id].goodPrice * cookieObj[id].num);
		})
		
		//加
		$(".goodInfo .plus").click(function(){
			//获取id
			 var id = $(this).parents('.goodInfo').attr('data-good-id');
			 //获取cookie
			 var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
			 var cookieObj = converCookieStrToCookieObj(cookieStr);
			 cookieObj[id].num ++;			 	
			 $.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
			 $(this).prev().val(cookieObj[id].num);
			 $(this).parent().next().html(cookieObj[id].goodPrice * cookieObj[id].num);
		})	
		
		//文本框修改
		$(".goodInfo").find('input').blur(function(){
			//获取id
			 var id = $(this).parents('.goodInfo').attr('data-good-id');
			 //获取cookie
			 var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
			 var cookieObj = converCookieStrToCookieObj(cookieStr);
			 if(/^\d+$/.test($(this).val()) && $(this).val() > 0){
				 cookieObj[id].num = $(this).val();				 	
			 }
			 $(this).val(cookieObj[id].num);			 
			 $.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});

			 $(this).parent().next().html(cookieObj[id].goodPrice * cookieObj[id].num);
		})
		
		//删除
		$('.goodInfo .del').click(function(){
			var id = $(this).parents('ul').attr('data-good-id');
			$(this).parents('ul').remove();
			var cookieStr = $.cookie('cart') ? $.cookie('cart') : "";
			var cookieObj = converCookieStrToCookieObj(cookieStr);   
			delete cookieObj[id];
//			$.removeCookie(cookieObj[id],{expires : 7,path : '/'});
			$.cookie('cart',JSON.stringify(cookieObj),{expires : 7,path : '/'});
		})
	}

})

//封装函数
function converCookieStrToCookieObj(cookieStr) {
	if(!cookieStr) {
		return {};
	} else {
		return JSON.parse(cookieStr);
	}
}