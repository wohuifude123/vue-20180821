# 视频审核系统

npm init -y

npm install webpack webpack-dev-server -D

```
├── build 构建服务和webpack配置 
|—— build.js webpack打包服务 
|—— webpack.base.conf.js webpack基本通用配置 
|—— webpack.dev.conf.js webpack开发环境配置 
|—— webpack.prod.conf.js webpack生产环境配置 
├── config 构建项目不同环境的配置 
├── public 项目打包文件存放目录 
├── index.html 项目入口文件 
├── package.json 项目配置文件 
├── static 静态资源 
├── .babelrc babel配置文件 ├── .gitignore git忽略文件 
├── postcss.config.js postcss配置文件 
├── src 项目目录 |—— page 页面组件目录 
|—— router vue路由配置 
|—— store vuex配置 
|—— App.vue vue实例入口 
|—— main.js 项目构建入口
```