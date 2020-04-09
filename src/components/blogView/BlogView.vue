<template>
    <section class="meteor-blog-wrapper">
        <div v-html="content"></div>
    </section>
</template>

<script>
    export default {
        name: "BlogView",
        data(){
            return {
                content:''
            }
        },
        mounted(){
          this._initBlog()
        },
        methods:{
            _initBlog(){
                this.content = this.$markDown.render('1231\n' +
                    '~~阿萨大~~\n' +
                    '# 一级标题\n' +
                    '## 二级标题\n' +
                    '**粗体**\n' +
                    '*斜体*\n' +
                    '~~中划线~~\n' +
                    '++下划线++\n' +
                    '==标记==\n' +
                    '^上角标^~下角标~\n' +
                    '1. 321\n' +
                    '2. 321\n' +
                    '3. 131\n' +
                    '4. 313\n' +
                    '```javascript\n' +
                    'let a = 35\n' +
                    '```')
            }
        }
    }
</script>

<style scoped>

</style>