module.exports = (app)=>{
    app.get('/', (req, res) => res.send('Hello World!'));
    ['confTag','confCats','confBookmark','confRecord','confUser'].forEach(route=>{
        app.use(`/api/${route}`,require(`./${route}`));
    });
};