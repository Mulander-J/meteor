var express = require('express');
var router = express.Router();
var validator = require('express-validator');

//  引入状态码/错误码
var codeDic = require('./../config/req_code');
//引入实体类
var confTag = require('./../models/confTag');

const defaultPattern = {
    name:"",
    remark:"",
    color:"#ECF5FF",
    isTop:"0"
};

/**
 * @swagger
 * definitions:
 *   confTag:
 *     properties:
 *       name:
 *         type: string
 *       color:
 *         type: string
 *       remark:
 *         type: string
 *       isTop:
 *         type: string
 *       pageSize:
 *         type: integer
 *       pageNo:
 *         type: integer
 */

/**
 * @swagger
 * /api/confTag/list:
 *   post:
 *     tags:
 *       - confTag
 *     summary: 全量列表
 *     description: 用于获取全量列表-标签
 *     parameters:
 *       - name: confTag
 *         description: confTag object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confTag'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/list', async (req, res) => {
    try {
        let doc = await  confTag.find({}).sort({'isTop':-1,'_updated':-1,'name':-1});
        console.log(`# 请求|标签-列表|成功`);
        res.json({
            ...codeDic.SUCCESS_GLOBAL,
            total: doc.length,
            result: doc
        });
    }catch (err) {
        console.log(`# 请求|标签-列表|失败`);
        res.json({
            ...codeDic.ERROR_GLOBAL,
            msg:err.message,
            total:0,
            result:[]
        });
    }
});

/**
 * @swagger
 * /api/confTag/page:
 *   post:
 *     tags:
 *       - confTag
 *     summary: 分页列表
 *     description: 用于获取分页列表-标签
 *     parameters:
 *       - name: confTag
 *         description: confTag object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confTag'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/page',(req, res) => {
    const {pageNo = 1, pageSize = 10, confModel } = req.body;
    let _condition = {};
    //  多字段查询（^$精确查，''模糊查,i大小写）
    [
        {key:'name',regex:(v)=>eval(`/${v}/i`)},
        {key:'isTop',regex:(v)=>eval(`/^${v}$/i`)}
    ].forEach(filterItem=>{
        if(confModel[filterItem.key]){
            _condition[filterItem.key]=({'$regex':filterItem.regex(confModel[filterItem.key])})
        }
    });
    // 获取数据条数
    confTag.countDocuments(_condition, (err, count) => {
        //查询出结果返回
        confTag.find(_condition)
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .sort({'isTop':-1,'_updated':-1,'name':-1})
            .exec((err, doc) => {
                if (!err && doc) {
                    console.log(`# 请求|标签-分页列表|成功`);
                    res.json({
                        ...codeDic.SUCCESS_GLOBAL,
                        total:count,
                        result:doc
                    })
                }else {
                    console.log(`# 请求|标签-分页列表|失败`);
                    res.json({
                        ...codeDic.ERROR_GLOBAL,
                        msg:err.message,
                        total:0,
                        result:[]
                    })
                }
            })
    })
});

/**
 * @swagger
 * /api/confTag/save:
 *   post:
 *     tags:
 *       - confTag
 *     summary: 保存
 *     description: 保存（新建/修改）标签
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: confTag
 *         description: confTag object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confTag'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/save',
    [validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|标签-保存|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let pattern = {};
                Object.keys(defaultPattern).forEach(key=>{
                    pattern[key] = req.body[key]||defaultPattern[key]
                });
                //  判断颜色是否合法
                let reg = new RegExp(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,pattern.color);
                if(!reg) pattern.color = defaultPattern.color;
                let doc = null;
                //  重名校验
                let mark =  await confTag.findOne({name:{'$regex':eval(`/^${pattern.name}$/i`)}});
                if(req.body._id){    //  修改
                    if(mark&&req.body._id!==mark._id.toString()){
                        console.log(`# 请求|标签-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confTag.updateOne({_id:req.body._id},pattern);
                        console.log(`# 请求|标签-修改|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }else { //  新建
                    if(mark){
                        console.log(`# 请求|标签-新建|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await new confTag(pattern).save();
                        console.log(`# 请求|标签-新建|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }
            }
        }catch (err) {
            console.log(`# 请求|标签-保存|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

/**
 * @swagger
 * /api/confTag/delete:
 *   get:
 *     tags:
 *       - confTag
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: false
 *         description: 标签ids，复数逗号分隔
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/delete',
    [validator.check('ids').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|标签-删除|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let ids = req.query.ids.split(",").filter(Boolean);
                let doc =  await confTag.deleteMany({ _id: { $in:ids } });
                console.log(`# 请求|标签-删除|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|标签-删除|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

module.exports = router;