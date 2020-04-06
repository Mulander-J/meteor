var express = require('express');
var router = express.Router();

//  引入状态码/错误码
var codeDic = require('./../config/req_code');

//  文件读写
const fs = require('fs');
const path = require('path')

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
    fs.readFile(path.resolve(__dirname,'./../logs/log.json'),(err,logJson)=>{
        if(err){
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            });
        }else {
            res.json({
                ...codeDic.SUCCESS_GLOBAL,
                result:JSON.parse(logJson)||null
            });
        }
    });
});



module.exports = router;