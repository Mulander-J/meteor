module.exports = (app)=>{
    app.get('/', (req, res) => res.send('Hello Meteor!'));
    ['confTag','confCats','confBlog','confBookmark','confRecord','confUser'].forEach(route=>{
        app.use(`/api/${route}`,require(`./${route}`));
    });
    // 404 page
    app.use( (req, res)=> {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};