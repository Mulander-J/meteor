<template>
    <section class="meteor-link-wrapper">
        <h1 id="Wiki_1001" class="meteor-txtGradient">
            <a href="#Wiki_1001" aria-hidden="true" class="meteor-header-anchor">#</a>
            <span>Wiki_1001</span>
        </h1>
        <blockquote>最后更新:{{$conf.bookmark.lastUpdate}}</blockquote>
        <blockquote>奇怪的知识增加了</blockquote>
        <LinkRow :linkData="list_data" groupKey="cats"/>
    </section>
</template>

<script>
    import mixins from './mixin'
    export default {
        name: "Daily",
        mixins:[mixins],
        data(){
            return {
                type:'Daily'
            }
        }
    }
</script>

<style scoped>
    .meteor-link-wrapper{
        padding: 2rem;
    }
</style>