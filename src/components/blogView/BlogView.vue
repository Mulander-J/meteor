<template>
    <div class="meteor-blogView-wrapper">
        <section class="blog-content markdown-body meteor-blog-wrapper" v-html="content"></section>
    </div>
</template>

<script>
    import "mavon-editor/dist/markdown/github-markdown.min.css"
    export default {
        name: "BlogView",
        props:{
          dataSource:{
              type:Object,
              default:()=>{
                  return {
                      content:''
                  }
              }
          }
        },
        computed:{
            content(){
                return this.$markDown.render(this.dataSource.content||'> 文章暂未上传')
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-blogView-wrapper{
        .blog-content{
            width: 80%;
            margin: 1rem auto;
        }
    }
</style>