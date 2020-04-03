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
        data(){
          return{
              list_data:[]
          }
        },
        computed:{
            markItem(){
                return linkData[this.$route.name]
            }
        },
        mounted(){
          this._getBookmarkList();
        },
        methods:{
            _getBookmarkList(){
                let THAT = this;
                this.$api.bookmark.list().then(res=>{
                    let {success,list,msg} = res.data;
                    if(success){
                        THAT.list_data = list
                    }else {
                        THAT.list_data = [];
                        console.log(msg||"系统异常");
                    }
                }).catch(err=>{
                    THAT.list_data = [];
                    console.log(err||"系统异常");
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-link-wrapper{
        padding: 2rem;
    }
</style>