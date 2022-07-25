'use strict';

const Controller = require('egg').Controller;
const { Feed } = require('feed');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi';
  }
  //首页获取所有文章
  //%Y-%m-%d %H:%i:%s
  async articleList(){
    let sql = 'SELECT article.id as id,' +
              'article.title as title,'+
              'article.introduce as introduce,'+
              "article.addTime as addTime,"+
              'article.url as url,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '+
              'ORDER BY article.id DESC '
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }

  async getRSS(){
    let sql = 'SELECT article.id as id,' +
    'article.title as title,'+
    'article.introduce as introduce,'+
    "article.addTime as addTime,"+
    'article.url as url,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.id '+
    'ORDER BY article.id DESC '
    const result = await this.app.mysql.query(sql)
    const posts = result.filter(item=>item.id!==0 && item.id!==1)
    const feed = new Feed({
      title: "BONiii's blog RSS",
      description: "you can describe my rss to easy know what I post in a first time",
      link: "http://121.5.179.205:3000",
      author: {
        name: "BONiii",
        email: "18458856673@163.com",
        link: "http://121.5.179.205:3000"
      }
    });
    posts.forEach(post => {
      feed.addItem({
        id: post.id,
        title: post.title,
        description: post.introduce,
        data: post.addTime,
        link: `http://121.5.179.205:3000/posts/${post.id}`,
      })
    });
    this.ctx.set({'Content-type': 'text/xml'})
    this.ctx.body = feed.rss2()

  }
  //指定id文章的详细信息
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'article.article_content as article_content,'+
              "article.addTime as addTime,"+
              'article.url as url ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE article.id='+id 
    const result = await this.app.mysql.query(sql)
    this.ctx.body=result[0]
  }
  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  //根据类别ID或得文章列表
  async getListByTypeId(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
              'article.title as title,'+
              'article.introduce as introduce,'+
              "article.addTime as addTime,"+
              'article.url as url,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '+
              'WHERE type_id='+id+' '+
              'ORDER BY article.id DESC ' 
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }
}

module.exports = HomeController;