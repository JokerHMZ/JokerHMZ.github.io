var socket = io.connect('http://10.10.10.171:3000/');


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function addDom(data) {
    var strA='',
        strB='';
    for(var i=0;i<data[0].length;i++){
        strA+='<li>'+data[0][i]+'</li>'
    }
    for(var i=0;i<data[1].length;i++){
        strB+='<li>'+data[1][i]+'</li>'
    }
    $('#groupA')[0].innerHTML=strA;
    $('#groupB')[0].innerHTML=strB;
}


$(function () {
    if(!getCookie('group')){
        $('.name-box').removeClass('hide');
    }
    $('#findBtn').on('click',function () {
       var txt=$('#inputName')[0].value.trim();
       if(txt!==''){
           socket.send(txt);
           setCookie('group','yes',0.5);
           $('.name-box').addClass('hide');
       }else{
           alert('不写昵称，谁知道你tm是谁！')
       }
    });
    socket.on('open',function (data) {
        addDom(data);
    });
    socket.on('message',function (data) {
        addDom(data);
        if(data[2]==='人满了'){
            alert(data[2]);
        }
    });
});