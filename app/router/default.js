module.exports = app => {
    const { router, controller } = app;
    router.get('/default/index', controller.default.home.index);
    router.get('/default/articleList', controller.default.home.articleList);
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
    router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
    router.get('/default/getListByTypeId/:id', controller.default.home.getListByTypeId);
    router.get('/default/rss', controller.default.home.getRSS);
  };