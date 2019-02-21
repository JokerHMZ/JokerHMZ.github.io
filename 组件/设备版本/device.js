//判断是否是微信
function isWeChart(){
    var ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    if(ua=="micromessenger"){
        return true;
    }else{
        return false;
    }
}
//获取微信版本
function getWeChartNum() {
    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
    if(wechatInfo!=null){
        var wechatVersion = +wechatInfo[1][0];
        return wechatVersion//number
    }else{
        return -1
    }
}

//判断是百度地图
function isBaiDuMap(){
    var ua = navigator.userAgent.toLowerCase().match(/baidumap/i);
    if(ua=="baidumap"){
        return true;
    }else{
        return false;
    }
}
//ios终端
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//isAndroid终端
var isAndroid = navigator.userAgent.indexOf('Android') > -1;

//判断是手机还是pc
var ispc = (function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
        "Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
})();

export {
    isWeChart,
    isBaiDuMap,
    isiOS,
    isAndroid,
    ispc
}