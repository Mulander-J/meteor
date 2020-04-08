var express = require('express');
var router = express.Router();
var validator = require('express-validator');

//  引入状态码/错误码
var codeDic = require('./../config/req_code');
//引入实体类
var confCats = require('./../models/confCats');

const defaultPattern = {
    name:"",
    parentId:'',
    desc:"",
    sort:0,
    editable:0,
    remark:""
};

/**
 * @swagger
 * definitions:
 *   confCats:
 *     properties:
 *       name:
 *         type: string
 *       parentId:
 *         type: string
 *       desc:
 *         type: string
 *       sort:
 *         type: integer
 *       remark:
 *         type: string
 *       pageSize:
 *         type: integer
 *       pageNo:
 *         type: integer
 */

/**
 * @swagger
 * /api/confCats/list:
 *   post:
 *     tags:
 *       - confCats
 *     summary: 全量列表
 *     description: 用于获取全量列表-类目
 *     parameters:
 *       - name: confCats
 *         description: confCats object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confCats'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/list', async (req, res) => {
    try {
        let doc = await  confCats.find({}).sort({'sort':-1,'_updated':1,'name':-1});
        console.log(`# 请求|类目-列表|成功`);
        res.json({
            ...codeDic.SUCCESS_GLOBAL,
            total: doc.length,
            result: doc
        });
    }catch (err) {
        console.log(`# 请求|类目-列表|失败`);
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
 * /api/confCats/save:
 *   post:
 *     tags:
 *       - confCats
 *     summary: 保存
 *     description: 保存（新建/修改）类目
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: confCats
 *         description: confCats object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confCats'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/save',
    [
        validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('parentId').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')
    ],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|类目-保存|异常参数`);
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
                let mark =  await confCats.findOne({name:{'$regex':eval(`/^${pattern.name}$/i`)}});
                if(req.body._id){    //  修改
                    if(mark&&req.body._id!==mark._id.toString()){
                        console.log(`# 请求|类目-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confCats.updateOne({_id:req.body._id},pattern);
                        console.log(`# 请求|类目-修改|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }else { //  新建
                    if(mark){
                        console.log(`# 请求|类目-新建|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await new confCats(pattern).save();
                        console.log(`# 请求|类目-新建|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }
            }
        }catch (err) {
            console.log(`# 请求|类目-保存|失败`);
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
 * /api/confCats/delete:
 *   get:
 *     tags:
 *       - confCats
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: false
 *         description: 类目ids，复数逗号分隔
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/delete',
    [validator.check('ids').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        // const un_name = 'UnClassified';
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|类目-删除|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let ids = req.query.ids.split(",").filter(Boolean);
                let doc =  await confCats.deleteMany({ _id: { $in:ids } });
                console.log(`# 请求|类目-删除|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|类目-删除|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

module.exports = router;