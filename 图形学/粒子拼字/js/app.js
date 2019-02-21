/**
 * Created by he.mingze on 2016/8/17.
 */
function WriteFont(){
    this.thisTime=null;
    this.lastTime=null;
    this.derection=false;
    this.pause=true;
    this.focallength=250;
    this.timer=null;
    this.list=null;
    this.width=$("#canvas")[0].width;
    this.height=$("#canvas")[0].height;
    this.ctx=$("#canvas")[0].getContext("2d");
}
WriteFont.prototype.createFont=function (text){
    this.ctx.clearRect(0,0,this.width , this.height);
    this.list=null;
    this.list=[];
    this.ctx.save();
    this.ctx.font = "200px Î¢ÈíÑÅºÚ bold";
    this.ctx.fillStyle = "rgba(168,168,168,1)";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text , this.width/2 , this.height/2);
    this.ctx.restore();
    var imgData = this.ctx.getImageData(0,0,this.width , this.height);
    this.ctx.clearRect(0,0,this.width , this.height);
    for(var x=0;x<imgData.width;x+=6){
        for(var y=0;y<imgData.height;y+=6){
            var i = (y*imgData.width + x)*4;
            if(imgData.data[i] >= 128){
                var dot =this.creatBall(x-3 , y-3 , 0 , 3);
                this.list.push(dot);
            }
        }
    }
};
WriteFont.prototype.creatBall=function (x,y,z,r){
    function randomColor(){
        var x = Math.floor(Math.random() * 155) + 100;
        var y = Math.floor(Math.random() * 155) + 100;
        var z = Math.floor(Math.random() * 155) + 100;
        return "rgb("+x+","+y+","+z+")";
    }
    var o={
        dx:x,
        dy:y,
        dz:z,
        tx:Math.random()*this.width,
        ty:Math.random()*this.height,
        tz:Math.random()*this.focallength*2 - this.focallength,
        z:Math.random()*this.focallength*2 - this.focallength,
        x:Math.random()*this.width,
        y:Math.random()*this.height,
        r:r,
        color : randomColor()
    };
    return o;
};
WriteFont.prototype.drawBall=function (ball){
    var scale=this.focallength/(this.focallength + ball.z);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.width/2 + (ball.x-this.width/2)*scale , this.height/2 + (ball.y-this.height/2) * scale, ball.r*scale , 0 , 2*Math.PI, false);
    this.ctx.fillStyle = ball.color;
    this.ctx.fill();
    this.ctx.restore();
};
WriteFont.prototype.move=function (ball){
    if(this.derection){
        if (Math.abs(ball.dx - ball.x) < 0.1 && Math.abs(ball.dy - ball.y) < 0.1 && Math.abs(ball.dz - ball.z)<0.1) {
            ball.x = ball.dx;
            ball.y = ball.dy;
            ball.z = ball.dz;
            this.thisTime - this.lastTime > 300&&(this.derection = false);
        } else {
            ball.x = ball.x + (ball.dx - ball.x) * 0.1;
            ball.y = ball.y + (ball.dy - ball.y) * 0.1;
            ball.z = ball.z + (ball.dz - ball.z) * 0.1;
            this.lastTime = +new Date()
        }
    }
    else {
        if (Math.abs(ball.tx - ball.x) < 0.1 && Math.abs(ball.ty - ball.y) < 0.1 && Math.abs(ball.tz - ball.z)<0.1) {
            ball.x = ball.tx;
            ball.y = ball.ty;
            ball.z = ball.tz;
            this.pause = true;
        } else {
            ball.x = ball.x + (ball.tx - ball.x) * 0.1;
            ball.y = ball.y + (ball.ty - ball.y) * 0.1;
            ball.z = ball.z + (ball.tz - ball.z) * 0.1;
            this.pause = false;
        }
    }
};
WriteFont.prototype.drawBalls=function (){
    for(var i=0; i<this.list.length; i++){
        this.drawBall(this.list[i]);
    }
};
WriteFont.prototype.allMove=function (){
    for(var i=0; i<this.list.length; i++){
        this.move(this.list[i]);
    }
};
WriteFont.prototype.update=function (){
    this.ctx.clearRect(0,0,this.width,this.height);
    this.thisTime=+new Date();
    this.allMove();
    this.drawBalls();
    if(!this.pause){
        requestAnimationFrame(this.update.bind(this));
    }
};
WriteFont.prototype.init=function (){
    this.createFont($("#write")[0].value);
    this.pause=false;
    this.derection=true;
    this.update();
    var me=this;
    $("#btn").click(function (){
        if(!me.pause){
            return
        }
        me.createFont($("#write")[0].value);
        me.pause=false;
        me.derection=true;
        me.update();
    })
};
$(function (){
   var font=new WriteFont();
        font.init();
});
