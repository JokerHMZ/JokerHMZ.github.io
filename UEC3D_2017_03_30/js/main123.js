/**
 * Created by he.mingze on 2017/3/30.
 */
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
//预加载
var myaudio=$('#myAudio')[0];
myaudio.play();
document.addEventListener("WeixinJSBridgeReady", function () {
    myaudio.play();
    myaudio.pause();
}, false);
myaudio.pause();
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
        var otitle = "小爷吴亦凡的最爱，喝就是了";
        // 分享朋友圈后描述
        var desc ="小爷吴亦凡的最爱，喝就是了";
        // 分享个人后描述
        var descSingle ="小爷吴亦凡的最爱，喝就是了";
        // 分享后B用户打开的地址
        var olink ="http://youyic3d.mengniu.com.cn/";
        // 分享图片
        var oimgUrl ="http://youyic3d.mengniu.com.cn/3d/img/wShare.png";
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
var imgI=0,timer=null,loadingTxt=0,loadingDae=0;
$(function (){
//瓶子开始
    function Bottle(){
        //设置初值开始
        this.mesh=null;
        this.meshScaleX=3.5;
        this.meshScaleY=3.5;
        this.meshScaleZ=3.5;
        this.meshPositionX=8;
        this.meshPositionY=-22;
        this.meshPositionZ=0;
        this.rotateHMZX=-0.3*Math.PI;
        this.rotateHMZY=0.2*Math.PI;
        this.rotateHMZZ=0.11*Math.PI;
        this.cameraPositionX=50;
        this.cameraPositionY=50;
        this.cameraPositionZ=50;
        this.lightLeftX=-150;
        this.lightLeftY=20;
        this.lightLeftZ=20;
        this.lightRightX=50;
        this.lightRightY=80;
        this.lightRightZ=1;
        //设置初值结束
        this.renderer=new THREE.WebGLRenderer({
            canvas: document.getElementById('bottle'),
            antialias: true,
            precision: "highp",
            alpha:true
        });
        this.renderer.setClearColor("transparent",0);
        this.renderer.setSize(window.innerWidth+60, window.innerHeight);
        this.scene=new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(this.cameraPositionX,this.cameraPositionY,this.cameraPositionZ);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);
        this.lightLeft = new THREE.DirectionalLight(0xcdcdcd);
        this.lightLeft.position.set(this.lightLeftX, this.lightLeftY, this.lightLeftZ);
        this.lightLeft.intensity=0.8;
        this.scene.add(this.lightLeft);
        this.lightRight = new THREE.DirectionalLight(0xcdcdcd);
        this.lightRight.position.set(this.lightRightX,this.lightRightY,this.lightRightZ);
        this.lightRight.intensity=0.7;
        this.scene.add(this.lightRight);
        this.environmentLight=new THREE.AmbientLight(0xcdcdcd);
        this.environmentLight.intensity=0.5;
        this.scene.add(this.environmentLight);
        // var axes = new THREE.AxisHelper(300);this.scene.add(axes);//坐标系，此行最后删除
    }
    Bottle.prototype.init=function (foo){
        var loader = new THREE.ColladaLoader(),_this=this;
        loader.load("../src/1.dae", function (result) {
            loadingDae++;
            $("#loading .txt .num").text(loadingTxt+loadingDae);
            _this.mesh = result.scene.children[0].children[0].clone();
            _this.mesh.scale.set(_this.meshScaleX, _this.meshScaleY, _this.meshScaleZ);
            _this.mesh.position.x = _this.meshPositionX;
            _this.mesh.position.y = _this.meshPositionY;
            _this.mesh.position.z = _this.meshPositionZ;
            _this.mesh.rotation.x=_this.rotateHMZX;
            _this.mesh.rotation.y=_this.rotateHMZY;
            _this.mesh.rotation.z=_this.rotateHMZZ;
            result.scene.traverse( function ( child ) {
                if ( child instanceof THREE.SkinnedMesh ) {
                    var animation = new THREE.Animation( child, child.geometry.animation );
                    animation.play();
                    _this.camera.lookAt( child.position );
                }
            } );
            _this.scene.add(_this.mesh);
            render();
            function render() {
                _this.animate();
                TWEEN.update();
                requestAnimationFrame(render);
                _this.renderer.render(_this.scene,_this.camera);
            }
            imgI++;
            if(imgI>=3){
                foo();
            }
        });
    };
    Bottle.prototype.animate=function (foo,mesh){
        typeof foo=="function"&&foo(mesh);
    };
//瓶子结束
//泡泡开始
    function BubblePoint(ctx,img,x,step,randomW,inistWidth,inistY){
        this.width=(inistWidth==undefined)?20+((Math.random()*randomW)>>0):inistWidth;
        this.img=img;
        this.height=this.width;
        this.ctx=ctx;
        this.x=x;
        this.y=(inistY==undefined)?80+((Math.random()*750)>>0):inistY;
        this.step=step;
        this.canDraw=true;
    }
    BubblePoint.prototype.drawStep=function (){
        var _this=this;
        this.ctx.drawImage(_this.img,_this.x,_this.y,_this.width,_this.height);
    };
    BubblePoint.prototype.moveStep=function (){
        this.x+=this.step;
        this.y+=0;
        if(this.x>0){
            this.x<-100&&(this.canDraw = false);
        }else{
            this.x>760&&(this.canDraw = false);
        }
    };
    function Bubble(id,img,img2,x,direction,onceShowNum,randomW){
        this.ctx=$(id)[0].getContext("2d");
        this.list=[];
        this.i=0;
        this.img=img;
        this.img2=img2;
        this.beginX=x;
        this.direction=direction;
        this.onceShowNum=onceShowNum;
        this.randomW=randomW;
    }
    Bubble.prototype.drawAll=function (){
        for(var i=0; i<this.list.length; i++){
            this.list[i].drawStep();
        }
    };
    Bubble.prototype.moveAll=function (){
        for(var i=0; i<this.list.length; i++){
            this.list[i].moveStep();
            if(!this.list[i].canDraw){
                this.list.splice(i, 1);
                i--;
            }
        }
    };
    Bubble.prototype.init=function (){
        var _this=this;
        if(this.i==0&&this.direction>0){
            _this.startBubbleFg();
        }
        if(this.i==0&&this.direction<0){
            _this.startBubbleBg();
        }
        if(this.i%80==0){
            var len=Math.floor(Math.random()*2)+_this.onceShowNum,step=0,img=null;
            for(var i=0;i<len;i++){
                if(_this.direction>0){
                    step=(4+Math.random()*4>>0)*_this.direction;
                }else{
                    step=(2+Math.random()*2>>0)*_this.direction;
                }
                if(Math.random()-0.5>=0){
                    img=_this.img;
                }else{
                    img=_this.img2;
                }
                this.list.push(new BubblePoint(_this.ctx,img,_this.beginX,step,_this.randomW));
            }
        }
        this.ctx.clearRect(0,0,640,950);
        this.drawAll();
        this.moveAll();
        this.i++;
        setTimeout(this.init.bind(this),30);
    };
    Bubble.prototype.startBubbleBg=function (){
        var _this=this;
        this.list.push(new BubblePoint(_this.ctx,_this.img,320,-2,0,100,130));
        this.list.push(new BubblePoint(_this.ctx,_this.img2,530,-3,0,22,178));
        this.list.push(new BubblePoint(_this.ctx,_this.img2,392,-2,0,35,264));
        this.list.push(new BubblePoint(_this.ctx,_this.img2,185,-4,0,55,421));
        this.list.push(new BubblePoint(_this.ctx,_this.img,569,-2,0,53,510));
        this.list.push(new BubblePoint(_this.ctx,_this.img,320,-2,0,90,669));
        this.list.push(new BubblePoint(_this.ctx,_this.img,569,-3,0,55,510));
        this.list.push(new BubblePoint(_this.ctx,_this.img,54,-4,0,77,759));
    };
    Bubble.prototype.startBubbleFg=function (){
        var _this=this;
        this.list.push(new BubblePoint(_this.ctx,_this.img2,54,4,0,77,759));
        this.list.push(new BubblePoint(_this.ctx,_this.img2,595,6,0,30,699));
        this.list.push(new BubblePoint(_this.ctx,_this.img2,188,7,0,24,900));
    };
//泡泡结束
// loading开始
    var bottle=new Bottle();
    function mainBegin(){
        $("#guide").removeClass("hidhid");
        $("#loading").fadeOut(function (){
            $("#bottle").addClass("btlShow");
            main();
        });
    }
    bottle.init(mainBegin);
    var queue = new createjs.LoadQueue(false);
    var arr=[
        {src:"../img/bg.jpg"},
        {src:"../img/bubble.png"},
        {src:"../img/bubble2.png"},
        {src:"../img/ceng1.png"},
        {src:"../img/ceng2.png"},
        {src:"../img/ceng3.png"},
        {src:"../img/closeCeng.png"},
        {src:"../img/hand.png"},
        {src:"../img/hand2.png"},
        {src:"../img/handCircle.png"},
        {src:"../img/handCircle2.png"},
        {src:"../img/handLine.png"},
        {src:"../img/handText.png"},
        {src:"../img/loading.png"},
        {src:"../img/logo.png"},
        {src:"../img/musicOff.png"},
        {src:"../img/musicOn.png"},
        {src:"../img/net.png"},
        {src:"../img/page11.png"},
        {src:"../img/page121.png"},
        {src:"../img/page13.png"},
        {src:"../img/page21.png"},
        {src:"../img/page22.png"},
        {src:"../img/page23.png"},
        {src:"../img/page31.png"},
        {src:"../img/page32.png"},
        {src:"../img/page33.png"},
        {src:"../img/page41.png"},
        {src:"../img/page42.png"},
        {src:"../img/page43.png"},
        {src:"../img/page51.png"},
        {src:"../img/page61.png"},
        {src:"../img/page62.png"},
        {src:"../img/page63.png"},
        {src:"../img/pageLine2.png"},
        {src:"../img/pageLine3.png"},
        {src:"../img/pageLine4.png"},
        {src:"../img/pageLine5.png"},
        {src:"../img/shadow.png"},
        {src:"../img/shadow.png"},
        {src:"../src/tex/yiti.jpg"},
        {src:"../img/bubbleMoHu.png"},
        {src:"../img/wShare.png"},
        {src:"../img/textBottom.png"}
    ];
    var loadingImgI=0;
    var bottleImg=new Image();
    var bubbleImg=new Image();
    var bubbleImg2=new Image();
    var bubbleImg3=new Image();
    bottleImg.src="../img/bubble.png";
    bubbleImg.src="../img/bubble.png";
    bubbleImg2.src="../img/bubble2.png";
    bubbleImg3.src="../img/bg.jpg";
    bottle.onload=function (){
        loadingImgI++;
        if(loadingImgI>=3){
            loadingAnimationBeigin();
        }
    };
    bubbleImg.onload=function (){
        loadingImgI++;
        if(loadingImgI>=3){
            loadingAnimationBeigin();
        }
    };
    bubbleImg2.onload=function (){
        loadingImgI++;
        if(loadingImgI>=3){
            loadingAnimationBeigin();
        }
    };
    bubbleImg3.onload=function (){
        loadingImgI++;
        if(loadingImgI>=3){
            loadingAnimationBeigin();
        }
    };
    function loadingAnimationBeigin(){
        $("#loading .bottles").removeClass("hid");
        $("#loading .loading_bottle").removeClass("hid");
        queue.loadManifest(arr);
        queue.on("complete", handleComplete, this);
        queue.on("progress", handleFileLoad, this);
    }
    function handleFileLoad(e){
        loadingTxt=Math.floor(e.loaded*99);
        $("#loading .txt .num").text(loadingTxt+loadingDae);
    }
    function handleComplete(){
        $("#ceng1").fadeOut(0,function (){
            $(this).addClass("highZ");
            $(this).removeClass("opacity");
        });
        $("#ceng2").fadeOut(0,function (){
            $(this).addClass("highZ");
            $(this).removeClass("opacity");
        });
        $("#ceng3").fadeOut(0,function (){
            $(this).addClass("highZ");
            $(this).removeClass("opacity");
        });
        var bubbleImg=new Image();
        var bubbleImg2=new Image();
        var imgJ=0;
        bubbleImg.src='../img/bubble.png';
        bubbleImg2.src='../img/bubble2.png';
        bubbleImg.onload=function (){
            imgI++;
            imgJ++;
            if(imgI>=3){
                mainBegin();
            }
            if(imgJ>=2){
                drawBubble();
            }
        };
        bubbleImg2.onload=function (){
            imgI++;
            imgJ++;
            if(imgI>=3){
                mainBegin();
            }
            if(imgJ>=2){
                drawBubble();
            }
        };
        function drawBubble(){
            var bubbleBg=new Bubble("#bg",bubbleImg,bubbleImg2,700,-1,2,96);
            var bubbleFg=new Bubble("#fg",bubbleImg,bubbleImg2,-100,1,1,40);
            bubbleBg.init();
            bubbleFg.init();
        }
    }
//loading结束
//主程序开始
    var controlIndex=1,controlIndexMax=6,canSwipe=true;
    var timeControl=1600;
    var autoTimer=null,canAuto=false,autoTimeControl=7000,guideTxtXiaoShi=true;
    function main(){
        autoTimer=null,canAuto=true;
        $("#page1 .text1").addClass("flipInX");
        $("#page1 .text2").addClass("flipInX delayHMZ1");
        $("#page1 .text3").addClass("flipInX delayHMZ2");
        animation3D({
            meshScaleX:3,
            meshScaleY:3,
            meshScaleZ:3,
            meshPositionX:8,
            meshPositionY:-22,
            meshPositionZ:0,
            rotateHMZX:-0.3*Math.PI,
            rotateHMZY:0.15*Math.PI,
            rotateHMZZ:0.11*Math.PI,
            cameraPositionX:50,
            cameraPositionY:50,
            cameraPositionZ:50,
            lightLeftX:-150,
            lightLeftY:20,
            lightLeftZ:20,
            lightRightX:50,
            lightRightY:80,
            lightRightZ:1
        });
        $("#container").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(guideTxtXiaoShi){
                    guideTxtXiaoShi=false;
                    $("#guide_fixed .handTxt").fadeOut();
                }
                if(canSwipe){
                    clearTimeout(autoTimer);
                    canSwipe=false;
                    // console.log("你用"+fingerCount+"个手指以"+duration+"秒的速度向"
                    //     + direction + "滑动了" +distance+ "像素 " );
                    if(direction=="left"){
                        controlIndex++;
                        controlIndex>=controlIndexMax&&(controlIndex=controlIndexMax);
                        animationShow();
                    }
                    if(direction=="right"){
                        controlIndex--;
                        controlIndex<=1&&(controlIndex=1);
                        animationShow();
                    }
                    setTimeout(function (){
                        canSwipe=true;
                        canAuto=true;
                        autoTimer=setInterval(function (){
                            if(canAuto){
                                if(controlIndex<controlIndexMax){
                                    controlIndex++;
                                    controlIndex>=controlIndexMax&&(controlIndex=controlIndexMax);
                                    animationShow();
                                }
                            }
                        },autoTimeControl)
                    },2000)
                }
            }
        });
        autoTimer=setInterval(function (){
            if(canAuto){
                if(controlIndex<controlIndexMax){
                    controlIndex++;
                    controlIndex>=controlIndexMax&&(controlIndex=controlIndexMax);
                    animationShow();
                }
            }
        },autoTimeControl);
    }
    function hidText(id){
        $(id+" .text1").removeClass("flipInX");
        $(id+" .text2").removeClass("flipInX delayHMZ1");
        $(id+" .text3").removeClass("flipInX delayHMZ2");
        $(id+" .text1").addClass("fadeOut");
        $(id+" .text2").addClass("fadeOut");
        $(id+" .text3").addClass("fadeOut");
    }
    function showText(id){
        $(id+" .text1").addClass("flipInX");
        $(id+" .text2").addClass("flipInX delayHMZ1");
        $(id+" .text3").addClass("flipInX delayHMZ2");
    }
    function hidText2(id){
        $(id+" .text0").addClass("heightHMZ");
        $(id+" .text1").removeClass("flipInX delayHMZ1");
        $(id+" .text2").removeClass("flipInX delayHMZ2");
        $(id+" .text3").removeClass("flipInX delayHMZ3");
        $(id+" .text1").addClass("fadeOut");
        $(id+" .text2").addClass("fadeOut");
        $(id+" .text3").addClass("fadeOut");
    }
    function showText2(id){
        $(id+" .text0").removeClass("heightHMZ");
        $(id+" .text1").addClass("flipInX delayHMZ1");
        $(id+" .text2").addClass("flipInX delayHMZ2");
        $(id+" .text3").addClass("flipInX delayHMZ3");
    }
    function pointShow(i){
        $("#guide .now").removeClass("show");
        $("#guide div[data-i="+i+"] .now").addClass("show");
    }
    function btnClick(i){
        setTimeout(function (){
            $("#btnS div").removeClass("canClick");
            $("#btnS .btn"+i).addClass("canClick");
        },2000);
    }
    function animation3D(data){
        clearInterval(timer);
        timer=null;
        var obj={
            meshScaleX:bottle.meshScaleX,
            meshScaleY:bottle.meshScaleY,
            meshScaleZ:bottle.meshScaleZ,
            meshPositionX:bottle.meshPositionX,
            meshPositionY:bottle.meshPositionY,
            meshPositionZ:bottle.meshPositionZ,
            rotateHMZX:bottle.rotateHMZX,
            rotateHMZY:bottle.rotateHMZY,
            rotateHMZZ:bottle.rotateHMZZ,
            cameraPositionX:bottle.cameraPositionX,
            cameraPositionY:bottle.cameraPositionY,
            cameraPositionZ:bottle.cameraPositionZ,
            lightLeftX:bottle.lightLeftX,
            lightLeftY:bottle.lightLeftY,
            lightLeftZ:bottle.lightLeftZ,
            lightRightX:bottle.lightRightX,
            lightRightY:bottle.lightRightY,
            lightRightZ:bottle.lightRightZ
        };
        bottle.meshScaleX=data.meshScaleX;
        bottle.meshScaleY=data.meshScaleY;
        bottle.meshScaleZ=data.meshScaleZ;
        bottle.meshPositionX=data.meshPositionX;
        bottle.meshPositionY=data.meshPositionY;
        bottle.meshPositionZ=data.meshPositionZ;
        bottle.rotateHMZX=data.rotateHMZX;
        bottle.rotateHMZY=data.rotateHMZY;
        bottle.rotateHMZZ=data.rotateHMZZ;
        bottle.cameraPositionX=data.cameraPositionX;
        bottle.cameraPositionY=data.cameraPositionY;
        bottle.cameraPositionZ=data.cameraPositionZ;
        bottle.lightLeftX=data.lightLeftX;
        bottle.lightLeftY=data.lightLeftY;
        bottle.lightLeftZ=data.lightLeftZ;
        bottle.lightRightX=data.lightRightX;
        bottle.lightRightY=data.lightRightY;
        bottle.lightRightZ=data.lightRightZ;
        var tween = new TWEEN.Tween(obj).to({
            meshScaleX:bottle.meshScaleX,
            meshScaleY:bottle.meshScaleY,
            meshScaleZ:bottle.meshScaleZ,
            meshPositionX:bottle.meshPositionX,
            meshPositionY:bottle.meshPositionY,
            meshPositionZ:bottle.meshPositionZ,
            rotateHMZX:bottle.rotateHMZX,
            rotateHMZY:bottle.rotateHMZY,
            rotateHMZZ:bottle.rotateHMZZ,
            cameraPositionX:bottle.cameraPositionX,
            cameraPositionY:bottle.cameraPositionY,
            cameraPositionZ:bottle.cameraPositionZ,
            lightLeftX:bottle.lightLeftX,
            lightLeftY:bottle.lightLeftY,
            lightLeftZ:bottle.lightLeftZ,
            lightRightX:bottle.lightRightX,
            lightRightY:bottle.lightRightY,
            lightRightZ:bottle.lightRightZ
        }, timeControl);
        tween.easing(TWEEN.Easing.Sinusoidal.InOut);
        function onupdate(){
            bottle.camera.position.set(this.cameraPositionX,this.cameraPositionY,this.cameraPositionZ);
            bottle.camera.lookAt(new THREE.Vector3(0, 0, 0));
            bottle.mesh.scale.set(this.meshScaleX, this.meshScaleY, this.meshScaleZ);
            bottle.mesh.position.x = this.meshPositionX;
            bottle.mesh.position.y = this.meshPositionY;
            bottle.mesh.position.z = this.meshPositionZ;
            bottle.mesh.rotation.x=this.rotateHMZX;
            bottle.mesh.rotation.y=this.rotateHMZY;
            bottle.mesh.rotation.z=this.rotateHMZZ;
            bottle.lightLeft.position.set(this.lightLeftX, this.lightLeftY, this.lightLeftZ);
            bottle.lightRight.position.set(this.lightRightX,this.lightRightY,this.lightRightZ);
        }
        tween.onUpdate(onupdate);
        tween.start();
        var dert=0.0004*Math.PI;
        var stay=0;
        setTimeout(function (){
            timer=setInterval(function (){
                if( bottle.mesh.rotation.y>=data.rotateHMZY+0.05*Math.PI){
                    dert=0;
                    stay++;
                    if(stay>=40){
                        dert=-0.0004*Math.PI;
                        stay=0;
                    }
                }
                if(bottle.mesh.rotation.y<=data.rotateHMZY){
                    dert=0;
                    stay++;
                    if(stay>=40){
                        dert=0.0004*Math.PI;
                        stay=0;
                    }
                }
                bottle.mesh.rotation.y+=dert;
            },20)
        },500);
    }
    function animationShow(){
        if(controlIndex==1){
            if(!$("#page1").hasClass("now")){
                $("#guide").attr("style","transform: translateX(0); -webkit-transform: translateX(0);");
                pointShow(1);
                hidText2("#page2");
                $("#page2").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").removeClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow0");
                    clearInterval(timer);
                    timer=null;
                    var dert=0.0004*Math.PI;
                    setTimeout(function (){
                        timer=setInterval(function (){
                            if( bottle.mesh.rotation.y>=0.15*Math.PI+0.05*Math.PI){
                                dert=-0.0004*Math.PI;
                            }
                            if(bottle.mesh.rotation.y<=0.15*Math.PI){
                                dert=0.0004*Math.PI;
                            }
                            bottle.mesh.rotation.y+=dert;
                        },20)
                    },500);
                });
                setTimeout(function (){
                    showText("#page1");
                    $("#page1").addClass("now");
                },500);
                $("#net").fadeIn();
            }
        }else if(controlIndex==2){
            $("#guide").attr("style","transform: translateX(-190px); -webkit-transform: translateX(-190px);");
            pointShow(2);
            if($("#page1").hasClass("now")){
                hidText("#page1");
                $("#page1").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").addClass("highZ");
                    clearInterval(timer);
                    timer=null;
                    var dert=0.0004*Math.PI;
                    setTimeout(function (){
                        timer=setInterval(function (){
                            if( bottle.mesh.rotation.y>=0.15*Math.PI+0.05*Math.PI){
                                dert=-0.0004*Math.PI;
                            }
                            if(bottle.mesh.rotation.y<=0.15*Math.PI){
                                dert=0.0004*Math.PI;
                            }
                            bottle.mesh.rotation.y+=dert;
                        },20)
                    },500);
                });
                setTimeout(function (){
                    showText2("#page2");
                    $("#page2").addClass("now");
                },500);
            }
            if($("#page3").hasClass("now")){
                hidText2("#page3");
                $("#page3").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").addClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow0");
                    animation3D({
                        meshScaleX:4,
                        meshScaleY:4,
                        meshScaleZ:4,
                        meshPositionX:8,
                        meshPositionY:-22,
                        meshPositionZ:0,
                        rotateHMZX:-0.3*Math.PI,
                        rotateHMZY:0.15*Math.PI,
                        rotateHMZZ:0.11*Math.PI,
                        cameraPositionX:50,
                        cameraPositionY:50,
                        cameraPositionZ:50,
                        lightLeftX:-150,
                        lightLeftY:20,
                        lightLeftZ:20,
                        lightRightX:50,
                        lightRightY:80,
                        lightRightZ:1
                    });
                });
                setTimeout(function (){
                    showText2("#page2");
                    $("#page2").addClass("now");
                },timeControl);
            }

            btnClick(2);
            $("#net").fadeOut();
        }else if(controlIndex==3){
            $("#guide").attr("style","transform: translateX(-380px); -webkit-transform: translateX(-380px);");
            pointShow(3);
            if($("#page2").hasClass("now")){
                hidText2("#page2");
                $("#page2").removeClass("now");
                $("#shadow").removeClass();
                $("#shadow").addClass("shadow1");
                bottle.animate(function (){
                    $("#bottle").removeClass("highZ");
                    animation3D({
                        meshScaleX:4.4,
                        meshScaleY:4.4,
                        meshScaleZ:4.4,
                        meshPositionX:0,
                        meshPositionY:-22,
                        meshPositionZ:15,
                        rotateHMZX:0.02*Math.PI,
                        rotateHMZY:0.4*Math.PI,
                        rotateHMZZ:0.07*Math.PI,
                        cameraPositionX:50,
                        cameraPositionY:-35,
                        cameraPositionZ:50,
                        lightLeftX:0,
                        lightLeftY:20,
                        lightLeftZ:5,
                        lightRightX:200,
                        lightRightY:20,
                        lightRightZ:20
                    });
                })
            }
            if($("#page4").hasClass("now")){
                hidText2("#page4");
                $("#page4").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").removeClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow1");
                    animation3D({
                        meshScaleX:4.4,
                        meshScaleY:4.4,
                        meshScaleZ:4.4,
                        meshPositionX:0,
                        meshPositionY:-22,
                        meshPositionZ:15,
                        rotateHMZX:0.02*Math.PI,
                        rotateHMZY:0.4*Math.PI,
                        rotateHMZZ:0.07*Math.PI,
                        cameraPositionX:50,
                        cameraPositionY:-35,
                        cameraPositionZ:50,
                        lightLeftX:0,
                        lightLeftY:20,
                        lightLeftZ:5,
                        lightRightX:200,
                        lightRightY:20,
                        lightRightZ:20
                    });
                })
            }
            setTimeout(function (){
                showText2("#page3");
                $("#page3").addClass("now");
            },timeControl);
            btnClick(3);
        }else if(controlIndex==4){
            $("#guide").attr("style","transform: translateX(-570px); -webkit-transform: translateX(-570px);");
            pointShow(4);
            if($("#page3").hasClass("now")){
                hidText2("#page3");
                $("#page3").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").removeClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow2");
                    animation3D({
                        meshScaleX:2.7,
                        meshScaleY:2.7,
                        meshScaleZ:2.7,
                        meshPositionX:25,
                        meshPositionY:-25,
                        meshPositionZ:15,
                        rotateHMZX:0.05*Math.PI,
                        rotateHMZY:0.3*Math.PI,
                        rotateHMZZ:-0.1*Math.PI,
                        cameraPositionX:57,
                        cameraPositionY:-35,
                        cameraPositionZ:50,
                        lightLeftX:-40,
                        lightLeftY:50,
                        lightLeftZ:50,
                        lightRightX:60,
                        lightRightY:10,
                        lightRightZ:50
                    });
                })
            }
            if($("#page5").hasClass("now")){
                hidText2("#page5");
                $("#page5").removeClass("now");
                bottle.animate(function (){
                    $("#bottle").removeClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow2");
                    animation3D({
                        meshScaleX:2.7,
                        meshScaleY:2.7,
                        meshScaleZ:2.7,
                        meshPositionX:25,
                        meshPositionY:-25,
                        meshPositionZ:15,
                        rotateHMZX:0.05*Math.PI,
                        rotateHMZY:0.3*Math.PI,
                        rotateHMZZ:-0.1*Math.PI,
                        cameraPositionX:57,
                        cameraPositionY:-35,
                        cameraPositionZ:50,
                        lightLeftX:-40,
                        lightLeftY:50,
                        lightLeftZ:50,
                        lightRightX:60,
                        lightRightY:10,
                        lightRightZ:50
                    });
                })
            }
            setTimeout(function (){
                showText2("#page4");
                $("#page4").addClass("now");
            },timeControl);
            btnClick(4);
        }else if(controlIndex==5){
            $("#guide").attr("style","transform: translateX(-800px); -webkit-transform: translateX(-800px);");
            pointShow(5);
            if($("#page4").hasClass("now")){
                hidText2("#page4");
                $("#page4").removeClass("now");
                $("#shadow").removeClass();
                $("#shadow").addClass("shadow3");
                bottle.animate(function (){
                    // $("#bottle").addClass("highZ");
                    animation3D({
                        meshScaleX:3.1,
                        meshScaleY:3.1,
                        meshScaleZ:3.1,
                        meshPositionX:0,
                        meshPositionY:-20,
                        meshPositionZ:0,
                        rotateHMZX:0*Math.PI,
                        rotateHMZY:0.2*Math.PI,
                        rotateHMZZ:0*Math.PI,
                        cameraPositionX:50,
                        cameraPositionY:0,
                        cameraPositionZ:50,
                        lightLeftX:50,
                        lightLeftY:0,
                        lightLeftZ:100,
                        lightRightX:-300,
                        lightRightY:50,
                        lightRightZ:50
                    });
                });
            }
            if($("#page6").hasClass("now")){
                hidText("#page6");
                $("#page6").removeClass("now");
                bottle.animate(function (){
                    // $("#bottle").addClass("highZ");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow3");
                    animation3D({
                        meshScaleX:3.1,
                        meshScaleY:3.1,
                        meshScaleZ:3.1,
                        meshPositionX:0,
                        meshPositionY:-20,
                        meshPositionZ:0,
                        rotateHMZX:0*Math.PI,
                        rotateHMZY:0.2*Math.PI,
                        rotateHMZZ:0*Math.PI,
                        cameraPositionX:50,
                        cameraPositionY:0,
                        cameraPositionZ:50,
                        lightLeftX:50,
                        lightLeftY:0,
                        lightLeftZ:100,
                        lightRightX:-300,
                        lightRightY:50,
                        lightRightZ:50
                    });
                });
            }
            setTimeout(function (){
                showText2("#page5");
                $("#page5").addClass("now");
            },timeControl);
            btnClick(5);
            $("#net").fadeOut();
        }else if(controlIndex==6){
            if(!$("#page6").hasClass("now")){
                $("#guide").attr("style","transform: translateX(-1020px); -webkit-transform: translateX(-1020px);");
                pointShow(6);
                if($("#page5").hasClass("now")){
                    hidText2("#page5");
                    $("#page5").removeClass("now");
                    $("#shadow").removeClass();
                    $("#shadow").addClass("shadow0");
                    bottle.animate(function (){
                        $("#bottle").removeClass("highZ");
                        animation3D({
                            meshScaleX:4,
                            meshScaleY:4,
                            meshScaleZ:4,
                            meshPositionX:8,
                            meshPositionY:-22,
                            meshPositionZ:0,
                            rotateHMZX:-0.3*Math.PI,
                            rotateHMZY:0.15*Math.PI,
                            rotateHMZZ:0.11*Math.PI,
                            cameraPositionX:50,
                            cameraPositionY:50,
                            cameraPositionZ:50,
                            lightLeftX:-150,
                            lightLeftY:20,
                            lightLeftZ:20,
                            lightRightX:50,
                            lightRightY:80,
                            lightRightZ:1
                        });
                    });
                }
                setTimeout(function (){
                    showText("#page6");
                    $("#page6").addClass("now");
                },timeControl);
                btnClick(6);
                $("#net").fadeIn();
            }
        }
    }
//主程序结束
    function cengShow(id,ceng){
        $(id).on("touchend",function (){
            canAuto=false;
            $(ceng).fadeIn();
        })
    }
    function cengClose(ceng){
        $(ceng).on("touchend",function (){
            $(ceng).parent().fadeOut(function (){
                canAuto=true;
            });
        })
    }
    cengShow("#btnS .btn3","#ceng1");
    cengShow("#btnS .btn4","#ceng2");
    cengShow("#btnS .btn5","#ceng3");
    cengClose("#ceng1 .closeBtn");
    cengClose("#ceng2 .closeBtn");
    cengClose("#ceng3 .closeBtn");
//音乐开始
    $("#music").on("touchend",function (){
        $(this).toggleClass("music_off");
        $(this).toggleClass("music_rotate");
        if($(this).hasClass("music_off")){
            myaudio.pause();
        }else{
            myaudio.play();
        }
    });
    if(isWeiXin){
        myaudio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            myaudio.play();
        }, false);
    }else{
        myaudio.pause();
        $("#music").addClass("music_off");
        $("#music").removeClass("music_rotate");
    }
//音乐结束
//视频开始
    // 判断ios||Android 改变切换视频部分的左右箭头位置
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var myVid=document.getElementById('video1');
    $('#btnS .btn2').on('touchend',function(){
        //播放视频的时候停止音乐
        myaudio.pause();
        $("#music").addClass("music_off");
        $("#music").removeClass("music_rotate");
        //播放视频
        $('#videof').show();
        myVid.play();
        canAuto=false;
    });

    myVid.addEventListener('ended',function(){
        if(isiOS){
            $('#videof').hide();
        }else{
            $('#videof').remove();
        }
        //视频停止的时候播放音乐
        $("#music").removeClass("music_off");
        $("#music").addClass("music_rotate");
        myaudio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            myaudio.play();
        }, false);
        canAuto=true;
    },false);

    myVid.addEventListener('pause',function(){
        if(isiOS){
            $('#videof').hide();
        }else{
            $('#videof').remove();
        }
        //视频停止的时候播放音乐
        $("#music").removeClass("music_off");
        $("#music").addClass("music_rotate");
        myaudio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            myaudio.play();
        }, false);
        canAuto=true;
    },false);
//视频结束
});
// 倾斜监听
// if (window.DeviceMotionEvent) {
//     window.addEventListener('devicemotion',deviceMotionHandler, false);
// }
// function deviceMotionHandler(eventData) {
//     var acceleration = eventData.accelerationIncludingGravity;
//     var facingUp = -1;
//     if (acceleration.z > 0) {
//         facingUp = +1;
//     }
//     var tiltLR = acceleration.x;
//     var tiltFB = acceleration.y;
//     var ua1 = navigator.userAgent;
//
//     var textX=0,textY=0,bottleX=0,bottleY=0;
//     var controlTxLeft=25,controlTxRight=-30,controlTyTop=-15,controlTyBottom=20,
//         controlBxLeft=30,controlBxRigt=-25,controlByTop=-50,controlByBottom=100;
//     if (/Android/.test(ua1)) {
//         // alert(tiltFB)
//         if(tiltLR>1){
//             //左倾斜
//             textX=controlTxLeft;
//             bottleX=controlBxLeft;
//             textY=0;
//             bottleY=0;
//         }
//         else if(tiltLR<-1){
//             // 右倾斜
//             textX=controlTxRight;
//             bottleX=controlBxRigt;
//             textY=0;
//             bottleY=0;
//         }
//         else if(tiltLR>-1&&tiltLR<1){
//             // 左右水平的
//             textX=0;
//             bottleX=0;
//             textY=0;
//             bottleY=0;
//         }
//         if(tiltFB>1){
//             // 竖
//             textX=0;
//             bottleX=0;
//             textY=controlTyTop;
//             bottleY=controlByTop;
//         }
//         else if(tiltFB<-1){
//             // 躺
//             textX=0;
//             bottleX=0;
//             textY=controlTyBottom;
//             bottleY=controlByBottom;
//         }
//         else if(tiltFB>-1&&tiltFB<1){
//             // 上下水平的
//             textX=0;
//             bottleX=0;
//             textY=0;
//             bottleY=0;
//         }
//     } else {
//         if(tiltLR>1){
//             // 右倾斜
//             textX=controlTxRight;
//             bottleX=controlBxRigt;
//             textY=0;
//             bottleY=0;
//         }
//         else if(tiltLR<-1){
//             //左倾斜
//             textX=controlTxLeft;
//             bottleX=controlBxLeft;
//             textY=0;
//             bottleY=0;
//         }
//         else if(tiltLR>-1&&tiltLR<1){
//             //左右水平的
//             textX=0;
//             bottleX=0;
//             textY=0;
//             bottleY=0;
//         }
//         if(tiltFB>1){
//             // 躺
//             textX=0;
//             bottleX=0;
//             textY=controlTyBottom;
//             bottleY=controlByBottom;
//         }
//         else if(tiltFB<-1){
//             // 竖
//             textX=0;
//             bottleX=0;
//             textY=controlTyTop;
//             bottleY=controlByTop;
//         }
//         else if(tiltFB>-1&&tiltFB<1){
//             // 上下水平的
//             textX=0;
//             bottleX=0;
//             textY=0;
//             bottleY=0;
//         }
//     }
//     设置样式
//     $('.text').css({'margin-left':'('+textX+'px,'+textY+'px,0)','-webkit-transform':'translate3d('+textX+'px,'+textY+'px,0)'});
//      $('.text0').css({'transform':'translate3d('+textX+'px,'+textY+'px,0)','-webkit-transform':'translate3d('+textX+'px,'+textY+'px,0)'});
//      $('#bottle').css({'transform':'translate3d('+bottleX+'px,'+bottleY+'px,0)','-webkit-transform':'translate3d('+bottleX+'px,'+bottleY+'px,0)'}) ;
// }

document.addEventListener('touchmove',function(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
});
