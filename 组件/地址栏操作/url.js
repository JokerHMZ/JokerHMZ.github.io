function getQueryString(name='') {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (!!r) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}

export {
    getQueryString
}