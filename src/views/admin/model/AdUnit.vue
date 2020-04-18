<template>
    <section class="meteor-curd-wrapper">
        <el-divider content-position="left">{{title}}</el-divider>
        <el-collapse accordion>
            <el-collapse-item title="Search" name="Search">
                <el-form :inline="true" :model="queryData" size="small">
                   <slot name="queryForm" :queryData="queryData"></slot>
                    <el-form-item label="操作">
                        <el-button @click="_handlePage">查询</el-button>
                        <el-button @click="_handleRefresh">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="More" name="More">
                <el-button type="text" size="small" @click="_handleEdit(null)">新建</el-button>
                <el-button type="text" size="small" @click="_handleDelete(null)">删除</el-button>
                <el-button type="text" size="small" @click="_handleRefresh">重置</el-button>
                <el-button type="text" size="small" @click="_handleImport">导入</el-button>
                <el-button type="text" size="small" @click="_handleExport">导出</el-button>
            </el-collapse-item>
        </el-collapse>
        <el-pagination style="margin: 1rem 0"
                       @size-change="_handleSizeChange"
                       @current-change="_handleCurrentChange"
                       :current-page="pageOps.pageNo"
                       :page-sizes="[10, 50, 100, 500]"
                       :page-size="pageOps.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageOps.total">
        </el-pagination>
        <el-table stripe :data="tableData" v-loading="tableLoading"
                  @selection-change="(s)=>{tableSelection=s}">
            <el-table-column fixed="left" type="selection" width="50"/>
            <el-table-column prop="name" label="名称" sortable width="200">
                <p slot-scope="scope" class="curd-cell">
                    <span v-if="actionList.indexOf('edit')>-1" class="crud-edit" @click="_handleEdit(scope.row)" title="模型编辑"><i class="el-icon-edit"></i>{{scope.row.name}}</span>
                    <span v-if="actionList.indexOf('mdEdit')>-1" class="crud-mdEdit" @click="_handleMdEdit(scope.row)" title="文章编辑"><i
                            class="el-icon-edit-outline"></i></span>
                    <span v-if="actionList.indexOf('delete')>-1" class="crud-delete" @click="_handleDelete(scope.row._id)" title="删除"><i
                            class="el-icon-delete"></i></span>
                </p>
            </el-table-column>
            <slot name="unitTable"></slot>
            <el-table-column prop="_updated" label="最后更新" sortable show-tooltip-when-overflow/>
            <el-table-column prop="_created" label="创建时间" sortable show-tooltip-when-overflow/>
        </el-table>
        <el-dialog :title="dialogName" :visible.sync="editShow" :fullscreen="fullscreen"
                   width="max-content" @closed="_handleClose">
            <transition name="el-fade-in">
                <template v-if="editShow&&(dialogName==='Model')">
                    <el-form inline :model="formData" size="small">
                        <slot name="modelForm" :formData="formData"></slot>
                        <div style="text-align: right">
                            <el-button type="success" @click="_handleSubmit">Submit</el-button>
                        </div>
                    </el-form>
                </template>
                <template v-else-if="editShow&&(dialogName==='MarkDown')">
                    <section class="meteor-adBlog-markDown meteor-blog-wrapper">
                        <VMdEditor
                                left-toolbar="h bold italic strikethrough | code quote tip| ul ol table hr | link image | undo redo clear save"
                                right-toolbar="fullscreen"
                                v-model.lazy="blogRow.content"
                                @save="_handleMdSubmit"
                                :height="editorHeight+'px'"
                        />
                    </section>
                </template>
            </transition>
        </el-dialog>
    </section>
</template>

<script>
    import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
    import  vmEdit from '@/plugin/vmedit';
    export default {
        name: "AdUnit",
        components:{VMdEditor:vmEdit.VMdCodeEditor},
        props:{
            title:{type:String, default:''},
            apiName:{type:String, default:''},
            actionList:{type:String, default:'edit,delete'},
            defaultData:{type:Object, default:null},
            defaultQuery:{type:Object, default:null},
            pageDataTran:{
                type:Function,
                default:(v)=>{return v}
            }
        },
        data(){
            return {
                tableData:[],
                tableSelection:[],
                tableLoading:false,
                editShow:false,
                fullscreen:false,
                dialogName:'',
                pageOps:{
                    total:1,
                    pageSize:10,
                    pageNo:1
                },
                formData:null,
                queryData:null,
                blogRow:{
                    _id:'',
                    content:''
                },
                editorHeight:400
            }
        },
        computed: {
            resizeIndex(){
                return this.$store.state.global.resizeIndex
            }
        },
        watch: {
            resizeIndex(){
                this.editorHeight = window.innerHeight-120;
            }
        },
        created(){
            this.formData = {...this.defaultData};
            this.queryData = {...this.defaultQuery};
        },
        mounted(){
            this._handlePage();
        },
        methods:{
            _handlePage(){
                if(!this.$api[this.apiName]){return}
                let THAT = this;
                this.tableLoading = true;
                this.$api[this.apiName].page({
                    confModel:this.queryData,
                    ...this.pageOps
                }).then(res=>{
                    let {success,result,total} = res.data;
                    if(success){
                        THAT.tableData = THAT.pageDataTran(result);
                        THAT.pageOps.total = total;
                    }else {
                        THAT.tableData = [];
                        THAT.pageOps.total = 0;
                        THAT.$message.error(res.data.msg)
                    }
                    THAT.tableLoading = false;
                }).catch(err=>{
                    console.log(err);
                    THAT.tableData = [];
                    THAT.pageOps.total = 0;
                    THAT.$message.error(err.msg);
                    THAT.tableLoading = false;
                })
            },
            _handleRefresh(){
                this.pageOps={
                    total:1,
                    pageSize:10,
                    pageNo:1
                };
                this.editShow = false;
                this.formData = {...this.defaultData};
                this.queryData = {...this.defaultQuery};
                this._handlePage()
            },
            _handleSizeChange(size){
                this.pageOps.pageNo =1;
                this.pageOps.pageSize = size;
                this._handlePage()
            },
            _handleCurrentChange(no){
                this.pageOps.pageNo =no;
                this._handlePage()
            },

            _handleEdit(row){
                this.formData = {
                    ...this.$util._getDeepCopy(this.defaultData),
                    ...row
                };
                this.dialogName = 'Model';
                this.fullscreen = false;
                this.editShow = true;
            },
            _handleClose(){
                this.formData = this.$util._getDeepCopy(this.defaultData);
                this.dialogName = '';
                this.blogRow = {
                    _id:'',
                    content:''
                };
            },
            _handleSubmit(){
                let THAT = this;
                THAT.$api[this.apiName].save(this.formData).then(res=>{
                    if(res.data.success){
                        THAT.$message.success('保存成功');
                        THAT._handleRefresh();
                    }else {
                        THAT.$message.error(res.data.msg);
                    }
                });
            },

            _handleMdEdit(row){
                let THAT = this;
                this.editorHeight = window.innerHeight-120;
                this.$api.blog.read(row._id).then(res=>{
                    let {success,result} = res.data;
                    if(success){
                        THAT.blogRow._id = result[0]._id;
                        THAT.blogRow.content = result[0].content;
                        THAT.dialogName = 'MarkDown';
                        THAT.fullscreen = true;
                        THAT.editShow = true;
                    }else {
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                });
            },
            _handleMdSubmit(string){
                let THAT = this;
                this.$api.blog.write({
                    _id:this.blogRow._id,
                    content:string
                }).then(res=>{
                    if(res.data.success){
                        THAT.$message.success(res.data.msg)
                    }else {
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                })
            },

            _handleDelete(id){
                let THAT = this;
                if(!id&&this.tableSelection.length<=0){
                    this.$message.warning('请选择行');
                    return
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = id?id:this.tableSelection.map(e=>e._id).join(',');
                    THAT.$api[this.apiName].delete(ids).then(res=>{
                        if(res.data.success){
                            THAT.$message.success('删除成功');
                            THAT._handleRefresh();
                        }else {
                            THAT.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    THAT.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            _handleImport(){
                this.$message.info('_handleImport');
            },
            _handleExport(){
                this.$message.info('_handleExport');
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-curd-wrapper{
        padding: 0 1.2rem 2rem 0;
        .curd-cell{
            .crud-delete,
            .crud-mdEdit,
            .crud-edit{
                transition: .2s ease-in-out;
                will-change: color;
                cursor: pointer;
            }
            .crud-mdEdit{
                margin-left: 1rem;
            }
            .crud-delete{
                opacity: .2;
                margin-left: 1rem;
            }
            &:hover{
                .crud-delete{
                    color: #ff4949;
                    opacity: 1;
                }
                .crud-mdEdit{
                    color: #67C23A;
                    text-decoration: underline;
                }
                .crud-edit{
                    color: #409EFF;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
<style lang="less">
    .meteor-adBlog-markDown{
        .v-note-panel{
            max-height: calc(100vh - 10rem);
        }
    }
</style>