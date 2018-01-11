function Ms_GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf("", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return document.cookie.substring(offset, endstr);
}
////从cookie中获得js参数
function SaveUniClickUser() {
    try {
        //用户行为（1：登陆，2：注册 ；备注登录、注册成功页面加UT监测)
        var action = "test";
        var siteid = isWeiXin ? "1638" : "1639";
        var contactId = Ms_GetCookie("MN_UserID");
        var openId = Ms_GetCookie("WeixinOpenid");
        var isNewUser = Ms_GetCookie("MN_IsNewUser");
        var openType = Ms_GetCookie("MN_OpenType");

        if (contactId == undefined || contactId == null || contactId == "") {
            contactId = "test";
        } else {
            action = "1";
        };
        if (openId == undefined || openId == null || openId == "") {
            openId = "test";
        }
        if (isNewUser == "1" && contactId != undefined && contactId != null && contactId != "test" && contactId != "") {
            action = "2";
        };
        if (openType == undefined || openType == null || openType == "") {
            openType = "test";
        };

        //面加载给检测代码赋值
        //Siteid的值为：监测网站ID值（品牌官网、活动站一一对应,以之前给到的siteid为准)
        //action的值为：用户行为（1：登陆，2：注册 ；备注登录、注册成功页面加UT监测)；
        //openid的值为：公众账号ID值 如：微信、微博
        //contactid的值为：CRM会员ID
        //opentype的值为：公众账号类型（微信:1；新浪:2；腾讯微博:3；人人:4）

        var bodyStr = "siteid=" + siteid + "&action=" + action + "&openid=" + openId + "&contactid=" + contactId + "&opentype=" + openType;

       /* var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = bodyStr;
        $("body").append(script);*/

        _utaq.push(['trackCustomEvent', 'mncmpp/uniut.gif',bodyStr]);

    } catch (e) {
        console.log(e);
    }
}
////手动拼js参数
function SaveUniClickUserManual(_action,_contactId,_openId,_openType) {
    var action = _action;
    var siteid = isWeiXin ? "1638" : "1639";
    var contactId = _contactId;
    var openId = _openId;
    //var isNewUser = Ms_GetCookie("MN_IsNewUser");
    var openType = _openType;//'1';
    var bodyStr = "siteid=" + siteid + "&action=" + action + "&openid=" + openId + "&contactid=" + contactId + "&opentype=" + openType;

   /* var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = bodyStr;
    $("body").append(script);*/


    ///////////////////////new test 重要
    _utaq.push(['trackCustomEvent', 'mncmpp/uniut.gif',bodyStr]);
////如果页面里面没有uniclick代码，但加载了mengniu.js代码，可以用下面的方法
    //_utmengniu.push(["trackCustomEvent", "mncmpp/uniut.gif","siteid=" + siteid + "&action=" + action + "&openid=" + openId + "&contactid=" + contactId + "&opentype=" + openType]);
}

$(function(){
    //页面加载完调用下面的方法
    SaveUniClickUser();
});
