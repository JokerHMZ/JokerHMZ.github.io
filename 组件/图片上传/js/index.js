var my_canvas1=document.getElementById('canvas1');
var canvas_hide=document.getElementById('canvashide');
var ctx=canvas_hide.getContext('2d');
			// ctx.moveTo(20,30);//第一个起点
   //          ctx.lineTo(120,90);//第二个点
   //          ctx.lineTo(220,60);//第三个点（以第二个点为起点）
   //          ctx.lineWidth=3;
   //          ctx.strokeStyle = 'red';
   //          ctx.stroke();
var imgStage_1 = new createjs.Stage(my_canvas1);
var my_file=document.getElementById('my_file');
var WH=$('.work_place').height(),
	WW=$('.work_place').width(),
	scal=1,rate=1,x,y,rx,ry;


function get_pic () {
	// 清除 然后上传的图片画出来
	$('img').attr('src','').hide();
	imgStage_1.removeAllChildren();
	imgStage_1.clear();
	var this_file=my_file.files[0];

	if(this_file){
		var file_name=this_file.name;
		var extStart=file_name.lastIndexOf('.');
		var ext=file_name.substring(extStart,file_name.length).toUpperCase();
		if(ext!='.BMP'&&ext!='.PNG'&&ext!='.GIF'&&ext!='.JPG'&&ext!='.JPEG'){
			alert('请选择图片文件');
		}else{
			EXIF.getData(this_file, function() {
				orientation = EXIF.getTag(this, "Orientation");
				if(orientation == 6) {
					rate = 6;
				} else if(orientation == 8) {
					rate = 8;
				}

				var mpImg = new MegaPixImage(this_file);
				mpImg.render(canvas_hide, {maxWidth:WW, maxHeight:WH, quality:0.5, orientation:rate}, function(){
					var url = canvas_hide.toDataURL('jpg');
					var img = new Image();
					img.src = url;
					ctx.clearRect(0,0,WW,WH);
					img.onload = function(){
						if(img.width<WW)
							scal = WW/img.width;
						if(img.height<WW) 
							scal = WW/img.height;
						my_canvas1.width=WW;
						my_canvas1.height=WH;

						beginx = -img.width*2;
						beginy = -img.height*2;

						x = WW/2;
						y =	WH/2;

						rx = img.width/2;
						ry = img.height/2;
						var bitmap = new createjs.Bitmap(url);

						bitmap.set({
							x:beginx, 
							y:beginy,
							regX:rx, 
							regY:ry,
							scaleX:scal,
							scaleY:scal,
						});
						imgStage_1.addChild(bitmap);
						imgStage_1.update();
						setTimeout(function() {
							bitmap.x = x;
							bitmap.y = y;
							imgStage_1.update();
						},500)

						touch.on('#canvas1', 'touchstart', function(ev){
							ev.preventDefault();
						});

						var initialScale = scal;
						var currentScale;
						var angle = 0;
						var dx=x,dy=y;

						touch.on('#canvas1', 'drag', function(ev){
							dx = dx || 0;
							dy = dy || 0;
							var offx = dx + ev.x;
							var offy = dy + ev.y;
							bitmap.x = offx;
							bitmap.y = offy;
							imgStage_1.update();
						});

						touch.on('#canvas1', 'dragend', function(ev){
							dx += ev.x;
							dy += ev.y;
						});

						touch.on('#canvas1', 'pinch', function(ev){
							currentScale = ev.scale - 1;
							currentScale = initialScale + currentScale;
							currentScale = currentScale < 0.1 ? 0.1 : currentScale;
							bitmap.scaleX = currentScale;
							bitmap.scaleY = currentScale;
							imgStage_1.update();
						});

						touch.on('#canvas1', 'pinchend', function(ev){
							initialScale = currentScale;
						});

						touch.on('#canvas1', 'rotate', function(ev){
							var totalAngle = angle + ev.rotation;
							if(ev.fingerStatus === 'end'){
								angle = angle + ev.rotation;
							}
							bitmap.rotation = totalAngle;
							imgStage_1.update();
						});
					}	
				})
			})
		}
	}
}

$('.done_btn').click(function () {
	// body...
	alert('生成')
	var url = my_canvas1.toDataURL('png');
	var img = new Image();
	img.src = url;
	img.onload = function(){
		imgStage_1.removeAllChildren();
		imgStage_1.clear();
		$('img').attr('src',url).show()
	}
})

