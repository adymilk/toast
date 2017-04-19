'use strict';
(function($,window){ 
	var DW = {};

	//显示提示信息    toast
	$.fn.toast = function(options){
		return this.each(function(){
			$(this).css({
				position:'relative'
			});
			var $this = $(this);
			var _this = this;
			var top = '';		//bottom的位置
			var translateInfo = ''; 	//居中和不居中时的tarnslate

		    var box = '';   //消息元素
		    var defaults = {
		    	position:  			  "absolute", 				//不是body的话就absolute
		    	animateStyle:  		  "fadeInUp",				//进入的动画
				padding:              "10px 20px",              //padding
				background:           "rgba(7,17,27,0.66)",     //背景色
				borderRadius:         "6px",                    	//圆角
				duration:             3000,                     //定时器时间
				fontSize:             "14px",                   //字体大小
				content:              "这是一个提示信息",       //提示内容
				color:                "#fff",                   //文字颜色
				top:            	  "80%",                	//bottom底部的位置    具体的数值 或者center  垂直居中
				zIndex:               '1000001',                //层级
				isCenter:   		  true, 					//是否垂直水平居中显示
				closePrev: 			  true, 					//在打开下一个toast的时候立即关闭上一个toast
		    }
		    
		    var opt = $.extend(defaults,options||{});
		    var t = '';
		  
			// setTimeout(function(){
			//   	box.addClass('show');
			// },10);

			top = opt.isCenter===true? '50%':opt.top;

			// translateY(-50%)
			// translateInfo = opt.isCenter===true? 'translate3d(-50%,0,0)':'translate3d(-50%,-50%,0)';

		    defaults.createMessage = function(){
				if(opt.closePrev){
					$('.cpt_toast').remove();
				}
				box = $("<span class='animated "+opt.animateStyle+" cpt_toast'>").css({
					"position":opt.position,
					"padding":opt.padding,
					"background":opt.background,
					"font-size":opt.fontSize,
					"-webkit-border-radius":opt.borderRadius,
					"-moz-border-radius":opt.borderRadius,
					"border-radius":opt.borderRadius,
					"color":opt.color,
					"top":top,
					"z-index":opt.zIndex,
					"-webkit-transform":'translate3d(-50%,-50%,0)',
			        "-moz-transform":'translate3d(-50%,-50%,0)',
			        "transform":'translate3d(-50%,-50%,0)',
				}).html(opt.content).appendTo($this);
				defaults.colseMessage();
		    }

		    defaults.colseMessage = function(){
		    	t = setTimeout(function(){
		    		box.removeClass(opt.animateStyle).addClass("fadeOutNoTransform").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
		    			box.remove();
		    		});
		    	},opt.duration);
		    }

		    defaults.createMessage();
		})
	};

	DW.showMessage = function(content,duration,isCenter,animateStyle){
		var animateStyle = animateStyle || 'fadeInUp';
		var content = content || '这是一个提示信息';
		var duration = duration || '3000';
		var isCenter = isCenter || false;
		$('body').toast({
			position:'fixed',
			animateStyle:animateStyle,
			content:content,
			duration:duration,
			isCenter:isCenter,
		});
	}

	window.$dw = DW;
})(jQuery,window); 
