var HyFn = (function(window, undefined){

	var isTouch = "ontouchend" in document ? true : false,
		evStart = isTouch ? 'touchstart' : 'mousedown',
		evMove = isTouch ? 'touchmove' : 'mousemove',
		evEnd = isTouch ? 'touchend' : 'mouseup';

	var manifest = [
		// {src:'images/load_fps.jpg',id:''},
		{src:'images/rect1.png',id:'rect1'},
		{src:'images/rect2.png',id:'rect2'},
		{src:'images/city.png',id:'city'},
		{src:'images/rect3.png',id:'rect3'},
		{src:'images/hill_1.png',id:'hill_1'},
		{src:'images/hill_2.png',id:'hill_2'},
		{src:'images/hill_3.png',id:'hill_3'},
		{src:'images/hill_4.png',id:'hill_4'},
		{src:'images/hill_5.png',id:'hill_5'},
		{src:'images/hill_6.png',id:'hill_6'},
		{src:'images/hill_7.png',id:'hill_7'},
		{src:'images/hill_8.png',id:'hill_8'},
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
		{src:"src/3.mp3", id:'sound'},
		{src:"src/bg.mp3", id:'bg'},
		{src:'img/statementWord.png', id:''}
	];

	var initIMG1 = {w:10, maxH:275, minH:10, maxT:500, count:64};

	var initIMG2 = {w:5, maxH:551, minH:450, maxT:200, count:181};

	var initIMG_city = [
		{w:56, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:54, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:48, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:50, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:50, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:58, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:34, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:30, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:42, maxH:50, minH:20, maxT:50, sign: 1, blankS:50, blankE:100},
		{w:42, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:38, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:28, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:52, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:74, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:78, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:46, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:46, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:40, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100},
		{w:39, maxH:50, minH:20, maxT:400, sign: 1, blankS:50, blankE:100}
	];

	var initIMG3 = {w:10, maxH:275, minH:10, maxT:500, count:32};

	var initIMG4 = {w:10, maxH:434, minH:380, maxT:200, count:144};

	var initIMG_hill = [
		{x:276, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_1', blankS:140, blankE:-450},
		{x:158, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_2', blankS:310, blankE:-200},
		{x:0, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_3', blankS:410, blankE:-450},
		{x:598, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_4', blankS:200, blankE:-450},
		{x:808, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_5', blankS:200, blankE:-450},
		{x:969, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_6', blankS:150, blankE:-450},
		{x:1094, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_7', blankS:100, blankE:-450},
		{x:607, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_8', blankS:600, blankE:-450}
	];

	var initIMG5 = {w:10, maxH:275, minH:10, maxT:500, count:22, noBlank:true};

	var initIMG6 = {w:4, maxH:343, minH:270, maxT:100, count:118, noBlank:true};

	var initIMG7 = {w:10, maxH:275, minH:10, maxT:500, count:9, noBlank:true};

	var initIMG8 = {w:10, maxH:434, minH:380, maxT:200, count:144, noBlank:true};

	var initIMG_hill1 = [
		{x:276, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_1', blankS:0, blankE:-450},
		// {x:158, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_2', blankS:0, blankE:-200},
		// {x:0, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_3', blankS:0, blankE:-450},
		{x:598, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_4', blankS:0, blankE:-450},
		{x:808, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_5', blankS:0, blankE:-450},
		{x:969, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_6', blankS:0, blankE:-450}
		// {x:1094, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_7', blankS:0, blankE:-450},
		// {x:607, maxH:20, minH:10, maxT:400, sign: 1, id:'hill_8', blankS:0, blankE:-450}
	];

	var stage, container, images=images||{}, H=window.innerHeight, initX = 0, pixi, ticks, slogan=false, sloX=0, mus, bg, SPEED=8, toVideo=false;

	var can = document.getElementById('canvas'), ctx = can.getContext('2d'),
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
		// preload.loadFile({id:"sound", src:"src/3.mp3"});
		// preload.loadFile({id:"bg", src:"src/bg.mp3"});
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
			$('.load_con').fadeIn(400);
			// video.src="src/tvc.mp4";
			
			var one = true;
			$('.load_con').on('click', function(){
				if(one) {
					one = !one;
					$('.load_fps_box').addClass('load_scale');
					$('.load').delay(400).fadeOut(500);
					setTimeout(function(){
						init();
					}, 500);
				}
			});
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

		contain3 = new createjs.Container();
		contain3.x = 640+905;
		
		contain4 = new createjs.Container();
		contain4.x = 640+905+315;

		contain5 = new createjs.Container();
		contain5.x = 640+905+315+1440;

		contain6 = new createjs.Container();
		contain6.x = 640+905+315+1440+219;

		contain7 = new createjs.Container();
		contain7.x = 640+905+315+1440+219+472;

		contain8 = new createjs.Container();
		contain8.x = 640+905+315+1440+219+472+92;

		run();
	}

	var run = function() {

		container.addChild(contain1);
		stage.addChild(container);

		mus = createjs.Sound.play("sound");
		mus.on("complete", function(){
			bg = createjs.Sound.play("bg", {loop:-1});
		}, this);

		createjs.Ticker.setFPS(20);
		createjs.Ticker.addEventListener('tick', function(e){
			ticks = createjs.Ticker.getTicks();

			switch (ticks) {
				case 1:
					lists1.result.forEach(function(it, i, arr){
						it.Ani();
					});
					lists2 = new SplitImage(images.city, initIMG_city, 0, contain2, 'city');
					lists2_o = new SplitImage(images.rect2, initIMG2, 0, contain2, 'rect2');
					container.addChild(contain2);
					lists2.result.forEach(function(it, i, arr){
						it.Ani();
					});
					lists2_o.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				// case 120:
				// case 160:
				case 80:
					container.removeChild(contain1);
					lists1.result.forEach(function(it, i, arr){
						delete it.Ani;
					});
					lists1 = null;
					break;
				// case 169:
				// case 226:
				case 113:
					lists3 = new SplitImage(images.rect3, initIMG3, 0, contain3, 'rect3');
					container.addChild(contain3);
					lists3.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				// case 289:
				// case 386:
				case 193:
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
				// case 228:
				// case 305:
				case 152:
					lists4 = new SplitImage(images, initIMG_hill, 0, contain4, 'hill');
					lists4_o = new SplitImage(images.rect4, initIMG4, 29, contain4, 'rect4');
					container.addChild(contain4);
					lists4.result.forEach(function(it, i, arr){
						it.Ani();
					});
					lists4_o.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				// case 348:
				// case 465:
				case 232:
					container.removeChild(contain3);
					lists3.result.forEach(function(it, i, arr){
						delete it.Ani;
					});
					lists3 = null;
					break;
				// case 511:
				// case 683:
				case 341:
					lists5 = new SplitImage(images.rect5, initIMG5, 0, contain5, 'rect5');
					container.addChild(contain5);
					lists5.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				case 360:
					slogan = !slogan;
					break;
				// case 553:
				// case 738:
				case 369:
					lists6 = new SplitImage(images.rect6, initIMG6, 0, contain6, 'rect6');
					container.addChild(contain6);
					lists6.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				// case 622:
				// case 830:
				case 415:
					container.removeChild(contain4);
					lists4.result.forEach(function(it, i, arr){
						delete it.Ani;
					});
					lists4_o.result.forEach(function(it, i, arr){
						delete it.Ani;
					});
					lists4 = null;
					lists4_o = null;
					break;
				// case 642:
				// case 856:
				case 428:
					lists7 = new SplitImage(images.rect7, initIMG7, 0, contain7, 'rect7');
					container.addChild(contain7);
					lists7.result.forEach(function(it, i, arr){
						it.Ani();
					});
					break;
				// case 675:
				// case 900:
				case 450:
					$('.box1').fadeIn(500);
					break;
				case 40:
					$('.text_1').fadeIn(500);
					break;
				case 100:
					$('.text_1').fadeOut(500);
					break;
				case 140:
					$('.text_2').fadeIn(500);
					break;
				case 240:
					$('.text_2').fadeOut(500);
					break;
				case 270:
					$('.text_3').fadeIn(500);
					break;
				case 350:
					$('.text_3').fadeOut(500);
					break;
				case 380:
					$('.text_4').fadeIn(500);
					break;
				case 435:
					$('.text_4').fadeOut(500);
					break;
				default:
					break;
			}
			
			if(container.x<=-3435 && toVideo===false) {
				// console.log(ticks);
			} else if(container.x<=-4585 && toVideo===true) {
				$('.box2').fadeIn(500);
			} else if(container.x<=-3435 && container.x>=-4585 && toVideo===true) {
				container.x -= SPEED;
				slogan = true;
				if(slogan===true) {
					sloX -= SPEED;
					$('.slogan').css({
						'-webkit-transform': 'translate('+sloX+'px,0)',
						'transform': 'translate('+sloX+'px,0)'
					});
				}
			} else {
				container.x -= SPEED;
				if(slogan===true) {
					sloX -= SPEED;
					$('.slogan').css({
						'-webkit-transform': 'translate('+sloX+'px,0)',
						'transform': 'translate('+sloX+'px,0)'
					});
				}
			}
			stage.update();
			pixi = ctx.getImageData(0, 0, 640, 525);
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
			temp.compositeOperation='lighter';
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

		createjs.Tween.get(that).wait(200).to({y:525}, tTemp, createjs.Ease.bounceIn).call(function(){
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
			that.blankS = 310-(i-17)*10;
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
			that.blankS = 150-(i-108)*10;
			that.blankE = -450;
		}
		else {
			that.blankS = -10;
			that.blankE = -450;
		}
	}

	return {
		init: function(){
			load();

			$('.box1').on('click', function(){
				$(this).fadeOut(500);
				toVideo = true;
				SPEED = 16;
				lists8 = new SplitImage(images, initIMG_hill1, 0, contain8, 'hill');
				lists8_o = new SplitImage(images.rect4, initIMG8, 29, contain8, 'rect8');
				container.addChild(contain8);
				lists8.result.forEach(function(it, i, arr){
					it.Ani();
				});
				lists8_o.result.forEach(function(it, i, arr){
					it.Ani();
				});
			});

			video.addEventListener('play', function(){
				createjs.Sound.stop();
			}, false);

			video.addEventListener('ended', function(){
				createjs.Sound.play("bg", {loop:-1});
			}, false);

			video.addEventListener('pause', function(){
				createjs.Sound.play("bg", {loop:-1});
			}, false);

			video.addEventListener('resize', function(){
				if(video.width==386) {
					$('.box2_b').css({
						'-webkit-transform':'translate3d(0,0,10px)',
						'transform':'translate3d(0,0,10px)'
					});
				}
			});
		}
	}

})(window);

HyFn.init();

document.addEventListener('touchmove',function(event){
	event.stopPropagation();
	event.preventDefault();
	return false;
});