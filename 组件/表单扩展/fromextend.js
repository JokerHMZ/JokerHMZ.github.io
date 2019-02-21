//手机端虚拟键盘放下时触发callback
function inputAsync(
    inputDom,
    isAndroid=true,
    callback=function (resolve) {resolve()},
    noLandscape=function () {/*关闭横屏提示*/},
    openLandscape=function () {/*打开横屏提示*/},
) {
    return new Promise((resolve, reject) => {
        if(isAndroid){
            var canResize=true;
            inputDom.addEventListener('focus',function () {
                noLandscape!==undefined&&noLandscape()
            });
            inputDom.addEventListener('input',function () {
                if(canResize){
                    canResize=false;
                    window.addEventListener('resize',keyboardWatch);
                    function keyboardWatch() {
                        window.removeEventListener('resize',keyboardWatch);
                        canResize=true;
                        callback(resolve);
                        openLandscape!==undefined&&openLandscape()
                    }
                }
            })
        }else{
            inputDom.addEventListener('blur',function () {
                callback(resolve);
                $(window).scrollTop(0);
            });
        }
    })
}

export {
    inputAsync
}