<template>
    <AdUnit title="博客管理" api-name="blog" :pageDataTran="_pageDataTran"
            :default-data="defaultData" :default-query="defaultQuery" actionList="edit,mdEdit,delete">
        <template slot="queryForm" slot-scope="props">
            <el-form-item label="名称">
                <el-input v-model="props.queryData.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="类目">
                <elTreeSelect v-model="props.queryData.cats" @getValue="(v)=>{props.queryData.cats=v}"
                              :options="selectTreeOps.options"
                              :props="selectTreeOps.props"/>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                        v-model="props.queryData.tags"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="标签">
                    <el-option
                            v-for="item in selectOps"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </template>
        <template slot="unitTable">
            <el-table-column prop="cats" label="类目">
                <template slot-scope="scope">
                    <span>{{scope.row.cats.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="author" label="作者"/>
            <el-table-column prop="thumb" label="点赞数">
                <template slot-scope="scope">
                    <span>{{scope.row.thumb.length}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="visitNo" label="浏览数"/>
            <el-table-column prop="isTop" label="是否原创" width="100" align="center">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.isOriginal" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="isShow" label="是否显示" width="100" align="center">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.isShow" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"/>
        </template>
        <template slot="modelForm" slot-scope="props">
            <el-row>
                <el-form-item label="名称">
                    <el-input v-model="props.formData.name" placeholder="名称"/>
                </el-form-item>
                <el-form-item label="撰写">
                    <el-input v-model="props.formData.writer" placeholder="撰写" readonly/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="是否显示">
                    <el-switch v-model="props.formData.isShow"
                               :active-value="1" :inactive-value="0"
                               active-color="#13ce66" inactive-color="#ff4949"/>
                </el-form-item>
                <el-form-item label="是否原创">
                    <el-switch v-model="props.formData.isOriginal"
                               :active-value="1" :inactive-value="0"
                               active-color="#13ce66" inactive-color="#ff4949"/>
                </el-form-item>
            </el-row>
            <transition name="el-fade-in">
                <el-row v-show="!props.formData.isOriginal">
                    <el-form-item label="作者">
                        <el-input v-model="props.formData.author" placeholder="作者"/>
                    </el-form-item>
                    <el-form-item label="转载">
                        <el-input v-model="props.formData.reLink" placeholder="转载"/>
                    </el-form-item>
                </el-row>
            </transition>
            <el-row>
                <el-form-item label="类目">
                    <elTreeSelect v-model="props.formData.cats._id" @getValue="(v)=>{props.formData.cats._id=v}"
                                  :options="selectTreeOps.options"
                                  :props="selectTreeOps.props"/>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="props.formData.remark" placeholder="备注"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="标签">
                    <el-select
                            v-model="props.formData.tags"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="标签">
                        <el-option
                                v-for="item in selectOps"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-row>
        </template>
    </AdUnit>
</template>

<script>
    import AdUnit from './AdUnit'
    import elTreeSelect from  '@/components/element_extend/el-tree-select'
    export default {
        name: "AdBlog",
        components:{AdUnit,elTreeSelect},
        data(){
            return {
                defaultData: {
                    name:"",
                    tags:[],
                    cats:{_id:"",name:""},
                    content:"",
                    writer:"Mulander",
                    author:"",
                    reLink:"",
                    isOriginal:1,
                    isShow:0,
                    visitNo:0,
                    thumb:[],
                    remark:""
                },
                defaultQuery: {
                    name: '',
                    cats: null,
                    tags:[]
                },
                selectOps:[],
                selectTreeOps:{
                    props:{
                        value:'_id',
                        label:'name',
                        children:'children'
                    },
                    options:[],
                    constDefault:''
                }
            }
        },
        mounted(){
            this._getSelectOps();
            this._getTreeOps();
        },
        methods:{
            _getSelectOps(){
              let THAT = this;
              this.$api.tags.list({}).then(res=>{
                  let {success,result} = res.data;
                  if(success){
                      THAT.selectOps = result.map(e=>{
                          e.value = e.name;
                          e.label = e.name;
                          return e
                      });
                  }else {
                      THAT.selectOps = [];
                      THAT.$message.error(res.data.msg)
                  }
              }).catch(err=>{
                  THAT.$message.error(err.message)
              })
          },
            _getTreeOps(){
                let THAT = this;
                this.$api.cats.list({}).then(res=>{
                    let {success,result} = res.data;
                    if(success){
                        THAT.selectTreeOps.options = THAT.$util._toTreeData(result,{
                            id:'_id',
                            parentId:'parentId',
                            firstParent:'######',
                            isSort:true,
                            sort:'sort'
                        });
                    }else {
                        THAT.selectTreeOps.options  = [];
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.selectTreeOps.options  = [];
                    THAT.$message.error(err.message)
                })
            },
            _pageDataTran(data){
                return data.map(ele=>{
                    ele.cats = ele.cats||{name:'UnClassified',_id:''};
                    return ele
                })
            }
        }
    }
</script>

<style scoped>
</style>