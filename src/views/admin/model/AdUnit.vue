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
                    <span class="crud-edit" @click="_handleEdit(scope.row)"><i class="el-icon-edit"></i>{{scope.row.name}}</span>
                    <span class="crud-delete" @click="_handleDelete(scope.row._id)"><i
                            class="el-icon-delete"></i></span>
                </p>
            </el-table-column>
            <slot name="unitTable"></slot>
            <el-table-column prop="_updated" label="最后更新" sortable show-tooltip-when-overflow/>
            <el-table-column prop="_created" label="创建时间" sortable show-tooltip-when-overflow/>
        </el-table>
        <el-dialog title="Model" :visible.sync="editShow" width="max-content">
            <el-form inline :model="formData" size="small">
              <slot name="modelForm" :formData="formData"></slot>
            </el-form>
            <div style="text-align: right">
                <el-button type="success" @click="_handleSubmit">Submit</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "AdUnit",
        props:{
            title:{type:String, default:''},
            apiName:{type:String, default:''},
            defaultData:{type:Object, default:null},
            defaultQuery:{type:Object, default:null}
        },
        data(){
            return {
                tableData:[],
                tableSelection:[],
                tableLoading:false,
                editShow:false,
                pageOps:{
                    total:1,
                    pageSize:10,
                    pageNo:1
                },
                formData:null,
                queryData:null
            }
        },
        created(){
            this.formData = {...this.defaultData};
            this.queryData = {...this.defaultQuery};
        },
        mounted(){
            this._handlePage()
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
                        THAT.tableData = result;
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
                    ...this.defaultData,
                    ...row
                };
                this.editShow = true;
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
            .crud-edit{
                transition: .2s ease-in-out;
                will-change: color;
                cursor: pointer;
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
                .crud-edit{
                    color: #409EFF;
                    text-decoration: underline;
                }
            }
        }
    }
</style>