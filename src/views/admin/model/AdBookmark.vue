<template>
    <AdUnit title="书签管理" api-name="bookmark" :default-data="defaultData" :default-query="defaultQuery">
        <template slot="queryForm" slot-scope="props">
            <el-form-item label="名称">
                <el-input v-model="props.queryData.name" placeholder="名称"/>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="props.queryData.type" placeholder="请选择">
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
            <el-table-column prop="link" label="链接" show-tooltip-when-overflow>
                <template slot-scope="scope">
                    <a :href="scope.row.link" target="_blank">{{scope.row.link}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="简述" show-tooltip-when-overflow></el-table-column>
            <el-table-column prop="icon" label="图标"></el-table-column>
            <el-table-column prop="type" label="类型" :filters="selectOps"
                             :filter-method="(value, row, column)=>((row[column['property']] === value)||!value)">
                <template slot-scope="scope">
                    <el-tag :type="typeColor[scope.row.type]">{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cats" label="类目"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="digested" label="是否消化">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.digested" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="outWall" label="是否翻墙">
                <template slot-scope="scope">
                    <i v-if="1==scope.row.outWall" class="el-icon-check" style="color:#13ce66;"></i>
                    <i v-else class="el-icon-close" style="color:#ff4949;"></i>
                </template>
            </el-table-column>
        </template>
        <template slot="modelForm" slot-scope="props">
            <el-row>
                <el-form-item label="名称">
                    <el-input v-model="props.formData.name" placeholder="名称"/>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="props.formData.link" placeholder="链接"/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="简述">
                    <el-input v-model="props.formData.desc" placeholder="简述"/>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="props.formData.icon" placeholder="图标" disabled/>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="分类">
                    <el-input v-model="props.formData.cats" placeholder="分类"/>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="props.formData.type" placeholder="请选择">
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
                    <el-switch v-model="props.formData.outWall"
                               active-value="1" inactive-value="0"
                               active-color="#13ce66" inactive-color="#ff4949"/>
                </el-form-item>
                <el-form-item label="是否消化">
                    <el-switch v-model="props.formData.digested"
                               active-value="1" inactive-value="0"
                               active-color="#13ce66" inactive-color="#ff4949"/>
                </el-form-item>
            </el-row>
            <el-form-item label="备注">
                <el-input v-model="props.formData.remark" placeholder="备注"/>
            </el-form-item>
        </template>
    </AdUnit>
</template>

<script>
    import AdUnit from './AdUnit'

    export default {
        name: "AdBookmark",
        components: {AdUnit},
        data() {
            return {
                defaultData: {
                    name: "",
                    desc: "不可描述",
                    link: "",
                    icon: "default.png",
                    cats: "unclassified",
                    type: "Digest",
                    remark: "",
                    digested: "0",
                    outWall: "0"
                },
                defaultQuery: {
                    name: '',
                    type: ''
                },
                selectOps: [
                    {label: 'Empty', value: '', text: 'All'},
                    {label: 'Daily', value: 'Daily', text: 'Daily'},
                    {label: 'Devil', value: 'Devil', text: 'Devil'},
                    {label: 'Digest', value: 'Digest', text: 'Digest'},
                ],
                typeColor: {
                    'Daily': 'default',
                    'Devil': 'success',
                    'Digest': 'warning',
                }
            }
        }
    }
</script>