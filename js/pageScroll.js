// JavaScript Document
/* 
  工具书库 20170317
  范围： 首页，独立子产品页
  功能： 滚动页面时，触发事件，为当前在可视化窗口显示的模块添加class ".is-visible"
  语法： 原生js+jquery
*/
(function($){
	$.fn.pageScroll = function () {

		var obj = this,
			num=0,
			mypage = $(obj),
			numMax = mypage.length-1;

		function getScrollTop(e){
			var scrollTop=0;
			if(document.documentElement&&document.documentElement.scrollTop){
				return document.documentElement.scrollTop;
			}
			else if(document.body.scrollTop){
				return document.body.scrollTop;
			}
			else{return scrollTop}//滚到最上方的是就是自己设置的scrollTop变量
			// return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		}

		/*function setScrollTop(x){
			if(document.documentElement&&document.documentElement.scrollTop){
				document.documentElement.scrollTop=x;
			}
			else if(document.body.scrollTop){
				document.body.scrollTop=x;
			}
			else{window.scrollTo(0,x)}//滚到最上方时时没有上面2个属性的只有window.scrollTo(0,x)
		}*/

		function throttle(method,context){//函数节流，method是要执行的函数，context是作用域函数
			clearTimeout(method.tId);//先清除之前设置的定时器，定时器ID存储在函数的tId属性中
			method.tId=setTimeout(function(){method.call(context)},100)//使用call（）来确保方法在适当的环境运行，如果没第2个参数就在全局执行
		}

		function gun(e){
			e=e||window.event;
			numMax = mypage.length-1;
			var curTop=getScrollTop();
			mypage.each(function (i) {
				_thisTop = $(this).offset().top;
				_thisH = $(this).outerHeight();
				if(_thisTop < curTop && (_thisTop+_thisH) > curTop){
					num = i+0.5;
					$(this).addClass("is-visible");
				}else if(_thisTop == curTop){
					num = i;
					$(this).addClass("is-visible");

				}else if( _thisTop <= curTop + $(window).height()/2 && _thisTop > curTop){
					$(this).addClass("is-visible");
				}
			});

			// console.log(num);
		}
		window.onscroll=function(e){
			throttle(gun);
		};
		window.onload=function(e){
			throttle(gun);
		};

		function settimer(num){
			goalTop = mypage.eq(num).offset().top;
			$('html, body').animate({
				scrollTop: goalTop
			}, 500,function () {
				if(document.addEventListener){//重新添加事件监听
					document.addEventListener('DOMMouseScroll',scrollFunc,false);
				}//W3C
				window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
			});

			// console.log(num);

		}

		function scrollFunc(e){
			e=e || window.event;
			if(e.preventDefault) {  // Firefox
				e.preventDefault();
			} else{// IE
				window.event.returnValue = false;
			}
			if(document.removeEventListener){//去除事件监听，让程序不能连续执行，要先执行完再添加事件监听
				document.removeEventListener('DOMMouseScroll',scrollFunc,false);
			}//W3C

			window.onmousewheel=document.onmousewheel=function(){ return false };//使他等于NULL居然无效，不知道什么原因


			if(e.wheelDelta<0 || e.detail>0){//向下滚动
                if( num < numMax ) {
                    num = Math.floor(num)+1;
                }
            }else{
                if(num>0) {
                    num = Math.ceil(num)-1;
                }
            }
			settimer(num);
		}

		/*注册鼠标滚轮事件*/
		if(document.addEventListener){
			document.addEventListener('DOMMouseScroll',scrollFunc,false);
		}//W3C
		window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome


	}

})(jQuery);


