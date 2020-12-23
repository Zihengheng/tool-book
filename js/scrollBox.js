// JavaScript Document

/*
 功能：焦点图切换
 范围：专业馆、科普馆、语言馆
*/

$.fn.scrollTab = function(options) {

    return $.each(this,function(i,obj){//回调
        var element = $(obj);
        if (element.data('scrollTab')) {
            return element.data('scrollTab');
        }else{
            var scrollTab = new ScrollTab(this,options);
            element.data('scrollTab', scrollTab);
        }
    });

};

function ScrollTab(el,options) {

    this.el = $(el);
    this.opts = $.extend({
        pointBox: ".tabs",
        curClass: "on",
        showLen: "1",
        delayTime : 3000,//单位毫秒
        prev: "",//".prev" 上一个
        next: "",//".next" 下一个
        autoPlay: true
        // loop: "infinite"//无限循环,Single、infinite
    }, options);

    this.opts.autoPlay=this.opts.autoPlay!=undefined&&$(this.opts.autoPlay)!=""?this.opts.autoPlay:true;
    this.ulBox = this.el.find(".items");
    this.oUl = this.ulBox.find("ul");
    this.btns = this.el.find(this.opts.pointBox).find("a");
    this.ulW = this.oUl.outerWidth(true);

    this.number = 0;
    this.distance = 0;
    this.tabChange=null;
    this.maxNumber = this.btns.length;
    this.init();
}
ScrollTab.prototype = {
    init:function () {
        var that = this;
        // if(that.opts.loop=="infinite"){
        //     newUl = that.oUl.html();
        //     that.oUl.append(newUl);
        // }
        that.ulBox.width(that.ulW * that.oUl.length + 'px');
        that.bindEvent();

    },

    bindEvent : function () {
        var that = this;

        that.btns.mouseenter(function(){
            var index = $(this).index();
            that.number = index;
            that.scroll(that.number);
        });

        if($(that.opts.prev).length>0){
            $(that.opts.prev).click(function () {
                that.number--;
                that.number < 0 ? that.number = that.maxNumber-1 : that.number;
                that.scroll(that.number);
            });

        }
        if($(that.opts.next).length>0){
            $(that.opts.next).click(function () {
                _autotab();
            });

        }
        if(that.opts.autoPlay) {
            that.tabChange = setInterval(_autotab,that.opts.delayTime);
            //鼠标悬停暂停切换
            that.el.mouseover(function(){
                clearInterval(that.tabChange);
            });
            that.el.mouseout(function(){
                that.tabChange = setInterval(_autotab,that.opts.delayTime);
            });
        }

        function _autotab() {
            that.number++;
            that.number == that.maxNumber ? that.number = 0 : that.number;
            that.scroll(that.number);
        }

    },

    scroll:function (num) {
        var that = this;
        that.btns.eq(num).addClass(that.opts.curClass).siblings().removeClass(that.opts.curClass);
        that.distance = -that.el.width() * num ;

        console.log(that.el.outerWidth());
        that.ulBox.stop().animate({
            left: that.distance
        }, 400);
    }
};
