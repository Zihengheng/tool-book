// JavaScript Document
/* 
  工具书库 20170317
  范围：首页, book-detail page, 
  说明：功能单一，所以整合为一个文件
 */
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function(){
	$('#myTab a[href="#t1"]').tab('show');
	$('#labels a[href="#zk"]').tab('show');

    //范围：首页
    //说明：显示书籍注释
	
	$(".ep-box .book a").hover(
    function(){
        $(this).next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(this).next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });
	
    //范围：book-detiail page
    //说明：show-more
    $(".show-more-dt-col").click(function(){
        if($(this).hasClass("open")){
        	$(this).removeClass("open");
        	$(".dt-col-more").hide();
        	$(this).text("展示更多");
        }
        else{
            $(this).addClass("open");
            $(".dt-col-more").show();
            $(this).text("收起");
        }
    });

	//  $('.js-banner-move').smart3d();//第一屏背景
        $('#myTab li:eq(1) a').tab('show'); 
	new inputFunc({ //调用首屏页面输入框事件
		duration: 400
	});

	sort(".sort","cur"); //分类

	 function sort(sortSelector,curClass){  //分类
		$(sortSelector).mouseenter(function(){ //分类排序模块
			$selectList = $(this).find("ul");
			$selectList.show();
			$selectList.find("a").click(function(){
				$selectList.siblings().find("span").html($(this).html());
				$(this).parent().addClass(curClass).siblings().removeClass(curClass);
				$selectList.hide();
			});
		}).mouseleave(function(){
			console.log("1");
			$selectList.hide();
		});
	}

	type(".type","cur"); //分类

	 function type(typeSelector,curClass){  //分类
		$(typeSelector).mouseenter(function(){ //分类排序模块
			$selectList = $(this).find("ul");
			$selectList.show();
			$selectList.find("a").click(function(){
				$selectList.siblings().find("span").html($(this).html());
				$(this).parent().addClass(curClass).siblings().removeClass(curClass);
				$selectList.hide();
			});
		}).mouseleave(function(){
			console.log("1");
			$selectList.hide();
		});
	}

	//   $('.pic-top-list li').jfade({//书目导航
	// 	start_opacity: "1",
	// 	high_opacity: "1",
	// 	low_opacity: ".4",
	// 	timing: "500"
	// });




	/*第2屏*/
	pageSource = $(".section-source");
	pageSource.find(".list li").click(function () {
		if ($(this).hasClass("on")) {
			return;
		}
		_index = pageSource.find(".list li").index($(this));
		$(this).addClass("on").siblings().removeClass("on");
		subLi = pageSource.find(".sublist dl");
		subLi.removeClass("active").eq(_index).addClass("active");
	});

});
