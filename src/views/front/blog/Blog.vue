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
                        :expand-on-click-node="false" node-key="_id"
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
            <h2 class="meteor-text-upper">{{curMenu.name||''}} | Total:{{list_blog.length}}</h2>
            <blockquote>{{curMenu.desc||''}}</blockquote>
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
            <BlogView/>
        </el-dialog>
    </section>
</template>

<script>
    import BlogLine from '@/components/blogLine/BlogLine.vue'
    import BlogView from '@/components/blogView/BlogView.vue'

    const allMenuName = 'all';

    export default {
        name: "Blog",
        components:{BlogLine,BlogView},
        data(){
            return {
                allMenuName,
                tree_props:{
                    'id':'_id',
                    'label':'name',
                    'children':'children'
                },
                list_menu:[],
                curMenu:{
                    name:'',
                    desc:''
                },
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
                    if(this.curMenu.name){
                        res = this.json_blog.filter(ele=>ele.category.indexOf(this.curMenu.name)>-1)
                    }else {
                        res = this.json_blog.map(e=>e)
                    }
                }
                return res
            }
        },
        created(){
          this.curMenu = {
              name:'',
              desc:''
          } ;
        },
        mounted(){
            this._getTreeData()
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
            /*  获取类目树 */
            _getTreeData () {
                let THAT = this;
                this.$api.cats.list({}).then(res=>{
                    let {success,result} = res.data;
                    if(success){
                        THAT.list_menu = THAT.$util._toTreeData(result,{
                            id:'_id',
                            parentId:'parentId',
                            firstParent:'######',
                            isSort:true,
                            sort:'sort'
                        });
                    }else {
                        THAT.list_menu = [];
                        THAT.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    THAT.list_menu = [];
                    THAT.$message.error(err.message);
                })
            },
            /*  类目树点击   */
            _tree_click(data){
                this.curMenu = data
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