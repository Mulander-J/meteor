var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

//  引入状态码/错误码
var codeDic = require('./../config/req_code');
var log = require('./../../explain/log');


/**
 * @swagger
 * /api/confRecord/log:
 *   get:
 *     tags:
 *       - confRecord
 *     summary: log
 *     description: 用于获取开发日志-log
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/log', async (req, res) => {
    try {
        let result = await log;
        res.json({
            ...codeDic.SUCCESS_GLOBAL,
            result: result
        });
    }catch (err) {
        res.json({
            ...codeDic.ERROR_GLOBAL,
            msg:err.message,
            result:[]
        });
    }
});



module.exports = router;