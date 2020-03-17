<template>
    <div>
        FooterBox
    </div>
</template>

<script>
    import nb from '@/lib/util/nb'
    export default {
        name: "FooterBox",
        created(){
            console.log(`#meteor_welcome|${nb('welcome to meteor')}`)
        },
    }
</script>

<style scoped>

</style>