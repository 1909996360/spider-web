const proxy = require('./src/api/proxy.js')

module.exports = {
    devServer:{
        port:3000,
        open:false,
        hot:true,
        proxy:proxy
    },
    lintOnSave:false,
    // 构建时输出目录
    outputDir:'bundle',
    // 放置静态资源的目录
    assetsDir:'static', //不设置的话，默认放在最外边的
    indexPath:'index.html', //打包完之后主入口文件名称
    // 提取出来的通用chunk 和 vendor chunk
    // chunks: ['index'],
  // 全局注入通用样式，在这里设置css插件的配置
  /* 注意sass，scss，less的配置 */
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/theme.scss";`
      },
      scss: {
        additionalData: `@import "@/assets/theme.scss";`
      },
      less:{
        globalVars: {
          primary: '#fff'
        }
      }
    }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  },
}