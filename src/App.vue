<template>
  <div id="meteor">
    <!--  路由页  -->
    <router-view/>
    <!--  页脚  -->
    <FooterBox/>
  </div>
</template>

<script>
  import FooterBox from '@/components/layout/footer/FooterBox'
  export default {
    name: "App",
    components:{FooterBox},
    created(){
      //  初始化时间|位置|天气
      this.$store.dispatch('global/action_initGlobal',{vm:this})
    }
  }
</script>

<style scoped>
</style>
