// JavaScript Document
/*
  20160331  以下所有函数都是独立的，如无需要可以删除
*/

//分组筛选→右侧箭头水平展开、折叠
/*function resultHide(objectchild) {
    var parentwidth = $(objectchild).parent().width();
    objUl = $(objectchild).parent().find("ul:not(.is-hide)");
    len = objUl.length;
    if(objUl.length>5){
        len = Math.ceil(objUl.length/2);
    }
    divwidth = objUl.outerWidth()*len;
    if ((parentwidth + 2) < divwidth) {
        $(objectchild).parent().width(divwidth);
        $(objectchild).parent().addClass("show");
        $(objectchild).addClass("on");
    }
    else {
        $(objectchild).parent().attr("style","");
        $(objectchild).parent().removeClass("show");
        $(objectchild).removeClass("on off");
    }
}*/

function resultHide(object) {

    var thisWidth = object.width();
    objUl = object.find("ul");

    if(objUl.closest("dl").hasClass("off")) {
        return;
    }

    len = objUl.length;
    if(objUl.length>5){
        len = Math.ceil(objUl.length/2);
    }
    divwidth = objUl.outerWidth()*len;
    if ((thisWidth + 2) < divwidth) {
        object.width(divwidth).slideDown(500,function () {
            $(this).addClass("show")
        });
        object.parent().slideDown(500,function () {
            $(this).addClass("is-show")
        });
        object.find(".btn").addClass("on");
    }
    else {
        object.attr("style","").removeClass("show");
        object.parent().removeClass("is-show");
        object.find(".btn").removeClass("on");
    }
}
function mouseout(obj) {
    var _this = this;
    this.in_dom = function (m, n) {
        if (m == n) return true;
        else if (!m.parentNode) return false;
        else if (m.parentNode == n) return true;
        else return _this.in_dom(m.parentNode, n);
    };
    $(obj).mouseleave(function (event) {
        var event = arguments[0] || window.event;
        var x = event.relatedTarget || event.toElement; // 鼠标滑出的目标元素
        if (!_this.in_dom($(x), obj)) {
            $(obj).attr("style","").removeClass("show");
            $(obj).parent().removeClass("is-show");
            $(obj).find("a.btn").removeClass("on");
        }
    });
}



$(function(){


    /*可视化分析图弹出框事件 start*/
    $(".wrapper").on("click",".btn-visual",function () {
        url = $(this).attr("data-src");
        visualPop = $('<div class="visual-pop">\n' +
            '    <iframe width="100%" src="'+ url +'" frameborder="0"></iframe>\n' +
            '    <div class="row">\n' +
            '      <input type="text"  value="2001" /> <label>——</label> <input type="text" value="2018" /> <input type="button"  value="筛选"/>\n' +
            '    </div>\n' +
            '  </div>')
            .appendTo($("body"));

        layer.open({
            type: 1,
            title:"",
            area:['1140px',"580px"],
            content: visualPop
        });

    }).on("click",".icon-visual",function () {
        url = $(this).attr("data-src");
        visualPop = $('<div class="visual-pop">\n' +
            '    <iframe width="100%" src="'+ url +'" frameborder="0"></iframe>\n' +
            '</div>')
            .appendTo($("body"));

        layer.open({
            type: 1,
            title:"",
            area:['1140px',"540px"],
            content: visualPop
        });
    });
    /*可视化分析图弹出框事件 end*/


    // $.copyRight();//版权标记 © 1998-2018 中国知网（CNKI）

    //placeholder兼容ie7、8、9
    $.placeholderFunc();


    $(".sidebar-publication-list").find("li").mouseenter(function () {  //“推荐、热门”右侧边栏事件
        $(this).addClass("cur").siblings().removeClass("cur");
    });

    /*
    * 功能: 模拟select选择框
    * 适用范围：⑴输入框检索字段：主题、关键词、篇名、作者 ···
    *          ⑵.page-show-count 每页显示10、20、30···
    */
    $.sort();


    $.switches(".menus","li","active");//"我的关注、推荐、热门文献"切换
    // $.switches(".switch-ChEn","a","cur");//中英文切换
    // $.switches(".switch-r","li","active");//外文、中文切换


    //收藏按钮
    $.collect();

    //高级检索切换为列表模式下的收藏按钮
    $.gradeCollect();


    //"关注"按钮
    $.follow();


    /*
    * 范围：页头数据库分类：文献、期刊、博硕士、报纸、年鉴、会议···
    * */
    //$.dataClassify();

    /*
    * 范围：页面宣传模块的展开/收起、关闭按钮
    * 功能：该模块的展开/收起、关闭按钮
    * */
    $.category();


    /*
   * 范围：期刊左侧导航菜单 qk-qk-result.html/qk-wx-hot.html
   * 功能：鼠标移入展开、折叠子菜单，点击选中
   * */
    $.clickNav('.guide>.item','.contentbox','selected');


    //检索结果页：工具栏--横向排序→升序、降序
    $.orderGroup(".order","descend","ascend");


    /*检索结果页：工具栏--竖向排序*/
    $.SortBY('.sortwr','.sort-default','select');

    //检索结果页：工具栏-中外文-下拉菜单
    $.sortChEn('.sort-ChEn','.sort-default','cur');


    /*
    * 范围：期刊的"文献检索结果页"
    * 功能：左侧“分组筛选”的展开/收起、单/多选、选中筛选条件，“已选条件”，全部清除，定制检索式
    * */
    //$.filterFunc();


    /*
    * 范围：检索结果页：批量下载、导出/参考文献、计量可视化分析
    * 功能：点击显示下拉菜单
    * */
    //$.btnlist();


    /*
     * 范围：“我的关注”侧边栏：检索历史、浏览历史、下载历史
     * 功能：点击“∨”、“∧”展开、折叠列表
     * */
    $.sidebarHistory();


    //我的关注页：检索式列表折叠、展开全部
    $.myFollowPage();



    /*
    * 范围：推荐页面 qk-wx-recommend.html
    * 功能：点击刷新，加载更多列表
    * */
    $.loadMore();


    // "详情Detail"、"列表Table"切换
    $.changeListDT();


    /*
    * 范围：文献管理中心
    * 功能：选中复选框，删除
    * */
    $.manageCenter();

    /*
     * 范围：标准、古籍、专利宣传模块右侧轮播图
     * */
    $.sliderBanner();


    /*功能：返回顶部
    * 说明：页面较长，滚动到大于1000px时，会显示“返回顶部”按钮
    * */
    $.backTop();

    /*
    * 范围：检索结果列表页
    * 功能：只在ie7/8下运行，为切换后的列表页的奇数行加上背景颜色
    * 说明：ie7/8不支持css伪类 :nth-child(odd),用脚本解决这个兼容问题
    * */
    if(navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0"||navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")) {
        $(".result-table-list").find("tr").each(function (i) {
            if(i%2==1){
                $(this).addClass("odd");
            }
        });
    }

    /*
     * 范围：“专利--IPC代码提示”页
     * 功能：点击+/—按钮，可展开/收起子菜单
     * */
    $.IPCIcon();


    //"检索设置"的选中变色
    $.individualization();

    //将“作者、分类号、基金、文献来源、作者单位、项目”串联起来
    //$.linkPages();

    //摘要模式下，作者机构更多信息的展开、折叠
    $.showHideAuthorList();


    //检索设置
    $.searchSetting();

    //“引用”弹出框
    $.quote();

    //2021 标签切换
    tabFunc(".trans-dt", "#trans-tabs li", "cur", ".trans-con", "active", "mousedown");
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

(function($){

    $.extend({
        //placeholder兼容ie7、8、9
        placeholderFunc: function(){
            // 如果不支持placeholder，用jQuery来完成
            if (!isSupportPlaceholder()) {
                // 遍历所有input对象, 除了密码框
                $('input').not("input[type='password']").each(
                    function () {
                        var self = $(this);
                        var val = self.attr("placeholder");
                        input(self, val);
                    }
                );
            }

            // 判断浏览器是否支持placeholder属性
            function isSupportPlaceholder() {
                var input = document.createElement('input');
                return 'placeholder' in input;
            }

            // jQuery替换placeholder的处理
            function input(obj, val) {
                var $input = obj;
                var val = $.trim(val);
                $input.attr({ "value": val,"style":"color:#999"});
                $input.focus(function () {
                    if ($.trim($input.val()) == val) {
                        $(this).attr({ "value": "","style":"color:#333"});
                    }
                }).blur(function () {
                    if ($input.val() == "") {
                        $(this).attr({ "value": val,"style":"color:#999"});
                    }
                });
            }
        },

        // copyRight: function(){
        //     var date = new Date;
        //     document.getElementById('copyright').innerHTML = "© 1998-" + date.getFullYear() + " 中国知网（CNKI）";
        // },


        /*
        * 范围：cnki logo旁的数据库分类：文献、期刊、博硕士、报纸、年鉴、会议···
        * */
        dataClassify: function () {
            dataObj = $(".data-classify");
            dataMenu = dataObj.find(".data-menu");
            dataObj.find(".data-selected").on("click",function(){
                dataObj.toggleClass("on");
                dataMenu.slideToggle(100);
            });

            dataObj.find("ul a").on("click",function(){//选择分库
                dataObj.find(".data-selected span").html( $(this).text());
            });

            $(document).click(function(e){
                if(dataObj.hasClass("on")){
                    if($(e.target).closest(".data-menu a").length==1 || $(e.target).closest(".data-classify").length==0 ){//点击关闭按钮、某个数据库或悬浮框以外的区域
                        dataObj.removeClass("on");
                        dataMenu.stop().slideUp(100);
                    }
                }
            })

        },


        /*
        * 范围：页面宣传模块
        * 功能：该模块的向下展开/向上收起、关闭
        * */
        category: function () {
            obj = $(".category");
            if(obj.length==0) return;
            btnClose = obj.find(".btn-close");
            btnUpDown = obj.find(".btn-updown");

            btnClose.on("click",function (event,speed) {//关闭
                speed == undefined ? speed = "fast" : speed;
                btnUpDown = $(this).parent().next();//展开/收起按钮
                $(this).parent().slideUp(speed);
                btnUpDown.removeClass("is-down").addClass("is-up").attr("title","展开");
            });

            $(window).on("load scroll resize",function () {
                dis = $(window).width()-1200 < 0? 0 : $(window).width()-1200;
                btnClose.css({
                    "left": 1200 + dis*0.9 - btnClose.width(),
                    "margin-left":$(window).scrollLeft
                });
            });

            $(window).on("load",function () {
                setTimeout(function () {
                    btnClose.trigger("click",["slow"]);
                },3000);
            });

            btnUpDown.click(function () {//宣传模块的展开/收起切换
                _this = $(this);
                $(".js-category-box").slideToggle("fast");//.js-category-box的展开/收起
                _this.toggleClass("is-up is-down");
                if(_this.hasClass("is-up")){
                    _this.attr("title","展开");
                }else{
                    _this.attr("title","收起");
                }
            });

        },



        /*
        * 范围：期刊左侧导航菜单 qk-qk-result.html/qk-wx-hot.html
        * 功能：鼠标移入展开、折叠子菜单，点击选中
        * */
        clickNav: function (FirSelector,SecSelector,curClass){

            //导航初始化
            $(SecSelector).find("li").each(function() {
                ddLength = $(this).find("dd").length;
                ddW = $(SecSelector).find("dd").outerWidth(true);
                if(ddLength==0){//二级导航中没有横向菜单时，删除右侧箭头>
                    $(this).find(">span").addClass("noIcon");
                }else if(ddLength<4){//横向菜单少于4个时，缩短宽度
                    $(this).find("dl").width(ddLength*ddW);
                }
            });

            //当三级菜单后的括号中数字为0时，字体为灰色，不可点
            $(SecSelector).find("dd").each(function(){
                ddHtml  = $(this).html();
                var num = parseInt(ddHtml.replace(/[^0-9]/ig,""));
                if(num==0){
                    $(this).children().css({"cursor":"default","color":"#999"});
                }
            });

            //点击一级导航
            $(FirSelector).click(function(){
                var _self = $(this);
                var j = $(FirSelector).index(_self);
                guide =  $(this).parent();
                guide.siblings().removeClass(curClass);//清除所有的selected类，仅添加在当前被点击项
                $(FirSelector).eq(j).parent().toggleClass(curClass);
                guide.siblings().find(SecSelector).slideUp();
                $(SecSelector).eq(j).slideToggle();//显示当前点击的元素
            });

            //点击二、三级导航
            $(SecSelector).find("a").click(function(){
                $(SecSelector).find("li").removeClass("cur");
                $(this).parents("li").addClass("cur");
            });
        },

        /*
        * 范围：文献的"文献检索结果页"  wx-wxChEn-result.html、qk-wxEn-result.html、wx-gradeSearch-result.html
        * 功能：左侧“分组筛选”的展开/收起，选中，删除已选条件，“全部清除”
        * */
        filterFunc: function () {

            filterBox = $(".js-condition");
            if(filterBox.length==0) return;
            filterBtns = filterBox.parent().find(".sidebar-filter-btns");

            //***** 侧边栏分组筛选→纵向展开/收起功能
            $(".sidebar-filter").on("click","dt.tit b,.icon-arrow",function(ev){
                ev.preventDefault();
                parentDl =  $(this).closest("dl");
                parentDl.toggleClass("off");
            });

            //***** 侧边栏分组筛选→“主要主题/次要主题、中国/国外”切换
            $(".sidebar-filter").on("click","dt.subtit a",function(ev){
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



            //***** 侧边栏分组筛选→点击文字
            filterBox.on("click","li a,li span",function () {
                $(this).parent().find("input").prop("checked", function( i, val ) {return !val;}); //改变li、input选中状态
                _filterBtnsMove(this);

            });

            //***** 侧边栏分组筛选→点击复选框
            filterBox.on("click","li input[type=checkbox]",function () {
                _filterBtnsMove(this);
            });

            function _filterBtnsMove(liChildObj){
                scrollTop = document.body.scrollTop; //页面滚动高度
                aTop = $(liChildObj).parent().offset().top;
                filterBtnsTop = filterBtns.offset().top;

                len = $(liChildObj).closest(".js-condition").find("input[type=checkbox]:checked").length;
                if(len>0)
                    filterBtns.removeClass("disableclick");//“确定”蓝色
                else
                    filterBtns.addClass("disableclick");//“确定”灰色

                goalTop = aTop - scrollTop - (filterBtns.find("a").eq(0).outerHeight() - $(liChildObj).parent().height())/2; //“确定”按钮相对选中的li垂直居中对齐

                filterBtns.removeClass("stopTop").addClass("fixed")
                    .css("top", filterBtnsTop-scrollTop)
                    .animate({ top : goalTop}, 200);

            }


            /********************************* 侧边栏"分组筛选"→ "确定"+"清除全部" start*****************************/


            //***"清除全部"按钮
            filterBox.parent().find(".btn-clearall").click(function () {
                $(this).parent().parent().find("input[type=checkbox]").prop("checked",false);//清除所有li、input选中状态
                filterBtns.addClass("disableclick");//“确定”灰色
            });


            //***滚动页面
            $(window).on('load scroll resize',function(){

                //****纵向滚动页面时 start******/
                scrollTop = document.body.scrollTop; //页面滚动高度
                screenH = $(window).height(); //当前屏幕高度
                filterTop = filterBox.offset().top;// 侧边栏距离顶部高度
                filterH =  filterBox.height();
                filterBtnsH =  filterBtns.find("a").outerHeight(true)*2;
                //筛选条件 → “确定、取消”按钮,用class控制按钮的状态
                filterBtns.css("top","");
                minTop = filterTop + filterBtnsH;
                maxTop = filterTop + filterH;
                //console.log(filterTop,minTop,maxTop);

                if(scrollTop + screenH <= minTop )//固定在上部
                    filterBtns.removeClass("fixed").addClass("stopTop");
                else if(scrollTop + screenH >= maxTop )//固定在底部
                    filterBtns.removeClass("fixed stopTop");
                else if((scrollTop + screenH > minTop) && (scrollTop + screenH < maxTop) )//滚动
                    filterBtns.removeClass("stopTop").addClass("fixed");
                //******纵向滚动页面时 end *******/



                //******横向滚动页面时 start ******/
                minWinWidth = 1200;
                filterBtnWidth = filterBtns.find("a").outerWidth(); //23px
                // if( $(window).width() < ( minWinWidth + filterBtnWidth*2 ) ){//当前窗口可视化宽度小于 1246px 时
                //     mLeft = filterBtnWidth - ( $(document).width() - 1200 )/2;//取值区间（0,23]
                //     $(".sidebar-filter").css("margin-left",mLeft);//为了让“确定、取消”按钮显示全，左侧边栏向右挪动
                // }
                if($(window).width() < minWinWidth ){//出现横向滚动条时
                    if(filterBtns.hasClass("fixed"))
                        filterBtns.css("margin-left",-(filterBtnWidth + document.body.scrollLeft));
                    else
                        filterBtns.css("margin-left","");
                }
                //*****横向滚动页面时 end ******/

            });
            /********************************* 侧边栏"分组筛选"→ "清除全部+确定" end************************************/

        },


        /*范围：检索结果页：批量下载、导出/参考文献、计量可视化分析
        * 功能：点击显示下拉菜单
        * */
        btnlist: function(){
            $(".btnlist").find(">li").click(function () {
                childUl = $(this).find("ul");
                if(childUl.length>0 ){
                    childUl.toggle()
                }
            }).mouseleave(function () {
                childUl = $(this).find("ul");
                if(childUl.length>0){
                    childUl.hide();
                }
            });
        },



        /*
        * 范围：推荐页面 qk-wx-recommend.html
        * 功能：点击刷新，加载更多列表
        * */
        loadMore : function () {

            /*初始化*/
            var counter = 0; /*计数器*/
            var pageStart = 0; /*offset*/
            var pageSize = 4; /*size*/

            /*首次加载*/
            getData(pageStart, pageSize);//加载数据列表

            /*监听加载更多*/
            $(".main").on('click', '.btn-refresh', function(){
                counter ++;
                pageStart = counter * pageSize;
                console.log(pageStart);
                getData(pageStart, pageSize);//加载数据列表
            });

            function getData(offset,size){
                // $.ajax({
                //     type: 'GET',
                //     url: '',
                //     dataType: 'json',
                //     success: function(reponse){
                        //var data = reponse.list;
                        var sum = 15; //length;
                        var result = '';
                        /****业务逻辑块：实现拼接html内容并append到页面*********/
                        //console.log(offset , size, sum);
                        /*如果剩下的记录数不够分页，就让分页数取剩下的记录数
                        * 例如分页数是5，只剩2条，则只取2条
                        * 实际MySQL查询时不写这个不会有问题
                        */
                        if(sum - offset < size ){
                            size = sum - offset;
                        }

                        /*使用for循环模拟SQL里的limit(offset,size)*/
                        for(var i=offset; i< (offset+size); i++){
                            result +='<dd>\n' +
                                '<h6><a href="#">美国互联网金融的发展及中美互联网金融的比较——基于网络经济学视角的研究与思考</a></h6>\n' +
                                '  <p class="baseinfo">\n' +
                                '    <span><a href="#">罗珉</a>; <a href="#">李亮宇</a></span>\n' +
                                '    <span><a href="#">中国工业经济</a></span>\n' +
                                '    <span>2015年01期  / 30-31页</span>\n' +
                                '    <em>学术期刊</em>\n' +
                                '  </p>\n' +
                                '  <p class="abstract">法》本书选用以网络环境为背景而广泛使用的SQL Server 2000关系型数据库管理系统作为数据库系统平台,全面系统地介绍了数据库技术的基础理论、数据库系统设计方法、VisualBasic6.0具有编程能力卓越、应用领域广的优势,其技术已发展近乎成熟。VB6.0访问数据库有着不同的方案,尤其是V...</p>\n' +
                                '  <div class="opts">\n' +
                                '    <ul class="opts-count">\n' +
                                '      <li><em>21</em>次被引</li>\n' +
                                '      <li><em>1251</em>次下载</li>\n' +
                                '      <li class="date">发表时间：2017-08-09</li>\n' +
                                '    </ul>\n' +
                                '    <ul class="opts-btn">\n' +
                                '      <li class="btn-collect"><a href="javascript:void(0)"><i class="icon icon-collect"></i><b>收藏</b></a></li>\n' +
                                '      <li><a href="#"><i class="icon icon-html"></i>HTML阅读</a></li>\n' +
                                '      <li><a href="#"><i class="icon icon-download"></i>下载</a></li>\n' +
                                '    </ul>\n' +
                                '  </div>\n' +
                                '</dd>';
                        }

                        $('.detail-list').append(result);

                        /*******************************************/

                        /*隐藏刷新按钮*/
                        if ( (offset + size) >= sum){
                            $(".btn-refresh").hide();
                        }else{
                            $(".btn-refresh").show();
                        }
                //     },
                //     error: function(xhr, type){
                //         alert('Ajax error!');
                //     }
                // });
            }

        },


        // "详情Detail"、"列表Table"切换
        changeListDT: function() {
            switchSelector = $(".change-list");
            switchSelector.find("li").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                objClass = $(this).attr("data-obj");
                otherObjClass = $(this).siblings().attr("data-obj");
                $("."+objClass).show();
                $("."+otherObjClass).hide();
            });
        },



        /*
        * 范围：文献管理中心 management.html
        * 功能：选中复选框，删除
        * */
        manageCenter:function () {
            manageTable = $(".manage-table");

            //if(manageTable.length==0) return;
            //btnCheckAll = manageTable.find(".checkAll");
            //tableInput = manageTable.find("tbody input[type=checkbox]");

            setSeq();//添加列表序号

            manageTable.find(".del a").click(function () {//删除单行
                $(this).parents("tr").remove();
                setSeq();//重新添加列表序号
            });

            $(".btn-delall").click(function () {//“全部删除”按钮
                manageTable.find("tbody input[type=checkbox]:checked").parents("tr").remove();
                manageTable.find(".checkAll").prop("checked",false);//重置全选按钮
                setSeq();//重新添加列表序号
            });


            manageTable.find(".checkAll").click(function () {//全选、全不选
                tableInput = manageTable.find("tbody input[type=checkbox]");
                if($(this).prop("checked")==true)
                    tableInput.prop("checked",true);
                else
                    tableInput.prop("checked",false);
            });

            manageTable.find("tbody input[type=checkbox]").click(function () {//不全选
                btnCheckAll = manageTable.find(".checkAll");
                tableInput = manageTable.find("tbody input[type=checkbox]");
                if($(this).prop("checked")==true){
                    len = tableInput.length;//复选框（除全选按钮）总数
                    checkedLen = manageTable.find("tbody input[type=checkbox]:checked").length;//被选中的复选框（除全选按钮）个数
                    if(len==checkedLen){
                        btnCheckAll.prop("checked",true);//选中全选框
                    }
                } else{
                    btnCheckAll.prop("checked",false);//取消选中全选框
                }
            });

            function setSeq(){//添加行序号
                manageTable.find("tbody tr").removeClass("odd");//清除所有行的背景色
                manageTable.find("tbody .seq").each(function (i) {
                    $(this).html(++i);
                    if(i%2==1)
                        $(this).parents("tr").addClass("odd");//奇数行添加控制背景色的class
                });
            }

        },



        /*
        * 功能: 模拟select选择框
        * 适用范围：⑴输入框检索字段：主题、关键词、篇名、作者 ···
        *          ⑵检索结果工具栏：每页显示10、20、30···
        */
        sort: function(){

            // $("body").on("click",".sort",function(){
            //     $selectList = $(this).find(".sort-list");
            //     $selectList.toggle().find("li").click(function(){
            //         if($(this).hasClass("tit")) return;//排除“期刊”检索词的分类标题
            //         titSpan = $selectList.siblings().find("span");
				// 	titInput = $selectList.siblings().find("input[type=text]");//高级检索 起始年/结束年
				// 	if(titSpan.length>0)
				// 	  titSpan.html($(this).text());
				// 	else if(titInput.length>0)
				// 	  titInput.val($(this).text());
            //
            //         $selectList.find("li").removeClass("cur");
            //         $(this).addClass("cur");
            //         $selectList.hide();
            //     });
            // });
            // $("body").on("mouseleave",".sort",function(){
            //     $(this).find(".sort-list").hide();
            // });

            $("body").on("click",".sort-default",function(){
                $(this).siblings(".sort-list").toggle();
            }).on("mouseleave",".sort",function(){
                $(this).find(".sort-list").hide();
            });

            //输入框检索词：主题、关键词、篇名、作者 ···
            $(".search-main").on("click",".sort-list li",function(){
                _sortLiCommonFunc(this);
                $(this).closest(".input-box").find("input[type=text]").attr("placeholder","");
            });

            //检索结果工具栏：每页显示10、20、30···
            $(".page-show-count").on("click",".sort-list li",function(){
                _sortLiCommonFunc(this);
            });

            //词频
            $(".search-classify").on("click",".freq li",function(){
                _sortLiCommonFunc(this);
            });

            //精确、模糊
            $(".search-classify").on("click",".special li",function(){
                _sortLiCommonFunc(this);
            });

            //高级检索：起始年结束年、更新时间
            $(".extend").on("click",".sort-list li",function(){
                _sortLiCommonFunc(this);
            });

            function _sortLiCommonFunc(liObj){
                if($(liObj).hasClass("tit")) return;//排除“期刊”检索词的分类标题
                $selectList = $(liObj).parents(".sort-list");
                if($(liObj).hasClass("cur")){
                    $selectList.hide();
                    return;
                }
                titSpan = $selectList.siblings().find("span");
                titInput = $selectList.siblings().find("input[type=text]"); //高级检索 起始年/结束年
                if(titSpan.length>0)
                    titSpan.html($(liObj).text());
                else if(titInput.length>0){
                    titInput.val($(liObj).text());
                }


                $selectList.find("li").removeClass("cur");
                $(liObj).addClass("cur");
                $selectList.hide();
            }

        },



        //切换
        switches: function(switchSelector,menuSelector,curClass) {
            $(switchSelector).find(">"+ menuSelector).click(function () {
                $(this).addClass(curClass).siblings().removeClass(curClass);
            });
        },


        //检索结果页：工具栏--横向排序→降序、升序
        orderGroup: function(orderSelector,curClass1,curClass2){
            $(orderSelector).find("li").click(function(){
                _index = $(this).parent().find("li").index($(this));
                text = $(this).text();
                //"主题"只有降序
                if( text == "主题" || $(this).hasClass(curClass2) || $(this).hasClass('') ){
                    $(orderSelector).each(function(){
                        $(this).find("li").removeClass().eq(_index).addClass(curClass1);
                    });
                }else if( text != "主题" && $(this).hasClass(curClass1) ){
                    $(orderSelector).each(function(){
                        $(this).find("li").removeClass().eq(_index).addClass(curClass2);
                    });
                }

                // _thID = $(this).attr("data-id");
                // _className = $(this).attr("class");
                // $(".result-table-list").find("th a").removeClass();
                // $(".result-table-list").find("#"+_thID).addClass(_className);
            });

            //点击表格标题：例：发表时间、被引、下载
            $(".result-table-list").find("th a").click(function () {
                if( $(this).hasClass(curClass2) || $(this).hasClass('') ){
                    $(".result-table-list").find("th a").removeClass();
                    $(this).addClass(curClass1);

                }else if($(this).hasClass(curClass1)){
                    $(".result-table-list").find("th a").removeClass();
                    $(this).addClass(curClass2);
                }
                _thID = $(this).attr("id");
                _className = $(this).attr("class");
                $(orderSelector).find("li").removeClass();
                $(orderSelector).find("li[data-id="+ _thID +"]").addClass(_className);
            });



        },


        //期刊检索结果页：工具栏--竖向排序
        SortBY: function(Selector,Default,selectClass){

            $(Selector).click(function(){
                $(this).find("ul").show();
            }).mouseleave(function(){
                $(this).find("ul").hide();
            });

            var click_i = 0;
            $(Selector).find("a").click(function(){
                $(this).parent().addClass(selectClass).siblings().removeClass(selectClass);

                //升降序
                $sortDefault = $(Selector).find(Default);
                $sortList = $(Selector).find("ul");
                _index = $(Selector).find("a").index($(this));

                if( click_i == _index){
                    $(this).find("i").toggleClass("ascend descend");
                }

                click_i = _index;
                $sortDefault.find("span").html($(this).html());
                $sortList.hide();

            });
        },


        //检索结果页：工具栏-中外文-下拉菜单
        sortChEn: function(Selector,Default,selectClass){

            $(Selector).click(function(){
                $(this).find("ul").show();
            }).mouseleave(function(){
                $(this).find("ul").hide();
            });
            $sortDefault = $(Selector).find(Default);
            $sortList = $(Selector).find("ul");
            $(Selector).find("a").click(function(){
                $(this).parent().addClass(selectClass).siblings().removeClass(selectClass);
                $sortDefault.find("span").html($(this).html());
                $sortList.hide();

            });
        },




        //收藏按钮
        collect: function(){
            $("body").on("click",".btn-collect",function(){
                $(this).toggleClass("hascollected");

                if( $(this).hasClass("hascollected")){
                    $(this).find("b").html("已收藏");
                }else{
                    $(this).find("b").html("收藏");
                }
            });
        },



        //高级检索切换为列表模式下的收藏按钮
        gradeCollect: function(){
            $("body").on("click",".icon-collection",function(){
                $(this).toggleClass("hascollected");
            });
        },



        /*功能："关注"按钮
        * 说明：目前有两种“关注”格式，所以添加了一个属性"data-defaultText"，用来记录默认内容，取消关注后恢复默认内容。没有该属性，表示默认text为空，无需记录。
        * */
        follow: function(){
            $(".btn-follow").click(function () {
                if(!$(this).hasClass("hasfollowed")){ //关注
                    $(this).addClass("hasfollowed").html("已关注").attr("title","取消关注");
                }else{ //取消关注
                    defaultText = $(this).attr("data-defaultText");
                    defaultText == undefined ? defaultText ="": defaultText;
                    $(this).removeClass("hasfollowed").html(defaultText).attr("title","关注");
                }
            });
        },



        /*功能：返回顶部
		* 说明：页面较长，滚动到大于1000px时，会显示“返回顶部”按钮
		* */
        backTop: function () {
            backBtn = $(".back-top");
            var y = 100;
            $(window).on("load scroll",function () {//滚动页面时
                if ($(window).scrollTop() > y)  backBtn.show();
                else  backBtn.hide();
            });
            backBtn.click(function () {//当点击跳转链接后，回到页面顶部位置
                $('body,html').animate({scrollTop: 0}, 500);
                return false;
            });
        },



        /*
         * 范围："标准、古籍、专利"宣传模块右侧轮播图
         * */
        sliderBanner: function () {
            $slider = $('.slider2d');
            if($slider.length<1) return;
            $ul = $slider.find('ul');
            $li = $slider.find('li');
            $prev = $slider.children('.prev');
            $next = $slider.children('.next');

            sliderWidth = $slider[0].clientWidth;
            $ul[0].appendChild($li[0].cloneNode(true));
            $ul.css('width', ($li.length + 1) * sliderWidth);

            var step = 0;
            autoInterval = 4000;

            //自动轮播
            autoTimer = setInterval(autoMove, autoInterval);
            function autoMove() {
                step++;
                if (step === $li.length + 1) {
                    $ul.css('left', 0);
                    step = 1;
                }
                $ul.stop().animate({left: -step * sliderWidth}, 500);
                $ul.find("li").removeClass("curnext curprev").eq(step).addClass("curnext");
            }

            //=>鼠标滑过
            $slider.on('mouseover', function () {
                clearInterval(autoTimer);
            }).on('mouseout', function () {
                autoTimer = setInterval(autoMove, autoInterval);
            });

            //=>点击左右箭头切换图片
            $next.on('click', autoMove);
            $prev.on('click', function () {
                step--;
                if (step === -1) {
                    $ul.css('left', -$li.length * sliderWidth);
                    step = $li.length - 1;
                }
                $ul.stop().animate({left: -step * sliderWidth}, 500);
                $ul.find("li").removeClass("curnext curprev").eq(step).addClass("curprev");
            });
        },


        /*
         * 范围：“我的关注”侧边栏：检索历史、浏览历史、下载历史
         * 功能：点击“∨”、“∧”折叠展开列表
         * */
        sidebarHistory: function () {
            $(".sidebar-list,.sidebar-history").on("click",".icon-arrow",function () {
                $(this).parent().parent().toggleClass("off");
            });
        },

        //我的关注页：检索式列表折叠、展开全部
        myFollowPage: function(){
            $(".btn-moremode").click(function () {
                $(this).hide().siblings().removeClass("is-hide");
            });
        },




        /*
         * 范围：“专利--IPC代码提示”页
         * 功能：点击+/—按钮，可展开/收起子菜单
         * */
        IPCIcon: function () {

            $(".IPC-list").find(".item").each(function () { //初始化：若没有下一级，就隐藏+-图标
                if ($(this).next().html() == undefined) {
                    $(this).find("i").removeClass("icon");
                }
            });


            $(".IPC-list").on("click","i",function () {
                itemNode = $(this).closest(".item");
                itemNode.toggleClass("is-down");
                itemNode.hasClass("is-down")? itemNode.next("ul").slideDown() : itemNode.next("ul").slideUp();
            });
        },


        //"检索设置"的选中变色
        individualization:function(){
            $(".setup").find("label").click(function(){
                _this = $(this);
                $input = _this.find("input");
                if($input.prop("checked")){
                    if( $input.attr("type")=="radio" ){
                        _this.siblings().removeClass("on").find("input").prop("checked",false);
                    }
                    _this.addClass("on");
                }else{
                    _this.removeClass("on");
                }
            });
        },


        //将“作者、分类号、基金、文献来源、作者单位、项目”串联起来
        // linkPages: function () {
        //     inputBox = $(".input-box");
        //     reopt = inputBox.find(".reopt");
        //     textInput = inputBox.find(".search-input");
        //     submitBtn = inputBox.find(".search-btn");
        //     url = "#";
        //     submitBtn.click(function () {
        //         curReopt  = reopt.find("span").html();
        //         console.log(curReopt);
        //         switch(curReopt) {
        //             case "作者":
        //                 url= "作者-检索结果.html"; //获得本窗口属性名
        //                 break;
        //             case "第一作者":
        //                 url= "第一作者-检索结果.html";
        //                 break;
        //             case "通讯作者":
        //                 url= "通讯作者-检索结果.html";
        //                 break;
        //             case "分类号":
        //                 value = textInput.val();
        //                 switch(value) {
        //                     case "语言学":
        //                         url = "分类号-检索结果（语言学-列表）.html";
        //                         break;
        //                     case "h0":
        //                     case "h0/语言学":
        //                         url = "分类号-检索结果（语言学-详情）.html";
        //                         break;
        //                     case "h04":
        //                     case "h04/语法学":
        //                         url = "分类号-检索结果（语法学）.html";
        //                         break;
        //                     default:
        //                         url = "分类号-检索结果（语法学）.html";
        //                 }
        //                 break;
        //             case "基金":
        //                 url= "基金-检索结果.html";
        //                 break;
        //             case "文献来源":
        //                 url= "文献来源-检索结果..html";
        //                 break;
        //             case "作者单位":
        //                 if(textInput.val()=="清华大学文化创意发展研究院")
        //                     url= "作者单位-检索结果-清华大学文化创意发展研究院.html";
        //                 else
        //                     url= "作者单位-检索结果-清华大学.html";
        //                 break;
        //             default:
        //                 url = "总库-一框检索结果.html";
        //
        //         }
        //
        //         window.open(url,'_top','fullscreen=1');
        //     })
        // },


        //摘要模式下，作者机构更多信息的展开、折叠
        showHideAuthorList: function(){
            box = $(".authorinfo");
            btn = box.find(".icon-down");
            btn.on("click",function(){
                $(this).toggleClass("icon-down icon-up");
                $(this).parent().siblings().slideToggle("fast");
            });
        },
        
        
        //检索设置
        searchSetting: function () {
            $(".add-doctype").on("click",function () {
                $(".doctype-list").slideToggle(200)
                    .mouseleave(function () {
                        $(this).slideUp(200);
                    })
                    .on("click","li",function (e) {
                        e.preventDefault();
                        if($(this).hasClass("selected")) return;

                        //添加到已选模块
                        _id = $(this).attr("id");
                        _name = $(this).find("span").text();
                        _itemHtml = '<li data-id="'+ _id +'"><div class="item"><span>'+ _name +'</span><i class="icon-del"></i></div></li>';
                        $(".haschecked-list").append(_itemHtml);

                        //添加→已选
                        $(this).addClass("selected").find("a").html("已选");
                    });
            });

            $(".haschecked-list").on("click",".icon-del",function () {
                _li = $(this).closest("li");
                _dataID = _li.attr("data-id");//获取当前id
                $(this).closest(".setdoctype").find("#"+_dataID).removeClass("selected").find("a").html("添加");//恢复弹出框中对应项的原始状态
                _li.remove();
            });
        },
        
        //“引用”弹出框
        quote: function () {
            $(".wrapper").on("click",".btn-quote a,a.icon-quote",function(){
                pop = $('<div class="quote-pop">\n' +
                    '  <table>\n' +
                    '    <tr>\n' +
                    '      <td class="quote-l">GB/T 7714-2015</td>\n' +
                    '      <td class="quote-r"><textarea>李伯虎,张霖,王时龙,陶飞,曹军威,姜晓丹,宋晓,柴旭东.\n计算机集成制造系统,2010,16(01):1-7+16.</textarea></td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '      <td class="quote-l">CNKI E-Study</td>\n' +
                    '      <td class="quote-r">李伯虎,张霖,王时龙,陶飞,曹军威,姜晓丹,宋晓,柴旭东. <br/>云制造——面向服务的网络化制造新模式[J]. 计算机集成制造系统,2010,16(01):1-7+16.</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '      <td class="quote-l">EndNote</td>\n' +
                    '      <td class="quote-r">李伯虎,张霖,王时龙,陶飞,曹军威,姜晓丹,宋晓,柴旭东.云制造——面向服务的网络化制造新模式[J].计算机集成制造系统,2010,16(01):1-7+16.</td>\n' +
                    '    </tr>\n' +
                    '  </table>\n' +
                    '</div>')
                    .appendTo("body");

                layer.open({
                    type: 1,
                    title:"引用",
                    area:['600px',"240px"],
                    content: pop
                });

            });

            $("body").on("click",".quote-pop tr",function () {
                console.log($(this).find(".quote-r").text());
                wordsBox = $(this).find(".quote-r textarea");
                wordsBox.select();
                //selectText(wordsBox);
            });

            // function selectText(obj){
            //     // var me = LInserter;
            //     // var index = -obj.value.replace(/.*(\.[^\.]+)$/, '$1').length;
            //     if (!window.ActiveXObject)
            //     {
            //         var range = obj.createTextRange ();
            //         range.moveStart ("character", index);
            //         range.moveEnd ("character", index);
            //         range.select ();
            //     }
            //     else
            //     {
            //         obj.selectionStart = 0;
            //         obj.selectionEnd = obj.text().length ;
            //     }
            // }

        }




    });
})(jQuery);

	





