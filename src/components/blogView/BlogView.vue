<template>
    <div class="meteor-blogView-wrapper">
        <section class="blog-content meteor-blogView-markDown">
            <VMdPreview :text="content"/>
        </section>
    </div>
</template>

<script>
    import '@kangc/v-md-editor/lib/style/preview.css';
    import  vmEdit from '@/plugin/vmedit';
    export default {
        name: "BlogView",
        components:{
            VMdPreview:vmEdit.VMdPreview
        },
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
                return this.dataSource.content||'> 文章暂未上传'
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