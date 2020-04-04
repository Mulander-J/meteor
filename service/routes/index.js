module.exports = (app)=>{
    app.get('/', (req, res) => res.send('Hello World!'));
    ['confTag','confBookmark','confRecord'].forEach(route=>{
        app.use(`/api/${route}`,require(`./${route}`));
    });
};