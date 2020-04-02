var path = require('path');

// swagger配置信息
module.exports  = {
    openapi: '3.0.0',
    title: 'Meteor_Express',
    version: '1.0.0',
    apis: [
        path.join(__dirname, './../routes/*.js')
    ],
    routerPath: '/api-docs'
}