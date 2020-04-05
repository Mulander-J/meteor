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
    color:"#ecf5ff",
    isTop:0
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
 *         type: integer
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
        let parameters = req.body;
        let doc = await  confTag.find(parameters).sort('name');
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
router.post('/page', (req, res) => {
    const {pageNum = 1, pageSize = 10, name = ''} = req.body;
    confTag.countDocuments({ // 获取数据条数
        $or: [
            {name: {'$regex': name, '$options': '$i'}}
        ]
    }, (err, count) => { //查询出结果返回
        confTag.find({
            $or: [
                {name: {'$regex': name, '$options': '$i'}}
            ]
        })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .sort({'name': -1})
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
                let pattern = {
                    ...defaultPattern,
                    ...req.body
                };
                pattern.name = pattern.name.toLowerCase() ;
                let doc = null;
                let mark =  await confTag.findOne({name:pattern.name});
                if(pattern._id){    //  修改
                    if(mark&&pattern._id!==mark._id.toString()){
                        console.log(`# 请求|标签-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confTag.updateOne(pattern);
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