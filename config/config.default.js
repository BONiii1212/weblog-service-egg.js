/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648899404150_1036';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '121.5.179.205',
      // port
      port: '3306',
      // username
      user: 'react_blog',
      // password
      password: 'X6aT7khhWfdxEDDc',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf:{enable:false},
    domainWhiteList:['http://localhost:3000','http://127.0.0.1:3001']
  }
  config.cors = {
    // origin: ctx => ctx.get('origin'),
    // origin:'http://localhost:3000',
    credentials: true,//允许cookie跨域,有什么危害，可以使用egg-jwt制作
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  config.jwt = {
    secret:"lyb"
  }
  
  return {
    ...config,
    ...userConfig,
  };
};
