<template>
    <!--    博客页     -->
    <section class="meteor-Blog-wrapper">
        <!--    博客目录    -->
        <div class="blog-col-menu">
            <!--    目录标题    -->
            <h2 class="meteor-text-upper">category</h2>
            <div style="padding: 2rem">
                <!--    目录检索输入框     -->
                <el-input placeholder="enter text" v-model="filterText" clearable></el-input>
                <!--    目录树     -->
                <ElTree class="meteor-margin-top1" ref="tree"
                        style="background: transparent;"
                        accordion default-expand-all
                        :expand-on-click-node="false" node-key="id"
                        :props="tree_props" :data="list_menu"
                        :filter-node-method="_filterNode"
                        @node-click="_tree_click">
                    <span class="meteor-text-upper" slot-scope="{ node, data }">{{data.name}}</span>
                </ElTree>
            </div>
        </div>
        <!--    博客流     -->
        <div class="blog-col-timeLine">
            <!--    博客流计数   -->
            <h2 class="meteor-text-upper">{{curMenu||allMenuName}} | Total:{{list_blog.length}}</h2>
            <blockquote>{{curMenu||allMenuName}}</blockquote>
            <div style="padding: 2rem">
                <transition name="el-fade-in-linear">
                    <BlogLine v-if="list_blog.length>0" :data="list_blog"
                              @on-favor="_handleFavor"
                              @on-photo="_handlePhoto"
                              @on-share="_handleShare"
                              @on-blog="_handleBlog"/>
                    <span v-else>暂无文章</span>
                </transition>
            </div>
        </div>
        <!--    阅读文章    -->
        <el-dialog  title="Blog" :visible.sync="showBlog" fullscreen>
            <div>
                文章
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import BlogLine from '@/components/blogLine/BlogLine.vue'

    const allMenuName = 'all'

    export default {
        name: "Blog",
        components:{BlogLine},
        data(){
            return {
                allMenuName,
                tree_props:{
                    'label':'name',
                    'children':'children'
                },
                list_menu:[
                    {
                        id:'####',
                        name:'all',
                        children:[
                            {
                                id:'1',
                                name:'article',
                                children:[
                                    {  id:'2',name:'console'},
                                    {  id:'3',name:'digest'},
                                    {  id:'7',name:'leetcode'},
                                ]
                            },
                            {
                                id:'4',
                                name:'thought',
                                children:[
                                    {  id:'5',name:'daily'},
                                    {  id:'6',name:'summary'},
                                ]
                            },
                            {
                                id:'8',
                                name:'Named'
                            },
                            {
                                id:'10',
                                name:'Travel'
                            },
                            {
                                id:'9',
                                name:'unclassified'
                            }
                        ]
                    }
                ],
                curMenu:'',
                filterText:'',
                showBlog:false,
                json_blog:[
                    {
                        "id":"WE8904DD7879DD",
                        "title": "blogA",
                        "url": "./../../blogA",
                        "tag": ["a","b"],
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
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
                        "category": ["article","book"],
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
                        "category": ["daily","book"],
                        "last_update": "2020-03",
                        "author":"Mulander",
                        "link":"null",
                        "writter":"Mulander",
                        "createDate":"2020/3/22 16:41"
                    },
                ]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        computed:{
            list_blog(){
                let res = [];
                if(this.json_blog.length>0){
                    if(this.curMenu&&(allMenuName!==this.curMenu)){
                        res = this.json_blog.filter(ele=>ele.category.indexOf(this.curMenu)>-1)
                    }else {
                        res = this.json_blog.map(e=>e)
                    }
                }
                return res
            }
        },
        created(){
          this.curMenu = '' ;
        },
        methods:{
            /*  打开博客  */
            _handleBlog(item){
                console.log('_handleBlog',item);
                this.showBlog = true
            },
            /*  点赞博客  */
            _handleFavor(item){
                console.log('_handleFavor',item);
                alert('_handleFavor')
            },
            /*  获取博客快照    */
            _handlePhoto(item){
                console.log('_handlePhoto',item);
                alert('_handlePhoto')
            },
            /*  获取博客分享地址    */
            _handleShare(item){
                console.log('_handleShare',item);
                alert(`${this.$conf.appBaseUrl}/share?id=${item.id}`)
            },
            _tree_click(data,node,vNode){
                console.log(data, node, vNode);
                this.curMenu = data.name
            },
            /**
             * @description 菜单目录检索
             * @param value
             * @param data
             * @returns {boolean}
             * @private
             */
            _filterNode(value, data){
                if (!value) return true;
                return data[this.tree_props.label].indexOf(value) !== -1;
            }
        }
    }
</script>

<style scoped lang="less">
    @leftPx:250px;
    @blankPx:50px;
    .meteor-Blog-wrapper{
        padding: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .blog-col-menu{
            width: @leftPx;
            min-height: 20em;
            position: fixed;
            z-index: 5;
            background: transparent;
        }
        .blog-col-timeLine{
            width:  calc(100% - @leftPx - @blankPx);
            margin-left: @leftPx;
            z-index: 5;
        }
    }
</style>