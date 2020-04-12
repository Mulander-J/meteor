module.exports = (app)=>{
    app.get('/', (req, res) => res.render('./../../dist/index.html'));
    ['confTag','confCats','confBlog','confBookmark','confRecord','confUser'].forEach(route=>{
        app.use(`/api/${route}`,require(`./${route}`));
    });
};