<template>
    <section>
        <p v-for="(v,k,n) in $conf.userInfo" :key="n">{{k}}:{{v}}</p>
    </section>
</template>

<script>
    export default {
        name: "userInfo"
    }
</script>

<style scoped>

</style>