<template>
    <section class="meteor-link-wrapper">
        <h1 id="Devil_lived" class="meteor-txtGradient">
            <a href="#Devil_lived" aria-hidden="true" class="meteor-header-anchor">#</a>
            <span>Devil_lived</span>
        </h1>
        <blockquote>最后更新:{{$conf.bookmark.lastUpdate}}</blockquote>
        <blockquote>HP-1&MP+1</blockquote>
        <LinkRow :linkData="list_data" groupKey="cats"/>
    </section>
</template>

<script>
    import mixins from './mixin'
    export default {
        name: "Devil",
        mixins:[mixins],
        data(){
            return {
                type:'Devil'
            }
        }
    }
</script>

<style scoped>
    .meteor-link-wrapper{
        padding: 2rem;
    }
</style>