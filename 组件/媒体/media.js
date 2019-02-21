//微信自动播放
function loadMedia(mediaId='') {
    var media=document.getElementById(mediaId);
    media.play();
    media.pause();
    document.addEventListener("WeixinJSBridgeReady", function(){
        media.play();
        media.pause();
        media=null;
    }, false);
}

//视频全屏播放，退出全屏时的检测
function exitFullscreenAsync(
    isAndroid=true,
    videoParentId='',
    videoControlId='',
    videoSrc='',
    showVideo=function () {},
    hideVideo=function () {}
) {
    var videoParent=document.getElementById(videoParentId);
    var iosRafNeed=true;
    var needAndroidControl=true;
    var needGoOn=true;

    if(isAndroid){
        videoParent.innerHTML=`<video style="background: black;width: 100%;" controls id="myVideo" class="hide" x5-video-player-fullscreen="true"  x5-video-player-type="h5" x5-playsinline="true" webkit-playsinline="true" playsinline="true"><source  src="${videoSrc}" type="video/mp4"></video>`;
    }else{
        videoParent.innerHTML=`<video id="myVideo" style="opacity: 0" class="hide" x5-video-player-fullscreen="true" width="1" height="1" controls><source  src="${videoSrc}" type="video/mp4"></video>`
    }
    var videoBox=document.getElementById('#myVideo');

    return new Promise((resolve, reject) => {
        var videoControl=document.getElementById(videoControlId);
        var resizeFun=null;
        var pauseFun=null;
        var endFun=null;

        function finish() {
            videoBox.off('pause',pauseFun);
            if(isAndroid){
                $(window).off('resize',resizeFun);
            }else{
                videoBox.off('ended',endFun);
            }
            hideVideo!==undefined&&hideVideo();
            if(needGoOn){
                needGoOn=false;
                resolve()
            }
        }
        videoControl.addEventListener('click',function () {
            videoBox.play();
            showVideo!==undefined&&showVideo();
            if(isAndroid){
                needAndroidControl=true;
                resizeFun=function () {
                    finish();
                };
                pauseFun=function () {
                    if(this.ended===true){
                        needAndroidControl=false;
                        finish()
                    }
                    if(needAndroidControl){
                        needAndroidControl=false;
                        window.addEventListener('resize',resizeFun)
                    }
                };
                videoBox.addEventListener('pause',pauseFun);
            }else{
                iosRafNeed=true;
                endFun=function () {
                    videoBox.webkitExitFullScreen()
                };
                pauseFun=function () {
                    if(iosRafNeed){
                        iosRafNeed=false;
                        function isExitFullscreen() {
                            window.requestAnimationFrame(function () {
                                if(!videoBox.webkitDisplayingFullscreen){
                                    finish()
                                }else{
                                    isExitFullscreen()
                                }
                            })
                        }
                        isExitFullscreen()
                    }
                };
                videoBox.addEventListener('ended',endFun);
                videoBox.addEventListener('pause',pauseFun)
            }
        });
    })
}

export {
    loadMedia,
    exitFullscreenAsync
}
