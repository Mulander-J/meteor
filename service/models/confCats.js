let mongoose = require('mongoose');
/*  书签实体对象  */
module.exports = mongoose.model("confCats",new mongoose.Schema({
    name:{type:String,required:true},    //  名称
    parentId:{type:String,required:true},    //  父级id
    desc:String,  //  描述
    sort:Number,    //  序号
    editable:Number,    //  是否可编辑
    remark:String  //  备注
},{
    timestamps: {
        createdAt: '_created',
        updatedAt: '_updated'
    }
}),"conf_cats");