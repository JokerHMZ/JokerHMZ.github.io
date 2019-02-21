//使用axios请求数据
import axios from 'axios'
function requestAsync(obj={
    type:'post',
    url:'',
    data:{},
    success:function () {},
    error:function () {}
}) {
    return new Promise((resolve, reject) => {
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method:obj.type,
            url:obj.url,//示例
            data: {
                ...obj.data
            },
            transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        }).then((res)=>{
            obj.success!==undefined&&obj.success();
            resolve(res);
        }).catch((res)=>{
            obj.error!==undefined&&obj.error();
            reject(res)
        });
    })
}

//微信分享
import axios from 'axios'
function weChartShare(
    type='post',
    interface='wxshare.php',
    share={
        otitle:'分享后标题',// 分享后标题
        desc:'分享朋友圈后描述',// 分享朋友圈后描述
        descSingle:'分享个人后描述',// 分享个人后描述
        olink:window.location.href.split('#')[0],// 分享后B用户打开的地址
        oimgUrlApp:'http://2019cny.telunsu.net/static/media/share-app.jpg',// 分享给朋友的图片
        oimgUrlTime:'http://2019cny.telunsu.net/static/media/share-time.jpg',// 分享到朋友圈的图片
    }
) {
    axios({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method:type,
        url:interface,
        data: {url:encodeURIComponent(window.location.href.split('#')[0])},
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    }).then((data)=>{
        var res = data.data;
        wx.config({
            debug: false,//测试后台签名是否正确
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
                'updateTimelineShareData',
                'updateAppMessageShareData',
                'addCard',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        wx.ready(function (){
            wx.onMenuShareTimeline({
                title: share.desc,
                link: share.olink,
                imgUrl: share.oimgUrlTime
            });
            wx.onMenuShareAppMessage({
                title: share.otitle,
                desc:  share.descSingle,
                link: share.olink,
                imgUrl: share.oimgUrlApp
            });
            wx.updateTimelineShareData({
                title: share.desc,
                link: share.olink,
                imgUrl: share.oimgUrlTime
            });
            wx.updateAppMessageShareData({
                title: share.otitle,
                desc:  share.descSingle,
                link: share.olink,
                imgUrl: share.oimgUrlApp
            });
        })
    });


    $.ajax({
        type:type,
        url:interface,
        data:{url:encodeURIComponent(window.location.href.split('#')[0])},
        dataType:"json",
        success:function (data){
            var res = data.data;
            wx.config({
                debug: false,//测试后台签名是否正确
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    'updateTimelineShareData',
                    'updateAppMessageShareData',
                    'addCard',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.ready(function (){
                wx.onMenuShareTimeline({
                    title: share.desc,
                    link: share.olink,
                    imgUrl: share.oimgUrlTime
                });
                wx.onMenuShareAppMessage({
                    title: share.otitle,
                    desc:  share.descSingle,
                    link: share.olink,
                    imgUrl: share.oimgUrlApp
                });
                wx.updateTimelineShareData({
                    title: share.desc,
                    link: share.olink,
                    imgUrl: share.oimgUrlTime
                });
                wx.updateAppMessageShareData({
                    title: share.otitle,
                    desc:  share.descSingle,
                    link: share.olink,
                    imgUrl: share.oimgUrlApp
                });
            })
        }
    });
}


import $ from 'jquery'
function weChartShare(
    type='post',
    interface='wxshare.php',
    share={
        otitle:'分享后标题',// 分享后标题
        desc:'分享朋友圈后描述',// 分享朋友圈后描述
        descSingle:'分享个人后描述',// 分享个人后描述
        olink:window.location.href.split('#')[0],// 分享后B用户打开的地址
        oimgUrlApp:'http://2019cny.telunsu.net/static/media/share-app.jpg',// 分享给朋友的图片
        oimgUrlTime:'http://2019cny.telunsu.net/static/media/share-time.jpg',// 分享到朋友圈的图片
    }
) {
    $.ajax({
        type:type,
        url:interface,
        data:{url:encodeURIComponent(window.location.href.split('#')[0])},
        dataType:"json",
        success:function (data){
            var res = data.data;
            wx.config({
                debug: false,//测试后台签名是否正确
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    'updateTimelineShareData',
                    'updateAppMessageShareData',
                    'addCard',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.ready(function (){
                wx.onMenuShareTimeline({
                    title: share.desc,
                    link: share.olink,
                    imgUrl: share.oimgUrlTime
                });
                wx.onMenuShareAppMessage({
                    title: share.otitle,
                    desc:  share.descSingle,
                    link: share.olink,
                    imgUrl: share.oimgUrlApp
                });
                wx.updateTimelineShareData({
                    title: share.desc,
                    link: share.olink,
                    imgUrl: share.oimgUrlTime
                });
                wx.updateAppMessageShareData({
                    title: share.otitle,
                    desc:  share.descSingle,
                    link: share.olink,
                    imgUrl: share.oimgUrlApp
                });
            })
        }
    });
}


export {
    requestAsync,
    weChartShare
}