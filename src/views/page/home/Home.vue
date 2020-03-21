<template>
  <div class="home">
    <div>
      <router-link to="/link">Link</router-link> |
      <router-link to="/tool">Tool</router-link> |
      <router-link to="/">Start</router-link> |
      <router-link to="/blog">Blog</router-link>
    </div>
    <div>横批</div>
    <div>上联</div>
    <div>下联</div>
    <div>大堂</div>
    <button @click="isShow=!isShow">modal</button>
    <Modal v-model="isShow"></Modal>
    <button @click="showModal">modal2</button>
  </div>
</template>

<script>
  import Modal from '@/components/dialog/sao-dialog'
  export default {
    name: 'Home',
    components:{Modal},
    data(){
      return {
        isShow:false
      }
    },
    methods:{
      // ...mapMutations({
      //     'initGlobal':'global/_initGlobal'
      // }),
      showModal(){
        this.saoDialog.open();
      }
  }
}
</script>
