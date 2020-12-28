// JavaScript Document
/* 
  功能：输入框事件
  范围：每一个带有检索输入框的页面（除了“独立子产品”没有检索框，其它页面都需要用到）
  说明：头部分类导航切换，输入框获取/移除焦点，输入通配符，输入助手菜单切换，输入助手下拉框事件
*/


function inputFunc(options){

	this.defaults = $.extend({
		duration : 0 //输入框位移所花费的时间
	},options);

	this.header = $(".header");
	this.searchMain = $(".searchmain");
	this.topMenu = $(".search-menu");
	this.wildCard = this.searchMain.find(".btn-wildcard");
	this.inputBox = $(".search-input");
	this.navBar = $(".nav-bar");
	this.dropBox = $(".drop-box");
	this.dropContianer = this.dropBox.find(".subnav-container");
	this.dropUnit = this.dropContianer.find(".unit");
	this.advancedSet = this.dropContianer.find(".adv-set");
	this.closeBtn = this.dropBox.find(".close");
	this.moreBtn = this.dropBox.find(".btn-more");

	this.menu = this.dropBox.find(".menu");
	this.subMenu = this.dropBox.find(".submenu");
	this.thirdMenu = this.dropBox.find(".thirdmenu");
	this.fourthMenu = this.dropBox.find(".fourthmenu");

	this.inputDefaultVal = this.inputBox.attr("placeholder");
	this.headPTop = this.header.css("padding-top");
	this.searchMainPTop = this.searchMain.css("padding-top");

	this.topMenuSwitch();//头部分类导航
	this.inputFun();//输入框
	this.navSwitch();//“输入助手”菜单切换
	this.setSelect();//“高级设置”
	this.closeEvent();//关闭按钮事件
	this.dropMenus();//下拉菜单事件
	this.showMoreResult();//more>>
}
inputFunc.prototype = {

	topMenuSwitch: function () {//头部导航
		var that = this;
		that.topMenu.find("li").click(function () {
			$(this).addClass("on").siblings().removeClass("on");
		});
	},

	_addInputText:function (obj) {//向输入框添加文字
		var that = this;
		text = obj.text();
		curVal = that.inputBox.val();
		if(curVal == that.inputDefaultVal){
			that.inputBox.focus().val(text);
		}else{
			that.inputBox.focus().val( curVal+ text );
		}
	},

	inputFun:function () {//输入框
		var that = this;
		that.inputBox.each(function(){

			$(this).focus(function () {//移入光标
				if($(this).val() == $(this).attr("placeholder")){
					$(this).css("color","#333");
					$(this).val("");
				}
			}).blur(function () {//移出光标

				_inputDefaultVal = $(this).attr("placeholder");
				if($(this).val() == "" || $(this).val() == _inputDefaultVal ){
					$(this).css("color","#7d7d7d");
					$(this).val(_inputDefaultVal);
				}
			});
		});
		that.wildCard.click(function () {
			that._addInputText($(this));//向输入框添加文字
		});
	},

	navSwitch : function() {//“输入助手”菜单切换

		var that = this;
		that.navBar.find("li").click(function () {
			if($(this).hasClass("cur")){
				that._closeDrop(); //关闭下拉框
			}else{
				$(this).addClass("cur").siblings().removeClass("cur");

				_index = that.navBar.find("li").index(this);
				if(that.dropBox.is(':visible')){ //下拉框菜单显示时，通过横向位移切换内容

					that.dropContianer.animate({
						"left": -that.dropUnit.outerWidth(true)*_index
					});

				}else{ //下拉框菜单隐藏时

					that.dropContianer.css("left",-that.dropUnit.outerWidth(true)*_index);
					that.header.animate({"padding-top": "0"});
					that.searchMain.animate({
						"padding-top": "0"
					},that.defaults.duration,function () {
						that.dropBox.slideDown("fast");
					});
				}
			}


		});


	},

	setSelect: function () {//“高级设置”
		var that = this;
		that.advancedSet.find("li").click(function () {
			$(this).toggleClass("on");
			if($(this).hasClass("js-all")){
				if($(this).hasClass("on")){
					$(this).siblings().removeClass("on");
				}
			}else{
				allBtn = $(this).siblings(".js-all");
				if(allBtn.length){
					allBtn.removeClass("on");
				}

			}

		});
	},

	closeEvent: function () { //关闭按钮事件
		var that = this;
		that.closeBtn.on("click",function () {
			that._closeDrop();
		});
	},

	_closeDrop: function () { //关闭下拉框
		var that = this;
		that.dropBox.slideUp("fast","swing",function () {
			that.header.animate({"padding-top" : that.headPTop});
			that.searchMain.animate({"padding-top" : that.searchMainPTop});
			that.navBar.find("li").removeClass("cur");
		});

	},

	showMoreResult : function () {//more>>
		var that = this;
		that.moreBtn.on("click",function (event) {
			event.preventDefault();
			resuleMore = $(this).parents(".result-box").find(".result-more");
			resuleMore.toggle();
		});
	},

	dropMenus:function () {//下拉框菜单最少有二级，最多有四级
		var that = this;
		that.menu.find("a").click(function () {//1
			subMenuBox = $(this).parents(".menu").siblings(".submenu-box");
			_nextShow($(this),subMenuBox);//展示下一级

		});

		that.subMenu.find("a").click(function () {//2
			thirdMenuBox = $(this).parents(".submenu-box").find(".thirdmenu-box");
			if(thirdMenuBox.length) {
				_nextShow($(this),thirdMenuBox);//展示下一级
			}else{//若无下级菜单
				_addHZ($(this));//展示汉字信息，并向输入框添加文字
			}

		});


		that.thirdMenu.find("a").click(function () {//3
			fourthMenuBox = $(this).parents(".thirdmenu-box").find(".fourthmenu-box");
			if(fourthMenuBox.length) {
				_nextShow($(this),fourthMenuBox);//展示下一级
			}else{//若无下级菜单
				_addHZ($(this));//展示汉字信息，并向输入框添加文字
			}

		});


		that.fourthMenu.find("a").click(function () {//4
			_addHZ($(this));//展示汉字信息，并向输入框添加文字
		});


		function _nextShow(node,nextObj){//展示下一级
			node.parent().addClass("active").siblings().removeClass("active");
			nextObj.show();
		}

		function _addHZ(node){//展示汉字信息，并向输入框添加文字
			resultHZ = node.parents(".unit").find(".result-box");
			_nextShow(node,resultHZ);//展示汉字
			that._addInputText(node);//向输入框添加文字
		}
	}




};
