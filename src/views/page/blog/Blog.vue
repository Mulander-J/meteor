<template>
    <section class="meteor-Blog-wrapper">
        <div class="blog-col-menu">
            <Tree :list="list_menu"/>
        </div>
        <div class="blog-col-timeLine">
            <h2 style="text-indent: 2em;">{{curMenu||'全部'}} | 总计:{{blogs.length}}</h2>
            <TimeLine :data="blogs"
                      @on-favor="_handleFavor"
                      @on-photo="_handlePhoto"
                      @on-blog="_handleBlog"/>
        </div>
    </section>
</template>

<script>
    import Tree from '@/components/tree/Tree.vue'
    import TimeLine from '@/components/timeLine/TimeLine.vue'
    export default {
        name: "Blog",
        components:{Tree,TimeLine},
        data(){
            return {
                list_menu:[
                    {
                        name:'article',
                        children:[
                            {name:'console'},
                            {name:'digest'},
                        ]
                    },
                    {
                        name:'thought',
                        children:[
                            {name:'daily'},
                            {name:'summary'},
                        ]
                    },
                    {
                        name:'record',
                        children:[
                            {name:'book'},
                            {name:'anime'},
                            {name:'film'},
                            {name:'journey'},
                            {name:'app'},
                        ]
                    },
                    {
                        name:'novel'
                    }
                ],
                curMenu:'',
                list_blog:[
                    {
                        "id":"WE8904DD7879DD",
                        "title": "blogA",
                        "url": "./../../blogA",
                        "tag": ["a","b"],
                        "category": ["c","d"],
                        "last_update": "2020-03",
                        "author":"Mulander",
                        "link":"null",
                        "writter":"Mulander",
                        "createDate":"2020/3/22 16:41"
                    },
                    {
                        "id":"WE8904DD7879DD",
                        "title": "blogA",
                        "url": "./../../blogA",
                        "tag": ["a","b"],
                        "category": ["c","d"],
                        "last_update": "2020-03",
                        "author":"Mulander",
                        "link":"null",
                        "writter":"Mulander",
                        "createDate":"2020/3/22 16:41"
                    }
                ]
            }
        },
        computed:{
            blogs(){
                let res = [];
                if(this.list_blog.length>0){
                    if(this.curMenu){
                        res = this.list_blog.filter(ele=>ele.category.indexOf(this.curMenu)>-1)
                    }else {
                        res = this.list_blog.map(e=>e)
                    }
                }
                return res
            }
        },
        created(){
          this.curMenu = '' ;
        },
        methods:{
            _handleBlog(item){
                console.log('_handleBlog',item);
            },
            _handleFavor(item){
                console.log('_handleFavor',item);
            },
            _handlePhoto(item){
                console.log('_handlePhoto',item);
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-Blog-wrapper{
        padding: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .blog-col-menu{
            width: 250px;
            min-height: 20em;
            border-right: 1px solid #eaecef;
        }
        .blog-col-timeLine{
            width:  calc(100% - 250px);
        }
    }
</style>