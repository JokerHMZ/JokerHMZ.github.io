<template>
  <div class="loading">
    <div class="loading-box">
      <div class="loading-img"></div>
      <div class="loading-txt">{{(num/img.length)*100>>0}}%</div>
    </div>
  </div>
</template>

<script>
  import {img} from '../assets/js/img'
  export default {
    name: 'loading',
    data () {
      return {
        num:0,
        img:img
      }
    },
    mounted(){
      this.main();
    },
    methods:{
      loadImg(src){
        return new Promise( (resolve, reject) => {
          let img=new Image();
          img.src=src;
          img.onload=()=>{
            src=null;
            this.num++;
            resolve();
          }
        })
      },
      getImgArr(){
        let arr=[];
        for(var i=0,len=this.img.length;i<len;i++){
          arr.push(this.loadImg(this.img[i]));
        }
        return arr;
      },
      async main(){
        await Promise.all(this.getImgArr());
        // document.getElementById('musicBg').play();
        // document.addEventListener("WeixinJSBridgeReady", ()=>{
        //   document.getElementById('musicBg').play();
        // }, false);
        setTimeout(() =>{
          this.$emit('loading',false);
        },500)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*loading*/
  .loading{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border: #f6e4d0 solid 25px;
    background:#601115;
    box-sizing: border-box;
    z-index: 200;

  }
  .loading-box{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:373px;
    height: 440px;
  }
  .loading-img{
    position: absolute;
    left: 0;
    top:0;
    width:373px;
    height: 360px;
    background: url('../assets/img/loading.png') no-repeat;
  }
  .loading-txt{
    position: absolute;
    left: 0;
    bottom:0;
    width:100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 39px;
    color: #903425;
  }
</style>
