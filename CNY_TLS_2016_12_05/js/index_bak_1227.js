var HyFn = (function(window, undefined){

	var isTouch = "ontouchend" in document ? true : false,
		evStart = isTouch ? 'touchstart' : 'mousedown',
		evMove = isTouch ? 'touchmove' : 'mousemove',
		evEnd = isTouch ? 'touchend' : 'mouseup';

	var manifest = [
		{src:'images/rect1.png',id:'rect1'},
		{src:'images/rect2.png',id:'rect2'},
		{src:'images/city.png',id:'city'},
		{src:'images/rect3.png',id:'rect3'},
		// {src:'images/hill_1.png',id:'hill_1'},
		// {src:'images/hill_2.png',id:'hill_2'},
		// {src:'images/hill_4.png',id:'hill_4'},
		// {src:'images/hill_5.png',id:'hill_5'},
		// {src:'images/hill_6.png',id:'hill_6'},
		// {src:'images/hill_7.png',id:'hill_7'},
		// {src:'images/hill_8.png',id:'hill_8'},
		{src:'images/hill.png',id:''},
		{src:'images/rect4.png', id:'rect4'},
		{src:'images/rect5.png', id:'rect5'},
		{src:'images/rect6.png', id:'rect6'},
		{src:'images/slogan.png', id:'slogan'},
		{src:'images/rect7.png', id:'rect7'},
		{src:'images/box1_btn.png', id:''},
		{src:'images/box2_text.png', id:''},
		{src:'images/load_con.png', id:''},
		{src:'images/text_1.png', id:''},
		{src:'images/text_2.png', id:''},
		{src:'images/text_3.png', id:''},
		{src:'images/text_4.png', id:''},
		{src:'img/bigPrize.png', id:''},
		{src:'img/bodyBg.jpg', id:''},
		{src:'img/DM.png', id:''},
		{src:'img/DMBtn.png', id:''},
		{src:'img/HMZbunner1.png', id:''},
		{src:'img/HMZbunner2.png', id:''},
		{src:'img/HMZerror.png', id:''},
		{src:'img/HMZli1.png', id:''},
		{src:'img/HMZma.png', id:''},
		{src:'img/HMZtel.png', id:''},
		{src:'img/HMZtelma.png', id:''},
		{src:'img/HMZti1.png', id:''},
		{src:'img/inWsuccessBtn.png', id:''},
		{src:'img/inWsuccessTitle.png', id:''},
		{src:'img/inWsuccessUse.png', id:''},
		{src:'img/logo.png', id:''},
		{src:'img/lottery_submit.png', id:''},
		{src:'img/noRecond.png', id:''},
		{src:'img/nutritionHead.png', id:''},
		{src:'img/nutritionTime.png', id:''},
		{src:'img/outWsuccessBtn.png', id:''},
		{src:'img/outWsuccessTitle.png', id:''},
		{src:'img/outWsuccessUse.png', id:''},
		{src:'img/personalCenter.png', id:''},
		{src:'img/personCenterBg.png', id:''},
		{src:'img/prizeExplain.png', id:''},
		{src:'img/prizeRecord.png', id:''},
		{src:'img/statement.png', id:''},
		{src:'img/prizeExplainText.png', id:''},
		{src:'img/scrollBarLine.png', id:''},
		{src:'img/lottery_submitChaKan.png', id:''},
		{src:'img/scrollBarRect.png', id:''},
		{src:"src/3.mp3", id:'sound'},
		{src:"src/bg.mp3", id:'bg'},
		{src:'img/statementWord.png', id:''}
	];

	var initIMG1 = {w:10, maxH:150, minH:10, maxT:500, count:64};//275

	var initIMG2 = {w:5, maxH:516, minH:485, maxT:200, count:181};

	var initIMG_city = [
		{w:56, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:54, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:48, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:50, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:50, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:58, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:34, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:30, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:42, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:42, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:38, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:28, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:52, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:74, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:78, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:46, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:46, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:40, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100},
		{w:39, maxH:30, minH:10, maxT:1000, sign: 1, blankS:50, blankE:100}
	];

	var initIMG3 = {w:10, maxH:275, minH:10, maxT:500, count:32};

	var initIMG4 = {w:10, maxH:514, minH:460, maxT:200, count:144, noBlank:true};

	var initIMG_hill = [
		{x:583, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_8', noBlank:true},
		{x:1062, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_7', noBlank:true},
		{x:937, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_6', noBlank:true},
		{x:789, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_5', noBlank:true},
		{x:333, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_4', noBlank:true},
		{x:256, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_1', noBlank:true},
		{x:-20, maxH:0, minH:0, maxT:1000, sign: 1, id:'hill_2', noBlank:true}
	];

	var initIMG5 = {w:10, maxH:275, minH:10, maxT:500, count:22, noBlank:true};

	var initIMG6 = {w:4, maxH:343, minH:270, maxT:100, count:118, noBlank:true};

	var initIMG7 = {w:10, maxH:275, minH:10, maxT:500, count:9, noBlank:true};

	var initIMG8 = {w:10, maxH:514, minH:460, maxT:200, count:144, noBlank:true};

	var initIMG_hill1 = [
		{x:256, maxH:0, minH:0, maxT:400, sign: 1, id:'hill_1',noBlank:true},
		{x:333, maxH:0, minH:0, maxT:400, sign: 1, id:'hill_4',noBlank:true},
		{x:789, maxH:0, minH:0, maxT:400, sign: 1, id:'hill_5',noBlank:true},
		{x:937, maxH:0, minH:0, maxT:400, sign: 1, id:'hill_6',noBlank:true}
	];

	var stage, container, images=images||{}, H=window.innerHeight, initX = 0, pixi, ticks, slogan=false,
		sloX=0, hillX=0, hill1X=0, mus, bg, SPEED=6, toVideo=false, SKIP=false, SW=screen.width, hill=false,
		hill1=false;

	var can = document.getElementById('canvas'), ctx = can.getContext('2d'),
		can0= document.getElementById('canvasB'),ctx0=can0.getContext('2d'),
		can1= document.getElementById('canvasF'),ctx1=can1.getContext('2d'),
		video = document.getElementById('video');

	var contain1, contain2, contain3, contain4, contain5, contain6, contain7, contain8;

	var lists1, lists1_o,
		lists2, lists2_o,
		lists3, lists3_o,
		lists4, lists4_o,
		lists5, lists5_o,
		lists6, lists6_o,
		lists7, lists7_o,
		lists8, lists8_o;

	var load = function(){
		var preload = new createjs.LoadQueue(false);
		createjs.Sound.alternateExtensions = ["mp3"];
		preload.installPlugin(createjs.Sound);
		preload.on("fileload", handleFileLoadLoading);
		preload.on("progress", handleProgress);
		preload.on("complete", handleComplete);
		preload.loadManifest(manifest);

		function handleFileLoadLoading(event) {
			if (event.item.type == "image" && event.item.id!='') {
				images[event.item.id] = event.result;
			}
		}

		function handleProgress(event) {
			var i = Math.round(event.loaded*100);
			$('.load_text').html(i+'%');
		}

		function handleComplete() {
			$('.load_text').fadeOut(400);
			$('.load_con,.load_btn').fadeIn(400);
			
			var one = true;
			if(!$('.load_btn').hasClass('box2_b')) {
				$('.load_btn').on(evStart, function(){
					if(one) {
						one = !one;
						$('.load_fps_box').addClass('load_scale');
						$('.load').delay(400).fadeOut(500);
						$('.main').delay(400).fadeIn(500);
						setTimeout(function(){
							init();
						}, 500);
					}
				});
			}
		}
	}

	var init = function() {
		stage = new createjs.Stage(document.getElementById('canvas'));

		container = new createjs.Container();

		contain1 = new createjs.Container();
		contain1.x = 0;
		lists1 = new SplitImage(images.rect1, initIMG1, 0, contain1, 'rect1');

		contain2 = new createjs.Container();
		contain2.x = 640;
		
		contain4 = new createjs.Container();
		contain4.x = 640+905-45;

		contain5 = new createjs.Container();
		contain5.x = 640+905-45+1446;

		contain6 = new createjs.Container();
		contain6.x = 640+905-45+1446+84;

		contain7 = new createjs.Container();
		contain7.x = 640+905-45+1446+84+483;

		contain8 = new createjs.Container();
		contain8.x = 640+905-45+1446+84+483+84;

		run();
	}

	var run = function() {

		container.addChild(contain1);
		stage.addChild(container);

		mus = createjs.Sound.play("sound");
		mus.on("complete", function(){
			bg = createjs.Sound.play("bg", {loop:-1});
		}, this);

		setTimeout(function(){
			lists1.result.forEach(function(it, i, arr){
				it.maxH = 300;
			});
		}, 1900);

		createjs.Ticker.setFPS(20);
		createjs.Ticker.addEventListener('tick', function(e){
			ticks = createjs.Ticker.getTicks();

			if(SKIP===false) {
				switch (ticks) {
					case 1:
						lists1.result.forEach(function(it, i, arr){
							it.Ani();
						});
						lists2 = new SplitImage(images.city, initIMG_city, 4, contain2, 'city');
						lists2_o = new SplitImage(images.rect2, initIMG2, 0, contain2, 'rect2');
						container.addChild(contain2);
						lists2.result.forEach(function(it, i, arr){
							it.Ani();
						});
						lists2_o.result.forEach(function(it, i, arr){
							it.Ani();
						});
						break;
					case 106:
						container.removeChild(contain1);
						lists1.result.forEach(function(it, i, arr){
							delete it.Ani;
						});
						lists1 = null;
						break;

					case 143:
						lists4_o = new SplitImage(images.rect4, initIMG4, 50, contain4, 'rect4');
						container.addChild(contain4);
						lists4_o.result.forEach(function(it, i, arr){
							it.Ani();
						});
						hill = !hill;
						break;
					
					case 257:
						container.removeChild(contain2);
						lists2.result.forEach(function(it, i, arr){
							delete it.Ani;
						});
						lists2_o.result.forEach(function(it, i, arr){
							delete it.Ani;
						});
						lists2 = null;
						lists2_o = null;
						break;

					case 383:
						lists5 = new SplitImage(images.rect5, initIMG5, 0, contain5, 'rect5');
						container.addChild(contain5);
						lists5.result.forEach(function(it, i, arr){
							it.Ani();
						});
						break;

					case 397:
						lists6 = new SplitImage(images.rect6, initIMG6, 0, contain6, 'rect6');
						container.addChild(contain6);
						lists6.result.forEach(function(it, i, arr){
							it.Ani();
						});
						slogan = !slogan;
						$('.skip').fadeOut(500);
						break;

					case 476:
						lists7 = new SplitImage(images.rect7, initIMG7, 0, contain7, 'rect7');
						container.addChild(contain7);
						lists7.result.forEach(function(it, i, arr){
							it.Ani();
						});
						break;

					case 490:
						container.removeChild(contain4);
						lists4_o.result.forEach(function(it, i, arr){
							delete it.Ani;
						});
						lists4_o = null;
						break;

					case 500:
						$('.box1').fadeIn(500);
						break;

					case 40:
						$('.text_1').fadeIn(500);
						break;
					case 100:
						$('.text_1').fadeOut(500);
						break;
					case 120:
						$('.text_2').fadeIn(500);
						break;
					case 240:
						$('.text_2').fadeOut(500);
						break;
					case 280:
						$('.text_3').fadeIn(500);
						break;
					case 360:
						$('.text_3').fadeOut(500);
						break;
					case 410:
						$('.text_4').fadeIn(500);
						break;
					case 470:
						$('.text_4').fadeOut(500);
						break;
					default:
						break;
				}
				
				if(container.x<=-2946 && toVideo===false) {
					$('.hill').css({
						'-webkit-transform': 'translate3d('+0+'px,0,0)',
						'transform': 'translate3d('+0+'px,0,0)'
					});
					hillX = 0;
				}
				else if(container.x<=-4090 && toVideo===true) {
					if(!$('.box2').is(':visible')) {
						$('.box2').fadeIn(500);
					}
				} else if(container.x<=-2946 && container.x>=-4090 && toVideo===true) {
					container.x -= SPEED;
					slogan = true;
					if(slogan===true) {
						sloX -= SPEED;
						$('.slogan').css({
							'-webkit-transform': 'translate3d('+sloX+'px,0,0)',
							'transform': 'translate3d('+sloX+'px,0,0)'
						});
					}
					hill = true;
					if(hill===true) {
						hillX -= SPEED;
						$('.hill').css({
							'-webkit-transform': 'translate3d('+hillX+'px,0,0)',
							'transform': 'translate3d('+hillX+'px,0,0)'
						});
					}
				} else {
					container.x -= SPEED;
					if(slogan===true) {
						sloX -= SPEED;
						$('.slogan').css({
							'-webkit-transform': 'translate3d('+sloX+'px,0,0)',
							'transform': 'translate3d('+sloX+'px,0,0)'
						});
					}

					if(container.x<=-858 && hill===true) {
						hillX -= SPEED;
						$('.hill').css({
							'-webkit-transform': 'translate3d('+hillX+'px,0,0)',
							'transform': 'translate3d('+hillX+'px,0,0)'
						});
					}
				}
			} else {
				container.removeChild(contain1,contain2,contain4,contain5,contain6,contain7);
				lists1 = lists2 = lists2_o = lists4 = lists4_o = lists5 = lists6 = lists7 = null;
				container.x = -4090;
				$('.hill').css({
					'-webkit-transform': 'translate3d('+-1152+'px,0,0)',
					'transform': 'translate3d('+-1152+'px,0,0)'
				});
				if(!$('.box2').is(':visible')) {
					$('.box2,.hill').fadeIn(500);
				}
			}
			stage.update();
			pixi = ctx.getImageData(0, 0, 640, 525);
			ctx0.putImageData(pixi, 0, 0);
			ctx1.putImageData(pixi, 0, 0);
		});
	}

	function SplitImage(src, arr, bx, box, id) {
		this.img = src;
		this.arr = arr;
		this.h = this.img.height;
		this.l = this.arr instanceof Array ? this.arr.length : this.arr.count;
		this.result = [];
		this.left = 0+bx;
		this.xx = 0;
		this.box = box;
		this.id = id;

		this.Add();
	}

	SplitImage.prototype.Add = function() {
		var _this = this, temp;

		for(var i=0; i<_this.l; i++) {
			var ta = _this.arr instanceof Array ? _this.arr[i] : _this.arr;
			if(ta.hasOwnProperty('x')) {
				temp = new createjs.Bitmap(_this.img[ta.id]);
				temp.x = ta.x;
				temp.y = 525+_this.img[ta.id].height;
				temp.regY = _this.img[ta.id].height;
				temp.id = ta.id;
			} else {
				temp = new createjs.Bitmap(_this.img);
				temp.sourceRect = new createjs.Rectangle(_this.xx, 0, ta.w, _this.img.height);
				temp.x = _this.left;
				temp.y = 525+_this.img.height;
				temp.regY = _this.img.height;
				temp.id = _this.id+'-'+i;

				_this.xx += ta.w;
				_this.left += ta.w;
			}
			if(_this.id==='rect4') {
				_this.Rect4(temp, i);
			} else {
				temp.blankS = ta.hasOwnProperty('blankS') ? ta.blankS : 50;
				temp.blankE = ta.hasOwnProperty('blankE') ? ta.blankE : 120;
			}
			temp.maxH = ta.maxH;
			temp.minH = ta.minH;
			temp.maxT = ta.maxT;
			// temp.compositeOperation='lighter';
			temp.Ani = function() {
				var that = this;

				if(ta.hasOwnProperty('noBlank')) {
					that.noBlank = true;
					ta.hasOwnProperty('sign') ? _this.ObjAni(that) : _this.ImgAni(that);
				} else {
					if(Math.abs(container.x) >= _this.box.x+that.x-(640-that.blankS)) {
						ta.hasOwnProperty('sign') ? _this.ObjAni(that) : _this.ImgAni(that);
					} else {
						setTimeout(function(){
							that.Ani();
						}, 100);
					}
				}
			}

			_this.result.push(temp);
			_this.box.addChild(temp);
		}
	}

	SplitImage.prototype.ImgAni = function(t) {
		var that = t,
			_this = this,
			yInit = that.y,
			yTemp = yInit - (Math.random()*(that.maxH-that.minH)+that.minH),
			tTemp = Math.random()*that.maxT+100;

		createjs.Tween.get(that).to({y:yTemp}, tTemp).call(function(){
			_this.SelfAni(that, yInit);
		});
	}

	SplitImage.prototype.ObjAni = function(t) {
		var that = t,
			_this = this,
			tTemp = Math.random()*500+500;

		createjs.Tween.get(that).wait(200).to({y:525}, tTemp).call(function(){
			_this.SelfAni(that);
		});
	}

	SplitImage.prototype.SelfAni = function(t, y) {
		var that = t,
			_this = this,
			yInit = y ? y : null,
			yTemp, tTemp;

		yTemp = yInit!==null ? yInit - (Math.random()*(that.maxH-that.minH)+that.minH) : 525+(Math.random()*(that.maxH-that.minH)+that.minH);
		tTemp = Math.random()*that.maxT+100;
		createjs.Tween.get(that).to({y:yTemp}, tTemp).call(function(){
			if(Math.abs(container.x) >= _this.box.x+that.x-that.blankE && !that.hasOwnProperty('noBlank')) {
				_this.Stop(that);
			} else {
				_this.SelfAni(that, yInit);
			}
		});
	}

	SplitImage.prototype.Stop = function(t) {
		var that = t,
			_this = this,
			Y = 525+that.regY;

		createjs.Tween.get(that).to({y:Y}, 1500).call(function(){
			delete that.Ani;
			_this = null;
		});
	}

	SplitImage.prototype.Rect4 = function(t, i) {
		var that = t, i = i;

		if(i<17) {
			that.blankS = 120;
			that.blankE = 0;
		}
		else if(i>=17 && i<86) {
			that.blankS = 160-(i-17)*10;
			that.blankE = -450;
		}
		else if(i>=86 && i<108) {
			that.blankS = -10-(i-86)*10;
			that.blankE = -450;
		}
		else if(i>=108 && i<115) {
			that.blankS = 65-(i-108)*10;
			that.blankE = -450;
		}
		else if(i>=115 && i<134) {
			that.blankS = 110-(i-108)*10;
			that.blankE = -450;
		}
		else {
			that.blankS = 0;
			that.blankE = -450;
		}
	}

	return {
		init: function(){
			load();

			$('.box1').on(evStart, function(){
				$(this).fadeOut(500);
				toVideo = true;
				SPEED = 16;
				lists8_o = new SplitImage(images.rect4, initIMG8, 29, contain8, 'rect8');
				container.addChild(contain8);
				lists8_o.result.forEach(function(it, i, arr){
					it.Ani();
				});
			});

			$('.skip').on(evStart, function(){
				$(this).fadeOut(500);
				$('.text').fadeOut(500);
				$('.hill').css('display', 'none');
				hill = false;
				SKIP = true;
				toVideo = true;
				lists8_o = new SplitImage(images.rect4, initIMG8, 29, contain8, 'rect8');
				container.addChild(contain8);
				lists8_o.result.forEach(function(it, i, arr){
					it.Ani();
				});
				createjs.Sound.stop();
				createjs.Sound.play("bg", {loop:-1});
			});

			video.addEventListener('play', function(){
				createjs.Sound.stop();
			}, false);

			if(SW==414) {
				$('#canvasF').css('margin-top', '-0.5px');
			}
		}
	}

})(window);

HyFn.init();

document.addEventListener('touchmove',function(event){
	event.stopPropagation();
	event.preventDefault();
	return false;
});