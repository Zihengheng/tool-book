// JavaScript Document
/* 
  工具书库 20170317
  范围：首页, book-detail page, translate page
  说明：功能单一，所以整合为一个文件
 */
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function(){
	// $('#myTab a[href="#t1"]').tab('show');

    //范围：首页
    //说明：背景浮动
    // $('.hp-decor1').smart3d();

    //范围：首页
    //说明：书签标签切换
    tabFunc(".hp-book", "#labels li", "cur", ".label-con", "active", "mousedown");
    
    //范围：翻译助手页
    //说明：书签标签切换
    tabFunc(".trans-dt", "#trans-tabs li", "cur", ".trans-con", "active", "mousedown");

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
	
    //范围：book-list, book-result
    //说明：显示书籍分享收藏操作
    $("div.book-list-img").mouseenter(function(){
        $(this).find(".book-operation").fadeIn(300);
    });
     $("div.book-list-img").mouseleave(function(){
        $(this).find(".book-operation").fadeOut(300);
    });
    //范围：book-list, book-result
    //说明：突出显示书籍盒子
    $(".collection-box").mouseenter(function(){
        $(this).addClass("box-highlight");
    });
    $(".collection-box").mouseleave(function(){
        $(this).removeClass("box-highlight");
    });

    //范围：my-collection
    //说明：突出显示书籍盒子
    $(".booklist-box").mouseenter(function(){
        $(this).addClass("box-highlight");
    });
    $(".booklist-box").mouseleave(function(){
        $(this).removeClass("box-highlight");
    });
    //范围：my-collection
    //说明：显示笔记,关闭笔记
    $(".cop1").click(function(){
        $(".note-box").slideDown(200);
    });
    $(".op-note").click(function(){
        $(".note-box").slideDown(200);
    });
    $("#close-note").click(function(){
        $(".note-box").slideUp(200);
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

    //范围：书目详情页
    //说明：显示书籍注释
    $(".dt-box-book").hover(
    function(){
        $(this).children(".book-annotation").stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(this).children(".book-annotation").stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    //范围：translate page
    //说明: show-more,set divider height
    $(".translate-box .show-more").click(function(){
    	if($(this).hasClass("open")){
    		$(this).removeClass("open");
    		$(".more-rst-box").hide();
    		$(".trans-box-divider").css("height", "122px");
    	}
    	else{
    		$(this).addClass("open");
    		$(".more-rst-box").show();
    		$(".trans-box-divider").css("height", "182px");
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

});
// 2021 tab标签切换
 function tabFunc(boxDom, tablist, current, tabcont, active, mouseEvent){
     $(boxDom).each(function () {
                var _this = $(this);
                var index = 0;
                _this.on(mouseEvent, tablist, function () {
                    if ($(this).hasClass(current)) {
                        return
                    }
                    index = $(this).index();
                    $(this).addClass(current).siblings().removeClass(current);
                    _this.find(tabcont).removeClass(active).eq(index).addClass(active)
                })
            })
}
