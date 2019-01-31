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
    right: 17px;
  }
  .iScrollVerticalScrollbarTop{
    top: 213px;
    background:url("../assets/img/scroll-bar.png") no-repeat top center;
  }
  .iScrollVerticalScrollbarBottom{
    top:780px;
    background:url("../assets/img/scroll-bar.png") no-repeat bottom center;
  }
</style>
<style>
  .family .iScrollVerticalScrollbar {
    position: absolute;
    z-index:30;
    width: 28px;
    height: 548px;
    top: 233px;
    right: 17px;
    background:url("../assets/img/scroll-bar.png") no-repeat center;
    border-radius: 5px;
  }
  .family .iScrollIndicator {
    position: absolute;
    width: 28px; height: 274px;
    background: #f5d8ae;
    border-radius:4px;
  }
</style>
