module.exports = app => {
    const { router, controller } = app;
    var adminauth = app.middleware.adminauth()
    var jwtauth = app.middleware.jwtauth()
    router.get('/admin/index', controller.admin.main.index);
    router.post('/admin/checkLogin', controller.admin.main.checkLogin);
    router.get('/admin/getTypeInfo', jwtauth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', jwtauth, controller.admin.main.addArticle);
    router.post('/admin/updateArticle', jwtauth, controller.admin.main.updateArticle);
    router.get('/admin/getArticleList', jwtauth, controller.admin.main.getArticleList);
    router.get('/admin/delArticle/:id', jwtauth, controller.admin.main.delArticle);
    router.get('/admin/getArticleById/:id',jwtauth,controller.admin.main.getArticleById)
};