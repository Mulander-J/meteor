<template>
    <section class="meteor-link-wrapper">
        <LinkRow  :linkData="markItem"/>
    </section>
</template>

<script>
    import LinkRow from '@/components/linkRow/LinkRow'
    import linkData from '../../../../service/cache/link'

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