<template>
    <section class="meteor-curd-wrapper">
        <el-divider content-position="left">书签管理</el-divider>
        <el-collapse accordion>
            <el-collapse-item title="Search" name="Search">
                <el-form :inline="true" :model="queryData" size="small">
                    <el-form-item label="名称">
                        <el-input v-model="queryData.name" placeholder="名称"/>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="queryData.type" placeholder="请选择">
                            <el-option
                                    v-for="ops in selectOps"
                                    :key="ops.value"
                                    :label="ops.label"
                                    :value="ops.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button @click="_handlePage">查询</el-button>
                        <el-button @click="_handleRefresh">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="More" name="More">
                <el-button type="text" size="small" @click="_handleEdit(null)">新建</el-button>
                <el-button type="text" size="small" @click="_handleDelete(null)">删除</el-button>
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
        <el-table stripe border height="400"
                  :data="tableData" v-loading="tableLoading"
                  @selection-change="(s)=>{tableSelection=s}">
            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
            <el-table-column fixed="left" prop="name" label="名称" width="200">
                <p slot-scope="scope" class="curd-cell">
                    <span class="crud-edit" @click="_handleEdit(scope.row)"><i class="el-icon-edit"></i>{{scope.row.name}}</span>
                    <span class="crud-delete" @click="_handleDelete(scope.row._id)"><i class="el-icon-delete"></i></span>
                </p>
            </el-table-column>
            <el-table-column fixed="left" prop="link" label="链接" width="200">
                <template  slot-scope="scope">
                    <a :href="scope.row.link" target="_blank">{{scope.row.link}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="简述" width="200"></el-table-column>
            <el-table-column prop="icon" label="图标" width="200"></el-table-column>
            <el-table-column prop="type" label="类型" width="200">
                <template slot-scope="scope">
                    <el-tag :type="typeColor[scope.row.type]">{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cats" label="类目" width="200"></el-table-column>
            <el-table-column prop="remark" label="备注" width="200"></el-table-column>
            <el-table-column prop="digested" label="是否消化" width="200">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.digested" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="outWall" label="是否翻墙" width="200">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.outWall" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="_updated" label="最后更新" width="200"></el-table-column>
            <el-table-column prop="_created" label="创建时间" width="200"></el-table-column>
        </el-table>
        <el-dialog title="Model" :visible.sync="editShow" width="max-content">
            <el-form inline :model="formData" size="small">
                <el-row>
                    <el-form-item label="名称">
                        <el-input v-model="formData.name" placeholder="名称"/>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="formData.link" placeholder="链接"/>
                    </el-form-item>
                </el-row>
                <el-row>
                   <el-form-item label="简述">
                       <el-input v-model="formData.desc" placeholder="简述"/>
                   </el-form-item>
                   <el-form-item label="图标">
                       <el-input v-model="formData.icon" placeholder="图标" disabled/>
                   </el-form-item>
               </el-row>
                <el-row>
                    <el-form-item label="分类">
                        <el-input v-model="formData.cats" placeholder="分类"/>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="formData.type" placeholder="请选择">
                            <el-option
                                    v-for="ops in selectOps"
                                    :key="ops.value"
                                    :label="ops.label"
                                    :value="ops.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="是否翻墙">
                        <el-switch v-model="formData.outWall"
                                   active-value="1" inactive-value="0"
                                   active-color="#13ce66" inactive-color="#ff4949"/>
                    </el-form-item>
                    <el-form-item label="是否消化">
                        <el-switch v-model="formData.digested"
                                   active-value="1" inactive-value="0"
                                   active-color="#13ce66" inactive-color="#ff4949"/>
                    </el-form-item>
                </el-row>
                <el-form-item label="备注">
                    <el-input v-model="formData.remark" placeholder="备注"/>
                </el-form-item>
            </el-form>
            <div style="text-align: right">
                <el-button type="success" @click="_handleSubmit">Submit</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    const defaultData = {
        name:"",
        desc:"不可描述",
        link:"",
        icon:"default.png",
        cats:"unclassified",
        type:"Digest",
        remark:"",
        digested:"0",
        outWall:"0"
    };
    export default {
        name: "adBookmark",
        data(){
            return {
                tableData:[],
                tableSelection:[],
                tableLoading:false,
                pageOps:{
                    total:1,
                    pageSize:10,
                    pageNo:1
                },
                queryData:{
                    name:'',
                    type:''
                },
                editShow:false,
                formData:{
                    _id:"",
                    name:"",
                    desc:"",
                    link:"",
                    icon:"",
                    cats:"",
                    type:"",
                    remark:"",
                    digested:'0',
                    outWall:'0',
                    _created:"",
                    _updated:""
                },
                selectOps:[
                    {label:'Empty',value:''},
                    {label:'Daily',value:'Daily'},
                    {label:'Devil',value:'Devil'},
                    {label:'Digest',value:'Digest'}
                ],
                typeColor:{
                    'Daily':'default',
                    'Devil':'success',
                    'Digest':'warning',
                }
            }
        },
        mounted(){
          this._handlePage()
        },
        methods:{
            _handlePage(){
                let THAT = this;
                this.tableLoading = true;
                this.$api.bookmark.page({
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
                this.formData = {...defaultData};
                this.queryData = {
                    name:'',
                    type:''
                };
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
                    ...defaultData,
                    ...row
                };
                this.editShow = true;
            },
            _handleSubmit(){
                let THAT = this;
                THAT.$api.bookmark.save(this.formData).then(res=>{
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
                    THAT.$api.bookmark.delete(ids).then(res=>{
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
        padding:0 2rem;
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