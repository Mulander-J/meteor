<template>
  <div class="meteor-home-wrapper">
    <div>横批
      <p>上善若水</p>
    </div>
    <div>上联
      <p>呜呜呜上下求索</p>
    </div>
    <div>下联
      <p>吨吨吨左右横跳</p>
    </div>
    <div>大堂
      <p>奇怪的知识增加了</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        isShow:false
      }
    },
    methods:{
      // ...mapMutations({
      //     'initGlobal':'global/_initGlobal'
      // }),
  }
}
</script>
<style scoped lang="less">
  .meteor-home-wrapper{
    padding: 2rem;
  }
</style>