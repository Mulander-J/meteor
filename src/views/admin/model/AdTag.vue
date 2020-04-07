<template>
    <AdUnit title="标签管理" api-name="tags" :default-data="defaultData" :default-query="defaultQuery">
        <template slot="queryForm" slot-scope="props">
            <el-form-item label="名称">
                <el-input v-model="props.queryData.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="是否置顶">
                <el-select v-model="props.queryData.isTop" placeholder="请选择">
                    <el-option
                            v-for="ops in selectOps"
                            :key="ops.value"
                            :label="ops.label"
                            :value="ops.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </template>
        <template slot="unitTable">
            <el-table-column prop="color" label="颜色"></el-table-column>
            <el-table-column prop="isTop" label="是否置顶" width="100" align="center">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.isTop" class="el-icon-check" style="color:#13ce66;"></i>
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
            </el-row>
            <el-row>
                <el-form-item label="颜色">
                    <el-color-picker v-model="props.formData.color" :predefine="['#ECF5FF']" disabled/>
                </el-form-item>
                <el-form-item label="是否置顶">
                    <el-switch v-model="props.formData.isTop"
                               active-value="1" inactive-value="0"
                               active-color="#13ce66" inactive-color="#ff4949"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="备注">
                    <el-input v-model="props.formData.remark" placeholder="备注"/>
                </el-form-item>
            </el-row>
        </template>
    </AdUnit>
</template>

<script>
    import AdUnit from './AdUnit'
    export default {
        name: "AdTag",
        components:{AdUnit},
        data(){
            return {
                defaultData: {
                    name: "",
                    color: "#ECF5FF",
                    isTop: "0",
                    remark: ""
                },
                defaultQuery: {
                    name: '',
                    color: ''
                },
                selectOps: [
                    {label: 'Empty', value: '', text: 'All'},
                    {label: '否', value: '0', text: '否'},
                    {label: '是', value: '1', text: '是'}
                ],
            }
        }
    }
</script>

<style scoped>

</style>