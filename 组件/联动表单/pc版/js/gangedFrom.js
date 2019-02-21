/**
 * Created by he.mingze on 2017/8/9.
 */
//用法,使用时先调用gangedFromByHyLink.init(arr,direction);同时传入数组(arr部分)，
// 还要传入"up"or"down"(direction部分)，
// "up"代表下拉框向上打开，"down"代表代表下拉框向下打开
//选择完成时，用gangedFromByHyLink.getData(),获取数据
    //    数组数据格式见data.js
    //css 不可更改部分在style中有标注
var gangedFromByHyLink=(function ($,window){
    var isTouch = "ontouchend" in document ? true : false,
        evStart = isTouch ? 'touchstart' : 'mousedown',
        evMove = isTouch ? 'touchmove' : 'mousemove',
        evEnd = isTouch ? 'touchend' : 'mouseup';
    var pullDownHeight=parseFloat($(".pull_down").css("max-height")),
        listHeight, iconHeight=0,listTranslateY=0;
    var json=[], //初始化数据之后的数组
        series=0,//联动表单级数
        index1,index2,index3,
        data=[
            {
                name:null,
                id:0
            },
            {
                name:null,
                id:0
            },
            {
                name:null,
                id:0
            }
        ];
    function init(arr,direction){//初始化数据及确定联动级数
        series=$("#ganged_from_byHyLink>div").length;
        if(typeof direction=="string"){
            $("#ganged_from_byHyLink .pull_down").addClass(direction);
        }else{
            throw new Error("direction需要是一个字符串");
        }
        if(series!==3){
            throw new Error("ganged_from_byHyLink内div数目不是3个");
        }else{
            $("#ganged_from_byHyLink .pull_down").slideUp(0);
            $('<div class="pull_down_item" data-id="0">请选择</div>').appendTo($("#ganged_from_byHyLink .pull_down_list"));
            if(typeof arr=="string"){
                json=JSON.parse(arr);
            }else{
                json=JSON.parse(JSON.stringify(arr));
            }
            var dom=document.createDocumentFragment(),
                $dom=$(dom);
            for(var i=0,len=json.length;i<len;i++){
                $("<div class='pull_down_item' data-id='"+json[i].id+"'>"+json[i].name+"</div>").appendTo($dom);
            }
            $("#ganged_from_byHyLink .st1 .pull_down_list").append($dom);
            isNeedScroll(".st1");
        }
    }
    function isNeedScroll(st){//需要传入第几个列表的class
        var list=$("#ganged_from_byHyLink "+st+" .pull_down_list"),
            bar=list.siblings(".pull_down_scroll_bar"),
            itemHeight=$("#ganged_from_byHyLink "+st+" .pull_down_item").height();
        listHeight=(list.children().length)*itemHeight;
        if(listHeight>pullDownHeight){
            iconHeight=(pullDownHeight*pullDownHeight)/listHeight;
            bar.children(".pull_down_scroll_icon").height(iconHeight);
            bar.addClass("show")
        }else{
            bar.removeClass("show")
        }
    }
    return {
        init:function (arr,direction){
            init(arr,direction);
            $(document).on("click",function (){
                $("#ganged_from_byHyLink .has_pull_down").removeClass("has_pull_down");
                $("#ganged_from_byHyLink .pull_down").slideUp(200);
            });
            $("#ganged_from_byHyLink .select_box").on("click",function (e){
                e.stopPropagation();
                if(!$(this).children(".content").hasClass("has_pull_down")){
                    $("#ganged_from_byHyLink .has_pull_down").removeClass("has_pull_down");
                    $(this).children(".content").addClass("has_pull_down");
                    $("#ganged_from_byHyLink .pull_down").slideUp(200);
                    $(this).siblings(".pull_down").slideDown(200);
                }else{
                    $(this).children(".content").removeClass("has_pull_down");
                    $(this).siblings(".pull_down").slideUp(200);
                }
            });
            $("#ganged_from_byHyLink .st1 .pull_down_item").on("click", function(e){
                e.stopPropagation();
                $(this).parent().parent().slideUp(200);
                $(this).parent().parent().siblings(".select_box").children(".content").removeClass("has_pull_down");
                $("#ganged_from_byHyLink .st2 .pull_down_list").html('<div class="pull_down_item" data-id="0">请选择</div>');
                $("#ganged_from_byHyLink .st3 .pull_down_list").html('<div class="pull_down_item" data-id="0">请选择</div>');
                data[1].name=null;
                data[1].id=0;
                data[2].name=null;
                data[2].id=0;
                $("#ganged_from_byHyLink .st2 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st2 .selected").addClass("hid");
                $("#ganged_from_byHyLink .st3 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st3 .selected").addClass("hid");
                var value=+$(this).attr("data-id");
                var showBox=$(this).parent().parent().siblings(".select_box").children(".content");
                if(value==0){
                    showBox.children(".default").removeClass("hid");
                    showBox.children(".selected").addClass("hid");
                    data[0].name=null;
                    data[0].id=0;
                }else{
                    if(showBox.children(".selected").hasClass("hid")){
                        showBox.children(".default").addClass("hid");
                        showBox.children(".selected").removeClass("hid");
                    }
                    var txt=$(this).text();
                    showBox.children(".selected").text(txt);
                    data[0].name=txt;
                    data[0].id=$(this).attr("data-id");
                    index1=$(this).index()-1;
                    var dom=document.createDocumentFragment(),
                        $dom=$(dom);
                    for(var i=0,len=json[index1].data.length;i<len;i++){
                        $("<div class='pull_down_item' data-id='"+json[index1].data[i].id+"'>"+json[index1].data[i].name+"</div>").appendTo($dom);
                    }
                    $("#ganged_from_byHyLink .st2 .pull_down_list").append($dom);
                    isNeedScroll(".st2");
                }
            });
            $("#ganged_from_container").on("click","#ganged_from_byHyLink .st2 .pull_down_item", function(e){
                e.stopPropagation();
                $(this).parent().parent().slideUp(200);
                $(this).parent().parent().siblings(".select_box").children(".content").removeClass("has_pull_down");
                $("#ganged_from_byHyLink .st3 .pull_down_list").html('<div class="pull_down_item" data-id="0">请选择</div>');
                data[2].name=null;
                data[2].id=0;
                $("#ganged_from_byHyLink .st3 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st3 .selected").addClass("hid");
                var value=+$(this).attr("data-id");
                var showBox=$(this).parent().parent().siblings(".select_box").children(".content");
                if(value==0){
                    showBox.children(".default").removeClass("hid");
                    showBox.children(".selected").addClass("hid");
                    data[0].name=null;
                    data[0].id=0;
                }else{
                    if(showBox.children(".selected").hasClass("hid")){
                        showBox.children(".default").addClass("hid");
                        showBox.children(".selected").removeClass("hid");
                    }
                    var txt=$(this).text();
                    showBox.children(".selected").text(txt);
                    data[1].name=txt;
                    data[1].id=$(this).attr("data-id");
                    index2=$(this).index()-1;
                    var dom=document.createDocumentFragment(),
                        $dom=$(dom);
                    for(var i=0,len=json[index1].data[index2].data.length;i<len;i++){
                        $("<div class='pull_down_item' data-id='"+json[index1].data[index2].data[i].id+"'>"+json[index1].data[index2].data[i].name+"</div>").appendTo($dom);
                    }
                    $("#ganged_from_byHyLink .st3 .pull_down_list").append($dom);
                    isNeedScroll(".st3");
                }
            });
            $("#ganged_from_container").on("click","#ganged_from_byHyLink .st3 .pull_down_item", function(e){
                e.stopPropagation();
                $(this).parent().parent().slideUp(200);
                $(this).parent().parent().siblings(".select_box").children(".content").removeClass("has_pull_down");
                var value=+$(this).attr("data-id");
                var showBox=$(this).parent().parent().siblings(".select_box").children(".content");
                if(value==0){
                    showBox.children(".default").removeClass("hid");
                    showBox.children(".selected").addClass("hid");
                    data[2].name=null;
                    data[2].id=0;
                }else{
                    if(showBox.children(".selected").hasClass("hid")){
                        showBox.children(".default").addClass("hid");
                        showBox.children(".selected").removeClass("hid");
                    }
                    var txt=$(this).text();
                    showBox.children(".selected").text(txt);
                    data[2].name=txt;
                    data[2].id=$(this).attr("data-id");
                }
            });
            $("#ganged_from_container .pull_down_scroll_icon").on("mousedown",function (e){
                e.stopPropagation();
                var oddPositionY=e.pageY;
                $("#ganged_from_container .pull_down_scroll_icon").on("mousemove",function (e){
                    var differ=e.pageY-oddPositionY;
                    var top=parseFloat($(this).css("top"));
                    if(differ>0){
                        if((top+iconHeight)>=pullDownHeight){
                            differ=0;
                        }
                    }else if(differ<0){
                        if(top<=0){
                            differ=0;
                        }
                    }
                    oddPositionY=e.pageY;
                    listTranslateY-=differ*listHeight/pullDownHeight;
                    $(this).css("top",top+differ+"px");
                    $(this).parent().siblings(".pull_down_list").css("transform","translateY("+listTranslateY+"px)")
                                                                                .css("-webkit-transform","translateY("+listTranslateY+"px)")
                                                                                .css("-ms-transform","translateY("+listTranslateY+"px)")
                                                                                .css("-moz-transform","translateY("+listTranslateY+"px)");
                });
                $("#ganged_from_container .pull_down_scroll_icon").on("mouseup",function (){
                    $("#ganged_from_container .pull_down_scroll_icon").off("mousemove");
                });
                $("#ganged_from_container .pull_down_scroll_icon").on("mouseleave",function (){
                    $("#ganged_from_container .pull_down_scroll_icon").off("mousemove");
                })
            });
            $(".pull_down").on("mousewheel DOMMouseScroll", function (e) {
                e.stopPropagation();
                var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
                var differ=-10*delta/3;
                var top=parseFloat($(this).children(".pull_down_scroll_bar").children(".pull_down_scroll_icon").css("top"));
                if(differ>0){
                    if((top+iconHeight)>=pullDownHeight){
                        differ=0;
                    }
                }else if(differ<0){
                    if(top<=0){
                        differ=0;
                    }
                }
                listTranslateY-=differ*listHeight/pullDownHeight;
                $(this).children(".pull_down_scroll_bar").children(".pull_down_scroll_icon").css("top",top+differ+"px");
                $(this).children(".pull_down_list").css("transform","translateY("+listTranslateY+"px)")
                    .css("-webkit-transform","translateY("+listTranslateY+"px)")
                    .css("-ms-transform","translateY("+listTranslateY+"px)")
                    .css("-moz-transform","translateY("+listTranslateY+"px)");
            });
        },
        getData:function (){
            return data;
        }
    }
})(jQuery,window);


