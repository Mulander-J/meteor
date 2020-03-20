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
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods:{
    // ...mapMutations({
    //     'initGlobal':'global/_initGlobal'
    // }),
  }
}
</script>
