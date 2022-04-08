'use strict'
const Controller = require('egg').Controller;

class MainController extends Controller {
    async index(){
        this.ctx.body = 'hi success'
    }
    async checkLogin(){
        let username = this.ctx.request.body.username
        let password = this.ctx.request.body.password
        const sql = " SELECT username FROM admin_user WHERE username = '"+username +
                    "' AND password = '"+password+"'"
  
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            // 登录成功,进行session缓存
            // let openId=new Date().getTime()
            // this.ctx.session.openId={ 'openId':openId }
            // this.ctx.body={'data':'登录成功','openId':openId}
            //登录成功返回token
            const token = this.app.jwt.sign(
                {username,password},
                this.app.config.jwt.secret,
                {expiresIn:'1800s'})
            this.ctx.body = {'status':'success','username':username,'token':token}
        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }
    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body=resType
    }
    async addArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess:insertSuccess,
            insertId:insertId
        }
    }
    async updateArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article',tmpArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess:updateSuccess
        }
    }
    async getArticleList(){
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '  
        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}
    }
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }
    //根据文章ID得到文章详情，用于修改文章
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
        const result = await this.app.mysql.query(sql)
        this.ctx.body=result
    }
}

module.exports = MainController;