/*
* 20190515
* 范围：检索结果页的左侧筛选事件
* 功能：1、科技/社科默认展开4项；鼠标移入横向展开；
*       2、其它筛选单元默认展开2项，点击1和2级标题，展开3-5项，鼠标移入横向展开；
        3、“确定、清除”按钮默认为灰色失效状态，选中复选框后，“确定、清除”按钮位移到当前复选框水平位置；
        4、滚动页面，“确定、清除”按钮跟随滚动（不能超出筛选模块）。

* 说明：“确定、清除”按钮
*   1、父级添加class "disableclick"控制是否为灰色失效状态。
*   2、父级添加class "stoptop" "fixed" 控制滚动状态和范围。
*/

function filterFn(){
	this.filterBox = $(".sidebar-filter");
    if(this.filterBox.length==0) return;
    this.filterTop = this.filterBox.offset().top;// 侧边栏距离顶部高度
    this.filterBtns = this.filterBox.find(".sidebar-filter-btns");

	this.init();
}
filterFn.prototype = {

	init:function () {
        this.yAxisfold();//纵向展开折叠
        this.subTitSwitch();//二级菜单切换
        this.winScroll();//滚动页面
        this.clearAllChecked();//"清除"
        this.clickItem();//点击li节点

	},
    //***** 纵向展开/收起功能
    yAxisfold: function(){
        this.filterBox.on("click","dt.tit b,.icon-arrow",function(ev){
            ev.preventDefault();
            parentDl =  $(this).closest("dl");
            parentDl.toggleClass("off");
        });
    },

    //二级菜单：“主要主题/次要主题、中国/国外”的切换
    subTitSwitch: function(){
	    var that = this;
        that.filterBox.on("click","dt.subtit a",function(ev){
            ev.preventDefault();
            parentDl =  $(this).closest("dl");
            if($(this).hasClass("cur"))
                parentDl.toggleClass("off");
            else{
                if(parentDl.hasClass("off")) {
                    parentDl.removeClass("off");
                }

                $(this).addClass("cur").siblings().removeClass("cur");
                _index = $(this).index();
                dd = $(this).parent().siblings("dd");
                dd.eq(_index).attr("style","").siblings("dd").hide();
            }
        });
    },

    clickItem: function(){
        var that = this;
	    //点击文字
        that.filterBox.on("click","li a,li span",function () {
            $(this).parent().find("input").prop("checked", function( i, val ) {return !val;}); //改变li、input选中状态
            that._filterBtnsMove(this);
        });

        //点击复选框
        that.filterBox.on("click","li input[type=checkbox]",function () {
            that._filterBtnsMove(this);
        });
    },

    _filterBtnsMove: function(liChildObj){

	    scrollTop = document.body.scrollTop||document.documentElement.scrollTop; //页面滚动高度
        aTop = $(liChildObj).parent().offset().top;
        filterBtnsTop = this.filterBtns.offset().top;

        len = $(liChildObj).closest(".js-condition").find("input[type=checkbox]:checked").length;
        if(len>0)
            this.filterBtns.removeClass("disableclick");//“确定”蓝色
        else
            this.filterBtns.addClass("disableclick");//“确定”灰色

        goalTop = aTop - scrollTop - (this.filterBtns.find("a").eq(0).outerHeight() - $(liChildObj).parent().height())/2; //“确定”按钮相对选中的li垂直居中对齐
        this.filterTop;
        this.filterBtns.removeClass("stopTop").addClass("fixed")
                     .css("top", filterBtnsTop-scrollTop)
                     .animate({ top : goalTop}, 200);

        // goalTop = aTop - this.filterTop - (this.filterBtns.find("a").eq(0).outerHeight() - $(liChildObj).parent().height())/2; //“确定”按钮相对选中的li垂直居中对齐
        //
        //
        // this.filterBtns.removeClass("stopTop fixed").addClass("stopFixPos")
        //     .css("top", goalTop );


    },

    //"清除"
    clearAllChecked: function(){
	    var that = this;
        that.filterBox.parent().find(".btn-clearall").click(function () {
            $(this).parent().parent().find("input[type=checkbox]").prop("checked",false);//清除所有li、input选中状态
            that.filterBtns.addClass("disableclick");//“确定”灰色
        });
    },

    //滚动页面
    winScroll: function(){
	    var that = this;
        $(window).on('load scroll resize',function(){


            //****纵向滚动页面时 start******/
            scrollTop = document.body.scrollTop||document.documentElement.scrollTop; //页面滚动高度
            screenH = $(window).height(); //当前屏幕高度
            // filterTop = that.filterBox.offset().top;// 侧边栏距离顶部高度
            filterH =  that.filterBox.height();
            filterBtnsH =  that.filterBtns.find("a").outerHeight(true)*2;

            that.filterBtns.attr("style","");

            //筛选条件 → “确定、取消”按钮,用fixed stopTop控制按钮的状态
            // if(that.filterBtns.hasClass("stopFixPos")) return;
            // else{
                minTop = that.filterTop + filterBtnsH;
                maxTop = that.filterTop + filterH;
                //console.log(scrollTop,screenH,minTop);
                if(scrollTop + screenH <= minTop )//固定在上部
                    that.filterBtns.removeClass("fixed").addClass("stopTop");
                if((scrollTop + screenH > minTop) && (scrollTop + screenH < maxTop) )//滚动
                    that.filterBtns.removeClass("stopTop").addClass("fixed");
                if(scrollTop + screenH >= maxTop )//固定在底部
                    that.filterBtns.removeClass("fixed stopTop");
            // }
            //******纵向滚动页面时 end *******/



            //******横向滚动页面时 start ******/
            minWinWidth = 1200;
            filterBtnWidth = that.filterBtns.find("a").outerWidth(); //23px
            if($(window).width() < minWinWidth ) {//出现横向滚动条时
                if (that.filterBtns.hasClass("fixed")) {
                    scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                    that.filterBtns.css("margin-left", -(filterBtnWidth + scrollLeft));
                } else
                    that.filterBtns.css("margin-left","");
            }
            //*****横向滚动页面时 end ******/

        });
    }

};

$(function(){
	new filterFn();//调用
});