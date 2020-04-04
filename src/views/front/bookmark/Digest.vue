<template>
    <section class="meteor-link-wrapper">
        <h1 id="Devil_lived" class="meteor-txtGradient">
            <a href="#Devil_lived" aria-hidden="true" class="meteor-header-anchor">#</a>
            <span>Digest</span>
        </h1>
        <blockquote>共:{{virList.length}}条 | 无可奈何花落去，似曾相识燕归来</blockquote>
        <div class="meteor-link-content">
            <transition-group name="el-fade-in-linear">
                <h2 v-for="(groupItem,grNo) in virList" :key="grNo">
                    <span class="meteor-header-anchor" style="float: none">#</span>
                    <a :href="groupItem.link" target="_blank">No{{grNo}}.{{groupItem.name}}</a>
                    <i v-if="groupItem.digested" class="el-icon-circle-check" style="color: #3eaf7c;margin-left: .4rem"></i>
                </h2>
            </transition-group>
        </div>
    </section>
</template>

<script>
    import mixins from './mixin'
    export default {
        name: "Digest",
        mixins:[mixins],
        computed:{
          virList(){
              let res = [];
              if(this.list_data.length>0){
                  this.list_data.forEach(ele=>{
                      res = res.concat(ele.group)
                  })
              }
              return res
          }
        },
        data(){
            return {
                type:'Digest'
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-link-wrapper{
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .meteor-link-content{
            position: relative;
            z-index: 90;
            width: 60%;
            margin: 1rem auto;
        }
    }
</style>