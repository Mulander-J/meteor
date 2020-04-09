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
            <h2 class="meteor-text-upper">{{curMenu.name||''}} | Total:{{blogPage.total}}</h2>
            <blockquote>{{curMenu.desc||''}}</blockquote>
            <div style="overflow: auto;min-height: 400px" :style="{height:blogLineHeight+'px'}">
                <el-scrollbar>
                    <el-timeline style="padding: 2rem;" v-infinite-scroll="_handleBlogScroll"
                                 :infinite-scroll-immediate="false"
                                 :infinite-scroll-disabled="disabled">
                        <el-timeline-item v-for="(item,no) in list_blog" :key="'dot_'+no" :timestamp="_getDateString(item._created)" type="success">
                            <el-card>
                                <h2 class="meteor-cursor-point" @click="_handleBlog(item)">
                                    <a :href="'#'+item.name" aria-hidden="true" class="meteor-blog-anchor">#</a>
                                    {{item.name}}
                                </h2>
                                <h3 class="meteor-margin-top1">Author:{{item.author}} , LastUpdate:{{_getDateString(item._updated)}}</h3>
                                <div class="meteor-flex-between meteor-margin-top1">
                                    <div>
                                        <ElTag class="meteor-margin-hor1" v-for="(tag,tagNo) in item.tags" :key="`line_${no}_tag_${tagNo}`">{{tag}}</ElTag>
                                    </div>
                                    <div>
                                        <el-button  @click="_handleFavor(item)"  icon="el-icon-star-on" circle></el-button>
                                        <el-button  @click="_handlePhoto(item)"  icon="el-icon-camera" circle></el-button>
                                        <el-button  @click="_handleShare(item)"  icon="el-icon-share" circle></el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item :type="blogNoMore?'danger':'primary'">
                            <span v-if="blogNoMore">没有更多了</span>
                            <span v-else>
                        <span v-if="blogLoading"><i class="el-icon-loading"></i>加载中...</span>
                        <span v-else @click="_handleBlogScroll">更多</span>
                    </span>
                        </el-timeline-item>
                    </el-timeline>
                </el-scrollbar>
            </div>
        </div>
        <!--    阅读文章    -->
        <el-dialog title="Blog" :visible.sync="showBlog" fullscreen append-to-body>
            <BlogView :dataSource="bogRaw"/>
        </el-dialog>
    </section>
</template>

<script>
    import BlogView from '@/components/blogView/BlogView.vue'

    export default {
        name: "Blog",
        components: { BlogView},
        data() {
            return {
                //  类目树
                filterText: '',
                tree_props: {
                    'id': '_id',
                    'label': 'name',
                    'children': 'children'
                },
                list_menu: [],
                curMenu: {
                    _id:'',
                    name: '',
                    desc: ''
                },
                //  博客流
                list_blog: [],
                blogPage: {
                    pageSize: 3,
                    pageNo: 1,
                    total: 0
                },
                blogLoading: false,
                blogLineHeight:400,
                //  博客对话框
                showBlog: false,
                bogRaw:{content:''}
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            resizeIndex(){
                this._getNewHeight()
            }
        },
        computed: {
            blogNoMore(){
                return this.list_blog.length>=this.blogPage.total
            },
            disabled(){
                return this.blogLoading || this.blogNoMore
            },
            resizeIndex(){
                return this.$store.state.global.resizeIndex
            }
        },
        mounted() {
            this._getNewHeight();
            this._getTreeData();
        },
        methods: {
            _getNewHeight(){
                this.blogLineHeight = window.innerHeight-14*20;
            },
            _handleBlogPage() {
                let THAT = this;
                this.blogLoading = true;
                this.$api.blog.page({
                    confModel:{
                        cats:this.curMenu._id||"",
                        isShow:1
                    },
                    ...this.blogPage
                }).then(res => {
                    THAT.blogLoading = false;
                    let {success,result,total,msg} = res.data;
                    if(success){
                        THAT.list_blog =THAT.list_blog.concat(result);
                        THAT.blogPage.total = total;
                    }else {
                        THAT.$message.error(msg)
                    }
                }).catch(err => {
                    THAT.blogLoading = false;
                    THAT.$message.error(err.message)
                });
            },
            _handleBlogScroll(){
                console.log("_handleBlogScroll");
                this.blogLoading = true;
                setTimeout(()=>{
                    this.blogPage.pageNo++;
                    this._handleBlogPage();
                },1000)
            },
            /*  打开博客  */
            _handleBlog(item) {
                let THAT = this;
                this.$api.blog.read(item._id,1).then(res=>{
                    if(res.data.success){
                        THAT.bogRaw = res.data.result[0];
                        THAT.showBlog = true
                    }else {
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                })
            },
            /*  点赞博客  */
            _handleFavor(item) {
                console.log('_handleFavor', item);
                alert('_handleFavor')
            },
            /*  获取博客快照    */
            _handlePhoto(item) {
                console.log('_handlePhoto', item);
                alert('_handlePhoto')
            },
            /*  获取博客分享地址    */
            _handleShare(item) {
                console.log('_handleShare', item);
                alert(`${this.$conf.appBaseUrl}/share?_id=${item._id}`)
            },
            /*  获取类目树 */
            _getTreeData() {
                let THAT = this;
                this.$api.cats.list({}).then(res => {
                    let {success, result} = res.data;
                    if (success) {
                        THAT.list_menu = THAT.$util._toTreeData(result, {
                            id: '_id',
                            parentId: 'parentId',
                            firstParent: '######',
                            isSort: true,
                            sort: 'sort'
                        });
                        THAT.curMenu = {
                            name:THAT.list_menu[0].name,
                            desc:THAT.list_menu[0].desc,
                            _id:"",
                        };
                        THAT._handleBlogPage();
                    } else {
                        THAT.list_menu = [];
                        THAT.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    THAT.list_menu = [];
                    THAT.$message.error(err.message);
                })
            },
            /*  类目树点击   */
            _tree_click(data) {
                if(data.name!==this.curMenu.name){
                    this.curMenu = {
                        name:data.name,
                        desc:data.desc,
                        _id:(('######'===data.parentId)?'':data._id)
                    };
                    this.list_blog = [];
                    this.blogPage.pageNo = 1;
                    this._handleBlogPage();
                }
            },
            /**
             * @description 菜单目录检索
             * @param value
             * @param data
             * @returns {boolean}
             * @private
             */
            _filterNode(value, data) {
                if (!value) return true;
                return data[this.tree_props.label].indexOf(value) !== -1;
            },
            _getDateString(str){
                return new Date(str).toLocaleString()
            }
        }
    }
</script>

<style scoped lang="less">
    @leftPx: 250px;
    @blankPx: 50px;
    .meteor-Blog-wrapper {
        padding: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;

        .blog-col-menu {
            width: @leftPx;
            min-height: 20em;
            position: fixed;
            z-index: 5;
            background: transparent;
        }

        .blog-col-timeLine {
            width: calc(100% - @leftPx - @blankPx);
            margin-left: @leftPx;
            z-index: 5;
        }
    }
</style>