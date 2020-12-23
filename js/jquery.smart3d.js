/**
 * @name jquery-smart3d.js
 * @author Kotelnitskiy Evgeniy (http://4coder.info)
 * @version 0.3.4
 * @date January 30, 2011
 * @category jQuery plugin
 * @license GPL
 * @example Visit http://4coder.info/en/code/jquery-plugins/smart3d/ for more informations about this jQuery plugin
**/

/*
 /*
 功能：多张图片位移，形成3d效果
 范围：工具书库-首页
 说明：鼠标移入图片时，图片随鼠标移动；移出图片时，图片自动位移
 其它：新增功能==图片宽高小于窗口时，垂直居中、自动移动
*/

(function($) {
	$.fn.smart3d = function(settings) {
	
        var thisObj = this;
        if (thisObj.length == 0) return false;
        var thisEl = thisObj[0];
		
        // Settings
        settings = jQuery.extend({
            frameWidth: $('>li', thisEl).width(),
            frameHeight: $('>li', thisEl).height(),
            horizontal: true,//水平的
            vertical: true,//垂直的
            firstStatic: false, //第一个静止
            lastStatic: false,//最后一个静止
			invertHorizontal: true,//反向水平
			invertVertical: true,//反向垂直
			autoAnimate:true//自动移动
        },settings);
		
        // Deprecated Options
        if (typeof settings['first_is_static'] != 'undefined') settings['firstStatic'] = settings['first_is_static'];
		if (typeof settings['last_is_static']  != 'undefined') settings['lastStatic']  = settings['last_is_static'];
		if (typeof settings['frame_width']  != 'undefined') settings['frameWidth']  = settings['frame_width'];
		if (typeof settings['frame_height'] != 'undefined') settings['frameHeight'] = settings['frame_height'];
		// end Deprecated Options
		
		var width = thisObj.width();
		var height = thisObj.height();
		var offset_x = settings['frameWidth'] - width;
		var offset_y = settings['frameHeight'] - height+50;
		
		thisObj.css({
			'position' : 'relative',
			'overflow' : 'hidden'
		});

		var lis = thisObj.find('>li');

		lis.css({'position': 'absolute'});
		
		if (settings['horizontal']) {
			lis.css('left', ( width - settings['frameWidth']) / 2);
		}
		else {
			lis.css('left', '0');
		}
			
		if (settings['vertical']) {
			lis.css('top', ( height - settings['frameHeight']) / 2);
		}
		else {
			lis.css('top', '0');
		}
			
		thisObj.pos_x = 0;
		thisObj.pos_y = 0;

		var setAuto,speed=1000;

		setAuto = setInterval(autoMove,speed);

		thisObj.mousemove(function(e){
			clearInterval(setAuto);
			imgMove(e.clientX*10,e.clientY*10);
		}).mouseout(function () {
			setAuto = setInterval(autoMove,speed);
		});

		function autoMove(){
			if(settings['autoAnimate']) {
				var x, y;
				x = getRandom(0,200);
				y = getRandom(0,100);
				imgMove(x, y);
			}else return;
		}

		function getRandom(min,max){
			var range = max-min;
			return min+(range*Math.random());
		}

		function imgMove(myX,myY){

			if (settings['horizontal']) {
				var scroll = $('html').scrollLeft() || $('body').scrollLeft();

				var x = myX  - thisObj.offset().left + scroll;
				if (x > width) x = width;

				if (settings['invertHorizontal'])
					thisObj.pos_x = offset_x / 2 - (x / width * offset_x);
				else
					thisObj.pos_x = (x / width * offset_x) - offset_x / 2;
			}
			if (settings['vertical']) {
				var scroll = $('html').scrollTop() || $('body').scrollTop();

				var y = myY  - thisObj.offset().top + scroll;
				if (y > height) y = height;

				if (settings['invertVertical'])
					thisObj.pos_y = offset_y / 2 - (y / height * offset_y);
				else
					thisObj.pos_y = (y / height * offset_y) - offset_y / 2;

			}

		}

		
		function smart3d_animate(){

			for (var i=1; i<=lis.length; i++){
				if ((settings['lastStatic'] && i == lis.length) || (settings['firstStatic'] && i == 1))
					continue;
				if (settings['horizontal']) {
					var cur_l = parseFloat(jQuery(lis[i-1]).css('left'));
					var new_l = thisObj.pos_x * (i / lis.length) - offset_x / 2;
					//if (Math.abs(cur_l - new_l) > 1)
						jQuery(lis[i-1]).css('left', (new_l + cur_l*6) / 7);
				}
				if (settings['vertical']) {
					var cur_l = parseFloat(jQuery(lis[i-1]).css('top'));
					var new_l = thisObj.pos_y * (i / lis.length) - offset_y / 2;
					//if (Math.abs(cur_l - new_l) > 1)
						jQuery(lis[i-1]).css('top', (new_l + cur_l*6) / 7);
				}
			}
		}


		setInterval(smart3d_animate, 40);
		return this;
	};
})(jQuery); 