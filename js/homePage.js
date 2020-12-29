// JavaScript Document
/* 
  工具书库 20170317
  范围：首页
  说明：功能单一，所以整合为一个文件
 */
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function(){
	$('#myTab a[href="#t1"]').tab('show');
	$('#labels a[href="#zk"]').tab('show');
	//显示书籍注释
	$(".box1 .book a").hover(
    function(){
        $(".box1 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box1 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });
    $(".box2 .book a").hover(
    function(){
        $(".box2 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box2 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    $(".box3 .book a").hover(
    function(){
        $(".box3 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box3 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    $(".box4 .book a").hover(
    function(){
        $(".box4 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box4 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    $(".box5 .book a").hover(
    function(){
        $(".box5 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box5 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    $(".box6 .book a").hover(
    function(){
        $(".box6 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box6 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });

    $(".box7 .book a").hover(
    function(){
        $(".box7 .book a").next().stop().fadeTo("slow",1,function(){
            $(this).css("display", "block");
        })
    },
    function(){
        $(".box7 .book a").next().stop().fadeTo("slow",0,function(){
            $(this).css("display","none");
        })
    });
	// $(".section").pageScroll();//滚屏

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


	/*========返回顶部 start=========*/
	// backBtn = $(".back-top");


	// $(window).load(function(){
	// 	initBackTop = backBtn.offset().top;//初始加载时
	// 	// console.log(initBackTop );
	// 	if(initBackTop<1000){
	// 		backBtn.hide();
	// 	}
	// });

	// $(window).scroll(function(){
	// 	if ($(window).scrollTop()>1000){//滚动页面时
	// 		backBtn.show();
	// 	}
	// 	else
	// 	{
	// 		backBtn.hide();
	// 	}
	// });

	// backBtn.click(function(){//当点击跳转链接后，回到页面顶部位置
	// 	$('body,html').animate({scrollTop:0},1000);
	// 	return false;
	// });
	/*==========返回顶部 end=============*/
});
