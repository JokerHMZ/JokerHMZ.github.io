//兼容raf
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

//设置viewport的meta头
function setViewport() {
    var w = screen.width, s = w/750;
    document.write('<meta name="viewport" content="width=750,initial-scale='+s+',minimum-scale='+s+',maximum-scale='+s+',user-scalable=no">');
}
//判断是否支持事件的passive写法
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
//阻止屏幕滑动
function fixScreen() {
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        return false;
    }, isPassive() ? {
        capture: false,
        passive: false
    } : false);
}
//safari中禁止双指缩放
function noGestureStart() {
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    }, isPassive() ? {
        capture: false,
        passive: false
    } : false);
}
//禁止safari中双击放大
function noDoubleFingerScale() {
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
        event.preventDefault();
    }, isPassive() ? {
        capture: false,
        passive: false
    } : false);
}
//rem
function rem() {
    document.documentElement.style.fontSize = Math.min(document.documentElement.clientWidth, 750) /7.5+ 'px';
}


var animtaionEnd=[
    'webkitAnimationEnd',
    'mozAnimationEnd',
    'MSAnimationEnd',
    'oanimationend',
    'animationend'
].join(' ');

var transitionEnd=[
    'webkitTransitionEnd',
    'mozTransitionEnd',
    'MSTransitionEnd',
    'otransitionend',
    'transitionend'
].join(' ');






export {
    setViewport,
    isPassive,
    fixScreen,
    noGestureStart,
    noDoubleFingerScale,
    rem,
    animtaionEnd,
    transitionEnd
}