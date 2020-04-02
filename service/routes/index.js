module.exports = (app)=>{
    app.get('/', (req, res) => res.send('Hello World!'));
    ['confTag','confBookmark'].forEach(route=>{
        app.use(`/api/${route}`,require(`./${route}`));
    });
};