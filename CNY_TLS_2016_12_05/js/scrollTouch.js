	function scroll_int (a) {
		var ispc=IsPC();
		var content_outer_width=$('#'+a).find('.content_outer').width();
		var content_inner_width=$('#'+a).find('.content_inner').width();
		var track_width=$('#'+a).find('.track').width();

		var content_outer_height=$('#'+a).find('.content_outer').height();
		var content_inner_height=$('#'+a).find('.content_inner').height();
		var track_height=$('#'+a).find('.track').height();
		
		var begin_top=$('#'+a).find('.content_outer').scrollTop();
		var begin_left=$('#'+a).find('.content_outer').scrollLeft();


		var begin_top_thumb=$('#'+a).find('.thumb').position().top;
		var begin_left_thumb=$('#'+a).find('.thumb').position().left;

		var scroll_obj=document.getElementById(a);
		// console.log(begin_top_thumb)
		if(content_outer_height==content_inner_height&&content_outer_width!=content_inner_width){
			// 初始化滚动条thumb宽度
			var thumb_width_int=track_width*content_outer_width/content_inner_width;
			$('#'+a).find('.thumb').width(thumb_width_int);
			//back
		    $('#'+a).find('.content_outer').scrollLeft(0);
		    $('#'+a).find('.thumb').css({'left':'0px'});
			//touch&&grag
			if(!ispc){
				$('#'+a+' .content_outer').on('touchstart',function(e) {
					event.stopPropagation();
					event.preventDefault();
			    	touch_start= e.originalEvent.targetTouches[0].pageX+begin_left;
					$('#'+a+' .content_outer').on('touchmove',function(e) {
					  	touch_end = e.originalEvent.targetTouches[0].pageX;
					  	begin_left=touch_start-touch_end;//正
					    if(content_outer_width+begin_left>=content_inner_width){
					    	begin_left=content_inner_width-content_outer_width;
					    }else if(begin_left<=0){
					    	begin_left=0;
					    }
					    $('#'+a).find('.content_outer').scrollLeft(begin_left);
					    //运动浮动也按照比例进行
					    $('#'+a).find('.thumb').css({'left':track_width*begin_left/content_inner_width+'px'})
					});
				});
				$('#'+a+' .content_outer').on('touchend',function(e) {
					$('#'+a+' .content_outer').off('touchmove');
				});
				$('#'+a+' .thumb').on('touchstart',function(e) {
					event.stopPropagation();
					event.preventDefault();
			    	var touch_start_thumb=e.originalEvent.targetTouches[0].pageX-begin_left_thumb;
					$('#'+a+' .thumb').on('touchmove',function(e) {
					  	var touch_end_thumb = e.originalEvent.targetTouches[0].pageX;
					  	begin_left_thumb=touch_end_thumb-touch_start_thumb;
					  	if(begin_left_thumb>$('#'+a+' .track').width()-$('#'+a+' .thumb').width()){
					  		begin_left_thumb=$('#'+a+' .track').width()-$('#'+a+' .thumb').width();
					  	}else if(begin_left_thumb<0){
					  		begin_left_thumb=0;
					  	}
					  	$('#'+a).find('.thumb').css({'left':begin_left_thumb+'px'});
					  	begin_left=content_inner_width*begin_left_thumb/track_width;
					  	$('#'+a).find('.content_outer').scrollLeft(begin_left);
					});
				});
				$('#'+a+' .thumb').on('touchend',function(e) {
					$('#'+a+' .thumb').off('touchmove');
				});
			}else{
				$('#'+a+' .thumb').on('mousedown',function(e) {     
			    	var touch_start_thumb=e.clientX-begin_left_thumb;
					$('#'+a+' .thumb').on('mousemove',function(e) {
					  	var touch_end_thumb = e.clientX;
					  	begin_left_thumb=touch_end_thumb-touch_start_thumb;
					  	if(begin_left_thumb>$('#'+a+' .track').width()-$('#'+a+' .thumb').width()){
					  		begin_left_thumb=$('#'+a+' .track').width()-$('#'+a+' .thumb').width();
					  	}else if(begin_left_thumb<0){
					  		begin_left_thumb=0;
					  	}
					  	$('#'+a).find('.thumb').css({'left':begin_left_thumb+'px'});
					  	begin_left=content_inner_width*begin_left_thumb/track_width;
					  	$('#'+a).find('.content_outer').scrollLeft(begin_left);
					});
				});
				$(document).on('mouseup',function(e) {
					$('#'+a+' .thumb').off('mousemove');
				});
			}
			//mouse_scroll
		  	scroll_obj.onmousewheel = function(event,delta) {
			    event = event || window.event;
			    // console.dir(event.wheelDelta/120);
			    if (event&& event.preventDefault) {//如果是FF下执行这个 
			        event.preventDefault(); 
			    }else{ 
			        window.event.returnValue = false;//如果是IE下执行这个
			    } 	
			    begin_left-=10*event.wheelDelta/120;//正
			    if(content_outer_width+begin_left>=content_inner_width){
			    	begin_left=content_inner_width-content_outer_width;
			    }else if(begin_left<=0){
			    	begin_left=0;
			    }
			    $('#'+a).find('.content_outer').scrollLeft(begin_left);
			    //运动浮动也按照比例进行
			    $('#'+a).find('.thumb').css({'left':track_width*begin_left/content_inner_width+'px'})
			};

			if (event&& event.preventDefault) {//如果是FF下执行这个 
				document.body.addEventListener("DOMMouseScroll", function(event,delta) {
			    	event.preventDefault(); 

				    begin_left+=10*event.wheelDelta/3;//正
				    if(content_outer_width+begin_left>=content_inner_width){
				    	begin_left=content_inner_width-content_outer_width;
				    }else if(begin_left<=0){
				    	begin_left=0;
				    }
				    $('#'+a).find('.content_outer').scrollLeft(begin_left);
				    //运动浮动也按照比例进行
				    $('#'+a).find('.thumb').css({'left':track_width*begin_left/content_inner_width+'px'})
				});
			}else if(document.body.attachEvent){ 
		        document.body.attachEvent("DOMMouseScroll", function(event,delta) {
		        	window.event.returnValue = false;//如果是IE下执行这个
		        	element.onselectstart = new Function("return false");  
				    begin_left+=10*event.wheelDelta/3;//正
				    if(content_outer_width+begin_left>=content_inner_width){
				    	begin_left=content_inner_width-content_outer_width;
				    }else if(begin_left<=0){
				    	begin_left=0;
				    }
				    $('#'+a).find('.content_outer').scrollLeft(begin_left);
				    //运动浮动也按照比例进行
				    $('#'+a).find('.thumb').css({'left':track_width*begin_left/content_inner_width+'px'})
				});
		    } 
		}else if(content_outer_width==content_inner_width&&content_outer_height!=content_inner_height){
			// 初始化滚动条thumb高度
			//var thumb_height_int=track_height*content_outer_height/content_inner_height;
			//$('#'+a).find('.thumb').height(thumb_height_int);
			//back
			//$('#'+a).find('.content_outer').scrollTop(0);
            //$('#'+a).find('.thumb').css({'top':'0px'})
			//touch&&grag
			if(!ispc){
				$('#'+a+' .content_outer').on('touchstart',function(e){
					event.stopPropagation();
					event.preventDefault();
					//var barheight=parseFloat($("#"+a+" .track").css("height"));
					//var textheight=parseFloat($("#"+a+" .content_inner").css("height"));
					//console.log(textheight/barheight);
			    	touch_start= e.originalEvent.targetTouches[0].pageY+begin_top;
					$('#'+a+' .content_outer').on('touchmove',function(e){

					  	touch_end = e.originalEvent.targetTouches[0].pageY;
					  	begin_top=touch_start-touch_end;//正
					    if(content_outer_height+begin_top>=content_inner_height){
					    	begin_top=content_inner_height-content_outer_height;
					    }else if(begin_top<=0){
					    	begin_top=0;
					    }
					    $('#'+a).find('.content_outer').scrollTop(begin_top);
					    //运动浮动也按照比例进行
					    $('#'+a).find('.thumb').css({'top':(track_height*begin_top/content_inner_height)*HMZHMZscrollNum+'px'})
					});
				});
				$('#'+a+' .content_outer').on('touchend',function(e) {
					$('.content_outer').off('touchmove');
				});
				$('#'+a+' .thumb').on('touchstart',function(e) {
					event.stopPropagation();
					event.preventDefault();
			    	var touch_start_thumb=e.originalEvent.targetTouches[0].pageY-begin_top_thumb;
					$('#'+a+' .thumb').on('touchmove',function(e) {
					  	var touch_end_thumb = e.originalEvent.targetTouches[0].pageY;
					  	begin_top_thumb=touch_end_thumb-touch_start_thumb;
					  	if(begin_top_thumb>$('#'+a+' .track').height()-$('#'+a+' .thumb').height()){
					  		begin_top_thumb=$('#'+a+' .track').height()-$('#'+a+' .thumb').height();
					  	}else if(begin_top_thumb<0){
					  		begin_top_thumb=0;
					  	}
					  	$('#'+a).find('.thumb').css({'top':begin_top_thumb+'px'});
					  	begin_top=content_inner_height*begin_top_thumb/track_height;
					  	$('#'+a).find('.content_outer').scrollTop(begin_top);
					});
				});
				$('#'+a+' .thumb').on('touchend',function(e) {
					$('#'+a+' .thumb').off('touchmove');
				});
			}else{
				$('#'+a+' .thumb').on('mousedown',function(e) {
			    	var touch_start_thumb=e.clientY-begin_top_thumb;
					$('#'+a+' .thumb').on('mousemove',function(e) {
					  	var touch_end_thumb = e.clientY;
					  	begin_top_thumb=touch_end_thumb-touch_start_thumb;
					  	if(begin_top_thumb>$('#'+a+' .track').height()-$('#'+a+' .thumb').height()){
					  		begin_top_thumb=$('#'+a+' .track').height()-$('#'+a+' .thumb').height();
					  	}else if(begin_top_thumb<0){
					  		begin_top_thumb=0;
					  	}
					  	$('#'+a).find('.thumb').css({'top':begin_top_thumb+'px'});
					  	begin_top=content_inner_height*begin_top_thumb/track_height;
					  	$('#'+a).find('.content_outer').scrollTop(begin_top);
					});
				});
				$(document).on('mouseup',function(e) {
					$('#'+a+' .thumb').off('mousemove');
				});
			}
			//mouse_scroll
		  	scroll_obj.onmousewheel = function(event,delta) {
			    event = event || window.event;
			    // console.dir(event.wheelDelta/120);
			    if (event&& event.preventDefault) {//如果是FF下执行这个 
			        event.preventDefault(); 
			    }else{ 
			        window.event.returnValue = false;//如果是IE下执行这个
			    } 	
			    begin_top-=10*event.wheelDelta/120;//正
			    if(content_outer_height+begin_top>=content_inner_height){
			    	begin_top=content_inner_height-content_outer_height;
			    }else if(begin_top<=0){
			    	begin_top=0;
			    }
			    $('#'+a).find('.content_outer').scrollTop(begin_top);
			    //运动浮动也按照比例进行
			    $('#'+a).find('.thumb').css({'top':track_height*begin_top/content_inner_height+'px'})
			};
			if (event&& event.preventDefault) {//如果是FF下执行这个 
				document.body.addEventListener("DOMMouseScroll", function(event,delta) {
				    event.preventDefault(); 
				    // console.dir(event.detail);	
				    begin_top+=10*event.wheelDelta/3;//正
				    if(content_outer_height+begin_top>=content_inner_height){
				    	begin_top=content_inner_height-content_outer_height;
				    }else if(begin_top<=0){
				    	begin_top=0;
				    }
				    $('#'+a).find('.content_outer').scrollTop(begin_top);
				    //运动浮动也按照比例进行
				    $('#'+a).find('.thumb').css({'top':track_height*begin_top/content_inner_height+'px'})
				});
			}
		    else if(document.body.attachEvent){ 
		        document.body.attachEvent("DOMMouseScroll", function(event,delta) {
		        	window.event.returnValue = false;//如果是IE下执行这个
		        	element.onselectstart = new Function("return false");  
				    // console.dir(event.detail);	
				    begin_top+=10*event.wheelDelta/3;//正
				    if(content_outer_height+begin_top>=content_inner_height){
				    	begin_top=content_inner_height-content_outer_height;
				    }else if(begin_top<=0){
				    	begin_top=0;
				    }
				    $('#'+a).find('.content_outer').scrollTop(begin_top);
				    //运动浮动也按照比例进行
				    $('#'+a).find('.thumb').css({'top':track_height*begin_top/content_inner_height+'px'})
				});
		    } 
		}else{
			return;
		}
	}
	function IsPC(){
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}