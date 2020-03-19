<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/image/logo.gif">
    <div>
      <router-link to="/link">Link</router-link> |
      <router-link to="/tool">Tool</router-link> |
      <router-link to="/">Start</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/blog">Blog</router-link>
    </div>
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
