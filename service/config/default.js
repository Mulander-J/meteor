module.exports = {
    name:'Blog_Meteor',
    host: '127.0.0.1',
    port: 9587,
    dbName:'meteor_db',
    mongodb: 'mongodb://127.0.0.1:27017/meteor_db',
    session: {
        secret: 'METEOR',
        key: 'METEOR',
        maxAge: 2592000000
    }
};