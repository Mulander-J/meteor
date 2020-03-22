<template>
  <div id="meteor">
    <!--  页首  -->
    <HeaderBox v-show="$route.name&&('Start'!==$route.name)"/>
    <!--  占位块 -->
    <div v-if="$route.name&&('Start'!==$route.name)" class="meteor-fake-header"></div>
    <!--  路由页  -->
    <router-view/>
    <!--  页脚  -->
    <FooterBox/>
  </div>
</template>

<script>
  import HeaderBox from '@/components/header/HeaderBox'
  import FooterBox from '@/components/footer/FooterBox'
  export default {
    name: "App",
    components:{HeaderBox,FooterBox},
    created(){
      //  初始化时间|位置|天气
      this.$store.dispatch('global/action_initGlobal',{vm:this})
    }
  }
</script>

<style lang="less">
</style>
