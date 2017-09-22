/**
 * Created by he.mingze on 2017/9/22.
 */
var rp = require('request-promise');
class indexModel{
    constructor(ctx){
        this.ctx=ctx;
    }
    updateNum(){
        var option={
            method:"GET",
            url:'http://127.0.0.1:8000/yideng_phpserver/yideng2/main.php'
        };
        return new Promise ((resolve,reject)=>{
            rp(option).then(function (result){
                var info=JSON.parse(result);
                if(info){
                    resolve({data:info});
                }else{
                    reject({})
                }
            })
        })
    }
}