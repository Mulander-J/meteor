//  引入依赖
var express = require('express');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var cors = require('cors');
var http = require('http');
// var winston = require('winston');
// var expressWinston = require('express-winston');
//  引入路由接口
var routers = require('./routes');
//  引入配置文件
const config_default = require('./config/default.js');
//  定义express应用
var app = express();
//  设置 host&port
app.set('host', config_default.host);
app.set('port', config_default.port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express); //引用ejs引擎
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//  设置公用资源地址
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, './../dist')));
//  支持跨域
app.use(cors());
//  装填路由
routers(app);
// 引入swagger
var setSwagger = require ('./swagger');
setSwagger(app);
// // 正常请求的日志
// app.use(expressWinston.logger({
//     transports: [
//         new (winston.transports.Console)({
//             json: true,
//             colorize: true
//         }),
//         new winston.transports.File({
//             filename: 'logs/success.log'
//         })
//     ]
// }));
// // 错误请求的日志
// app.use(expressWinston.errorLogger({
//     transports: [
//         new winston.transports.Console({
//             json: true,
//             colorize: true
//         }),
//         new winston.transports.File({
//             filename: 'logs/error.log'
//         })
//     ]
// }));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err.message);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// Create HTTP server
var server = http.createServer(app);
//  Listen on provided port, on all network interfaces.
server.listen(config_default.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const hello = require('./config/hello');
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`${hello.ctx}\n${config_default.name} | Listening on ${bind}\n${hello.line}`);
}