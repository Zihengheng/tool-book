/* 20180529
 * 20190515 修改（添加了6-8的事件）
 * 20190520 修改（添加了9的事件）
 * 范围：高级检索
 * 功能：一共9个相关事件：
 *     （1）"高级"、"专业"、"作者发文"、"句子"菜单切换
 *     （2）左侧栏的折叠/展开事件
 *     （3）左侧导航层级折叠/展开、选中/取消事件
 *     （4）添加、删除<dd>输入框组件按钮“+-”
 *     （5）输入框检索项与右侧推荐对应匹配事件
 *     （6）初次打开页面，展开高级检索盒子
 *     （7）计算对比左右两个模块高度，使之相等
 *     （8）“高级检索”检索后，折叠条件，点击底部箭头可展开
 *     （9）"中国专利"的专利类别切换（左侧分类导航相应改变）,详情见 patentClassify()
 * */


$(function () {
    var mysearch = new searchClassify();
    mysearch.init();
});


function searchClassify(){

    this.menu = $(".search-classify-menu");
    this.content = $(".search-classify-content");
    this.mainSearch = this.content.find(".search-mainbox");
    this.leftNav = this.content.find(".nav-content");
    this.arrow = this.mainSearch.find(".icon-arrow");//左侧导航展开、折叠按钮
    this.itemNodes = this.mainSearch.find(".item-nav");//左侧导航项
    this.rightSearch = this.content.find(".search-sidebar-b");
}


searchClassify.prototype = {

    init: function(){
        var that = this;

        that.topSwitchMenu();  //"高级"、"专业"、"作者发文"、"句子"菜单切换

        that.bindNavArrow();  //左侧边栏:折叠/展开

        that.leftNavSwitch();// 左侧“文献分类”导航的分类切换，目前只有“海外专利”、“年鉴”有切换事件
        that.leftNavLevel(); //左侧“文献分类”导航层级的折叠/展开、选中/取消事件
        that.rightCheckbox(); //右侧推荐列表复选框事件

        that.bindAdd();//添加<dd>输入框组件按钮“+”
        that.bindDel();//删除<dd>输入框组件按钮“-”

        that.reoptFreqFunc();//修改检索词时，1、添加placeholder；2、“全文”和“摘要”时，输入框右侧添加词频；3、删除右侧对应的推荐模块；

        that.inputFunc(); //输入框事件

        that.bindConditionFold();//“高级检索”的检索条件折叠/展开

        // that.setTimeoutShowGrade();//初次打开页面，展开高级检索盒子

        that.patentClassify();//"中国专利"的专利类别切换（左侧分类导航相应改变）
    },


    //"高级"、"专业"、"作者发文"、"句子"菜单切换,"一框式检索"链接到其它相应页面
    topSwitchMenu: function () {
        var that = this;
        that.menu.find("li").click(function () {
            if($(this).hasClass("link")) return;
            $(this).addClass("active").siblings().removeClass("active");
            _id = $(this).attr("data-id");
            $("#"+_id).show().siblings().hide();

            mainSearch = $("#"+_id).find(".search-mainbox");//获取“左右高度平等”的方法中用到的对象
            that._equalHeight(mainSearch); //计算左右高度,使之相等
        });
    },

    //高级、专业、句子···检索左侧边栏:向左收起/向右横向展开
    bindNavArrow: function () {
        var that = this;

        that.arrow.click(function () {

            mainSearch = $(this).closest(".search-mainbox");


            if (mainSearch.hasClass("is-off")) {
                mainSearch.removeClass('is-off').addClass('is-on');
                //展开时要计算左侧导航列表的可视高度
                actualH = mainSearch.height() - mainSearch.find(".top-bar").outerHeight() - 20;//与底部边框相距20px
                mainSearch.find(".nav-content-list").height(actualH);
            } else {
                mainSearch.removeClass("is-on").addClass('is-off');
            }

            that._equalHeight(mainSearch); //计算左右高度 使之相等

        });

    },

    //左侧“文献分类”导航的分类切换，目前只有“海外专利”、“年鉴”有切换事件
    leftNavSwitch: function () {
        var that = this;
        that.leftNav.find(".top-tabs a").click(function(){
            if($(this).hasClass("cur"))
                return;
            $(this).addClass("cur").siblings().removeClass("cur");
            _id = $(this).data("href");
            conParent = $(this).closest(".nav-content");
            conParent.find(">ul").hide();
            conParent.find(">ul[data-id="+_id+"]").show();
        });

    },

    //左侧“文献分类”导航层级的折叠/展开、选中/取消事件
    leftNavLevel: function () {
        var that = this;

        that.itemNodes.each(function () { //初始化：若没有下一级，就隐藏+-图标
            if ($(this).next().html() == undefined) {
                $(this).find("i").removeClass("icon");
            }
        });

        that.itemNodes.find(".icon").click(function () { //展开/折叠
            itemNode = $(this).parent();      //".item-nav"
            itemNode.toggleClass("is-down");

            if (itemNode.hasClass("is-down"))
                itemNode.next("ul").slideDown();
            else
                itemNode.next("ul").slideUp();
        });

        that.itemNodes.find(">a").click(function () { //选中、取消选中状态
            $(this).toggleClass("selected");

            itemNode = $(this).parent(); //".item-nav"
            childA = itemNode.next("ul").find("a");//查找子级a标签

            if ($(this).hasClass("selected")){//全选下级选项
                childA.addClass("selected");
            }else
                childA.removeClass("selected");//清除下级选项的选中状态

            parentUl = itemNode.parents("ul");
            parentUlLen = parentUl.length - 1;
            for(var i=0; i<parentUlLen; i++){//遍历父级节点
                if (parentUl.eq(i).length > 0) {
                    parentLen = parentUl.eq(i).find("a").length;
                    parentSelectLen = parentUl.eq(i).find(".selected").length;
                    parentA = parentUl.eq(i).siblings().find("a"); //查找父级a标签
                    parentLen == parentSelectLen ? parentA.addClass("selected") : parentA.removeClass("selected");
                }else
                    return;
            }

        });

        //全选、清除
        that.mainSearch.find(".nav-btns a").click(function () {
            allA = $(this).parent().parent().siblings("ul").find("a");
            if($(this).hasClass("selectall")){
                allA.addClass("selected");
            }else if($(this).hasClass("clearall")){
                allA.removeClass("selected");
            }
        });

    },


    /* 右侧推荐列表复选框事件，功能有
    * 1、选中/取消 input[type=checkbox]，在左侧对应的输入框中添加选中的值，移除取消的值
    * 2、选中复选框，数量不超过5，超出会有提示框
    * 3、“清除”所有复选框，并清除左侧对应的输入框中对应的值
    * 4、折叠/展开列表层级
    **/
    rightCheckbox: function () {
        var that = this;

        //返回检索词为“主题”、“作者”、“期刊名称”、“基金”···的列表或列表父级
        function _recommendParent(obj){
            recommendBox1 = $(obj).closest(".recommend-info-list");//检索词为“主题”、“作者”、“期刊名称”的列表对象
            recommendBox2 = $(obj).closest(".recommend-fund-list");//检索词为“基金”的列表对象
            if(recommendBox1.length > 0)
                return $(obj).closest(".recommend-info-list");
            else if(recommendBox2.length > 0)
                return $(obj).closest(".recommend-fund-list");
            else
                return $(obj).closest(".recommend-info");
        }

        //恢复input输入框初始状态
        function _recoverInput(btnObj){
            tipId = $(btnObj).closest(".recommend-info").attr("id");
            textInput = $(btnObj).closest(".grade-search-content,.author-search-content").find("input[data-tipid='" + tipId + "']");
            initVal = $.trim(textInput.val().split(/[+(（]/)[0]);//通过+(（号分隔,获取第一个值，即为初始输入值
            textInput.val(initVal);
            textInput.removeClass("disable-editor");
        }

        //右侧“同名作者/所在机构”导航层级的折叠/展开事件
        that.rightSearch.on("click", ".icon", function () {
            itemNode = $(this).parent();      //".item-nav"
            itemNode.toggleClass("is-down");

            if (itemNode.hasClass("is-down")) {
                itemNode.next("ul").slideDown();
            } else {
                itemNode.next("ul").slideUp();
            }
        });

        //清除所有input[type=checkbox]选中状态
        that.rightSearch.on("click", ".btn-clear-selected", function () {
            recommendBox = _recommendParent(this); //检索词为“主题”、“作者”、“期刊名称”、“基金”的列表对象
            recommendBox.find("input[type=checkbox]").prop("checked",false);
            recommendBox.find("label").removeClass("selected");
            $(".popup-prompt").remove();
            _recoverInput(this);//恢复input输入框初始状态
        });

        //选中复选框，数量不超过5
        that.rightSearch.on("click", ".recommend-info input[type=checkbox]", function () {
            recommendBox = _recommendParent(this); //检索词为“主题”、“作者”、“期刊名称”、“基金”的列表对象
            checkedCount = recommendBox.find("input:checked").length;

            //判断是否为“同名作者 / 所在机构”列表
            //注：选中作者推荐列表项，左侧对应输入框的展示格式与其它几个不同
            recommendBox.hasClass("js-recommend-authorlist") ? isAuthorList = true : isAuthorList = false;

            parentLabel = $(this).closest("label");
            tipId = $(this).closest(".recommend-info").attr("id");
            textInput = $(this).closest(".grade-search-content,.author-search-content").find("input[data-tipid='" + tipId + "']");
            oldVal = textInput.val();
            valArr = _clearArrBlank(oldVal);//将当前值转换成数组，并清除前后空格和空值
            thisText = $.trim(parentLabel.text());

            if(checkedCount<=5){
                if(parentLabel.hasClass("selected")){
                    parentLabel.removeClass("selected"); //移除selected

                    if(isAuthorList){//作者
                        organText = $.trim(parentLabel.find(".organ").text());//机构名称
                        _removeArr(valArr,organText); //数组中移除与点击的字符串匹配的值
                        newVal = _analyAuthorArr(valArr);
                        textInput.val(newVal);

                    }else{ //非作者
                        _removeArr(valArr,thisText); //数组中移除与该字符串匹配的值
                        newVal = "";
                        for( var j in valArr){
                            newVal += j==0? valArr[j] : (" + "+valArr[j]);
                        }
                        textInput.val(newVal);
                    }
                    if(valArr.length<=1) textInput.removeClass("disable-editor");//对应的input值恢复黑色，表示可编辑

                }else{
                    parentLabel.addClass("selected");//添加selected
                    if(isAuthorList){//作者
                        organText = $.trim(parentLabel.find(".organ").text());//机构名称
                        valArr.push(organText);
                        newVal = _getAuthorInputVal();//解析数组，计算对应输入框的值
                        textInput.val(newVal);

                    }else { //非作者
                        valArr.push(thisText);
                        newVal = oldVal+ " + " + thisText;
                        textInput.val(newVal);
                    }
                    textInput.addClass("disable-editor");//对应的input值变为灰色，表示不可编辑
                }
            }

            function _getAuthorInputVal (){//将右侧选中的推荐作者机构添加到左侧对应的输入框内,返回输入框值
                if(oldVal.indexOf("（")==-1 && oldVal.indexOf("(")==-1)
                    return oldVal+ "（" + organText+ "）";
                else{
                    return _analyAuthorArr(valArr);
                }
            }

            function _analyAuthorArr(arr){//解析数组，返回对应输入框的值
                text = "";
                if(arr.length==1)
                    return arr[0];
                else{
                    for( var j in arr){
                        if(j!=0) //排除数组第一个值
                            text += j==1? arr[j] : (" + "+arr[j]);
                    }
                    return arr[0]+ "（" + text+ "）";
                }
            }

            function _clearArrBlank(val){//将val通过+()（）号分隔，除去空格和空值，获得新数组
                var arr = new Array();
                defaultValArr = val.split(/[+()（）]/);
                for( var i in defaultValArr){
                    if(!$.trim(defaultValArr[i])=="")
                        arr.push($.trim(defaultValArr[i]));
                }
                return arr;
            }

            function _indexArr(array,val){//获取数组array中val的索引值
                for (var i = 0; i < array.length; i++) {
                    if ($.trim(array[i]) == val) return i;
                }
                return -1;
            }

            function _removeArr(array,val){//移除数组array中的val
                var index = _indexArr(array,val);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }

        });

        //选中数量大于5，弹出提示框
        that.rightSearch.on("click", ".recommend-info label", function () {
            recommendBox = $(this).closest(".recommend-info");
            checkedCount = recommendBox.find("input:checked").length;
            if(checkedCount>5){

                if($(".popup-prompt").length>0){
                    clearTimeout(autoDelPop);//清除上次的延迟自动消失
                    $(".popup-prompt").remove();
                }
                popupPrompt = $('<div class="popup-prompt">\n' +
                    '   <a class="btn-close" href="javascript:void(0)"></a>\n' +
                    '   <p>最多只能选择5项</p>\n' +
                    '   <a class="btn-confirm" href="javascript:void(0)">确定</a>\n' +
                    '</div>')
                    .on("click", ".btn-close,.btn-confirm", function () {
                        $(this).parent().remove();
                    });
                recommendBox.append(popupPrompt);//提示最多只能选5条的弹出框
                autoDelPop =  setTimeout(function () {
                    popupPrompt.remove();//2s后自动消失
                },2000);
                return false;
            }
        });
    },


    //添加输入框组件（<dd>）按钮“+”
    bindAdd:function(){
        var that = this;
        that.content.on("click",".add-group",function(){ //添加input组<dd>
            mainSearch = $(this).closest(".search-mainbox");

            var newDd ='';
            baseId = $(this).parents("dl").attr("id");//父级id，也是基础id
            seq = $("#"+baseId).attr("data-seq");//<dd>的序号历史记录
            maxLen = $("#"+baseId).attr("data-maxLen")||10;//输入框的最大个数：高级检索10个、作者发文检索5个,如果没有数据，默认10个
            minLen = $("#"+baseId).attr("data-minLen")||2;//输入框的最小个数：默认2个
            actLen = $("#"+baseId).find("dd").length;//输入框的实际个数


            //词频
            _freqSelect = '<div class="sort freq">\n' +
                '                      <div class="sort-default">\n' +
                '                        <span>词频</span>\n' +
                '                        <em>∨</em>\n' +
                '                      </div>\n' +
                '                      <ul class="sort-list">\n' +
                '                        <li class="cur"><a href="javascript:void(0);">词频</a></li>\n' +
                '                        <li><a href="javascript:void(0);">2</a></li>\n' +
                '                        <li><a href="javascript:void(0);">3</a></li>\n' +
                '                        <li><a href="javascript:void(0);">4</a></li>\n' +
                '                        <li><a href="javascript:void(0);">5</a></li>\n' +
                '                        <li><a href="javascript:void(0);">6</a></li>\n' +
                '                        <li><a href="javascript:void(0);">7</a></li>\n' +
                '                        <li><a href="javascript:void(0);">8</a></li>\n' +
                '                        <li><a href="javascript:void(0);">9</a></li>\n' +
                '                      </ul>\n' +
                '                    </div>';


            //精确、模糊
            specialSelect = '<div class="sort special">\n' +
                '  <div class="sort-default">\n' +
                '       <span>精确</span>\n' +
                '       <em>∨</em>\n' +
                '  </div>\n' +
                '  <ul class="sort-list">\n' +
                '       <li class="cur"><a href="javascript:void(0);">精确</a></li>\n' +
                '       <li><a href="javascript:void(0);">模糊</a></li>\n' +
                '  </ul>\n' +
                '</div>';

            // “-” 删除按钮的html
            delBtn = '<a class="icon-btn del-group" href="javascript:void(0)">-</a>';


            //专利的申请号、申请日、公开号、公开日输入框与其它不同
            if($("#"+baseId).find("dd").hasClass("patent-halfinput")){
                noLogical = '<div class="nological"></div>';

                //检索词1：公开号、申请号
                reoptSelect1 = '<div class="sort reopt">\n' +
                    '            <div class="sort-default">\n' +
                    '               <span>公开号</span>\n' +
                    '               <i class="icon-sort"></i>\n' +
                    '            </div>\n' +
                    '            <ul class="sort-list">\n' +
                    '               <li class="cur"><a href="javascript:void(0);">公开号</a></li>\n' +
                    '               <li><a href="javascript:void(0);">申请号</a></li>\n' +
                    '             </ul>\n' +
                    '           </div>';

                //检索词2：公开日、申请日
                reoptSelect2 = '<div class="sort reopt">\n' +
                    '            <div class="sort-default">\n' +
                    '               <span>公开日</span>\n' +
                    '               <i class="icon-sort"></i>\n' +
                    '            </div>\n' +
                    '            <ul class="sort-list">\n' +
                    '               <li class="cur"><a href="javascript:void(0);">公开日</a></li>\n' +
                    '               <li><a href="javascript:void(0);">申请日</a></li>\n' +
                    '             </ul>\n' +
                    '           </div>';

                inputBox1 = $('<div class="input-box"></div>')
                    .html('<input type="text" autocomplete="off" maxlength="100">' + specialSelect)
                    .prepend(reoptSelect1);

                inputBox2 = $('<div class="input-box"></div>')
                    .html('<input class="patentdate" type="text" maxlength="10"><i>--</i><input class="patentdate" type="text" maxlength="10">')
                    .prepend(reoptSelect2);

                newDd = $('<dd class="patent-halfinput">').append(noLogical).append(inputBox1).append(inputBox2).append(delBtn);

            }else{
                //AND、OR、NOT
                logicalSelect = '<div class="sort logical">\n' +
                    '  <div class="sort-default">\n' +
                    '    <span>AND</span>\n' +
                    '    <em>∨</em>\n' +
                    '  </div>\n' +
                    '  <ul class="sort-list">\n' +
                    '     <li class="cur"><a href="javascript:void(0);">AND</a></li>\n' +
                    '     <li><a href="javascript:void(0);">OR</a></li>\n' +
                    '     <li><a href="javascript:void(0);">NOT</a></li>\n' +
                    '  </ul>\n' +
                    '</div>';

                //检索词：“高级检索”和“作者发文检索”的检索词列表不同，获取各自的第一条检索词（暂定）
                reoptSelect = $("#"+baseId).find(".reopt").eq(0).clone();

                firstInputBox = $(this).parents("dl").find(".input-box").eq(0);
                classFreq = firstInputBox.hasClass("hasfreq") ? "hasfreq" :"";
                freqSelect = firstInputBox.hasClass("hasfreq") ? _freqSelect :"";

                inputBox = $('<div class="input-box '+ classFreq +'"></div>')
                    .html('<input type="text" autocomplete="off" maxlength="100" data-tipid="'+ baseId + '-' + ++seq +'">' + freqSelect + specialSelect)
                    .prepend(reoptSelect);

                newDd = $('<dd>').append(logicalSelect).append(inputBox).append(delBtn);
            }



            if(actLen < maxLen){
                $(this).parents("dl").append(newDd);//添加dd
                if( actLen >= minLen ){//输入框为最小个数，添加一个<dd>后，显示“—”按钮
                    $("#"+baseId).find(".del-group").show();
                }
                if( actLen + 1 >= maxLen){//添加一个<dd>后，输入框达到最大个数，隐藏“+”按钮
                    $(this).hide();
                }
                $("#"+baseId).attr("data-seq",seq);//记录序号

                that._equalHeight(mainSearch);//左右高度相等

            }
        });
    },


    //删除输入框组件（<dd>）按钮“-”
    bindDel:function(){
        var that = this;
        that.content.on("click",".del-group",function(){//删除input组<dd>
            mainSearch = $(this).closest(".search-mainbox");

            baseId = $(this).parents("dl").attr("id");//父级id，也是基础id
            maxLen = parseInt($("#"+baseId).attr("data-maxLen"))||10;//输入框的最大个数：高级检索10个、作者发文检索5个
            minLen = parseInt($("#"+baseId).attr("data-minLen"))||2;//输入框的最小个数：默认2个
            actLen = $("#"+baseId).find("dd").length;//输入框的实际个数

            tipId = $(this).parent().find("input[type=text]").attr("data-tipId");
            if($("#"+tipId).length>0){
                $("#"+tipId).remove();//删除右侧对应的推荐模块
            }

            $(this).parent().remove();//移除dd
            if( actLen == (minLen+1) ){//删除一个<dd>后，输入框达到最小个数，隐藏“—”按钮
                $("#"+baseId).find(".del-group").hide();
            }
            if( actLen == maxLen ){//删除一个<dd>后，输入框小于最大个数，所以显示“+”按钮
                $("#"+baseId).find(".add-group").show();
            }

            that._equalHeight(mainSearch);//左右高度相等
        });
    },


    /* 功能：计算左右高度，使之相等
    *  说明：obj：“+-”按钮的父级".search-mainbox"对象；
    * */
   _equalHeight : function (obj) {

        navBox = obj.find(".nav-content-list");
        topBar = navBox.prev(".top-bar");
        rightSearch = obj.siblings(".search-sidebar-b");//右侧盒子

        //比较左右默认高度,选取最大值为目标高度
        defaultMainH = obj.innerHeight();
        defaultRightH = rightSearch.innerHeight();//包含padding,不计算border
        if(defaultMainH > defaultRightH){
            navBox.height(defaultMainH - topBar.outerHeight(true) - 20);  //bottom 20px
            rightSearch.height(defaultMainH - parseInt(rightSearch.css("padding-top"))*2);
        }else if(defaultMainH < defaultRightH){
            navBox.height(defaultRightH - topBar.outerHeight(true) - 20);
            obj.height(defaultRightH);
        }else{
            navBox.height(defaultRightH - topBar.outerHeight(true) - 20);
        }
        //console.log(navBox.height(),rightSearch.height());
        this._rightRecommendH(rightSearch); //计算右侧推荐列表高度
   },



    /* 功能：计算右侧推荐列表高度
    *  说明：超出最大高度显示滚动条
    * */
    _rightRecommendH : function (rObj){

        fundList = rObj.find(".js-recommend-fundlist");//相关基金
        authorList = rObj.find(".js-recommend-authorlist");//相关作者
        journalList = rObj.find(".js-recommend-journallist");//相关期刊
        themeList = rObj.find(".js-recommend-themelist");//相关主题
        mainSearch = rObj.siblings(".search-mainbox");//注：需要参考左侧的高度
        var devH = 28;// padding-top + padding-bottom = 28px

        // 相关基金
        if(fundList.length>0){
            fundList.each(function () {
                h6H = $(this).siblings("h6").outerHeight() || 36;
                pH = $(this).siblings("p").outerHeight();
                h5H = $(this).siblings("h5").outerHeight();
                newH = $(this).parents(".search-sidebar-b").height() -  h6H - pH - h5H;
                $(this).css("max-height",newH);
                console.log("基金:"+newH,h6H);
            });
        }
        //相关作者
        if(authorList.length>0){
            pagesH = 41;//分页
            authorList.each(function () {
                h6H = $(this).siblings("h6").outerHeight() || 36;
                pH = $(this).siblings("p").outerHeight();
                h5H = $(this).siblings("h5").outerHeight();
                newH = $(this).parents(".search-sidebar-b").height() -  h6H - pH - h5H - pagesH;
                $(this).css("max-height",newH);
                console.log("作者:"+newH,h6H);
            });
        }
        //相关期刊
        if(journalList.length>0){
            pagesH = 41;//分页
            journalList.each(function () {
                h6H = $(this).siblings("h6").outerHeight() || 36;
                pH = $(this).siblings("p").outerHeight();
                h5H = $(this).siblings("h5").outerHeight();
                //pagesH = $(this).siblings(".search-page").outerHeight(true);//分页
                newH = $(this).parents(".search-sidebar-b").height() - h6H - pH - h5H - pagesH;
                $(this).css("max-height",newH);
                console.log("期刊:"+newH,h6H);
            });
        }
        //相关主题
        if(themeList.length>0){
            themeList.each(function () {
                h6H = $(this).siblings("h6").outerHeight() || 20;
                pH = $(this).siblings("p").outerHeight();
                h5H = $(this).siblings("h5").outerHeight();
                newH = mainSearch.height() - h6H - pH - h5H - devH;
                $(this).css("max-height",newH);
                console.log("主题:"+mainSearch.height(),h6H);
            });
        }

    },

    /*范围：输入框前的检索项
    /*功能：修改检索项时，1、添加placeholder；
     *                   2、选择所有库的“全文”和“摘要”，年鉴库的“题名”、“正文”，成果库的“成果简介”时，输入框右侧添加词频；
     *                   3、删除右侧对应的推荐模块；
     */
    reoptFreqFunc: function(){
        $(".search-classify").on("click",".reopt li",function(e){

            //选中某个检索词
            if($(this).hasClass("tit")) return;//排除“期刊”检索词的分类标题
            $selectList = $(this).parents(".sort-list");
            if($(this).hasClass("cur")){
                $selectList.hide();
                return;
            }
            titSpan = $selectList.siblings().find("span");
            _reoptText = $(this).text();
            titSpan.html(_reoptText);
            $selectList.find("li").removeClass("cur");
            $(this).addClass("cur");
            $selectList.hide();


            textInput = $(this).closest(".reopt").siblings("input[type=text]");
            //由检索项判断输入框默认值
            if(_reoptText=="期刊名称"){
                textInput.attr("placeholder","期刊名称/ISSN/CN");
            }else if(_reoptText=="报纸名称"){
                textInput.attr("placeholder","报纸名称/国内统一刊号");
            }else{
                textInput.attr("placeholder","");
            }


            // 选择所有库“全文”和“摘要”，
            // 年鉴库的“题名”（报纸、学位论文也有题名，只有年鉴库的添加词频）、“正文”（只有年鉴库有正文），
            // 成果库的“成果简介”，
            // 输入框右侧添加“词频”。其他检索项不加
            if(_reoptText=="全文" || _reoptText=="摘要" || ($(".top-doctype").find(".cur a").text()=="年鉴" && _reoptText=="题名") || _reoptText=="正文" || _reoptText=="成果简介"){
                freqHtml ='<div class="sort freq">\n' +
                    '        <div class="sort-default">\n' +
                    '            <span>词频</span>\n' +
                    '            <em>∨</em>\n' +
                    '        </div>\n' +
                    '        <ul class="sort-list">\n' +
                    '            <li class="cur"><a href="javascript:void(0);">词频</a></li>\n' +
                    '            <li><a href="javascript:void(0);">2</a></li>\n' +
                    '            <li><a href="javascript:void(0);">3</a></li>\n' +
                    '            <li><a href="javascript:void(0);">4</a></li>\n' +
                    '            <li><a href="javascript:void(0);">5</a></li>\n' +
                    '            <li><a href="javascript:void(0);">6</a></li>\n' +
                    '            <li><a href="javascript:void(0);">7</a></li>\n' +
                    '            <li><a href="javascript:void(0);">8</a></li>\n' +
                    '            <li><a href="javascript:void(0);">9</a></li>\n' +
                    '        </ul>\n' +
                    '      </div>';
                textInput.parent().addClass("hasfreq");
                if(textInput.parent().find(".freq").length==0)
                    textInput.after(freqHtml);
            }else{
                textInput.parent().removeClass("hasfreq").find(".freq").remove();
            }


            tipID = textInput.attr("data-tipId");
            mainSearch = $(this).closest(".search-mainbox");
            rightSearch =  mainSearch.siblings(".search-sidebar-b");//右侧边栏
            rightSearch.find("#"+tipID).remove();
            rightSearch.find(".default-info").show();
        });
    },


    //输入框事件
    inputFunc: function () {
        var that = this;

        //input获取焦点
        that.mainSearch.on("focus",".input-box input[type=text]", function (event) {
            event.preventDefault();
            that._judgeRecommend(this);//根据检索词及input值是否存在，判断右侧推荐内容显示/隐藏、创建/移除
        });


        //input移出焦点
        that.content.on("blur",".input-box input[type=text]", function (event) {
            event.preventDefault();
            mainSearch = $(this).closest(".search-mainbox");
            rightSearch =  mainSearch.siblings(".search-sidebar-b");//右侧边栏

            $(document).click(function (event) {//鼠标未移到右侧推荐模块或左侧输入框中，右侧就恢复默认状态
                if($(event.target).closest(".search-sidebar-b").length==0 && $(event.target).closest("input[type=text]").length==0 && $(event.target).closest(".popup-prompt").length==0){
                    rightSearch.find(".default-info").show().siblings().hide();
                }
            });

        });


        //粘贴、按键被松开并复位，发生在当前获得焦点的元素上
        that.mainSearch.on("paste keyup",".input-box input[type=text]", function(){
            if($(this).val().indexOf("+")==-1 && $(this).val().indexOf("（")==-1 && $(this).val().indexOf("(")==-1) $(this).removeClass("disable-editor");//若输入框内无+（(号，则恢复输入框的正常状态

            if($(this).hasClass("disable-editor")){//含有这个class，说明不能编辑，若用户仍编辑，则对应的右侧边栏不再推荐内容,同时删除之前对应的右侧推荐列表
                _id = $(this).attr("data-tipid");
                $("#"+_id).siblings(".default-info").show();
                $("#"+_id).remove();
            }else{
                that._judgeRecommend(this);//根据检索词和input值，判断右侧推荐内容显示/隐藏、创建/移除
            }

        });


    },


    /* 范围：右侧对应推荐内容 .recommend-info
     * 功能：1、计算箭头位置
     *      2、创建/移除推荐内容
     *      3、显示/隐藏推荐内容
     * 说明： 1、高级检索、作者发文检索都有推荐引导功能
     *        2、主题 作者 基金，这三项是有的话就引导
     *           做引导==期刊：“期刊名称”，文献：“文献来源”，报纸：“报纸名称”，辑刊：“辑刊名称”，年鉴：“年鉴名称”
     *           不做引导===学位论文：“题名”，会议库：“论文集名称”,专利：“专利名称”
     */
    _judgeRecommend : function(textInput){
        var that = this;
        var j = 0;
        inputObj = $(textInput);

        mainSearch = inputObj.closest(".search-mainbox");
        rightSearch = mainSearch.siblings(".search-sidebar-b");
        reoptText = $.trim(inputObj.siblings(".reopt").find(".cur").text());

        reoptArr = ["主题","作者","基金","期刊名称","文献来源","报纸名称","辑刊名称","年鉴名称"];//这些检索项有引导功能
        for(var i in reoptArr){
            if(reoptText != reoptArr[i]) {
                j++;
                if(j==reoptArr.length){//如果不匹配所有的检索项
                    rightSearch.find(".default-info").show().siblings().hide();
                    return false;
                }
            }else
                break;//匹配成功时，跳出for循环，继续执行以下代码
        }


        inputVal = $.trim(inputObj.val());//input当前值
        tipID = inputObj.attr("data-tipID");//输入框标记的data-tipID，对应右侧推荐框的id
        recommendInfoBox = rightSearch.find("#"+tipID);//与输入框对应右侧推荐框的id


        /* 1、输入框值为空，
        ** 2、存在不可编辑标志(class="disable-editor")，且右侧推荐列表已经不存在时，说明该输入框的值被编辑修改过，此时右侧不进行推荐，
        ** 3、直到不可编辑标志消失，继续进行推荐
        * */
        if(inputVal=="" || (inputObj.hasClass("disable-editor") && recommendInfoBox.length==0 )){
            if(recommendInfoBox.length==1){
                recommendInfoBox.remove();
            }
            rightSearch.find(".default-info").show().siblings().hide();
        }
        else{
            iconTop = inputObj.offset().top - inputObj.parents(".search-middle").offset().top + (inputObj.height()-16)/2; //.icon高16px

            if(recommendInfoBox.length==1){//若右侧存在对应推荐模块
                recommendInfoBox.find(".input-text").html(inputVal);
                recommendInfoBox.find(".icon-triangle").css("top",iconTop+"px");
                recommendInfoBox.show().siblings().hide();

            } else {//在右侧新建对应推荐模块
                recommendInfoBox = $('<div id="'+ tipID +'" class="recommend-info">')
                    .html('<i class="icon-triangle" style="top:'+ iconTop +'px"></i>\n' +
                          '<h5><span class="reopt-tit">' + reoptText + '</span></h5>'
                    )
                    .appendTo(rightSearch)
                    .append(that._matchListFormat(reoptText)) //不同检索词对应右侧不同的推荐列表格式,返回数据 recommendDetailList
                    .show().siblings().hide();

                that._rightRecommendH(rightSearch);//新建推荐内容时，初始化列表高度

            }
        }
    },



    //不同检索项对应右侧不同的推荐列表格式
    _matchListFormat : function (curReopt) {
        switch(curReopt){
            case "主题":
                recommendDetailList = '<p>相关来源如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '                 <h6>相关词推荐</h6>\n' +
                    '                 <ul class="recommend-info-list js-recommend-themelist">\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>彼得原理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>水桶定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>安全管理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>小概率事件</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>不值得定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>蘑菇管理蘑菇管理蘑菇管理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>不值得定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>蘑菇管理蘑菇管理蘑菇管理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>彼得原理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>彼得原理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>水桶定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>小概率事件</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>不值得定律定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>蘑菇管理蘑菇管</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>彼得原理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>彼得原理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>水桶定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>安全安全安全管理</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>水桶水桶水桶水桶定律</span></label></li>\n' +
                    '                     <li class="theme-item" title="#"><label><input type="checkbox"><span>小概率事件</span></label></li>\n' +
                    '                 </ul>\n' ;
                break;

            case "作者":
                recommendDetailList = '<p>同名作者如下，勾选后可添加机构。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '                 <h6>同名作者 / 所在机构</h6>\n' +
                    '         <ul class="recommend-info-list js-recommend-authorlist">\n' +
                    '             <li>\n' +
                    '                <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">哈尔滨工业大学</span></label></div>\n' +
                    '                <ul>\n' +
                    '                    <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">哈尔滨工业大学航天学院</span></label></li>\n' +
                    '                    <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">哈尔滨工业大学金属精密</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '             <li>\n' +
                    '                 <div class="item"><i class="icon"></i><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学</span></label></div>\n' +
                    '                 <ul>\n' +
                    '                     <li><label href="javascript:void(0);"><input type="checkbox"><span>林俊峰</span><span class="organ" title="#">中南大学粉末冶金国家重点</span></label></li>\n' +
                    '                 </ul>\n' +
                    '             </li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            case "基金":
                recommendDetailList = '<p>相关基金如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <h6>相关基金</h6>\n' +
                    '         <ul class="recommend-fund-list js-recommend-fundlist">\n' +
                    '             <li><label><input type="checkbox"><span>国家水体污染控制与治理科技重大专项:城市地表径流减控面源污染削减技术研究(子课题名称:生态景观设施设计与径流减控技术研究,课题号2013ZX07304-001-6)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家水体污染控制与治理科技重大专项:重庆两江新区城市水系统构建技术研究与示范(分任务编号2012ZX07307001-03)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家自然科学基金项目:全球气候变化背景下中国城市水适应能力建设的景观途径(编号:51078004)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>科技部攻关课题:土地生态设计关键技术问题研究(2004BA516A18)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>水生态红线管控的理论基础研究科研项目(水利部水利水电规划设计总院委托)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家自然科学基金项目:可持续城市水系绿色廊道设计的景观生态学途径(编号:39870147)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家水体污染控制与治理科技重大专项:城市地表径流减控面源污染削减技术研究(子课题名称:生态景观设施设计与径流减控技术研究,课题号2013ZX07304-001-6)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家水体污染控制与治理科技重大专项:重庆两江新区城市水系统构建技术研究与示范(分任务编号2012ZX07307001-03)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家自然科学基金项目:全球气候变化背景下中国城市水适应能力建设的景观途径(编号:51078004)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>科技部攻关课题:土地生态设计关键技术问题研究(2004BA516A18)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>水生态红线管控的理论基础研究科研项目(水利部水利水电规划设计总院委托)资助</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>国家自然科学基金项目:可持续城市水系绿色廊道设计的景观生态学途径(编号:39870147)资助</span></label></li>\n' +
                    '             <li class="btn-morefund"><a href="javascript:void(0)">点击加载更多</a></li>\n' +
                    '         </ul>';
                break;

            case "期刊名称":
                recommendDetailList = '<p>相关期刊如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <h6>相关期刊</h6>\n' +
                    '         <ul class="recommend-info-list js-recommend-journallist">\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>中国工业经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济学(季刊)</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>世界经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            case "文献来源":
                recommendDetailList = '<p>相关文献如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <div class="recommend-tabs"><a class="cur" href="javascript:void(0);">期刊</a><a href="javascript:void(0);">学位授予单位</a><a href="javascript:void(0);">报纸</a><a href="javascript:void(0);">年鉴</a><a href="javascript:void(0);">辑刊</a></div>\n' +
                    '         <ul class="recommend-info-list js-recommend-journallist">\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>中国工业经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济学(季刊)</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>世界经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            case "报纸名称":
                recommendDetailList = '<p>相关报纸如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <h6>相关报纸</h6>\n' +
                    '         <ul class="recommend-info-list js-recommend-journallist">\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>中国工业经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济学(季刊)</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>世界经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            case "辑刊名称":
                recommendDetailList = '<p>相关辑刊如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <h6>相关辑刊</h6>\n' +
                    '         <ul class="recommend-info-list js-recommend-journallist">\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>中国工业经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济学(季刊)</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>世界经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            case "年鉴名称":
                recommendDetailList = '<p>相关年鉴如下，勾选后可精准定位。<a class="btn-clear-selected" href="javascript:void(0);">清除</a></p>\n'+
                    '         <h6>相关年鉴</h6>\n' +
                    '         <ul class="recommend-info-list js-recommend-journallist">\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>中国工业经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济学(季刊)</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>世界经济</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '             <li><label><input type="checkbox"><span>经济研究</span></label></li>\n' +
                    '         </ul>\n' +
                    '         <div class="search-page">\n' +
                    '             <a class="but-l">&lt;</a>\n' +
                    '             <b>1</b> / <em>10</em>\n' +
                    '             <a class="but-r">&gt;</a>\n' +
                    '          </div>';
                break;

            default:
                recommendDetailList = "";
        }
        return recommendDetailList;
    },


    /*范围：“高级检索”的检索条件折叠/展开
    * 功能：进行检索后，默认折叠检索条件，同时添加显示按钮“结果中检索”
    *       点击“展开”按钮后，展开检索条件所有的输入框，同时添加显示按钮“结果中检索”
    * 说明：此为静态页展示的交互效果，不确定具体的转换效果是否能在后端实现。
    * */
    bindConditionFold: function () {
        $(".btn-search,.resultsearch-btn").on("click",function () {

            conditionFold = $(this).closest("#js-gradeSearch").find(".search-condition");
            condition = $(this).closest(".grade-search-content");

           if(condition.length>0){
               condition.slideUp();
               conditionFold.slideDown();
           }
        });


        $(".btn-unfold").on("click",function () {
            conditionFold = $("#js-gradeSearch").find(".search-condition");
            condition = $("#js-gradeSearch").find(".grade-search-content");
            condition.slideDown();
            conditionFold.slideUp();
        });
    },

    //初次打开页面，展开高级检索盒子
    setTimeoutShowGrade: function () {
        var that= this;
        $(window).on("load",function () {
            gradeCon = $("#js-gradeSearch");
            setTimeout(function () {
                if(gradeCon.hasClass("is-firopen"))
                    gradeCon.slideDown(1000,function(){
                        gradeCon.removeClass("is-firopen");

                        //初始化高级检索的左右高度
                        mainSearch = $("#js-gradeSearch").find(".search-mainbox");
                        that._equalHeight(mainSearch);
                    });
            },10);
        });

    },


    /*
     * 范围：“中国专利”的 “高级检索”、“专业检索”
     * 功能：专利类别切换:1、点“全部”后回到中国专利初始页面，即“全部”按钮隐藏，4个专利类别都不标红；点4个专利类别，“全部”按钮显示。
     *                   2、切换专利类别，左侧导航相应改变（选中“全部”时，左侧默认一种导航，选中其它4个类别，左侧两种导航分类，且导航名称随选中的类别名称改变）。
     * 说明：为了简化脚本，左侧导航使用类名"is-patent-all"，结合css，控制显示一种/二种导航。
     */
    patentClassify: function () {

        $(".patent-classify").on("click","a",function () {
            $(this).addClass("cur").siblings().removeClass("cur");
            mainSearch = $(this).closest(".search-mainbox");
            matchTab = mainSearch.find(".top-tabs a").eq(0);//左侧对应分类导航
            leftNav = mainSearch.find(".nav-content");
            tabTit = $(this).text();
            matchTab.html(tabTit + "分类");

            if($(this).hasClass("patent-all")){//选中“全部”
                leftNav.addClass("is-patent-all");
                mainSearch.find(".nav-content-list").css("display","");

            }else{
                if(leftNav.hasClass("is-patent-all")){//每次从“全部”切回其它4个分类，都默认显示第一个导航
                    leftNav.removeClass("is-patent-all");
                    matchTab.addClass("cur").siblings().removeClass("cur");
                    zgzlfl = mainSearch.find(".nav-content-list[data-id='zgzlfl']");//左侧：专利分类导航
                    zjdh = mainSearch.find(".nav-content-list[data-id='zl-zjdh']");//左侧：专辑导航
                    zgzlfl.show();
                    zjdh.hide();
                }
            }

        });
    }





};



