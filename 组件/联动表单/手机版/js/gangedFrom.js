/**
 * Created by he.mingze on 2017/8/9.
 */
//用法,使用时先调用gangedFromByHyLink.init(arr);同时传入数组
    //选择完成时，用gangedFromByHyLink.getData(),获取数据
    //    数组数据格式见data.js
    //css 不可更改部分在style中有标注
var gangedFromByHyLink=(function ($,window){
    var isTouch = "ontouchend" in document ? true : false,
        evStart = isTouch ? 'touchstart' : 'mousedown',
        evMove = isTouch ? 'touchmove' : 'mousemove',
        evEnd = isTouch ? 'touchend' : 'mouseup';
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
    function init(arr){//初始化数据及确定联动级数
        series=$("#ganged_from_byHyLink>div").length;
        if(series!==3){
            throw new Error("ganged_from_byHyLink内div数目不是3个");
        }else{
            if(typeof arr=="string"){
                json=JSON.parse(arr);
            }else{
                json=JSON.parse(JSON.stringify(arr));
            }
            var dom=document.createDocumentFragment(),
                $dom=$(dom);
            for(var i=0,len=json.length;i<len;i++){
                $("<option value='"+json[i].id+"'>"+json[i].name+"</option>").appendTo($dom);
            }
            $("#ganged_from_byHyLink .st1 select").append($dom);
        }
    }
    return {
        init:function (arr){
            init(arr);
            $("#ganged_from_byHyLink .st1 select").on("change", function(){
                $("#ganged_from_byHyLink .st2 select").html('<option value="0">请选择</option>');
                $("#ganged_from_byHyLink .st3 select").html('<option value="0">请选择</option>');
                data[1].name=null;
                data[1].id=0;
                data[2].name=null;
                data[2].id=0;
                $("#ganged_from_byHyLink .st2 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st2 .selected").addClass("hid");
                $("#ganged_from_byHyLink .st3 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st3 .selected").addClass("hid");
                var value=this.value;
                if(value==0){
                    $(this).siblings(".default").removeClass("hid");
                    $(this).siblings(".selected").addClass("hid");
                    data[0].name=null;
                    data[0].id=0;
                }else{
                    if($(this).siblings(".selected").hasClass("hid")){
                        $(this).siblings(".default").addClass("hid");
                        $(this).siblings(".selected").removeClass("hid");
                    }
                    var selected=$(this).children("option:selected"),
                        txt=selected.text();
                    $(this).siblings(".selected").text(txt);
                    data[0].name=txt;
                    data[0].id=$(this).val();
                    index1=selected.index()-1;
                    var dom=document.createDocumentFragment(),
                        $dom=$(dom);
                    for(var i=0,len=json[index1].data.length;i<len;i++){
                        $("<option value='"+json[index1].data[i].id+"'>"+json[index1].data[i].name+"</option>").appendTo($dom);
                    }
                    $("#ganged_from_byHyLink .st2 select").append($dom);
                }
            });
            $("#ganged_from_byHyLink .st2 select").on("change", function(){
                $("#ganged_from_byHyLink .st3 select").html('<option value="0">请选择</option>');
                data[2].name=null;
                data[2].id=0;
                $("#ganged_from_byHyLink .st3 .default").removeClass("hid");
                $("#ganged_from_byHyLink .st3 .selected").addClass("hid");
                var value=this.value;
                if(value==0){
                    $(this).siblings(".default").removeClass("hid");
                    $(this).siblings(".selected").addClass("hid");
                    data[1].name=null;
                    data[1].id=0;
                }else{
                    if($(this).siblings(".selected").hasClass("hid")){
                        $(this).siblings(".default").addClass("hid");
                        $(this).siblings(".selected").removeClass("hid");
                    }
                    var selected=$(this).children("option:selected"),
                        txt=selected.text();
                    $(this).siblings(".selected").text(txt);
                    data[1].name=txt;
                    data[1].id=$(this).val();
                    var index2=selected.index()-1;
                    var dom=document.createDocumentFragment(),
                        $dom=$(dom);
                    for(var i=0,len=json[index1].data[index2].data.length;i<len;i++){
                        $("<option value='"+json[index1].data[index2].data[i].id+"'>"+json[index1].data[index2].data[i].name+"</option>").appendTo($dom);
                    }
                    $("#ganged_from_byHyLink .st3 select").append($dom);
                }
            });
            $("#ganged_from_byHyLink .st3 select").on("change", function(){
                var value=this.value;
                if(value==0){
                    $(this).siblings(".default").removeClass("hid");
                    $(this).siblings(".selected").addClass("hid");
                    data[2].name=null;
                    data[2].id=0;
                }else{
                    if($(this).siblings(".selected").hasClass("hid")){
                        $(this).siblings(".default").addClass("hid");
                        $(this).siblings(".selected").removeClass("hid");
                    }
                    var selected=$(this).children("option:selected"),
                        txt=selected.text();
                    $(this).siblings(".selected").text(txt);
                    data[2].name=txt;
                    data[2].id=$(this).val();
                }
            });
        },
        getData:function (){
            return data;
        }
    }
})(jQuery,window);

