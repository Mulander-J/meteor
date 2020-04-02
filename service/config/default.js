module.exports = {
    name:'Blog_Meteor',
    host: '192.168.3.3',
    port: 9587,
    session: {
        secret: 'METEOR',
        key: 'METEOR',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://127.0.0.1:27017/meteor_db',
    swagger_option:{
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['./../routes/**/*.js'] //Path to the API handle folder
    }
};