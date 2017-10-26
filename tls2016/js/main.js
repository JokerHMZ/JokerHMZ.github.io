/**
 * Created by he.mingze on 2016/8/22.
 */
//全局控制开始
var canSlide=false;
function unlocked(){
    $("#arrow").removeClass("hid");
    canSlide=true;
}
function locked(){
    $("#arrow").addClass("hid");
    canSlide=false;
}
//全局控制结束
//雪花开始
function SnowPoint(ctx,width,height){
    this.width=width+(Math.random()*400-200);
    this.height=height;
    this.ctx=ctx;
    this.x=this.width/2;
    this.r=4+(parseInt(Math.random()*4)-2);
    this.y=-this.r;
    this.direction=Math.random()*Math.PI/2-Math.PI/4;
    this.step=5;
    this.ctx.fillStyle="#f3f3f3";
    this.canDraw=true;
}
SnowPoint.prototype.drawStep=function (){
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
};
SnowPoint.prototype.moveStep=function (){
    this.x+=this.step*Math.sin(this.direction);
    this.y+=this.step*Math.cos(this.direction);
    this.y >this.height&&(this.canDraw = false);
    this.x >this.width&&(this.canDraw = false);
    this.x <0&&(this.canDraw = false);
};
function Snow(){
    this.ctx=$("#snow_point")[0].getContext("2d");
    this.width=388;
    this.height=388;
    this.list=[];
    this.i=0;
    this.startNum=0;
    this.canSnow=true;
}
Snow.prototype.drawAll=function (){
    for(var i=0; i<this.list.length; i++){
        this.list[i].drawStep();
    }
};
Snow.prototype.moveAll=function (){
    for(var i=0; i<this.list.length; i++){
        this.list[i].moveStep();
        if(!this.list[i].canDraw){
            this.list.splice(i, 1);
            i--;
        }
    }
};
Snow.prototype.init=function (){
    if(this.startNum>=26){
        if(this.i%5==0){
            var len=Math.floor(Math.random()*3)+2;
            for(var i=0;i<len;i++){
                this.list.push(new SnowPoint(this.ctx,this.width,this.height));
            }
        }
        this.ctx.clearRect(0,0,this.width,this.height);
        this.drawAll();
        this.moveAll();
        this.i++;
    }else{
        this.startNum++;
    }
    if(this.canSnow){
        setTimeout(this.init.bind(this),50);
    }else{
        this.list.length=0;
        this.ctx.clearRect(0,0,this.width,this.height);
    }
};
Snow.prototype.draw=function (){
    setTimeout(this.init.bind(this),50);
};
//雪花结束
//人开始
function Human(){
    this.arrSrc=[
        //[
        //    {src:"../img/window/sea/human1.png",width:"62%",top:"40%"},
        //    {src:"../img/window/sea/human3.png",width:"56%",top:"40%"},
        //    {src:"../img/window/sea/human2.png",width:"57%",top:"40%"},
        //    {src:"../img/window/sea/human3.png",width:"56%",top:"40%"},
        //    {src:"../img/window/sea/human2.png",width:"57%",top:"40%"}
        //],[
        //    {src:"../img/window/spring/human2.png",width:"59%",top:"40%"},
        //    {src:"../img/window/spring/human3.png",width:"55%",top:"40%"},
        //    {src:"../img/window/spring/human1.png",width:"65%",top:"45%"},
        //    {src:"../img/window/spring/human2.png",width:"59%",top:"45%"},
        //    {src:"../img/window/spring/human1.png",width:"65%",top:"45%"},
        //    {src:"../img/window/spring/human2.png",width:"59%",top:"45%"},
        //    {src:"../img/window/spring/human1.png",width:"65%",top:"45%"},
        //    {src:"../img/window/spring/human2.png",width:"59%",top:"45%"}
        //],[
        //    {src:"../img/window/snow/human4.png",width:"69%",top:"40%"},
        //    {src:"../img/window/snow/human3.png",width:"69%",top:"48%"},
        //    {src:"../img/window/snow/human2.png",width:"69%",top:"50%"},
        //    {src:"../img/window/snow/human1.png",width:"64%",top:"46%"},
        //    {src:"../img/window/snow/human2.png",width:"69%",top:"50%"},
        //    {src:"../img/window/snow/human1.png",width:"64%",top:"46%"}
        //]
        [
            {src:".human11",width:"62%",top:"40%"},
            {src:".human12",width:"56%",top:"40%"},
            {src:".human13",width:"57%",top:"40%"},
            {src:".human14",width:"56%",top:"40%"},
            {src:".human15",width:"57%",top:"40%"}
        ],[
            {src:".human21",width:"59%",top:"40%"},
            {src:".human22",width:"55%",top:"40%"},
            {src:".human23",width:"65%",top:"45%"},
            {src:".human24",width:"59%",top:"45%"},
            {src:".human25",width:"65%",top:"45%"},
            {src:".human26",width:"59%",top:"45%"},
            {src:".human27",width:"65%",top:"45%"},
            {src:".human28",width:"59%",top:"45%"}
        ],[
            {src:".human31",width:"69%",top:"40%"},
            {src:".human32",width:"69%",top:"48%"},
            {src:".human33",width:"69%",top:"50%"},
            {src:".human34",width:"64%",top:"46%"},
            {src:".human35",width:"69%",top:"50%"},
            {src:".human36",width:"64%",top:"46%"}
        ]
    ];
    this.i=0;
    this.j=0;
    this.human=$("#human");
}
Human.prototype.draw=function () {
    //this.human.css("background-image", "url("+this.arrSrc[this.j][this.i].src+")");
    this.human.css("width", this.arrSrc[this.j][this.i].width);
    this.human.css("top", this.arrSrc[this.j][this.i].top);
    if(this.i==0){
        this.j==1&&$(this.arrSrc[0][4].src).addClass("hid");
        this.j==2&&$(this.arrSrc[1][7].src).addClass("hid");
    }else{
        $(this.arrSrc[this.j][this.i-1].src).addClass("hid");
    }
    $(this.arrSrc[this.j][this.i].src).removeClass("hid");
    this.i++;
    if (this.i < this.arrSrc[this.j].length) {
        setTimeout(this.draw.bind(this), 700);
    } else {
        this.j++;
        this.i = 0;
    }
    this.j>=3&&(this.j=0);
};
Human.prototype.init=function (t,select,o,arr){
    var me=this;
    setTimeout(function (){
        o!==undefined&&o.shanClass(arr);
        select!==undefined&&$(select).css("left","-110%");
        me.draw();
    },t);
};
//人结束
//字开始
function Text(select){
    $(select+" .txt[data-i=1]").length!=0&&(this.txt1=$(select+" .txt[data-i=1]"));
    $(select+" .txt[data-i=2]").length!=0&&(this.txt2=$(select+" .txt[data-i=2]"));
    $(select+" .txt[data-i=3]").length!=0&&(this.txt3=$(select+" .txt[data-i=3]"));
    $(select+" .txt[data-i=4]").length!=0&&(this.txt4=$(select+" .txt[data-i=4]"));
    $(select+" .txt[data-i=5]").length!=0&&(this.txt5=$(select+" .txt[data-i=5]"));
}
Text.prototype.drawText=function (){
    this.txt1.addClass("show1");
    this.txt2.addClass("show2");
    this.txt3.addClass("show3");
    this.txt4.addClass("show4");
    this.txt5!=undefined&&this.txt5.addClass("show5");
};
Text.prototype.removeText=function (){
    this.txt1.removeClass("show1");
    this.txt2.removeClass("show2");
    this.txt3.removeClass("show3");
    this.txt4.removeClass("show4");
    this.txt5!=undefined&&this.txt5.removeClass("show5");
};
//字结束
//画对象开始
function Picture(){
    var pw=parseInt((640*screen.width/screen.height)*0.35);
    var ph=parseInt(innerHeight*0.35);
    var preWidth=ph>pw?ph:pw;
    this.canPlay=true;
    this.canDraw=false;
    this.cas=$("#cas_bar");
    this.height=this.width=this.cas[0].width=this.cas[0].height=preWidth>388?388:preWidth;
    this.scale=this.width/388;
    this.ctx=this.cas[0].getContext("2d");
    this.seaArr=[
        {sel:$("#sea .sea1"),classArr:["sea_show","sea_move1"]},
        {sel:$("#sea .sea2"),classArr:["sea_show","sea_move2"]},
        {sel:$("#sea .sea3"),classArr:["sea_show","sea_move3"]},
        {sel:$("#sea .sea4"),classArr:["sea_show","sea_move4"]},
        {sel:$("#sea .sea5"),classArr:["sea_show","sea_move5"]},
        {sel:$("#sea .chair"),classArr:["chair_show"]},
        {sel:$("#sea .sand_top"),classArr:["sand_show"]},
        {sel:$("#sea .cloud2"),classArr:["cloud_show1","cloud_move1"]},
        {sel:$("#sea .cloud3"),classArr:["cloud_show2","cloud_move2"]},
        {sel:$("#sea .cloud4"),classArr:["cloud_show3","cloud_move1"]},
        {sel:$("#sea .cloud1"),classArr:["cloud_show3","cloud_move2"]},
        {sel:$("#sea .sun"),classArr:["sun_rise","sun_shine"]},
        {sel:$("#sea .fish"),classArr:["fish_show","fish_move"]},
        {sel:$("#sea .water_flower2"),classArr:["flower_show"]},
        {sel:$("#sea .water_flower1"),classArr:["flower_show"]},
        {sel:$("#sea .star1"),classArr:["star_show1"]},
        {sel:$("#sea .star2"),classArr:["sstar_show2"]}
    ];
    this.springArr=[
        {sel:$("#spring .sky"),classArr:["sky_show"]},
        {sel:$("#spring .land"),classArr:["land_show"]},
        {sel:$("#spring .cloud0"),classArr:["cloud_show","cloud_move2"]},
        {sel:$("#spring .cloud1"),classArr:["cloud_show","cloud_move1"]},
        {sel:$("#spring .cloud2"),classArr:["cloud_show"]},
        {sel:$("#spring .cloud3"),classArr:["cloud_show","cloud_move1"]},
        {sel:$("#spring .cloud4"),classArr:["cloud_show","cloud_move2"]},
        {sel:$("#spring .ball1"),classArr:["ball_show1","ball_move1"]},
        {sel:$("#spring .ball2"),classArr:["ball_show2","ball_move2"]},
        {sel:$("#spring .hill1"),classArr:["hill_show1"]},
        {sel:$("#spring .hill2"),classArr:["hill_show2"]},
        {sel:$("#spring .grass1"),classArr:["grass_show1"]},
        {sel:$("#spring .grass2"),classArr:["grass_show2"]},
        {sel:$("#spring .grass3"),classArr:["grass_show3"]},
        {sel:$("#spring .grass4"),classArr:["grass_show4"]},
        {sel:$("#spring .tree1"),classArr:["tree_show1"]},
        {sel:$("#spring .tree2"),classArr:["tree_show2"]},
        {sel:$("#spring .tree3"),classArr:["tree_show3"]},
        {sel:$("#spring .tree4"),classArr:["tree_show4"]},
        {sel:$("#spring .tree5"),classArr:["tree_show5"]},
        {sel:$("#spring .tree6"),classArr:["tree_show6"]},
        {sel:$("#spring .tree7"),classArr:["tree_show7"]},
        {sel:$("#spring .river"),classArr:["river_show"]}
    ];
    this.snowArr=[
        {sel:$("#snow .sky"),classArr:["sky_show"]},
        {sel:$("#snow .land"),classArr:["land_show"]},
        {sel:$("#snow .dui"),classArr:["dui_show"]},
        {sel:$("#snow .hill11"),classArr:["hill_show11"]},
        {sel:$("#snow .hill12"),classArr:["hill_show12"]},
        {sel:$("#snow .hill13"),classArr:["hill_show13"]},
        {sel:$("#snow .hill2"),classArr:["hill_show2"]},
        {sel:$("#snow .hill3"),classArr:["hill_show3"]},
        {sel:$("#snow .tree1"),classArr:["tree_show1"]},
        {sel:$("#snow .tree2"),classArr:["tree_show2"]},
        {sel:$("#snow .tree3"),classArr:["tree_show3"]}
    ];
    this.snow=new Snow();
    this.txt=new Text("#txt1");
    this.timer=null;
}
Picture.prototype.zengClass=function (arr){
    var len=arr.length;
    for(var i=0;i<len;i++){
        for(var j=0;j<arr[i].classArr.length;j++){
            arr[i].sel.addClass(arr[i].classArr[j]);
        }
    }
};
Picture.prototype.shanClass=function (arr){
    var len=arr.length;
    for(var i=0;i<len;i++){
        for(var j=0;j<arr[i].classArr.length;j++){
            arr[i].sel.removeClass(arr[i].classArr[j]);
        }
    }
};
Picture.prototype.init=function (){
    if(this.canPlay){
        $("#stage").css("width",this.width+"px")
            .css("height",this.height+"px");
        this.cas.parent().parent().removeClass("hid");
        var barImg=new Image();
        barImg.src="../img/window/window_bar.png";
        this.drawWindowBar(barImg,-Math.PI/2);
    }else{
        $("#stage")
            .css("width",this.width-parseInt(50*this.scale)+4+"px")
            .css("height",this.height-parseInt(44*this.scale)+4+"px");
        $("#cas")
            .css("padding",parseInt(22*this.scale)-2+"px 0");
        $("#occlusion")
            .css("background-size",this.scale*innerWidth+"px "+this.height+"px")
            .removeClass("hid");
        $("#sea").css("left","0");
        $("#human").removeClass("hid");
        $("#blind_left").remove();
        $("#blind_right").remove();
        this.cas.remove();
    }
};
Picture.prototype.drawWindowBar=function (img,angle){
    if(angle<=Math.PI*3/2+1&&this.canPlay){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2,this.height/2);
        this.ctx.arc(this.width/2,this.height/2,this.width/2+10,-Math.PI/2,angle);
        this.ctx.fill();
        this.ctx.globalCompositeOperation = "source-in";
        this.ctx.drawImage(img,0,0,this.width,this.height);
        this.ctx.restore();
        angle+=0.2;
        this.timer=setTimeout(this.drawWindowBar.bind(this,img,angle),40);
    }else{
        $("#stage")
            .css("width",this.width-parseInt(50*this.scale)+4+"px")
            .css("height",this.height-parseInt(44*this.scale)+4+"px");
        $("#cas")
            .css("padding",parseInt(22*this.scale)-2+"px 0");
        $("#occlusion")
            .css("background-size",this.scale*innerWidth+"px "+this.height+"px")
            .removeClass("hid");
        if(this.canPlay){
            this.cas.css("border-radius",(this.width-44)/2+"px");
            var blind_l= $("#blind_left");
            var blind_r= $("#blind_right");
            blind_l.css("background-position",-parseInt(blind_l.offset().left)+"px "+-parseInt(blind_l.offset().top)+"px");
            blind_r.css("background-position",-parseInt(blind_r.offset().left)+"px "+-parseInt(blind_r.offset().top)+"px");
            blind_l.removeClass("hid");
            blind_r.removeClass("hid");
            $("#sea").css("left","0");
            $("#human").removeClass("hid");
            this.cas.remove();
            this.openWindow();
        }else{
            this.cas.remove();
            $("#blind_left").remove();
            $("#blind_right").remove();
        }
    }
};
Picture.prototype.openWindow=function (){
    setTimeout(function (){
        $("#blind_left").addClass("blind_left_move");
        $("#blind_right").addClass("blind_right_move");
    },20);
    this.timer=setTimeout(this.drawPicture.bind(this),520);
};
Picture.prototype.drawPicture=function (){
    this.canDraw=true;
    var allPeople=new Human();
    var me=this;
    //沙滩
    if(this.canPlay){
        allPeople.init(10);
        this.zengClass(this.seaArr);
        this.timer=setTimeout(function (){
            unlocked();
            allPeople.init(300,"#sea",me,me.seaArr);
            $("#spring").css("left","0");
            me.zengClass(me.springArr);
            me.txt.drawText();
            if(me.canPlay){
                me.timer=setTimeout(function (){
                    $("#snow").css("left","0");
                    allPeople.init(300,"#spring",me,me.springArr);
                    me.zengClass(me.snowArr);
                    me.snow.draw();
                },6000)
            }else{
                return
            }
        },4000)
    }else{
        return
    }
};
Picture.prototype.controlSnow=function (){
    if(this.snow.canSnow){
        this.snow.canSnow=false;
    }else{
        this.snow.canSnow=true;
    }
};
Picture.prototype.clearPicture=function (){
    $("#snow").css("left","-110%");
    $("#spring").css("left","-110%");
    $("#sea").css("left","-110%");
    this.canPlay=false;
    clearTimeout(this.timer);
    this.timer=null;
    this.shanClass(this.snowArr);
    this.shanClass(this.springArr);
    this.shanClass(this.seaArr);
    this.controlSnow();
    this.txt.removeText();
};
//桌子开始
function Table(){
    this.cas=$("#table");
    this.height=this.width=this.cas[0].width=this.cas[0].height=640;
    this.ctx=this.cas[0].getContext("2d");
    var img1=new Image();img1.src="../img/table/table_totle.png";
    var img2=new Image();img2.src="../img/table/table_all.png";
    var img3=new Image();img3.src="../img/table/table1.png";
    var img4=new Image();img4.src="../img/table/table2.png";
    var img5=new Image();img5.src="../img/table/table3.png";
    var img6=new Image();img6.src="../img/table/table4.png";
    var img7=new Image();img7.src="../img/table/table5.png";
    var img8=new Image();img8.src="../img/table/table6.png";
    var img9=new Image();img9.src="../img/table/table7.png";
    var img10=new Image();img10.src="../img/table/table8.png";
    var img11=new Image();img11.src="../img/table/table9.png";
    var img12=new Image();img12.src="../img/table/table10.png";
    var img13=new Image();img13.src="../img/table/table11.png";
    this.imgArr=[
        {img:img1,width:157,height:153},
        {img:img2,width:107,height:107},
        {img:img3,width:85,height:53},
        {img:img4,width:10,height:81},
        {img:img5,width:0,height:0},
        {img:img6,width:0,height:0},
        {img:img7,width:0,height:0},
        {img:img8,width:84,height:51},
        {img:img9,width:84,height:54},
        {img:img10,width:80,height:76},
        {img:img11,width:84,height:48},
        {img:img12,width:80,height:76},
        {img:img13,width:84,height:48},
        {img:img12,width:80,height:76},
        {img:img13,width:84,height:48},
        {img:img12,width:80,height:76},
        {img:img13,width:84,height:48}
    ];
    this.imgArrLen=this.imgArr.length;
    this.i=0;
    this.txt=new Text("#txt2");
    this.timer=null;
}
Table.prototype.init=function (){
    var faceImg=new Image();
    var me=this;
    faceImg.src="../img/table/table_face.png";
    faceImg.onload=function (){
        var w=faceImg.width;
        var h=faceImg.height;
        me.ctx.fillStyle="transparemt";
        me.drawFace(faceImg,-Math.PI/2,w,h,157,153);
    };
};
Table.prototype.drawFace=function (img,angle,w,h,x,y){
    if(angle<=Math.PI*3/2+1){
        this.ctx.save();
        this.ctx.clearRect(0,0,640,640);
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2,this.height/2);
        this.ctx.arc(this.width/2,this.height/2,this.width/2+10,-Math.PI/2,angle);
        this.ctx.fill();
        this.ctx.globalCompositeOperation = "source-in";
        this.ctx.drawImage(img,0,0,640,640);
        this.ctx.restore();
        angle+=0.2;
        this.timer=setTimeout(arguments.callee.bind(this,img,angle,w,h,x,y),40);
    }else{
        this.draw();
    }
};
Table.prototype.draw=function (){
    if(this.i<this.imgArrLen){
        var img=this.imgArr[this.i].img;
        this.ctx.clearRect(0,0,640,640);
        this.ctx.drawImage(img,0,0,640,640);
        this.i++;
        this.timer=setTimeout(arguments.callee.bind(this),600);
        if(this.i==12){
            this.txt.drawText();
            unlocked();
        }
    }else{
        this.i=0;
    }
};
Table.prototype.clearTable=function (){
    clearTimeout(this.timer);
    this.timer=null;
    this.i=0;
    this.txt.removeText();
    this.ctx.clearRect(0,0,640,640);
};
//桌子结束
//牛奶开始
function Milk(){
    this.txt=new Text("#txt3");
    this.bowl=$("#milk .bowl");
    this.milk1=$("#milk1");
    this.milk2=$("#milk2");
    this.milk3=$("#milk3");
    this.milk4=$("#milk4");
}
Milk.prototype.init=function (){
    var me=this;
    setTimeout(function (){
        me.bowl.removeClass("milk").addClass("change_small");
        setTimeout(function (){
            me.milk1.removeClass("milk");
            setTimeout(function (){
                me.milk2.addClass("show");
                setTimeout(function (){
                    me.milk3.addClass("show");
                    setTimeout(function (){
                        me.milk4.addClass("show");
                        me.txt.drawText();
                        $("#btn_link").addClass("btn_link_show");
                        $("#logo").addClass("logo_show");
                        $("#list").addClass("list_show");
                        setTimeout(function (){
                            canSlide=true;
                        },1500);
                    },1000)
                },1000)
            },500)
        },500)
    },100)
};
Milk.prototype.delectMilk=function (){
    this.bowl.addClass("milk").removeClass("change_small");
    this.milk1.addClass("milk");
    this.milk2.removeClass("show");
    this.milk3.removeClass("show");
    this.milk4.removeClass("show");
    $("#btn_link").removeClass("btn_link_show");
    $("#logo").removeClass("logo_show");
    $("#list").removeClass("list_show");
};
//牛奶结束
//画对象结束
$(function() {
//主程序开始
    var picture=new Picture();
    var table=new Table();
    var milk=new Milk();
    //wx.config({
    //    debug: false,
    //    appId: '',
    //    timestamp: '',
    //    nonceStr: '',
    //    signature: '',
    //    jsApiList: [
    //        'onMenuShareTimeline',
    //        'onMenuShareAppMessage'
    //    ]
    //});
    //var otitle = '中秋专属好礼，邀你与家人一起吃喝玩乐！';
    //var desc = 'Get好礼，和家人一起吃喝玩乐去！';
    //var olink = window.location.href;
    //var oimgUrl = '../img/share.jpg';
    //wx.ready(function () {
    //    //分享部分
    //    wx.onMenuShareTimeline({
    //        title: desc, // 分享标题
    //        link: olink, // 分享链接
    //        imgUrl: oimgUrl // 分享图标
    //    });
    //    //分享给朋友
    //    wx.onMenuShareAppMessage({
    //        title: otitle,
    //        desc: desc,
    //        imgUrl: oimgUrl,
    //        link:olink
    //    });
    //});
    //loading开始
    function loadImage(str,foo){
        var img=new Image();
        img.src=str;
        img.onload=function (){
            typeof foo=="function"&&foo(img);
        }
    }
    loadImage("../img/loading_bg.png",function (){
        var num=0;
        loadImage("../img/music_off.png",function (){
            num++;
            num>=2&&loadMain();
        });
        loadImage("../img/music_on.png",function (){
            num++;
            num>=2&&loadMain();
        });
        function loadMain(){
            //解决iphone5音乐不能自动播放问题开始
            //document.addEventListener("WeixinJSBridgeReady",function (){
            //   WeixinJSBridge.invoke("getNetworkType",{},function (e){
            //       $("#music")[0].play();
            //   });
            //},false);
            function audioAutoPlay(id){
                var audio = document.getElementById("bgMusic");
                var play = function(){
                        audio.play();
                        document.removeEventListener("touchstart",play, false);
                    };
                console.log(audio);
                audio.play();
                document.addEventListener("WeixinJSBridgeReady", function () {//微信
                    play();
                }, false);
                //document.addEventListener("touchstart",play, false);
            }
            audioAutoPlay('bgMusic');
            //解决iphone5音乐不能自动播放问题结束
            $("#music").on("touchstart",function (){
                if($("#bgMusic")[0].paused){
                    $("#music").removeClass("music_off");
                    $("#music").addClass("music_on");
                    $("#music").addClass("music_rotate");
                    $("#bgMusic")[0].play();
                }else{
                    $("#music").removeClass("music_on");
                    $("#music").addClass("music_off");
                    $("#music").removeClass("music_rotate");
                    $("#bgMusic")[0].pause();
                }
            });
            loadImage("../img/loading_moon.png",function (img){
                var ctx=$("#load_moon")[0].getContext("2d");
                var queue = new createjs.LoadQueue(false);
                var arr=[
                    {src:"../img/share.jpg"},
                    {src:"../img/slide.png"},
                    {src:"../img/loading_rotate.png"},
                    {src:"../img/milk/font1.png"},//milk
                    {src:"../img/milk/font2.png"},
                    {src:"../img/milk/font3.png"},
                    {src:"../img/milk/font4.png"},
                    {src:"../img/milk/bowl0.png"},
                    {src:"../img/milk/bowl_big.png"},
                    {src:"../img/milk/bowl1.png"},
                    {src:"../img/milk/bowl2.png"},
                    {src:"../img/milk/bowl3.png"},
                    {src:"../img/milk/font_logo.png"},
                    {src:"../img/milk/link.png"},
                    {src:"../img/milk/list.png"},
                    {src:"../img/table/bg.png"},//table
                    {src:"../img/table/font1.png"},
                    {src:"../img/table/font2.png"},
                    {src:"../img/table/font3.png"},
                    {src:"../img/table/font4.png"},
                    {src:"../img/table/table_face.png"},
                    {src:"../img/table/table_totle.png"},
                    {src:"../img/table/table_all.png"},
                    {src:"../img/table/table1.png"},
                    {src:"../img/table/table2.png"},
                    {src:"../img/table/table3.png"},
                    {src:"../img/table/table4.png"},
                    {src:"../img/table/table5.png"},
                    {src:"../img/table/table6.png"},
                    {src:"../img/table/table7.png"},
                    {src:"../img/table/table8.png"},
                    {src:"../img/table/table9.png"},
                    {src:"../img/table/table10.png"},
                    {src:"../img/table/table11.png"},
                    {src:"../img/window/bg.png"},//window
                    {src:"../img/window/bg_scroll.png"},
                    {src:"../img/window/bg_dang.png"},
                    {src:"../img/window/font1.png"},
                    {src:"../img/window/font2.png"},
                    {src:"../img/window/font3.png"},
                    {src:"../img/window/font4.png"},
                    {src:"../img/window/font5.png"},
                    {src:"../img/window/window_bar.png"},
                    {src:"../img/window/spring/ball01.png"},//window_spring
                    {src:"../img/window/spring/ball02.png"},
                    {src:"../img/window/spring/cloud00.png"},
                    {src:"../img/window/spring/cloud01.png"},
                    {src:"../img/window/spring/cloud02.png"},
                    {src:"../img/window/spring/cloud03.png"},
                    {src:"../img/window/spring/cloud04.png"},
                    {src:"../img/window/spring/grass1.png"},
                    {src:"../img/window/spring/grass2.png"},
                    {src:"../img/window/spring/grass3.png"},
                    {src:"../img/window/spring/grass4.png"},
                    {src:"../img/window/spring/hill1.png"},
                    {src:"../img/window/spring/hill2.png"},
                    {src:"../img/window/spring/human1.png"},
                    {src:"../img/window/spring/human2.png"},
                    {src:"../img/window/spring/human3.png"},
                    {src:"../img/window/spring/river.png"},
                    {src:"../img/window/spring/sky.png"},
                    {src:"../img/window/spring/land.png"},
                    {src:"../img/window/spring/tree1.png"},
                    {src:"../img/window/spring/tree2.png"},
                    {src:"../img/window/spring/tree3.png"},
                    {src:"../img/window/spring/tree4.png"},
                    {src:"../img/window/spring/tree5.png"},
                    {src:"../img/window/spring/tree6.png"},
                    {src:"../img/window/spring/tree7.png"},
                    {src:"../img/window/sea/chair.png"},//window_sea
                    {src:"../img/window/sea/cloud01.png"},
                    {src:"../img/window/sea/cloud02.png"},
                    {src:"../img/window/sea/cloud03.png"},
                    {src:"../img/window/sea/cloud04.png"},
                    {src:"../img/window/sea/fish.png"},
                    {src:"../img/window/sea/human1.png"},
                    {src:"../img/window/sea/human2.png"},
                    {src:"../img/window/sea/human3.png"},
                    {src:"../img/window/sea/sand.png"},
                    {src:"../img/window/sea/sand_top.png"},
                    {src:"../img/window/sea/sea01.png"},
                    {src:"../img/window/sea/sea02.png"},
                    {src:"../img/window/sea/sea03.png"},
                    {src:"../img/window/sea/sea04.png"},
                    {src:"../img/window/sea/sea05.png"},
                    {src:"../img/window/sea/sky.png"},
                    {src:"../img/window/sea/star1.png"},
                    {src:"../img/window/sea/star2.png"},
                    {src:"../img/window/sea/sun.png"},
                    {src:"../img/window/sea/water_flower01.png"},
                    {src:"../img/window/sea/water_flower02.png"},
                    {src:"../img/window/snow/dui.png"},//window_snow
                    {src:"../img/window/snow/sky.png"},
                    {src:"../img/window/snow/land.png"},
                    {src:"../img/window/snow/hill11.png"},
                    {src:"../img/window/snow/hill12.png"},
                    {src:"../img/window/snow/hill13.png"},
                    {src:"../img/window/snow/hill2.png"},
                    {src:"../img/window/snow/hill3.png"},
                    {src:"../img/window/snow/human1.png"},
                    {src:"../img/window/snow/human2.png"},
                    {src:"../img/window/snow/human3.png"},
                    {src:"../img/window/snow/human4.png"},
                    {src:"../img/window/snow/tree1.png"},
                    {src:"../img/window/snow/tree2.png"},
                    {src:"../img/window/snow/tree3.png"}
                ];
                function drawMoon(x,y){
                    ctx.save();
                    ctx.clearRect(0,0,img.width,img.height);
                    ctx.drawImage(img,0,0,img.width,img.height);
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.beginPath();
                    ctx.arc(x,y,img.width/2+1,0,2*Math.PI);
                    ctx.fill();
                    ctx.restore()
                }
                drawMoon(img.width/2,img.height/2);
                queue.on("complete", handleComplete, this);
                queue.on("progress", handleFileLoad, this);
                queue.loadManifest(arr);
                function handleFileLoad(e){
                    drawMoon((img.width/2)-e.loaded*(img.width-44),(img.height/2)-e.loaded*(img.height-45));
                    var txt=Math.floor(e.loaded*100);
                    $("#load_text").text(txt+"%")
                }
                function handleComplete(){
                    $("#loading").addClass("hid");
                    $("#music").removeClass("hid");
                    mainProgress()
                }
            })
        }
    });
    //loading结束
    $(".section1").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            if(canSlide){
                if(direction=="up"){
                    locked();
                    var me=this;
                    this.next().removeClass("z_low");
                    this.next().addClass("z_high");
                    this.removeClass("z_high");
                    this.addClass("z_low");
                    this.next().removeClass("on_down");
                    this.next().addClass("active");
                    setTimeout(function (){
                        me.removeClass("active");
                        me.addClass("on_up");
                        picture.clearPicture();
                        table.init();
                    },500)
                }
            }
        }
    });
    $(".section2").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            if(canSlide){
                if(direction=="up"){
                    locked();
                    var me=this;
                    this.next().removeClass("z_low");
                    this.next().addClass("z_high");
                    this.removeClass("z_high");
                    this.addClass("z_low");
                    this.next().removeClass("on_down");
                    this.next().addClass("active");
                    setTimeout(function (){
                        $("#jump_btn").addClass("hid");
                        me.removeClass("active");
                        me.addClass("on_up");
                        table.clearTable();
                        milk.init();
                    },500)
                }
                if(direction=="down"){
                    locked();
                    var me=this;
                    this.prev().removeClass("z_low");
                    this.prev().addClass("z_high");
                    this.removeClass("z_high");
                    this.addClass("z_low");
                    this.prev().removeClass("on_up");
                    this.prev().addClass("active");
                    picture.canPlay=true;
                    $("#sea").css("left","0");
                    $("#spring").css("left","0");
                    $("#snow").css("left","0");
                    $("#human p").addClass("hid");
                    setTimeout(function (){
                        me.removeClass("active");
                        me.addClass("on_down");
                        table.clearTable();
                        picture.controlSnow();
                        picture.drawPicture();
                    },500)
                }
            }
        }
    });
    $(".section3").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            if(canSlide){
                if(direction=="down"){
                    locked();
                    var me=this;
                    this.prev().removeClass("z_low");
                    this.prev().addClass("z_high");
                    this.removeClass("z_high");
                    this.addClass("z_low");
                    this.prev().removeClass("on_up");
                    this.prev().addClass("active");
                    setTimeout(function (){
                        $("#jump_btn").removeClass("hid");
                        me.removeClass("active");
                        me.addClass("on_down");
                        milk.delectMilk();
                        milk.txt.removeText();
                        table.init();
                    },500)
                }
            }
        }
    });
    function mainProgress(){
        $("#main").removeClass("hid");
        function pullBg(){
            $("#temporaryBg").addClass("pull_bg");
            $("#jump_btn").removeClass("hid");
            setTimeout(function (){
                $(".section1").addClass("section1_bg");
                $("#temporaryBg").remove();
                $("#load_moon").remove();
                $("#load_text").remove();
                picture.init();
            },1400);
        }
        setTimeout(pullBg,200);
        $("#jump_btn").on("touchstart",function (){
            if(!$(".section3").hasClass("active")){
                locked();
                $("#jump_btn").addClass("hid");
                if($(".section1").hasClass("active")){//读者位于第一屏
                    $(".section1").removeClass("active").addClass("on_up");
                    $(".section1").removeClass("z_high").addClass("z_low");
                    $(".section2").removeClass("on_down").addClass("on_up");
                    $(".section2").removeClass("z_high").addClass("z_low");
                    if(picture.canDraw){
                        picture.clearPicture();
                    }else{
                        picture.controlSnow();
                        picture.canPlay=false;
                    }
                }else{//读者位于第二屏
                    $(".section2").removeClass("active").addClass("on_up");
                    $(".section2").removeClass("z_high").addClass("z_low");
                    table.clearTable();
                }
                $(".section3").removeClass("on_down").addClass("active");
                $(".section3").removeClass("z_low").addClass("z_high");
                milk.init();
            }
        })
    }
//主程序结束
});
document.addEventListener('touchmove',function(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
});
