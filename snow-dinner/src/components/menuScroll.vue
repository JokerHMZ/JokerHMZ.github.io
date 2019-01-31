<template>
  <div class="headScroll">
    <div class="iScrollVerticalScrollbarTop"></div>
    <div class="iScrollVerticalScrollbarBottom"></div>
  </div>
</template>

<script>
export default {
  name: 'headScroll'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .iScrollVerticalScrollbarTop,.iScrollVerticalScrollbarBottom{
    position: absolute;
    width: 28px;
    height: 20px;
    right: 0;
  }
  .iScrollVerticalScrollbarTop{
    top: -80px;
    background:url("../assets/img/scroll-bar.png") no-repeat top center;
  }
  .iScrollVerticalScrollbarBottom{
    top:487px;
    background:url("../assets/img/scroll-bar.png") no-repeat bottom center;
  }
</style>
<style>
  .menu .iScrollVerticalScrollbar {
    position: absolute;
    z-index:30;
    width: 28px;
    height: 548px;
    top: -60px;
    right: 0;
    background:url("../assets/img/scroll-bar.png") no-repeat center;
    border-radius: 5px;
  }
  .menu .iScrollIndicator {
    position: absolute;
    width: 28px; height: 147px;
    background: #f5d8ae;
    border-radius:4px;
  }
</style>
