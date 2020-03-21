<template>
    <div class="meteor-link-wrapper">
        <div class="meteor-fake-header"></div>
        <LinkRow  title="Wiki1001" :linkData="markItem"/>
    </div>
</template>

<script>
    import LinkRow from '@/components/linkRow/LinkRow'
    import linkData from './../../../../explain/data/link'


    export default {
        name: "BookMark",
        components:{LinkRow},
        computed:{
            markItem(){
                return linkData[this.$route.name]
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-link-wrapper{
        padding: 2rem;
    }
</style>