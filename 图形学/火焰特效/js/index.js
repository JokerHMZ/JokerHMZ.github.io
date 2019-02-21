var space = document.getElementById("surface");// 获取canvas
var surface = space.getContext("2d");// 设置ctx
surface.globalCompositeOperation = "lighter";// 设置新图像绘制到已有图像的显示方式：新图像 + 已有图像
// Set wrapper and canvas items size
var canvasWidth=320;
var canvasHeight=480;
// 处理requestAnimationFrame的兼容问题，这个是完整版兼容写法，会在低性能的设备中使用4ms作为setTimeout的时间间隔，而在高性能的手机中使用1000/60ms

var i = 0,
  lastTime = 0,
  vendors = ['ms', 'moz', 'webkit', 'o'];

while (i < vendors.length && !window.requestAnimationFrame) {
  window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
  i++;
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime(),
          timeToCall = Math.max(0, 1000 / 60 - (currTime - lastTime)),
          id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);


      lastTime = currTime + timeToCall;
      return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
  };
}

// 设定粒子集合
var particles = [];// 设定粒子集合
var particle_count = 150;// 设定粒子总数
var fireColors=[];//火焰颜色集合

for(var i = 0; i < particle_count; i++) {
  var p=new particle();//生成一个火焰离子
  particles.push(p);//放入火焰离子集合
  var canvas=document.createElement('canvas');
  canvas.width=40;
  canvas.height=40;
  var ctx=canvas.getContext('2d');
  ctx.beginPath();
  var gradient = ctx.createRadialGradient(20, 20, 0, 20, 20, 20);//创建一个渐变
  gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+1+")");//设定渐变起始色
  gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");//设定终止起始色
  ctx.fillStyle = gradient;
  ctx.arc(20, 20, 20, Math.PI*2, false);//将渐变画到canvas上
  ctx.fill();
  fireColors.push(canvas);//将canvas放在颜色集合上
}


function particle() {//火焰离子对象

    this.speed = {x: -1+Math.random()*2, y: -10+Math.random()*10};//运动速度
    this.location = {x: canvasWidth/2, y: canvasHeight/2+150};//显示位置

    this.radius = .5+Math.random();//离子半径

    this.life = 10+Math.random()*10;//存活时间
    this.death = this.life;//距离死亡剩余的时间

    this.r = 255;//设置离子颜色
    this.g = Math.random()*155+0.5>>0;//设置离子颜色
    this.b = 0;//设置离子颜色
}



function ParticleAnimation(){
    surface.clearRect(0, 0, canvasWidth, canvasHeight);//更新canvas

    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.opacity = (p.death/p.life*100+0.5>>0)/100;//通过死亡时间计算出透明度，外焰颜色淡的核心

        surface.globalAlpha=p.opacity;//设置透明度

        surface.drawImage(fireColors[i], p.location.x-p.radius, p.location.y-p.radius,p.radius*2,p.radius*2);//选取对应的火焰颜色
        surface.restore();
        p.death-=1;//更新死亡时间
        p.radius+=2;//更新半径，越往外焰走，离子越大
        p.location.x += p.speed.x;//更新x位置
        p.location.y += p.speed.y;//更新y位置

        if(p.death < 0 || p.radius < 0){
            particles[i] = new particle();//当离子死亡的时候，将其替换为一个新的离子
        }
    }


  requestAnimationFrame(ParticleAnimation);
}
ParticleAnimation();
