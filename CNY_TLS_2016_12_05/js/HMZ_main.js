/**
 * Created by he.mingze on 2016/12/5.
 */
var HMZHMZscrollNum=1.25,HMZcanHeXiao=true,HMZBigBtnCanClick=true;
function Lottery(){
    this.indexI=-1;
    this.uId=null;
    this.loginToken=null;
    this.countDownTimer=null;
    this.countDown=90;
    this.gifts=[];
    this.isfocus=false;
    this.openid="";
    this.isMember=false ;//是否是名仕会会员
    this.lotteryMaCanClick=true;
    this.lotteryTelMaCanClick=true;
    this.lotteryKEY="";
    this.lotteryTelBool=false;
    this.hasGist=true;
    this.hasGiftList=true;
    this.isWX=(function (){
        var ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
        if(ua=="micromessenger"){
            return true;
        }else{
            return false;
        }
    })();
}
Lottery.prototype.getToken=function (){
    var me=this;
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (!!r) {
            return (r[2]);
        } else {
            return null;
        }
    }
    var data=getQueryString("openID");
    //if(data==null && !!cover){
    //    location.href="http://cny.telunsu.net/2017/api/index.php?control=Api&action=location&cover=123";
    //}else{
        data=decodeURIComponent(data);
        me.openid=data;
        me.getJsApiTicket();
    //}
};
Lottery.prototype.getJsApiTicket=function (){
    var me=this;
    $.ajax({
        type:"post",
        url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
        data:{
            url:location.href,
            fn:"getJsApiTicket"
        },
        dataType:"json",
        success:function (data){
            wx.config({
                debug: false,
                appId: data.data.appId,
                timestamp: data.data.timestamp,
                nonceStr: data.data.nonceStr,
                signature: data.data.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','addCard']
            });
            me.wxShare();
        },
        error:function (data){
            alert("网络不小心摔了一跤，请稍后重试");
        }
    });
};
Lottery.prototype.getUser=function (o,fn){
    var me=this;
    // $.ajax({
    //     type:"post",
    //     url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
    //     data:o,
    //     dataType:"json",
    //     success:function (data){
            me.indexI++;
            // me.isMember=data.data.user.mobile_true==0?false:true;
            // me.isfocus=data.data.user.wx_focus==0?false:true;
            // me.uId=data.data.user.uid;
            // me.loginToken=data.data.user.loginToken;
            // me.gifts=data.data.gift;
            // if(me.isWX){
            //     if(me.indexI>=1){
            //         if(me.gifts.length==0){
            //             me.hasGiftList=false;
            //         }else{
            //             me.hasGiftList=true;
            //         }
                    me.lotteryPageChoose();
                    me.presonPageChoose();
            //     }else{
            //         if(typeof fn!=undefined){
            //             fn();
            //         }
            //     }
            // }else{
            //     if(me.gifts.length==0){
            //         me.hasGiftList=false;
            //     }else{
            //         me.hasGiftList=true;
            //     }
            //     me.lotteryPageChoose();
            //     me.presonPageChoose();
            // }
    //     },
    //     error:function (data){
    //         alert("getUser失败")
    //     }
    // })
};
Lottery.prototype.buyMilk=function (){
    var me=this;
    if(me.isWX){
        location.href="http://weixin.telunsu.net/wechat/home/payMaikOrder/product_PayMaik";//微信端购奶页面
    }else{
        location.href="http://m.telunsu.net/m.php/member/login/authLogin.html?uid="+me.uId+"&loginToken="+me.loginToken;//非微信端购奶页面
    }
};
Lottery.prototype.telVerify=function (tel,sel){
    var bool=((+$(tel)[0].value)/10000000000)>> 0,me=this;
    if(bool==1){
        me.lotteryTelBool=true;
        me.hidError(sel)
    }else{
        me.lotteryTelBool=false;
        me.showError(sel,"请输入正确的手机号");
    }
};
Lottery.prototype.maVerify=function (tel,ma,telMa,sel1,sel2){
    var me=this;
    me.telVerify(tel,sel1);
    // var o=null;
    // if(me.isWX){
    //     o={
    //         codekey:me.lotteryKEY,
    //         captchacode:$(ma)[0].value,
    //         mobile:$(tel)[0].value,
    //         mobilecode:$(telMa)[0].value,
    //         fn:"consumeCode",
    //         openid:me.openid
    //     }
    // }else{
    //     o={
    //         codekey:me.lotteryKEY,
    //         captchacode:$(ma)[0].value,
    //         mobile:$(tel)[0].value,
    //         mobilecode:$(telMa)[0].value,
    //         fn:"consumeCode"
    //     }
    // }
    // if(me.lotteryTelBool){
    //     if(HMZcanHeXiao==true){
    //         HMZcanHeXiao=false;
    //         $.ajax({
    //             type:"post",
    //             url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
    //             dataType:"json",
    //             data:o,
    //             success:function (data){
    //                 if(data.state==1){
                        me.hidError(sel2);
                        me.createCard($(tel)[0].value);
    //                 }else{
    //                     me.showError(sel2,"短信验证码不正确");
    //                     //12.21 15:38增加开始
    //                     //$('#HMZ_lottery_telMa span').text("发送");
    //                     //$('#personal_center_telMa span').text("发送");
    //                     //$('#HMZ_lottery_telMa span').removeClass("HMZ_submit_bg");
    //                     //$('#personal_center_telMa span').removeClass("HMZ_submit_bg");
    //                     //(me.lotteryTelMaCanClick==false)&&(me.lotteryTelMaCanClick=true);
    //                     //12.21 15:38增加结束
    //                 }
    //                 setTimeout(function (){
    //                      HMZcanHeXiao=true;
    //                 },3000);
    //             },
    //             error:function (data){
    //                 alert("核销验证码失败");
    //                 setTimeout(function (){
    //                      HMZcanHeXiao=true;
    //                 },3000);
    //             }
    //         })
    //     }
    //
    // }
};
Lottery.prototype.lotteryPageChoose=function (){
    console.log(232);
    var me=this;
    me.removeFlashBtn("#lottery_submit_btn",1);
    me.removeFlashBtn("#commit_list_btn",1);
    $("#HMZ_lottery .commit_list").addClass("hid");
    $(".inWeiXin .success").addClass("hid");
    $(".inWeiXin .error").addClass("hid");
    $(".outWeiXin .success").addClass("hid");
    $(".outWeiXin .error").addClass("hid");
    if(me.isWX==true&&me.hasGist==false){
        me.flashBtn("#iWSBtn",1);
        $(".inWeiXin .success").removeClass("hid");
        // _utaq.push(['trackEvent','pv-6']);//ut,page6
    }else if(me.isWX==true&&me.hasGist==true){
        //if(me.hasGiftList==false){
        //    $("#HMZ_lottery .get_prize .error .banner").addClass("wei_ling_qu")
        //}
        me.flashBtn("#iWRBtn",1);
        $(".inWeiXin .error").removeClass("hid");
        // _utaq.push(['trackEvent','pv-7']);//ut,page7
    }else if(me.isWX==false&&me.hasGist==false){
        me.flashBtn("#oWSBtn",2);
        me.flashBtn("#HMZ_lottery .get_prize .success .use",1);
        $(".outWeiXin .success").removeClass("hid");
        // _utaq.push(['trackEvent','pv-6']);//ut,page6
    }else{
        me.flashBtn("#oWRBtn",2);
        $(".outWeiXin .error").removeClass("hid");
        // _utaq.push(['trackEvent','pv-7']);//ut,page7
    }
};
Lottery.prototype.presonPageChoose=function (){
    var me=this;
    $("#HMZ_personal_center .personal_center_main .commit_list").addClass("hid");
    if(me.hasGiftList){
        me.makeGistList();
        $("#HMZ_personal_center .personal_center_main .record_list").removeClass("hid");
        $("#HMZ_personal_center .personal_center_main .no_record").addClass("hid");
    }else{
        $("#HMZ_personal_center .personal_center_main .no_record").removeClass("hid");
        $("#HMZ_personal_center .personal_center_main .record_list").addClass("hid");
    }
};

Lottery.prototype.getKey=function (fn){
    // var me=this;
    // $.ajax({
    //     type:"post",
    //     url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
    //     dataType:"json",
    //     data:{fn:"captcha_key"},
    //     success:function (data){
    //         me.lotteryKEY=data.data.KEY;
    //         //me.getMa("#personal_center_ma span");
    //         //me.getMa("#HMZ_lottery_ma span");
    //         if(me.isWX){
    //             var o={
    //                 openid:me.openid,
    //                 fn:"getUser"
    //             };
    //             me.getUser(o,fn);
    //         }else{
                fn();
    //         }
    //     },
    //     error:function (data){
    //         alert("获取验证码失败，请点击重试");
    //     }
    // })
};

Lottery.prototype.getMa=function (sel){
    var me=this;
    me.lotteryMaCanClick=false;
    var img=new Image();
    img.src="http://weixin.telunsu.net/weixinapi/index.html?guestUser=cny&fn=captcha_img&codekey="+me.lotteryKEY+"&random="+Math.random();
    img.onload=function (){
        $(sel).text("");
        $(img).appendTo(sel);
    };
    setTimeout(function (){
        me.lotteryMaCanClick=true;
    },2000)
};
Lottery.prototype.getTelMa=function (tel,sel,selMa){
    var me=this;
    me.lotteryTelMaCanClick=false;
    function daoJiShi(){
        //---------------以下为倒计时结束(等待北广沟通之后再说，此处为一旦要添加时的备用)------------------------
        $('#HMZ_lottery_telMa span').text(me.countDown+"s");
        $('#personal_center_telMa span').text(me.countDown+"s");
        me.countDownTimer=setInterval(function (){
            me.countDown--;
            $('#HMZ_lottery_telMa span').text(me.countDown+"s");
            $('#personal_center_telMa span').text(me.countDown+"s");
            if(me.countDown<=0){
                $('#HMZ_lottery_telMa span').text("发送");
                $('#personal_center_telMa span').text("发送");
                $('#HMZ_lottery_telMa span').removeClass("HMZ_submit_bg");
                $('#personal_center_telMa span').removeClass("HMZ_submit_bg");
                clearInterval(me.countDownTimer);
                me.countDownTimer=null;
                me.countDown=90;
                (me.lotteryTelMaCanClick==false)&&(me.lotteryTelMaCanClick=true);
            }
        },1000);
        //---------------以下为倒计时结束(等待北广沟通之后再说，此处为一旦要添加时的备用)------------------------
    }
    $.ajax({
        type:"post",
        url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
        data:{
            codekey:me.lotteryKEY,
            captchacode:$(sel)[0].value,
            mobile:$(tel)[0].value,
            fn:"sendMobileCode"
        },
        dataType:"json",
        success:function (data){
            if(data.state==1){
                me.hidError(selMa);
                me.hidError("#HMZ_lottery_telMa");
                me.hidError("#personal_center_telMa");
                //---------------------以下为现在的“已发送”开始-------------------------------------
                //$('#HMZ_lottery_telMa span').text("已发送");
                //$('#personal_center_telMa span').text("已发送");
                //$('#HMZ_lottery_telMa span').addClass("HMZ_submit_bg");
                //$('#personal_center_telMa span').addClass("HMZ_submit_bg");
                //---------------------以下为现在的“已发送”结束-------------------------------------
                daoJiShi();
            }else{
                if(data.code==1011){
                    me.showError("#HMZ_lottery_telMa","短信验证码已发送");
                    me.showError("#personal_center_telMa","短信验证码已发送");
                    daoJiShi();
                }else if(data.code==1012){
                    me.showError("#HMZ_lottery_telMa","验证码发送超出限制");
                    me.showError("#personal_center_telMa","验证码发送超出限制");
                    daoJiShi();
                }else if(data.code==1008||data.code==1009||data.code==1010){
                    me.showError(selMa,"请输入正确的验证码");
                    (me.lotteryTelMaCanClick==false)&&(me.lotteryTelMaCanClick=true);
                }else if(data.code==1015||data.code==1016){
                    me.showError("#HMZ_lottery_telMa","短信验证码错误");
                    me.showError("#personal_center_telMa","短信验证码错误");
                    daoJiShi();
                }else{
                    me.showError("#HMZ_lottery_telMa","网络繁忙，稍后再试");
                    me.showError("#personal_center_telMa","网络繁忙，稍后再试");
                    daoJiShi();
                }
            }
        },
        error:function (data){
            $('#HMZ_lottery_telMa span').text("重试");
            $('#personal_center_telMa span').text("重试");
            (me.lotteryTelMaCanClick==false)&&(me.lotteryTelMaCanClick=true);
        }
    })
};
Lottery.prototype.createCard=function (tel){
    var me=this,o=null;
    // if(me.isWX){
    //     o={
    //         openid:me.openid,
    //         fn:"createCARD"
    //     }
    // }else{
    //     o={
    //         mobile:tel,
    //         fn:"createCARD"
    //     }
    // }
    // $.ajax({
    //     type:"post",
    //     url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
    //     data:o,
    //     dataType:"json",
    //     success:function (data){
    //         if(data.state==1){
    //             me.theCard=data;
    //             me.hasGist=false;
                // if(me.isWX){
                //     me.addCard(data,tel);
                // }else{
                    me.upCard(tel,123456);
                // }
        //     }else{
        //         var obj=null;
        //         if(me.isWX){
        //             obj={
        //                 openid:me.openid,
        //                 fn:"getUser"
        //             }
        //         }else{
        //             obj={
        //                 mobile:tel,
        //                 fn:"getUser"
        //             }
        //         }
        //         me.hasGist=true;
        //         me.getUser(obj);
        //
        //     }
        // },
        // error:function (data){}
    // })
};
Lottery.prototype.addCard=function (data,tel){
    var me=this,o=null;
    o={
        openId:me.openid,
        code:data.data.KqTicket.Cardcode,
        timestamp:data.data.KqTicket.timestamp,
        nonceStr:data.data.KqTicket.nonceStr,
        cardId:data.data.KqTicket.cardId,
        signature:data.data.KqTicket.cardSign
    };
    wx.ready(function (){
        wx.addCard({
            cardList: [{
                cardId: o.cardId,
                cardExt:'{"code":"'+ o.code+'","nonce_str":"'+ o.nonceStr+'","timestamp":"'+o.timestamp+'","signature":"'+o.signature+'"}'
            }], // 需要添加的卡券列表
            success: function (res) {
                var cardList = res.cardList; // 添加的卡券列表信息
                me.upCard(tel, o.code);//12.20 19.17改
            },
            cancel:function (res){
                me.hasGist=true;
                $("#HMZ_lottery .get_prize .error .banner").addClass("wei_ling_qu");
                //me.getUser({
                //    openid:me.openid,
                //    fn:"getUser"
                //});
                me.delectCard(o.code);
            }
        })
    });
};
Lottery.prototype.delectCard=function (card){
    var me=this;
    $.ajax({
        type:"post",
        url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
        data:{
            fn:"clearCARD",
            card_code:card
        },
        dataType:"json",
        success:function (data){
            me.getUser({
                openid:me.openid,
                fn:"getUser"
            })
        },
        error:function (data){}
    })
};
Lottery.prototype.upCard=function (tel,code){
    var me=this,o=null;
    // if(me.isWX){
    //     o={
    //         card_code:code,
    //         openid:me.openid,
    //         fn:"upCARD"
    //     }
    // }else{
    //     o={
    //         card_code:code,
    //         mobile:tel,
    //         fn:"upCARD"
    //     }
    // }
    // $.ajax({
    //     type:"post",
    //     url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
    //     data:o,
    //     dataType:"json",
    //     success:function (data){
            var obj=null;
    //         if(me.isWX){
    //             obj={
    //                 openid:me.openid,
    //                 fn:"getUser"
    //             }
    //         }else{
                obj={
                    mobile:tel,
                    fn:"getUser"
                };
    //         }
            me.getUser(obj);
    //     },
    //     error:function (data){
    //         alert("upCard失败");
    //     }
    // })
};
Lottery.prototype.showError=function (sel,txt){
    $(sel+" input").addClass("HMZ_input_padding_left");
    $(sel+" i").removeClass("hid");
    $(sel+" input")[0].value="";
    $(sel+" input")[0].placeholder=txt;
};
Lottery.prototype.hidError=function (sel){
    if(!$(sel+" i").hasClass("hid")){
        $(sel+" i").addClass("hid");
    }
};
Lottery.prototype.wxShare=function (){
    var shareTxt = {
        // 分享到朋友圈标题
        desc:' 听到这个语音消息的人2017会更好',
        // 分享给朋友标题
        otitle:'听到这个语音消息的人2017会更好',
        // 分享给朋友描述
        odesc:'他发来的神秘语音，会让你拥有更好2017',
        // 分享后B用户打开的地址
        olink:"http://cny.telunsu.net/2017/show.html?media=2",
        // 分享图片
        oimgUrl:'http://cny.telunsu.net/2017/img/wxshare.jpg'
    };
    wx.ready(function (){
        wx.onMenuShareTimeline({
            title: shareTxt.desc,
            link:  shareTxt.olink,
            imgUrl: shareTxt.oimgUrl,
            success: function () {},
            cancel: function () {}
        });
        wx.onMenuShareAppMessage({
            title: shareTxt.otitle,
            desc:  shareTxt.odesc,
            link: shareTxt.olink,
            imgUrl: shareTxt.oimgUrl,
            success: function () {},
            cancel: function () {}
        });
    });
};
Lottery.prototype.makeGistList=function (){
    var me=this,txt="去使用";
    $("#nutrition .title").empty();
    $("#nutrition .time").empty();
    $("#bigPrize .title").empty();
    $("#bigPrize .time").empty();
    $("<li class='head'></li>").appendTo("#nutrition .title");
    $("<li class='head'></li>").appendTo("#nutrition .time");
    $("<li class='head'></li>").appendTo("#bigPrize .title");
    $("<li class='head'></li>").appendTo("#bigPrize .time");
    for(var i= 0,len=me.gifts.length;i<len;i++){
        var timeTxt=me.gifts[i].addtime,
            indexI=timeTxt.indexOf(" "),
            time=timeTxt.slice(0,indexI),
            str=time.replace(/-/g,".");
        if(me.gifts[i].gift=="特仑苏10元优惠券"){
            if(me.gifts[i].state==2){
                txt="已使用";
            }else if(me.gifts[i].state==0){
                txt="领取";
            }else{
                txt="使用";
            }
            $("<li><span>"+me.gifts[i].gift+"</span><span class='btn' data-openid='"+me.gifts[i].openid+"' data-id='"+me.gifts[i].id+"' data-i='"+me.gifts[i].state+"'>"+txt+"</span></li>").appendTo("#nutrition .title");
            $("<li class='contentTime'>"+str+"</li>").appendTo("#nutrition .time");
        }else{
            if(me.gifts[i].gift=="爱奇艺会员月卡"||me.gifts[i].gift=="优酷会员月卡"){
                if(me.gifts[i].state==0){
                    txt="领取";
                }else{
                    txt="查看";
                }
                $("<li><span>更好观影礼<br>"+me.gifts[i].gift+"</span><span class='bigBtn' data-openid='"+me.gifts[i].openid+"' data-id='"+me.gifts[i].id+"' data-i='"+me.gifts[i].state+"'>"+txt+"</span></li>").appendTo("#bigPrize .title");
                $("<li class='contentTime'>"+str+"</li>").appendTo("#bigPrize .time");
            }else{
                if(me.gifts[i].state==0){
                    txt="领取";
                }else{
                    txt="查看";
                }
                if(me.gifts[i].gift=="4999元携程旅游基金"){
                    $("<li><span>更好出游礼<br>"+"4999元携程旅游基金"+"</span><span class='bigBtn' data-openid='"+me.gifts[i].openid+"' data-id='"+me.gifts[i].id+"' data-i='"+me.gifts[i].state+"'>"+txt+"</span></li>").appendTo("#bigPrize .title");
                    $("<li class='contentTime'>"+str+"</li>").appendTo("#bigPrize .time");
                }else{
                    $("<li><span>更好体验礼<br>"+"2998元GOPRO HERO5"+"</span><span class='bigBtn' data-openid='"+me.gifts[i].openid+"' data-id='"+me.gifts[i].id+"' data-i='"+me.gifts[i].state+"'>"+txt+"</span></li>").appendTo("#bigPrize .title");
                    $("<li class='contentTime'>"+str+"</li>").appendTo("#bigPrize .time");
                }
            }

        }
    }
};
Lottery.prototype.sendMSG=function (o){
    var me=this;
    if(me.isfocus==false){
        location.href="http://mp.weixin.qq.com/s/SAES7OzBl1dB5UyEnTvagA";//特仑苏关注页面
    }else{
        $.ajax({
            type:"post",
            url:"http://cny.telunsu.net/2017/api/index.php?control=Api&action=transit"+"&random="+Math.random(),
            data:o,
            dataType:"json",
            success:function (data){
                HMZBigBtnCanClick=true;
                console.log(data);
            },
            error:function (data){
                console.log(data)
            }
        })
    }
};
Lottery.prototype.flashBtn=function (btn,n){
    setTimeout(function (){
        $(btn).removeClass("animated");
        $(btn+" .HMZ_nth1").addClass("light_move_top"+n);
        $(btn+" .HMZ_nth2").addClass("light_move_right"+n);
        $(btn+" .HMZ_nth3").addClass("light_move_bottom"+n);
        $(btn+" .HMZ_nth4").addClass("light_move_left"+n);
    },1000);
};
Lottery.prototype.removeFlashBtn=function (btn,n){
    $(btn+" .HMZ_nth1").removeClass("light_move_top"+n);
    $(btn+" .HMZ_nth2").removeClass("light_move_right"+n);
    $(btn+" .HMZ_nth3").removeClass("light_move_bottom"+n);
    $(btn+" .HMZ_nth4").removeClass("light_move_left"+n);
};
$(function (){
    // if(HMZHMZcanJump){
        var lottery=new Lottery();
        var btn=".box2_b";//郝悦最后的btn
        //获取token
        $(btn).on("touchend",function (){
            //抽奖分享开始
            if(lottery.isWX){
                var shareTxt = {
                    // 分享到朋友圈标题
                    desc:' 听说抢到这份好礼的人，2017年会更好',
                    // 分享给朋友标题
                    otitle:'听说抢到这份好礼的人，2017年会更好',
                    // 分享给朋友描述
                    odesc:'更好2017，从这一份新年大礼开始',
                    // 分享后B用户打开的地址
                    olink:"http://cny.telunsu.net/2017/show.html?media=2",
                    // 分享图片
                    oimgUrl:'http://cny.telunsu.net/2017/img/wxshare.jpg'
                };
                wx.ready(function (){
                    wx.onMenuShareTimeline({
                        title: shareTxt.desc,
                        link:  shareTxt.olink,
                        imgUrl: shareTxt.oimgUrl,
                        success: function () {},
                        cancel: function () {}
                    });
                    wx.onMenuShareAppMessage({
                        title: shareTxt.otitle,
                        desc:  shareTxt.odesc,
                        link: shareTxt.olink,
                        imgUrl: shareTxt.oimgUrl,
                        success: function () {},
                        cancel: function () {}
                    });
                });
            }
            //抽奖分享结束
            // if(!!media){
            //     stm_clicki('send', 'event', '领取页', 'click', '领取');//监测代码
            //     stm_clicki('send', 'pageview', {'page': '/tlsH5/4', 'title': 'submit'});//监测代码虚拟PV
            // }
            // _utaq.push(['trackEvent','btn-4']);//ut,聆听btn
            // _utaq.push(['trackEvent','pv-5']);//ut,page5
            createjs.Sound.stop();
            createjs.Ticker.removeAllEventListeners();
            document.getElementById('video').pause();
            $("#HMZ").addClass("moveIn");
            $('.box2,.main,.box1,.load').delay(200).fadeOut(500);
            setTimeout(function (){
                $("#HMZ_lottery .lottery_list_title").removeClass("hid");
                $("#HMZ_lottery .lottery_list_title").addClass("animated");
                $("#HMZ_lottery .lottery_list_title").addClass("fadeInDown");
                setTimeout(function (){
                    $("#HMZ_lottery .lottery_list_banner").removeClass("hid");
                    $("#HMZ_lottery .lottery_list_banner").addClass("animated");
                    $("#HMZ_lottery .lottery_list_banner").addClass("zoomIn");
                    setTimeout(function (){
                        $("#HMZ_lottery_tel").removeClass("hid");
                        $("#HMZ_lottery_tel").addClass("animated");
                        $("#HMZ_lottery_tel").addClass("fadeIn");
                        $("#HMZ_lottery_ma").removeClass("hid");
                        $("#HMZ_lottery_ma").addClass("animated");
                        $("#HMZ_lottery_ma").addClass("fadeIn");
                        $("#HMZ_lottery_telMa").removeClass("hid");
                        $("#HMZ_lottery_telMa").addClass("animated");
                        $("#HMZ_lottery_telMa").addClass("fadeIn");
                        $("#lottery_submit_btn").removeClass("hid");
                        $("#lottery_submit_btn").addClass("animated");
                        $("#lottery_submit_btn").addClass("fadeIn");
                        lottery.flashBtn("#lottery_submit_btn",1);
                        lottery.flashBtn("#commit_list_btn",1);
                    },400)
                },400);
            },500);
            lottery.getKey(HMZMain);
        });
        if(lottery.isWX){
            lottery.getToken();
        }
        //第一屏
        function HMZMain(){
            if(lottery.isMember){
                $("#HMZ_lottery .commit_list").addClass("hid");
                lottery.createCard();
            }else{
                lottery.getMa("#HMZ_lottery_ma span");
                $('#HMZ_lottery_ma span').on("touchend",function (){
                    // if(lottery.lotteryMaCanClick){
                    //     lottery.getMa("#HMZ_lottery_ma span");
                    // }
                });
                $('#personal_center_ma span').on("touchend",function (){
                    // if(lottery.lotteryMaCanClick){
                    //     lottery.getMa("#personal_center_ma span");
                    // }
                });
                $("#HMZ_lottery_telMa span").on("touchend",function (){
                    // if(lottery.lotteryKEY==""){
                    //     alert("您的网络有点慢，请稍等片刻");
                    // }else{
                    //     if(lottery.lotteryTelMaCanClick){
                    //         lottery.telVerify("#HMZ_lottery_tel input","#HMZ_lottery_tel");
                    //         if(lottery.lotteryTelBool){
                    //             if($("#HMZ_lottery_ma input")[0].value==""){
                    //                 lottery.showError("#HMZ_lottery_ma","请输入正确的验证码")
                    //             }else{
                    //                 lottery.hidError("#HMZ_lottery_ma");
                    //                 lottery.lotteryTelMaCanClick=false;
                    //                 lottery.getTelMa("#HMZ_lottery_tel input","#HMZ_lottery_ma input","#HMZ_lottery_ma")
                    //             }
                    //         }
                    //     }
                    // }
                });
                $("#personal_center_telMa span").on("touchend",function (){
                    // if(lottery.lotteryKEY==""){
                    //     alert("您的网络有点慢，请稍等片刻");
                    // }else{
                    //     if(lottery.lotteryTelMaCanClick){
                    //         lottery.telVerify("#personal_center_tel input","#personal_center_tel");
                    //         if(lottery.lotteryTelBool){
                    //             if($("#personal_center_ma input")[0].value==""){
                    //                 lottery.showError("#personal_center_ma","请输入正确的图形验证码")
                    //             }else{
                    //                 lottery.hidError("#personal_center_ma");
                    //                 lottery.lotteryTelMaCanClick=false;
                    //                 lottery.getTelMa("#personal_center_tel input","#personal_center_ma input","#personal_center_ma")
                    //             }
                    //         }
                    //     }
                    // }
                });
                $("#lottery_submit_btn").on("touchend",function (){
                    // if(!!media){
                    //     stm_clicki('send', 'event', '提交领取页', 'click', '提交');//监测代码
                    //     stm_clicki('send', 'pageview', {'page': '/tlsH5/5', 'title': 'gift'});//监测代码虚拟PV
                    // }
                    // _utaq.push(['trackEvent','btn-6']);//ut检测提交btn
                    lottery.maVerify("#HMZ_lottery_tel input","#HMZ_lottery_ma input","#HMZ_lottery_telMa input","#HMZ_lottery_tel","#HMZ_lottery_telMa")
                });
                $("#commit_list_btn").on("touchend",function (){
                    // if(!!media){
                    //     stm_clicki('send', 'event', '提交领取页', 'click', '提交');//监测代码
                    //     stm_clicki('send', 'pageview', {'page': '/tlsH5/5', 'title': 'gift'});//监测代码虚拟PV
                    // }
                    // _utaq.push(['trackEvent','btn-10']);//ut检测个人中心提交btn
                    lottery.maVerify("#personal_center_tel input","#personal_center_ma input","#personal_center_telMa input","#personal_center_tel","#personal_center_telMa")
                })
            }
            $("#oWSBtn").on("touchend",function (){
                // _utaq.push(['trackEvent','btn-8']);//ut, 成功马上参与
                // _utaq.push(['trackEvent','pv-9']);//ut,page9
                $(".get_prize").addClass("hid");
                $("#DM").removeClass("hid");
                $("#DM").addClass("fadeIn");
                $("#DM").addClass("animated")
            });
            $("#oWRBtn").on("touchend",function (){
                // _utaq.push(['trackEvent','btn-9']);//ut, 失败
                // _utaq.push(['trackEvent','pv-9']);//ut,page9
                $(".get_prize").addClass("hid");
                $("#DM").removeClass("hid");
                $("#DM").addClass("fadeIn");
                $("#DM").addClass("animated")
            });
            $("#iWSBtn").on("touchend",function (){
                // _utaq.push(['trackEvent','btn-8']);//ut, 成功马上参与
                if(lottery.isfocus){
                    location.href="http://weixin.telunsu.net/active/cny/index.html?s=hy";//北广提供的大奖抽奖链接
                }else{
                    //location.href="http://mp.weixin.qq.com/s/SAES7OzBl1dB5UyEnTvagA";//特仑苏关注页面
                    location.href="http://weixin.telunsu.net/active/cny/index.html";//特仑苏关注页面
                }
            });
            $("#iWRBtn").on("touchend",function (){
                // _utaq.push(['trackEvent','btn-9']);//ut, 失败
                if(lottery.isfocus){
                    location.href="http://weixin.telunsu.net/active/cny/index.html?s=hy";//北广提供的大奖抽奖链接
                }else{
                    //location.href="http://mp.weixin.qq.com/s/SAES7OzBl1dB5UyEnTvagA";//特仑苏关注页面
                    location.href="http://weixin.telunsu.net/active/cny/index.html";//特仑苏关注页面
                }
            });
            $("#DMBtn").on("touchend",function (){
                $("#DM").addClass("hid");
                $(".get_prize").removeClass("hid");
            });
            $("#HMZ_personal_center_btn").on("touchend",function (){
                // _utaq.push(['trackEvent','btn-7']);//ut检测，个人中心
                // _utaq.push(['trackEvent','pv-8']);//ut,page8
                lottery.getMa("#personal_center_ma span");
                $("#HMZ_lottery").addClass("hid");
                $("#HMZ_personal_center").addClass("fadeInDown");
                $("#HMZ_personal_center").addClass("animated");
                $("#HMZ_personal_center").removeClass("hid");
            });
            $("#personal_center_btn").on("touchend",function (){
                lottery.getMa("#HMZ_lottery_ma span");
                $("#HMZ_lottery").removeClass("hid");
                $("#HMZ_personal_center").removeClass("fadeInDown");
                $("#HMZ_personal_center").removeClass("animated");
                $("#HMZ_personal_center").addClass("hid");
            });
            $(".personal_center_nav").on("touchend","span",function (e){
                var tag= e.target;
                if(!$(tag).hasClass("active")){
                    var tagI=$(tag).attr("data-i"),
                        lastI=$("#HMZ_personal_center .personal_center_nav .active").attr("data-i");
                    $("#HMZ_personal_center .personal_center_nav .active").removeClass("active");
                    $(tag).addClass("active");
                    $("#HMZ_personal_center .personal_center_main div[data-i="+lastI+"]").addClass("hid");
                    $("#HMZ_personal_center .personal_center_main div[data-i="+tagI+"]").removeClass("hid");
                    if(tagI==1){
                        HMZHMZscrollNum=1.25;
                    }else if(tagI==2){
                        HMZHMZscrollNum=1.18;
                    }
                }
                scroll_int('scroll_part_explain');
                scroll_int('scroll_part_statement');
            });
            $("#nutrition").on("touchend","span.btn",function (e){
                // _utaq.push(['trackEvent','btn-11']);//ut,10元btn
                var tag= e.target;
                if($(tag).attr("data-i")==1){
                    lottery.buyMilk();//蒙牛商城链接
                }
                if($(tag).attr("data-i")==0){
                    if(lottery.isWX){
                        location.href="http://weixin.telunsu.net/active/cny/gift.html?s=hy&giftid="+$(tag).attr("data-id");//领奖信息填写页面
                    }else{
                        alert("进入你的微信，查看获奖情况");
                    }
                }
            });
            $("#HMZ_lottery .get_prize .outWeiXin .success .use a").on("touchend",function (e){
                e.preventDefault();
                e.stopPropagation();
                lottery.buyMilk();//蒙牛商城链接
            });
            $("#bigPrize").on("touchend","span.bigBtn",function (e){
                if(HMZBigBtnCanClick){
                    HMZBigBtnCanClick=false;
                    var tag= e.target;
                    if($(tag).attr("data-i")==0){
                        if(lottery.isWX){
                            HMZBigBtnCanClick=true;
                            location.href="http://weixin.telunsu.net/active/cny/gift.html?s=hy&giftid="+$(tag).attr("data-id");//领奖信息填写页面
                        }else{
                            alert("进入你的微信，查看获奖情况");
                            HMZBigBtnCanClick=true;
                        }
                    }else{
                        alert("请在公众号下查看获奖信息");
                        if($(tag).attr("data-openid")!=null){
                            var o={
                                fn:"sendMSG",
                                giftid:$(tag).attr("data-id"),
                                openid:$(tag).attr("data-openid")
                            };
                            lottery.sendMSG(o)
                        }
                    }
                }
            })
        }
    // }
});
$("input").on("focus",function (){
    var id=$(this).parent().attr("id");
    $("#"+id+" i").addClass("hid");
    $("#landscape").css("display","none");
    $(this).removeClass("HMZ_input_padding_left");
});
$("input").on("blur",function (){
    $("#landscape").css("display","block");
});
$("#HMZ_personal_center")[0].addEventListener("touchmove",function (e){
    e.stopPropagation();
});

