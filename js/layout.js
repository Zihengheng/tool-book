// JavaScript Document
/* 
 20170317
 功能：功能合集
 范围：除了工具书库首页的其它子页面
 说明：有些功能是公用的，页面单独的功能都有注释
 */



$(function () {

	new inputFunc();  //调用输入框事件

	$(".extend").click(function () {//高级检索，同义词扩展
		$(this).toggleClass("cur");
	});


	$.sort(".sort","cur"); //分类

	$.resultClassify(); //通用检索结果页、词库检索结果页

	$.filterFunc();//书目浏览页、通用检索结果页==头部公用筛选事件
	$.bookBrowse(".selected-condition"); //书目浏览页
	$.commonResultFunc();//通用检索结果页

	// 侧边栏：导航选择框，
	// 功能：折叠/展开、选中/取消
	// 使用范围：grade-search.html + pics-result.html + from-result.html
	$.sideNavSelectBox();

	// 左侧导航
	// 功能："主题分类索引、拼音索引、笔画索引"的切换事件
	// 使用范围： book-textNav.html+textItem-details.html
	$.sideNavIndexASwitch(".sidenav-index-box",".sidenav-index-content");

	// 左侧边栏：导航树+-
	// 功能：折叠/展开、选中
	// 使用范围：book-textNav.html + textItem-details.html + museum-major.html
	$.sideNavIndexA();

	// 右侧边栏：导航树索引(全文页)
	// 功能：折叠/展开，点击打开新链接
	// 使用范围：全文页search-textItem.html
    $.sideNavTreeB();


	$.setFontSize();  //设置字体大中小

	$.subIndexTabs(".book-subtabs",".book-index-content"); //单本书详情页，正文/音序/笔画索引切换



});

(function($){

	$.extend({

		sort: function(sortSelector,curClass){  //分类
			$(sortSelector).mouseenter(function(){ //分类排序模块
				$selectList = $(this).find("ul");
				$selectList.show();
				$selectList.find("a").click(function(){
					$selectList.siblings().find("span").html($(this).html());
					$(this).parent().addClass(curClass).siblings().removeClass(curClass);
					$selectList.hide();
				});
			}).mouseleave(function(){
				$selectList.hide();
			});
		},



		resultClassify: function(){//通用检索结果页、词库检索结果页

			$(".classify-tit-bar").find(".btn-fold").click(function () { //通用检索结果页，正文的展开、收起
				classifyBox = $(this).parents(".classify-box");
				classifyBox.toggleClass("is-down");
				$(this).attr("title",classifyBox.hasClass("is-down")?"收起":"展开");
			});


			classifyNav = $(".classify-nav");
			classifyNav.find("li").click(function () {          //通用检索结果页,正文的一级导航切换
				_index = $(this).parent().find("li").index(this);
				$(this).addClass("cur").siblings().removeClass("cur");
				$(this).parents(".classify-content").find(".classify-unit").removeClass("is-show").eq(_index).addClass("is-show");
			});


			classifySubNav = $(".classify-subnav");
			classifySubNav.find("li").click(function () {          //词库检索结果页,正文的二级导航切换
				_index = $(this).parent().find("li").index(this);
				$(this).addClass("on").siblings().removeClass("on");
				$(this).parent().siblings(".classify-subunit").find("dl").removeClass("is-show").eq(_index).addClass("is-show");
			});
		},



		// 侧边栏：导航选择框，
		// 功能：折叠/展开、选中/取消
		// 使用范围：grade-search.html + pics-result.html + from-result.html
		sideNavSelectBox : function () {

			sideNavBox = $(".js-sidenav");
			topBar = sideNavBox.find(".top-bar");
			topBar.find(".tab li").click(function () {//一级导航切换=分馆/学科
				$(this).addClass("on").siblings().removeClass("on");
				tabBox = $(this).parent();
				_index = tabBox.find("li").index($(this));
				sideInnerBox = tabBox.parent().siblings(); //".sidenav-content"
				sideInnerBox.find("dl").removeClass("is-show").eq(_index).addClass("is-show");
			});

			topBar.find(".btn-clear").click(function () {//全选/清除事件
				sideInnerBox = $(this).parent().next();//".sidenav-content"
				sideInnerBox.find(".item-nav").removeClass("on");
			});



			innerContainer = sideNavBox.find(".sidenav-content");
			innerContainer.find(".item-nav a").click(function(){  //展开/折叠事件
				nextNavNode = $(this).parent().next();  //下一级导航节点
				if(nextNavNode.length){
					nextNavNode.toggle("fast");
				}
			});
			innerContainer.find(".item-nav .icon").click(function(){//选中/取消事件
				itemNode = $(this).parent(); //".item-nav"
				itemNode.toggleClass("on");
				parentTreeBox = itemNode.parent().parent();
				if(itemNode.hasClass("on")){
					_itemLen = parentTreeBox.find(".item-nav").length;
					_onLen = parentTreeBox.find(".on").length;
					if(_itemLen==_onLen){
						parentTreeBox.prev(".item-nav").addClass("on");
					}
				}else{
					parentTreeBox.prev(".item-nav").removeClass("on");
				}

				if(itemNode.next("ul").length>0 ){
					childTreeBox = itemNode.next("ul");
					childItem = childTreeBox.find(".item-nav");
					itemNode.hasClass("on") ? childItem.addClass("on") : childItem.removeClass("on");
				}
			});

		},

		// 左侧导航
		// 功能："主题分类索引、拼音索引、笔画索引"的切换事件
		// 使用范围： book-textNav.html+textItem-details.html
		sideNavIndexASwitch: function(navContainer,innerContainer){
			sideNavIndexBox = $(navContainer);
			sideNavTabBox = sideNavIndexBox.find(".top-bar");
			sideNavContent = sideNavIndexBox.find(innerContainer);
			sideNavTabBox.find("li").click(function() {
				$(this).addClass("on").siblings().removeClass();
				_index = sideNavTabBox.find("li").index($(this));
				sideNavContent.find("dl").hide().eq(_index).show();
			});
		},


		// 左侧边栏：导航树+-
		// 功能：折叠/展开、选中
		// 使用范围：book-textNav.html + textItem-details.html + museum-major.html
		sideNavIndexA: function(){
            container = $(".js-navtreeA");
            navTreeDl = container.find(".side-navtree-list");

			navTreeDl.find(".icon").click(function(){//展开/折叠下一级导航
				$(this).parent().toggleClass("is-down");
				nextNavNode = $(this).parent().next();//下一级导航节点
				if(nextNavNode.length){
					nextNavNode.toggle("fast");
				}
			});

            navTreeDl.find(".item-nav").click(function(event){//选中/取消
				event.preventDefault();
				if($(event.target).closest(".icon").length != 1){
					container.find(".item-nav").removeClass("on");
					$(this).addClass("on");//".item-nav"
				}

			});
		},


		// 右侧边栏：导航树索引(全文页)
		// 功能：折叠/展开，点击打开新链接
		// 使用范围：全文页search-textItem.html
        sideNavTreeB: function(){
            navTreeDl = $(".js-navtreeB");
            navTreeDl.find(".item-nav").click(function(){//展开/折叠下一级导航

                if($(this).next().html()!=undefined && $(this).next().html()!=""){
                    $(this).toggleClass("is-down");
                    $(this).next().toggle("fast");//下一级导航节点
                }

            });
        },





		setFontSize: function(){  //设置字体大中小
			$(".set-fontsize").find("li").click(function () {
				$(this).addClass("on").siblings().removeClass("on");
				btnA = $(this).find("a");
				textContent = $(this).parents(".result-box").find(".item-details");
				if(btnA.hasClass("l-words")){//大
					textContent.removeClass("content-s").addClass("content-l");
				}
				if(btnA.hasClass("m-words")){//中
					textContent.removeClass("content-s content-l");
				}
				if(btnA.hasClass("s-words")){//小
					textContent.removeClass("content-l").addClass("content-s");
				}
			});
		},




		subIndexTabs: function(navContainer,innrContainer) { //“正文索引、音序索引、笔画索引"的切换事件  book-details.html
			$(navContainer).find("a").click(function () {
				oli = $(this).parent();
				if(!oli.hasClass("cur")){
					oli.addClass("cur").siblings().removeClass("cur");
					_index = $(navContainer).find("a").index($(this));
					$(innrContainer).find("ul").hide().eq(_index).show();
				}
			});
		},


		bookBrowse : function(){//书目浏览页

			modeNav = $(".nav-tabs-mode");
			modeInner = $(".mode-content");
			modeNav.find("li").click(function () {//简单、详情列表切换
				_index = modeNav.find("li").index($(this));
				$(this).addClass("active").siblings().removeClass("active");
				modeInner.find(".js-switch-mode").hide().eq(_index).show();
			});


			$(".filter-btn-list").find("li").click(function(){ //已购买、未购买
				$(this).toggleClass("on");
			});


			waitCon = $(".waiting-condition");
			$("a.btn-condition-bar").click(function(){ //展开↓、收起↑

				if($(this).hasClass("is-down")){
					waitCon.animate({ height: "65px" });
					$(this).removeClass("is-down").addClass("is-up");
					$(this).html("展开&nbsp;↓").attr("title","点击展开");

				}else{
					waitCon.animate({ height: "206px" });
					$(this).removeClass("is-up").addClass("is-down");
					$(this).html("收起&nbsp;↑").attr("title","点击收起");
				}

			});


			publishPop = $(".view-all-popup");//弹出框盒子
			publisherCity = publishPop.find(".publish-citys-list");
			publisherName = publishPop.find(".publish-names-list");

			publisherCity.on("click","li",function(){//点击出版社弹出框中的某个城市
				$(this).addClass("cur").siblings().removeClass("cur");
				_index = publisherCity.find("li").index(this);
				publisherName.find("ul").eq(_index).show().siblings().hide();
			});

			publisherName.on("click","a",function(event){//点击出版社弹出框中的某个出版社
				event.preventDefault();
				if($(this).hasClass("selected")) return;
				$(this).toggleClass("on");
			});



		},


		commonResultFunc: function () {//通用检索结果页

			$(".con-drop-box").find(".sec-menus>li").hover(function () {//二级菜单，鼠标移入事件
				$(this).addClass("active").siblings().removeClass("active");
				_index = $(this).parent().find("li").index(this);
				thirdMenu = $(this).parent().next().find(".third-menus");
				thirdMenu.hide().eq(_index).show();
			});


			publishPop = $(".view-all-popup");//弹出框盒子
			wordsList = publishPop.find(".filter-words-list");
			wordsList.on("click","a",function(event){//点击筛选词弹出框中的某个筛选词
				event.preventDefault();
				if($(this).hasClass("selected")) return;
				$(this).toggleClass("on");
			});



		},

		filterFunc: function () {//书目浏览页、通用检索结果页==公用事件 20170623 第三次修改(增加了横向子菜单、下拉框子菜单)


			selectedCon = $(".selected-condition");
			waitCon = $(".waiting-condition");
			publishPop = $(".view-all-popup");//弹出框盒子

			selectedCon.on("click",".icon-del",function () { //删除已选条件
				_id = $(this).closest("li").attr("data-id");

				if(_id!=undefined && _id!=""){//设置了出版时间的data-id="",一个空id
					waitCon.find("#"+_id).removeClass("selected");
					publishPop.find("#"+_id).removeClass("selected");//移除弹出框中相应菜单选中状态
				}

				$(this).closest("li").remove();
				_judgeSelectedCon();//若已选条件被清空

			});


			selectedCon.on("click",".btn-clear",function () { //全部清除
				selectedCon.find("li").remove();
				selectedCon.hide();

				waitCon.find("a").removeClass("selected");
				waitCon.find(".all").addClass("selected");
				publishPop.find("a").removeClass("selected");//移除弹出框中相应菜单选中状态

			});

			function _judgeSelectedCon(){
				if(selectedCon.find("li").length==0){//若已选条件被全部清空
					selectedCon.hide();
				}

				firUlMenus = waitCon.find("dd>ul");//若某一类已选条件被清空
				firUlMenus.each(function () {
					if($(this).find(".selected").length==0){
						$(this).find(".all").addClass("selected");
					}
				});

			}

			function _addCondition(obj) { //添加筛选条件到“已选条件”
				_id = $(obj).attr("id");
				_text = $(obj).text();
				itemLi = $('<li data-id="'+ _id +'"><span>'+ _text +'<i class="icon-del"></i></span></li>');
				selectedCon.show().find("ul").append(itemLi);
			}


			function _delChildCondition(obj) { //移除被选中的子菜单
				_id = $(obj).attr("id");
				_childId = _id+'-';

				selectedCon.find("li").each(function () { //删除“已选条件”中被选中的子菜单
					_dataId = $(this).attr("data-id").substring(0,_id.length+1);
					if(_dataId==_childId){
						$(this).remove();
					}
				});

				waitCon.find("a[id^='"+_childId+"']").removeClass("selected");//删除子菜单被选中状态
			}

			function _delParentCondition(obj) { //移除被选中的父级菜单
				var arr = new Array();
				_id = $(obj).attr("id");
				arr = _id.split("-");

				_allId = arr[0]; //“全部”
				_firId = _allId + "-" + arr[1];
				_secId = _firId + "-" + arr[2];
				_thirdId = _secId + "-" + arr[3];
				_fourthId = _thirdId + "-" + arr[4];

				selectedCon.find("li").each(function () {//删除“已选条件”中被选中的父级菜单
					_dataId = $(this).attr("data-id");
					if(_dataId==_firId || _dataId==_secId || _dataId==_thirdId ){
						$(this).remove();
					}
				});

				waitCon.find("#"+_allId).removeClass("selected");//移除“全部”选中状态
				waitCon.find("#"+_firId).removeClass("selected");//移除对应父级（一级）菜单选中状态
				waitCon.find("#"+_secId).removeClass("selected");//移除对应父级（二级）菜单选中状态
				waitCon.find("#"+_thirdId).removeClass("selected");//移除对应父级（三级）菜单选中状态
			}


			waitCon.find("a").click(function (ev) {
				ev.preventDefault();

				if($(this).hasClass("js-more-words")){//=================“查看全部》”检索词

					publishPop.center({
						closeBtns:[".close"],//点击这些按钮(若有多个，用英文逗号隔开),可以关闭弹出框
						submitBtn:".sure",
						completeFunc: function(){ //点击确定后的其它事件

							filterWords = $(".filter-words-list");
							filterWords.find(".on").each(function () {
								_addCondition(this);//添加筛选条件到“已选条件”
								$(this).removeClass("on").addClass("selected");
							});

						},

						failFunc:function () { //点击空白处/关闭按钮退出，关闭弹出框
							filterWords.find(".on").removeClass("on");
						}

					});


				}else if($(this).hasClass("js-more-publishers")){//=================“查看全部》”出版社

					publishPop.center({
						closeBtns:[".close"],//点击这些按钮(若有多个，用英文逗号隔开),可以关闭弹出框
						submitBtn:".sure",
						completeFunc: function(){ //点击确定后的其它事件

							publishersName = $(".publish-names-list");
							publishersName.find(".on").each(function () {
								_addCondition(this);//添加筛选条件到“已选条件”
								$(this).removeClass("on").addClass("selected");
							});

						},

						failFunc:function () { //点击空白处/关闭按钮退出，关闭弹出框
							publishersName.find(".on").removeClass("on");
						}

					});


				}else if($(this).hasClass("all")){//=================点击“全部”
					if($(this).hasClass("selected")) return;

					_delChildCondition(this); //移除被选中的子菜单
					_judgeSelectedCon();//若已选条件被清空
					$(this).addClass("selected");

				}else{//================点击一(!"全部")、二、三、四级菜单
					if($(this).hasClass("selected")) return;

					_delChildCondition(this); //移除被选中的子菜单
					_delParentCondition(this); //移除被选中的父级菜单
					_addCondition(this);//添加筛选条件
					$(this).addClass("selected");
				}
			});

		}




	});

})(jQuery);