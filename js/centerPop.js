/*
  start 20160606
  名称: 弹出框
  功能：出现弹出框，使之垂直居中，并添加半透明蒙版；
       点击"关闭/取消/弹出框外的空白区域"，或"添加/确定"按钮后，移除蒙版、隐藏弹出框；
  
  说明：点击筛选条件中的“查看全部 》”后，调用此功能；
       closeBtns-----有时一个弹出框有多个退出按钮，例：关闭/取消/退出···，若有多个，用英文逗号隔开，例：[".close",".cancel",".quit"]

  更新：添加了两个回调函数
       completeFunc------点击功能键，例如"确定"后的后续事件；
       failFunc------点击"关闭/取消/弹出框外空白区域"，退出弹出框，不提交任何操作；
*/
jQuery.fn.center = function(options) {

	params = $.extend({
		closeBtns:[".close"],//关闭弹出框的按钮
		submitBtn:".sure",
		completeFunc: function () {},//点击确定后的其它事件
        failFunc:function () {}//关闭弹出框，不提交任何操作
	},options);



	var obj = this,
		loaded = true;
	
	$mask = $('<div class="popup-mask"></div>').css({
		'width'  : $(document).width(),
		'height' : $(document).height()
	});
	obj.after($mask);

	_Width = parseInt(obj.outerWidth());
	_Height = parseInt(obj.outerHeight());

	obj.show();

	//计算obj的位置
	_calcPosition();

	function _calcPosition(){
		leftPos= parseInt(($(window).width() / 2) - (_Width / 2));
		topPos = parseInt(($(window).height() / 2) - (_Height / 2));

		if ($(window).width() < _Width) { leftPos = 0 ; }
		if ($(window).height() < _Height) { topPos = 0 ; }

		obj.css({
			'left': leftPos + $(window).scrollLeft(),
			'top' : topPos + $(window).scrollTop()
		});
	}

	//点击空白处、添加、关闭按钮，移除弹出窗口
	$(document).on("click",function(event){
		ev = event||window.event;
		$tar = $(ev.target);
		ev.preventDefault();
		if( $tar.closest(params.submitBtn).length == 1){//确定

            initPop();//关闭弹出框,恢复此次操作的初始状态
			params.completeFunc();//点击确定后的操作
			return false;
		}

        if( $tar.closest($mask).length == 1 ){//框外空白区域

            initPop();//关闭弹出框,恢复此次操作的初始状态
            params.failFunc();//退出，无任何操作
            return false;
        }

		for(var i in params.closeBtns){
            if( $tar.closest(params.closeBtns[i]).length == 1){//关闭

                initPop();//关闭弹出框,恢复此次操作的初始状态
                params.failFunc();//退出，无任何操作
                return false;
            }
        }


	});

	function initPop(){ //关闭弹出框,恢复初始状态
        $(document).off("click");//阻止事件冒泡
		obj.css('top', 0).hide();
		$mask.remove();
		loaded = false;
	}

	$(window).on("resize scroll",function(){
		if(loaded){
			//重新计算obj的位置
			_calcPosition();
		}
		return;
	});

}
/*弹出框 end*/