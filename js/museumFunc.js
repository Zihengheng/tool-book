// JavaScript Document
/*
  功能：切换功能集合
  范围：语言馆、科普馆、专业馆
  */
$(function(){

    $(".scroll-box").scrollTab({ //三大馆的图片列表焦点切换
        pointBox : ".nums",
        curClass: "active",
        showLen: "2",
        delayTime : 5000 //单位毫秒
    });


    museumBox = $(".museum-box");

    museumBox.find(".side-nav-list li").click(function () {//“语言馆”头部左侧导航切换
        $(this).addClass("on").siblings().removeClass("on");
    });

    topSubMenu = museumBox.find(".top-submenu");
    topSubMenu.find("li").on("click",function () {//三大馆头部二级导航切换
        $(this).addClass("on").siblings().removeClass("on");
    });



});