<template>
  <div id="app">
    <router-view/>
    <FooterBox/>
  </div>
</template>

<script>
  import FooterBox from '@/components/footer/FooterBox'
  export default {
    name: "App",
    components:{FooterBox},
    created(){
      //  初始化时间|位置|天气
      this.$store.dispatch('global/action_initGlobal',{vm:this})
    }
  }
</script>

<style lang="less">
</style>
