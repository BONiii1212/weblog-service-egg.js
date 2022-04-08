module.exports = app => {
    const { router, controller } = app;
    var adminauth = app.middleware.adminauth()
    var jwtauth = app.middleware.jwtauth()
    router.get('/admin/index', controller.admin.main.index);
    router.post('/admin/checkLogin', controller.admin.main.checkLogin);
    router.get('/admin/getTypeInfo', jwtauth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', controller.admin.main.addArticle);
    router.post('/admin/updateArticle',controller.admin.main.updateArticle);
    router.get('/admin/getArticleList', controller.admin.main.getArticleList);
    router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
    router.get('/admin/getArticleById/:id',controller.admin.main.getArticleById)
};