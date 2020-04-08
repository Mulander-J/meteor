<template>
    <AdUnit title="用户管理" api-name="user" :default-data="defaultData" :default-query="defaultQuery">
        <template slot="queryForm" slot-scope="props">
            <el-form-item label="名称">
                <el-input v-model="props.queryData.name" placeholder="名称"/>
            </el-form-item>
        </template>
        <template slot="unitTable">
            <el-table-column prop="mail" label="邮箱"/>
            <el-table-column prop="head" label="头像"/>
            <el-table-column prop="birth" label="生辰"/>
            <el-table-column prop="remark" label="备注"/>
        </template>
        <template slot="modelForm" slot-scope="props">
            <el-row>
                <el-form-item label="头像">
                    <el-avatar> user </el-avatar>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="名称">
                    <el-input v-model="props.formData.name" placeholder="名称"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="邮箱">
                    <el-input v-model="props.formData.mail" placeholder="邮箱"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="密码">
                    <el-input type="password" show-password v-model="props.formData.password" placeholder="密码"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="生辰">
                    <el-date-picker v-model="props.formData.birth" style="width: 180px" placeholder="生辰"/>
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
        name: "AdUser",
        components:{AdUnit},
        data(){
            return {
                defaultData: {
                    name: "",
                    mail: "",
                    password: "",
                    remark: "",
                    birth:"",
                    head:""
                },
                defaultQuery: {
                    name: ''
                }
            }
        }
    }
</script>

<style scoped>
.adUser-table-head{
    height: 20px;
}
</style>