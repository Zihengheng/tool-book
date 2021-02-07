// JavaScript Document
/*
  功能：切换功能集合
  范围：museum 系列
  */
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function(){

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
    
    //2021 范围：所有museum 条目页（detail page）
    //说明：设置左边栏高度等于内容高度
    setHeight();

    //2021 范围：所有museum 条目页（detail page）
    //标签切换
    tabFunc(".dt-leftbar", ".dt-leftbar-title li", "cur", ".dt-book-navbar", "active", "mousedown");

    //2021 范围：附录库条目页
    //说明：固定左边栏
    fixMenu();

    //2021 范围：mesuem detail page
    //说明：改变字体
    setFontSize();

    //2021 标签切换：语词库首页
    tabFunc(".dive-in", "#section-tab li", "cur", ".di-con", "active", "mousedown");
    tabFunc(".dive-in", "#section-tab li", "cur", ".di-con", "active", "mousedown");


    //语词库侧边栏
    //menu-1
   $('#menu-1').collapse('show');
   $('#menu-1').on('shown.bs.collapse', function () {
    $("a[href='#menu-1']").text("-");
});
    $('#menu-1').on('hidden.bs.collapse', function () {
    $("a[href='#menu-1']").text("+");
});
    //menu-2
    $('#menu-2').on('shown.bs.collapse', function () {
    $("a[href='#menu-2']").text("-");});
    $('#menu-2').on('hidden.bs.collapse', function () {
    $("a[href='#menu-2']").text("+");});

    //menu-3
    $('#menu-3').on('shown.bs.collapse', function () {
    $("a[href='#menu-3']").text("-");});
    $('#menu-3').on('hidden.bs.collapse', function () {
    $("a[href='#menu-3']").text("+");});

    //显示书籍注释
    $(".booksec-box img").hover(
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

    //2021 显示典故：语词库首页
    $(".show-story").click(function(){
        if($(this).hasClass("on-show")){
            $(this).next().slideUp(300);
            $(this).removeClass("on-show");
        }
        else{
           $(this).next().slideDown(300);
           $(this).addClass("on-show"); 
        }
    });
    $(".close-story").click(function(){
        $(this).parent().slideUp(300);
        $(this).parent().prev().removeClass("on-show");
    });

    //显示标签内容
    $('#menu1-tab a[href="#hycd"]').tab('show')
    //显示成语
    $('#section-tab a[href="#chengyu"]').tab('show')
    //显示政治格言
    $('#moto-type-change a[href="#politics"]').tab('show')

    //翻转卡片
    $(".flip").click(function () {
        var _this= $(this);
        if(_this.parents(".card").hasClass("cur")){
            $(this).parents(".card").removeClass("cur").siblings().removeClass("cur");
        }else{
            $(this).parents(".card").addClass("cur").siblings().addClass("cur");
        }
    });

    //翻转-包在谜底
    $(".rst-flip").click(function () {
        var _this= $(this);
        if(_this.parents(".rst-card").hasClass("cur")){
            $(this).parents(".rst-card").removeClass("cur").siblings().removeClass("cur");
        }else{
            $(this).parents(".rst-card").addClass("cur").siblings().addClass("cur");
        }
    });

    //*****************************语词库条目页**********************
    //显示数学标签
    $('#nav1-sections a[href="#sx"]').tab('show')
    //边栏+-转换
    $('.dt-book-navbar .panel-collapse').on('shown.bs.collapse', function () {
       $(this).prev().children(".toggle-btn").text("-");
    })
    $('.dt-book-navbar .panel-collapse').on('hidden.bs.collapse', function () {
       $(this).prev().children(".toggle-btn").text("+");
    })

    //防止高亮重叠
    $(".nav-sections a").click(function(){
        var _this = this;
        var fPanel = $(_this).parents(".panel");
        fPanel.siblings(".panel").find("li").each(function(){
            if($(this).hasClass("active")){
                $(this).removeClass();
            }
        })
    });

    //栏目点击事件
    $("ul.dt-chapters li").click(function(){
        $("ul.nav-sections li").removeClass("active");
        $(this).parents(".panel").siblings(".panel").
        find("li").removeClass("active");
    });
    $("ul.nav-sections li").click(function(){
        $("ul.dt-chapters li").removeClass("active");
    });

    //词链导图效果
    $(".world-col").click(function(){
        $(this).addClass("cur");
        $(this).parents(".branch").siblings(".branch").find(".world-col").removeClass("cur");
    });

    //***************************** 鉴赏库首页 **********************
    //边栏+-转换
    $('#appre-menu .panel-collapse').on('shown.bs.collapse', function () {
       $(this).prev().find(".control-icon").text("-");
    })
    $('#appre-menu .panel-collapse').on('hidden.bs.collapse', function () {
       $(this).prev().find(".control-icon").text("+");
    })
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
  };
  //2021 范围：所有museum 条目页（detail page）
  //说明：设置左边栏高度等于内容高度
  function setHeight(){
    var contentHeight =$(".dt-rightbar").outerHeight(true);
    $(".dt-leftbar").css("height", contentHeight);
  };

  //2021 范围：附录库条目页
  //说明：固定左边菜单栏
  function fixMenu(){
    if($(".dt-leftbar").hasClass("apd")){
        var menuPosition = $("#apd-nav").offset().top;
        var footerPosition = $(".footer").offset().top;
        var menuH = $("#apd-nav").outerHeight(true);
        var footerH = $(".footer").outerHeight(true);
        $(window).scroll(function(){
            var iNum = $(window).scrollTop();
            if(iNum <= menuPosition){
                $("#apd-nav").css({
                    'position':'static',
                });
            }
            else if (iNum > (footerPosition + menuH)){
                $("#apd-nav").css({
                    'position':'fixed',
                    'bottom':footerH + menuH,
                    'width':'289px',
                });
            }
            else{
                $("#apd-nav").css({
                    'position':'fixed',
                    'top':'0',
                    'width':'289px',
                });
            }
        });
    }
    else return;
  };
  //2021 范围：museum detail page
  //说明：设置字体大小
  function setFontSize(){  //设置字体大中小
            $(".size-change").find("li").click(function () {
                $(this).addClass("on").siblings().removeClass("on");
                // btnA = $(this).find("a");
                // textContent = $(this).parents(".result-box").find(".item-details");
                // if(btnA.hasClass("l-words")){//大
                //     textContent.removeClass("content-s").addClass("content-l");
                // }
                // if(btnA.hasClass("m-words")){//中
                //     textContent.removeClass("content-s content-l");
                // }
                // if(btnA.hasClass("s-words")){//小
                //     textContent.removeClass("content-l").addClass("content-s");
                // }
            });
        };
