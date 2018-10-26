var main=(function () {
    var isTouch = "ontouchend" in document ? true : false,
        evStart = isTouch ? 'touchstart' : 'mousedown',
        evMove = isTouch ? 'touchmove' : 'mousemove',
        evEnd = isTouch ? 'touchend' : 'mouseup';

    function ltIE9() {
        if(
            (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0")||
            (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
        ){
            return true
        }
        return false
    }

    //轮播
    var speed=300,autoplayDisableOnInteractioner=false,autoplayTime=3000,canCssWidthAndHeight=true,canCalculateHeight=false;
    if(ltIE9()) {
        speed=5000;//ie9
        autoplayDisableOnInteractioner=true;
        autoplayTime=0;
        canCssWidthAndHeight=false;
        canCalculateHeight=true;
    }
    var bannerSwiper = new Swiper('#banner', {
        autoplay: autoplayTime,//可选选项，自动滑动
        loop : true,
        speed:speed,
        autoplayDisableOnInteraction : autoplayDisableOnInteractioner,
        paginationClickable :true,
        cssWidthAndHeight : canCssWidthAndHeight,
        calculateHeight:canCalculateHeight,
        updateOnImagesReady:true,
        resizeReInit : true,
        roundLengths : true,
        onSlideChangeEnd: function(swiper){
            var index=swiper.activeIndex>=6?'01':
                            swiper.activeIndex<=0?'05':
                                ('0'+swiper.activeIndex)
            $("#banner-swiper-index").text(index)
        }
    });
    if(ltIE9()){
        setInterval(function (){
            bannerSwiper.swipeNext();
        },5000)
    }

    var studentSwiper = new Swiper('#student', {
        autoplay: autoplayTime,//可选选项，自动滑动
        loop : true,
        speed:speed,
        autoplayDisableOnInteraction : autoplayDisableOnInteractioner,
        paginationClickable :true,
        cssWidthAndHeight : canCssWidthAndHeight,
        calculateHeight:canCalculateHeight,
        updateOnImagesReady:true,
        resizeReInit : true,
        roundLengths : true,
        onSlideChangeEnd: function(swiper){
            var index=swiper.activeIndex>=6?'01':
                swiper.activeIndex<=0?'05':
                    ('0'+swiper.activeIndex)
            $("#student-swiper-index").text(index)
        }
    });
    if(ltIE9()){
        setInterval(function (){
            studentSwiper.swipeNext();
        },5000)
    }

    return {
        init:function () {
            //轮播控制
            $('.banner_prev').on(evEnd,function (e){
                e.preventDefault();
                bannerSwiper.swipePrev();
            });
            $('.banner_next').on(evEnd,function (e){
                e.preventDefault();
                bannerSwiper.swipeNext();
            });
            $('.student_prev').on(evEnd,function (e){
                e.preventDefault();
                studentSwiper.swipePrev();
            });
            $('.student_next').on(evEnd,function (e){
                e.preventDefault();
                studentSwiper.swipeNext();
            });
        }
    }
})()
main.init()