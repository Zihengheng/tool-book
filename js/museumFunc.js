// JavaScript Document
/*
  功能：切换功能集合
  范围：museum 系列
  */
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

    //边栏自动收缩
    // $('.dt-book-navbar .panel-collapse').on('show.bs.collapse', function () {
    //     $(this).parents(".panel").
    // })
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