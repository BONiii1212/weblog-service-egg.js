'use strict';

const Controller = require('egg').Controller;

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
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime,"+
              'article.view_count as view_count,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }
  //指定id文章的详细信息
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'article.article_content as article_content,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE article.id='+id 
    const result  = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
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
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime,"+
              'article.view_count as view_count,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '+
              'WHERE type_id='+id 
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }
}

module.exports = HomeController;