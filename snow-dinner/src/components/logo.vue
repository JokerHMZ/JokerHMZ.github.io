<template>
  <div class="logo">
    <audio @playing="musicPlaying" @pause="musicPaused" id="musicBg" :src="musicSrc" autoplay loop></audio>
    <div class="logo-box fl"></div>
    <div class="sound fr" @click="music();_hmt.push(['_trackEvent', 'click', 'music']);" :class="{musicOn:musicOnClass}"></div>
  </div>
</template>

<script>
export default {
  name: 'logo',
  data () {
    return {
      _hmt:[],
      musicState:0,
      musicSrc:require('../assets/media/bg.mp3')
    }
  },
  computed:{
    musicDom(){
      return document.getElementById('musicBg')
    },
    musicOnClass(){
      return this.musicState==0?false:true
    }
  },
  mounted(){
    this._hmt=_hmt;
    this.loadMedia();
  },
  methods:{
    musicPlaying(){
      this.musicState=1
    },
    musicPaused(){
      this.musicState=0
    },
    loadMedia() {
      this.musicDom.play();
      this.musicDom.pause();
      document.addEventListener("WeixinJSBridgeReady", ()=>{
        this.musicDom.play();
        this.musicDom.pause();
      }, false);
    },
    music(){
      if(this.musicState==0){
        this.musicDom.play()
      }else{
        this.musicDom.pause()
      }
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo{
    margin: 40px 40px 0;
    overflow: hidden;
    position: relative;
    z-index: 60;
  }
  .logo-box{
    width: 305px;
    height: 46px;
    background: url('../assets/img/logo.png') no-repeat;
  }
  .sound{
    width: 45px;
    height: 49px;
    background: url('../assets/img/sound.png') no-repeat center left;
  }
  .musicOn{
    background: url('../assets/img/sound2.png') no-repeat center left;
  }
</style>
