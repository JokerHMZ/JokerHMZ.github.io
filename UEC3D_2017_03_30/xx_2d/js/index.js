document.addEventListener('touchmove',function(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
});
var done=false;
var width=window.innerWidth;
var height=window.innerHeight;
// 判断微信
function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}
var isWeiXin=is_weixin();
// 判断ios
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
//音乐
var myVid=document.getElementById('video1');
var myaudio=$('#myaudio')[0];
myaudio.play();
document.addEventListener("WeixinJSBridgeReady", function () {
    myaudio.play();
	myaudio.pause();
}, false);
myaudio.pause();

var imgArr=[
	'img/container_bc.jpg',
	'img/buttle_bc1.png',
	'img/buttle_bc2.png',
	'img/logo.png',
	'img/music_btn.png',
	'img/nav.png',
	'img/hand.png',
	'img/nav_word.png',
	'img/nav_biao.png',
	'img/page1.png',
	'img/page2.png',
	'img/page3.png',
	'img/page4.png',
	'img/page5.png',
	'img/page6.png',
	'img/page3_tan.png',
	'img/page4_tan.png',
	'img/page5_tan.png',
]

weixinshare();
loadImg(0);

function loadImg(n){
    if(n==imgArr.length){
        $('#loading').fadeOut();
        $('.num').html("100");
        enter();
    } else {
        $('<img src="'+imgArr[n]+'" alt="" />').load(function(){
        	$('.num').html(parseInt(n/imgArr.length*100));
            loadImg(n+1);
        });
    }
}
if(width/height>32/55&&width/height<=16/25){
	$('.slide_c').css({'transform':'scale(0.9,0.9)','-webkit-transform':'scale(0.9,0.9)'});
	$('.swiper-slide').eq(2).find('.slide_c').css({'transform':'scale(0.82,0.82)','-webkit-transform':'scale(0.82,0.82)'});
	$('.swiper-slide').eq(5).find('.slide_c').css({'transform':'scale(1,1)','-webkit-transform':'scale(1,1)'});
	$('.float>div').css({'transform':'scale(0.9,0.9)','-webkit-transform':'scale(0.9,0.9)'});
}else if(width/height>=32/55){
	$('.slide_c').addClass('scale');
	$('.float>div').addClass('scale');
}

function enter(){
	done=true;
	if(isWeiXin){
		myaudio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
		        myaudio.play();
		}, false);
	}else{
		myaudio.pause();
		$('.music_btn').removeClass('music_btn_on');
	}
	$(".page1").removeClass('page_out_left');
	var nowIndex=0,
		buttle_bc_left=0,
		buttle_bc_left1=0,
		buttle_bc_left_add=0,
		buttle_bc_left_add1=0,
		buttle_bc_top_add=0,
		buttle_bc_top_add1=0,
		obj_top_add=0,
		obj_left_add=0,
		nav_left=0;
	var swiper = new Swiper('.swiper-container', {
		speed:800,
		resistanceRatio : 0.1,
		onTransitionStart: function(swiper){
			$('.nav_word').fadeOut(1000);
	      	nowIndex=swiper.activeIndex;
	      	nav_left=-nowIndex*207;
	      	buttle_bc_left=-nowIndex*100;
	      	buttle_bc_left1=-nowIndex*163;
	      	$('.nav').css({'transform':'translate3d('+nav_left+'px,0,0)','-webkit-transform':'translate3d('+nav_left+'px,0,0)'});
	      	$('.buttle_bc').css({'transform':'translate3d('+buttle_bc_left+'px,0,0)','-webkit-transform':'translate3d('+buttle_bc_left+'px,0,0)'});
	      	$('.buttle_bc1').css({'transform':'translate3d('+buttle_bc_left1+'px,0,0)','-webkit-transform':'translate3d('+buttle_bc_left1+'px,0,0)'});
	      	$('.nav_now').hide().eq(nowIndex).show();

	      	if(swiper.previousIndex==0){
	      		$('.page1').addClass('page_out_left');
	      	}else if(swiper.previousIndex==1){
	      		$('.page2').addClass('page_out_left');
	      	}else if(swiper.previousIndex==2){
	      		$('.page3').addClass('page_out_left');
	      	}else if(swiper.previousIndex==3){
	      		$('.page4').addClass('page_out_left');
	      	}else if(swiper.previousIndex==4){
	      		$('.page5').addClass('page_out_left');
	      	}else if(swiper.previousIndex==5){
	      		$('.page6').addClass('page_out_left');
	      	}
	    },
		onTransitionEnd: function(swiper){
	      	if(swiper.activeIndex==0){
	      		$('.page1').removeClass('page_out_left');
	      	}else if(swiper.activeIndex==1){
	      		$('.page2').removeClass('page_out_left');
	      	}else if(swiper.activeIndex==2){
	      		$('.page3').removeClass('page_out_left');
	      	}else if(swiper.activeIndex==3){
	      		$('.page4').removeClass('page_out_left');
	      	}else if(swiper.activeIndex==4){
	      		$('.page5').removeClass('page_out_left');
	      	}else if(swiper.activeIndex==5){
	      		$('.page6').removeClass('page_out_left');
	      	}
	    }
    });
    // 弹层
	$('.close').on('touchstart',function(){
		$('.float').fadeOut();
		$('.float>div').fadeOut();
		swiper.unlockSwipes();
	});

	$('.page3_fu_btn').on('touchend',function(){
		$('.float').fadeIn();
		$('.page3_float').fadeIn();
		swiper.slideTo(2, 800, false);
		$('.page3').removeClass('page_out_left');
		swiper.lockSwipes();
	});	
	$('.page4_fu_btn').on('touchend',function(){
		$('.float').fadeIn();
		$('.page4_float').fadeIn();
		swiper.slideTo(3, 800, false);
		$('.page4').removeClass('page_out_left');
		swiper.lockSwipes();
	});	
	$('.page5_fu_btn').on('touchend',function(){
		$('.float').fadeIn();
		$('.page5_float').fadeIn();
		swiper.slideTo(4, 800, false);
		$('.page5').removeClass('page_out_left');
		swiper.lockSwipes();
	});

	$('.page6_fu_btn').on('touchend',function(){
		window.location.href='https://evt.dianping.com/midas/1activities/a8220nyyblse9c4jt/index.html?utm_source=o_weixin';
		swiper.slideTo(5, 800, false);
		$('.page6').removeClass('page_out_left');
	});


	$('.music_touch_btn').on('touchstart',function(){
		if($('.music_btn').hasClass('music_btn_on')){
			myaudio.pause();
			$('.music_btn').removeClass('music_btn_on');
		}else{
			myaudio.play();
			$('.music_btn').addClass('music_btn_on');
		}
	});
	//视频
	$('.videobtn').on('touchstart',function(){
		myaudio.pause();
		$('.music_btn').removeClass('music_btn_on');

		$('#videof').show();
        myVid.play();
	});

	myVid.addEventListener('ended',function(){
		// $('#videof').remove();
		if(isiOS){
			$('#videof').hide();
		}else{
			$('#videof').remove();
		}
		$('.music_btn').addClass('music_btn_on');
		myaudio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
		        myaudio.play();
		}, false);
    },false);

    myVid.addEventListener('pause',function(){
		// $('#videof').remove();

		if(isiOS){
			$('#videof').hide();
		}else{
			$('#videof').remove();
		}
		$('.music_btn').addClass('music_btn_on');
		myaudio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
		        myaudio.play();
		}, false);
    },false);

    // 倾斜监听
     if (window.DeviceMotionEvent) { 
        window.addEventListener('devicemotion',deviceMotionHandler, false);
    }else{ 
        return; 
    }

    function deviceMotionHandler(eventData) {
	    var acceleration = eventData.accelerationIncludingGravity; 
	    var facingUp = -1; 
	    if (acceleration.z > 0) { 
	        facingUp = +1; 
	    }      
	    var tiltLR = acceleration.x;
	    var tiltFB = acceleration.y;
	    var ua1 = navigator.userAgent;
	    if (/Android/.test(ua1)) {
	    	// alert(tiltFB)
	        if(tiltLR>1){
	            //左倾斜
	            buttle_bc_left_add=-22;
	            buttle_bc_left_add1=-50;
	            obj_left_add=-30;
	        }
	        else if(tiltLR<-1){
	           	// 右倾斜
	            buttle_bc_left_add=22;
	            buttle_bc_left_add1=50;
	            obj_left_add=30;
	        }
	        else if(tiltLR>-1&&tiltLR<1){
	            // 左右水平的
	           buttle_bc_left_add=0;
	           buttle_bc_left_add1=0;
	           obj_left_add=0;
	        }
	        if(tiltFB>1){
	            // 竖
				buttle_bc_top_add=18;
				buttle_bc_top_add1=20;
	            obj_top_add=30;
	        }
	        else if(tiltFB<-1){
	            // 躺
				buttle_bc_top_add=-18;
				buttle_bc_top_add1=-20;
	            obj_top_add=-30;
	        }  
	        else if(tiltFB>-1&&tiltFB<1){
	            // 上下水平的
				buttle_bc_top_add=0;
				buttle_bc_top_add1=0;
	            obj_top_add=0;
	        }   
	    } else {
	        if(tiltLR>1){
	            // 右倾斜
	            buttle_bc_left_add=30;
	            buttle_bc_left_add1=60;
	            obj_left_add=22;
	        }
	        else if(tiltLR<-1){
	            //左倾斜
	            buttle_bc_left_add=-30;
	            buttle_bc_left_add1=-60;
	            obj_left_add=-22;
	        }
	        else if(tiltLR>-1&&tiltLR<1){
	            //左右水平的
	           	buttle_bc_left_add=0;
	           	buttle_bc_left_add1=0;
	            obj_left_add=0;
	        } 
	        if(tiltFB>1){
	            // 躺
				buttle_bc_top_add=-18;
				buttle_bc_top_add1=-20;
	            obj_top_add=-30;
	        }
	        else if(tiltFB<-1){
	            // 竖
				buttle_bc_top_add=18;
				buttle_bc_top_add1=20;
	            obj_top_add=30;
	        }  
	        else if(tiltFB>-1&&tiltFB<1){
	            // 上下水平的
				buttle_bc_top_add=0;
				buttle_bc_top_add1=0;
	            obj_top_add=0;
	        } 
	    }
	    if(done){
	    	$('.buttle_bc').css({'transform':'translate3d('+(buttle_bc_left+buttle_bc_left_add)+'px,'+buttle_bc_top_add+'px,0)','-webkit-transform':'translate3d('+(buttle_bc_left+buttle_bc_left_add)+'px,'+buttle_bc_top_add+'px,0)'});
	    	$('.buttle_bc1').css({'transform':'translate3d('+(buttle_bc_left1+buttle_bc_left_add1)+'px,'+buttle_bc_top_add1+'px,0)','-webkit-transform':'translate3d('+(buttle_bc_left1+buttle_bc_left_add1)+'px,'+buttle_bc_top_add1+'px,0)'}); 
	    	$('.slide_c_mov').css({'transform':'translate3d('+obj_left_add+'px,'+obj_top_add+'px,0)','-webkit-transform':'translate3d('+obj_left_add+'px,'+obj_top_add+'px,0)'}) ;
	    }
	} 
	
}
// 微信分享
function weixinshare() {
	// body...
	$.ajax({
	    type:"POST",
	    url:"http://youyic3d.mengniu.com.cn/api/index.php",
	    data:{url:window.location.href},
	    dataType:"json",
	    success:function (data){
	        wx.config({
	            debug: false,
	            appId: data.appId,
	            timestamp: data.timestamp,
	            nonceStr: data.nonceStr,
	            signature: data.signature,
	            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
	        });
	        // 分享后标题
	        var otitle = "深扒老公吴亦凡的新宠";
	        // 分享朋友圈后描述
	        var desc ="小爷吴亦凡的最爱，喝就是了";
	        // 分享个人后描述
	        var descSingle ="小爷吴亦凡的最爱，喝就是了";
	        // 分享后B用户打开的地址
	        var olink ='http://youyic3d.mengniu.com.cn/';
	        // 分享图片
	        var oimgUrl ='http://youyic3d.mengniu.com.cn/3d/img/wShare.png';
	        wx.ready(function (){
	            wx.onMenuShareTimeline({
	                title: desc,
	                link:  olink,
	                imgUrl: oimgUrl
	            });
	            wx.onMenuShareAppMessage({
	                title: otitle,
	                desc:  descSingle,
	                link: olink,
	                imgUrl: oimgUrl
	            });
	        })
	    }
	});
}