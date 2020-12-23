// JavaScript Document
/*
 2017-04-21
 功能：侧边栏悬浮导航
 范围：辅文页
 说明：this  为锚点导航按钮的父盒子".side-catalog"
 新增功能: 锚点导航滑到最底部时,同主体内容对齐，防止滑出父盒子
 其它：点击左侧悬浮导航，切换右侧内容，并没有锚点滚动页面功能
*/  	

jQuery.fn.anchorScroll = function(options){

	var defaults = $.extend({
		headFix: "", //顶部悬浮导航,例如“.searchHeaderfix“、“.headerfix“
		mainBox: ".main",// 左右布局的父盒子（使用其margin-btotom值）
		anchorSideBox : ".sidebar-a", //导航最外层盒子
		container : ".main-right" //主体内容盒子
	},options);

	var obj = this,
		scrollTimer;

	contentBox = $(defaults.container);//主题内容盒子
	sideBox = $(defaults.anchorSideBox);//锚点导航父盒子
	footBox = $(".footer");
	unitBox = obj.find("dd");//锚点单元

	unitH = unitBox.height();//锚点单元高度，可计算当前锚点滑动距离
	headH = $(defaults.headFix).outerHeight(true);//悬浮输入框的高度，即左侧锚点导航垂直位置的偏差值
	headH = headH==null ? 0 : headH;

	footerH = footBox.outerHeight();//底部高度
	minTop = sideBox.offset().top - headH;//sideBox不具有fixed属性，所以此值固定
	devValA = parseInt($(defaults.mainBox).css("margin-bottom"));//偏差值，锚点导航停止在底部时使用

	$(window).on("load scroll",function(){
		var viewTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop); //页面滚动高度
		bodyH = $(document).height();//页面总高度
		conH = contentBox.height();//主体内容高度
		maxTop = bodyH - obj.outerHeight()- footerH - headH - devValA ;

		//start fixed
		if( viewTop > minTop && viewTop < maxTop ){
			obj.css({
				"position"   : "fixed",
				"top"        : headH + "px",
				"margin-top" : ""
			});
		}
		//stop bottom
		if( viewTop >= maxTop ){
			obj.css({
				"position"   : "",
				"top"        : "",
				"margin-top" : conH - obj.height() - devValA +"px"
			});
		}
		//stop top
		else if( viewTop <= minTop ){
			obj.css({
				"position"   : "",
				"top"        : "",
				"margin-top" : ""
			});
		}

		clearTimeout(scrollTimer);

	});//load scroll end

	
	//锚点切换
	unitBox.find("a").click(function(){

		$("body,html").animate({
			scrollTop : minTop
		});

		obj.find("dd").removeClass('cur');
		$(this).parent().addClass('cur');
	});

};//anchorScroll end