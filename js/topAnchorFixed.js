// JavaScript Document
/*
  2017-04-07
  功能：锚点导航
  范围：书本详细页 book-detail.html
  说明：this  锚点导航按钮的父盒子".top-catalog"
       anchorTag 主体内容中每层的锚点标记".js_anchor_tag"
  其它：点击锚点导航，页面滚动到相应的锚点位置
*/  	

jQuery.fn.anchorScroll = function(options){

	var defaults = $.extend({
		anchorTag : ".js-anchor-tag",
		headFix: "", //其它顶部悬浮导航,若无，则设置为空数据
		anchorBox : "" //导航最外层父盒子
	},options);

	var obj = this,
		scrolled = true,
		scrollTimer;

	anchorBox = $(defaults.anchorBox);//锚点导航父盒子
	unitBox = obj.find("li");//锚点单元

	headH = $(defaults.headFix).outerHeight(true);//悬浮输入框的高度，即左侧锚点导航垂直位置的偏差值
	headH = headH==null ? 0 : headH;

	minTop = anchorBox.offset().top - headH;//anchorBox不具有fixed属性，所以此值固定

	$(window).on("load scroll",function(){
		var viewTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop); //页面滚动高度

		//start fixed
		if( viewTop > minTop ){
			obj.css({
				"position"   : "fixed",
				"top"        : headH + "px"
			});
		}

		//stop top
		else if( viewTop <= minTop ){
			obj.css({
				"position"   : "",
				"top"        : ""
			});
		}

		clearTimeout(scrollTimer);

		//滚动页面时
		if(scrolled) {

			minH = viewTop;
			midH = minH + $(window).height()/2;
			maxH = minH + $(window).height();

			for(var i=0; i<$(defaults.anchorTag).length; i++){

				if( i==0 && viewTop+$(window).height() < $(defaults.anchorTag).eq(i).offset().top ){
					scrollTimer=setTimeout(function(){goalScroll(i)},200);
					return;
				}
				else if( i==$(defaults.anchorTag).length-1 && viewTop > $(defaults.anchorTag).eq(i).offset().top ){
					scrollTimer=setTimeout(function(){goalScroll(i)},200);
					return;
				}
				else if(viewTop <= $(defaults.anchorTag).eq(i).offset().top || ((viewTop > $(defaults.anchorTag).eq(i).offset().top) && viewTop + $(window).height()< $(defaults.anchorTag).eq(i+1).offset().top) ){
					scrollTimer=setTimeout(function(){goalScroll(i)},200);
					return;
				}

			}
		}



	});//load scroll end

	
	//锚点切换
	unitBox.click(function(){
		_id = $(this).find("a").attr("href");
		_index = unitBox.index($(this));
		scrolled = false;

		$("body,html").animate({
			scrollTop : $(_id).offset().top - headH - anchorBox.height()
		},300,function () {
			goalScroll(_index);
		});
		
	});



	//计算锚点目标位置
	function goalScroll(index){
		obj.find("li").removeClass('cur').eq(index).addClass('cur');
		scrolled = true;
	}


};//anchorScroll end