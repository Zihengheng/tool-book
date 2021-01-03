// JavaScript Document
/*
  功能：切换功能集合
  范围：museum 系列
  */
$(function(){
    //语词库侧边栏
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


    //显示标签内容
    $('#menu1-tab a[href="#hycd"]').tab('show')
    //显示成语
    $('#section-tab a[href="#chengyu"]').tab('show')
    //显示政治格言
    $('#moto-type-change a[href="#politics"]').tab('show')

    //翻转卡片
    $("#a").click(function(event){
    $("#a").parents(".sq-box").toggleClass("flipped");})

    $("#b").click(function(event){
    $("#b").parents(".sq-box").toggleClass("flipped");})
});