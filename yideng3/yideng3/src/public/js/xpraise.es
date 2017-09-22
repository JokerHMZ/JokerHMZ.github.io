/**
 * Created by he.mingze on 2017/9/20.
 */
var jQuery=require('./jquery.js'),
    xtag=require('./xtagcore.js'),
    $ = jQuery;
xtag.register('x-praise', {
    lifecycle: {
        created: function(){
            var num=+$(this).attr('data-max');
            this.createDom();
            $(this).thumbLike(num);
        }
    },
    methods: {
        createDom:function (){
            this.innerHTML =
                '<div class="praise" >'+
                    '<div class="arm"></div>'+
                    '<div class="finger-connect-1"></div>'+
                    '<div class="finger-1st on">'+
                        '<div class="finger-shadow"></div>'+
                    '</div>'+
                    '<div class="finger-connect-2"></div>'+
                    '<div class="arm-bottom"></div>'+
                    '<div class="arm-middle"></div>'+
                    '<div class="finger-2st"></div>'+
                    '<div class="finger-3st"></div>'+
                    '<div class="finger-4st"></div>'+
                    '<div class="finger-5st"></div>'+
                    '<span class="add-one">+1</span>'+
                '</div>'
            ;
        }
    }
});