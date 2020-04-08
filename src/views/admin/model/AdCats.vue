<template>
    <section class="meteor-admin-adCats">
        <el-divider content-position="left">类目管理</el-divider>
        <el-collapse accordion>
            <el-collapse-item title="Search" name="Search">
                <el-input size="small" v-model="filterText" style="width:200px;margin-right: 2rem" placeholder="输入关键字进行过滤"  clearable/>
                <el-button size="small" @click="_getTreeData">刷新</el-button>
            </el-collapse-item>
            <el-collapse-item title="More" name="More">
                是否拖拽
                <el-switch v-model="treeOps.draggable" disabled
                           active-color="#13ce66" inactive-color="#ff4949"/>
            </el-collapse-item>
        </el-collapse>
        <el-tree ref="castTree" :data="treeData" class="adCats-tree"
                 :v-loading="treeLoading"
                 :props="treeProps"  :draggable="treeOps.draggable"
                 node-key="_id" default-expand-all
                 :expand-on-click-node="false"
                 :allow-drag="_allowDrag"
                 :filter-node-method="_filterNode">
            <p class="adCast-treeNode" slot-scope="{ node, data }">
                <span class="adCats-treeNode-name">{{`No_${data.sort}.${node.label}`}}</span>
                <span>
                    <el-button v-if="data.editable||data.parentId==='######'" icon="el-icon-plus" type="text" size="mini"
                            @click="_handleModel(node,data,false)">新增</el-button>
                    <el-button v-if="data.editable" icon="el-icon-edit" type="text" size="mini"
                            @click="_handleModel(node,data,true)">修改</el-button>
                    <el-button v-if="data.editable" icon="el-icon-delete" type="text" size="mini"
                            @click="_handleRemove(node, data)">删除</el-button>
                </span>
            </p>
        </el-tree>
        <el-dialog title="Model" :visible.sync="editShow" width="max-content">
            <el-form inline :model="formData" size="small">
                <el-row>
                    <el-form-item label="名称">
                        <el-input v-model="formData.name" placeholder="名称"/>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="formData.desc" placeholder="描述"/>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="父级">
                        <el-input v-model="formData.parentId" placeholder="父级" disabled/>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="排序">
                        <el-input-number v-model="formData.sort" placeholder="排序"/>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="备注">
                        <el-input v-model="formData.remark" placeholder="备注"/>
                    </el-form-item>
                </el-row>
            </el-form>
            <div style="text-align: right">
                <el-button type="success" @click="_handleSubmit">Submit</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "AdCats",
        data(){
            return {
                filterText:'',
                treeProps:{id:'_id',children:'children',label:'name'},
                treeOps:{
                    draggable:false
                },
                treeData:[],
                editShow:false,
                treeLoading:false,
                defaultData: {
                    name: "",
                    parentId: "",
                    desc: "",
                    sort: 0,
                    editable:1,
                    remark: ""
                },
                formData:{
                    name: "",
                    parentId: "",
                    desc: "",
                    sort: 0,
                    editable:1,
                    remark: ""
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.castTree.filter(val);
            }
        },
        mounted(){
          this._getTreeData();
        },
        methods:{
            _getTreeData () {
                let THAT = this;
                this.treeLoading = true;
                this.$api.cats.list({}).then(res=>{
                    let {success,result} = res.data;
                    if(success){
                        THAT.treeData = THAT.$util._toTreeData(result,{
                            id:'_id',
                            parentId:'parentId',
                            firstParent:'######',
                            isSort:true,
                            sort:'sort'
                        });
                    }else {
                        THAT.treeData = [];
                        THAT.$message.error(res.data.msg);
                    }
                    THAT.treeLoading = false;
                }).catch(err=>{
                    THAT.treeData = [];
                    THAT.$message.error(err.message);
                    THAT.treeLoading = false;
                })
            },

            _filterNode(value,data){
                if (!value) return true;
                return data[this.treeProps.label].indexOf(value) !== -1;
            },
            _allowDrag(draggingNode) {
                return draggingNode.data.parentId !== '######';
            },
            _handleModel(node,data,status){
                if(!status){
                    this.formData = {
                        ...this.defaultData,
                        parentId:data[this.treeProps.id]
                    }
                }else {
                    this.formData = {
                        ...data
                    }
                }
                this.editShow = true;
            },
            _handleSubmit(){
                let THAT = this;
                this.$api.cats.save(this.formData).then(res=>{
                    if(res.data.success){
                        THAT.$message.success('保存成功');
                        THAT.editShow = false;
                        THAT._getTreeData();
                    }else {
                        THAT.$message.error(res.data.msg);
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                })
            },

            _handleRemove(node,data){
                if(data.name==='######'){
                    this.$message.warning('根节点不能删除!');
                    return
                }
                if(data.name==='UNCLASSIFIED'){
                    this.$message.warning('未定义节点不能删除!');
                    return
                }
                let ids = this._recursiveChildren([data]).filter(Boolean);
                let THAT = this;
                if(ids.length>0){
                    this.$api.cats.delete(ids.join(',')).then(res=>{
                        if(res.data.success){
                            THAT.$message.success('删除成功！');
                            THAT._getTreeData();
                        }else {
                            THAT.$message.error(res.data.msg);
                        }
                    }).catch(err=>{
                        THAT.$message.error(err.message)
                    })
                }
            },
            _recursiveChildren(nodeTree){
                if(!nodeTree||nodeTree.length<=0) return [];
                let res = [];
                nodeTree.forEach(node=>{
                    res.push(node[this.treeProps.id]);
                    if(node[this.treeProps.children]){
                        res = res.concat(this._recursiveChildren(node[this.treeProps.children]))
                    }
                });
                return res
            }
        }
    }
</script>

<style scoped lang="less">
    .adCats-tree{
        width: max-content;
        min-width: 30%;
        padding: 1rem 0 0 1rem;
        .adCast-treeNode{
            width: 100%;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .adCats-treeNode-name{
                display: inline-block;
                margin-right: 4rem;
            }
        }
    }
</style>