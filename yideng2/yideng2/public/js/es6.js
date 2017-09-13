/**
 * Created by he.mingze on 2017/8/21.
 */
"use strict";
var dianZan=(function (window,$){
    var animtaionEnd = [
        'webkitAnimationEnd',
        'mozAnimationEnd',
        'MSAnimationEnd',
        'oanimationend',
        'animationend'
    ].join(' ');
    class PraiseButton{
        constructor(dom){
            this.count=0;
            this.canClick=true;
            this.dom=dom;
            this.createDom();
        }
        createDom(){
            let dom=document.createDocumentFragment();
            $(`
                    <div class="praise">
                        <div class="arm"></div>
                        <div class="finger-connect-1"></div>
                        <div class="finger-1st on">
                            <div class="finger-shadow"></div>
                        </div>
                        <div class="finger-connect-2"></div>
                        <div class="arm-bottom"></div>
                        <div class="arm-middle"></div>
                        <div class="finger-2st"></div>
                        <div class="finger-3st"></div>
                        <div class="finger-4st"></div>
                        <div class="finger-5st"></div>
                        <span class="add-one">+1</span>
                    </div>
                `).appendTo(dom);
            this.dom.append(dom);
        }
        stopZan(){
            this.canClick=false;
            this.dom.children(".praise").find("div").css({
                "background":"#ddd",
                "border":"1px #ddd solid"
            });
            this.dom.children(".praise").children(".finger-1st").removeClass("on");
            this.dom.children(".praise").children(".finger-1st").addClass("off");
        }
        continueZan(foo=null){
            this.canClick=false;
            let turnCan=()=>{this.canClick=true},
                finish=()=>{
                axios.post('/receive',
                    {
                        id:"1"
                    }
                ).then(function (data) {
                    data.data>0&&turnCan();
                    foo!=null&&foo();
                })
            };
            this.dom.children(".praise").children(".add-one").addClass("show").on(animtaionEnd, function (){
                $(this).removeClass("show");
                finish();
                $(this).off();
            });
        }
    }
    class Thumb extends PraiseButton{
        tag(final){
            let continueZan=this.continueZan.bind(this),
                stopZan=this.stopZan.bind(this);
            if(this.count<final){
                continueZan();
            }else{
                continueZan(stopZan);
            }
        }
        addOne(num){
            return ++num
        }
    }
    return{
        thumbLike:function (clickTime){
            if(typeof clickTime!="number"){
                throw new Error("点赞次数需要是一个整数");
            }
            if(clickTime>>0<=0){
                throw new Error("点赞次数不能小于1次");
            }
            let zan=new Thumb(this);
            this.on("click",function (){
                if(zan.canClick){
                    zan.count=zan.addOne(zan.count);
                    zan.tag(clickTime);
                }
            })
        },
        addOne:function (num){
            let dom=$("#container"),
                zan=new Thumb(dom);
            return zan.addOne(num);
        }
    }
})(window,jQuery);
$.fn.extend(dianZan);