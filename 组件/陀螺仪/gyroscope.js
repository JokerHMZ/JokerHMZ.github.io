function addOrientation(deviceMotionHandler=function (e) {
    console.log(e.alpha);//垂直于屏幕
    console.log(e.beta);//前到后旋转
    console.log(e.gamma);//从一侧到另一侧
    console.log(e.webkitCompassHeading);//ios中用来获地球坐标的方位(地球坐标：例如东南西北)
    console.log(e.webkitCompassAccuracy);//罗盘数据的精准度
}) {
    window.addEventListener('deviceorientation', deviceMotionHandler, false);
}
function removeOrientation(deviceMotionHandler) {
    window.removeEventListener('deviceorientation', deviceMotionHandler, false);
}

function addMotion(motionHandler=function (e) {
    var accGravity=e.accelerationIncludingGravity;//包含重力加速
    console.log(accGravity.x);
    console.log(accGravity.y);
    console.log(accGravity.z);
    var acc = e.acceleration;//不含重力加速
    console.log(acc.x);
    console.log(acc.y);
    console.log(acc.z);
    var rotationRate = e.rotationRate;//描述设备围绕其每个轴的旋转速率
    console.log(rotationRate.alpha);
    console.log(rotationRate.beta);
    console.log(rotationRate.gamma);

    console.log(e.interval);//返回从底层硬件获取数据的时间间隔
}) {
    window.addEventListener("devicemotion", motionHandler, false);
}
function removeMotion(motionHandler) {
    window.removeEventListener('devicemotion', motionHandler, false);
}

export {
    addOrientation,
    removeOrientation,
    addMotion,
    removeMotion
}