// 引入模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 声明使用
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location,onResolve,onReject){
    if(onResolve || onReject) return originalPush.call(this,location,onResolve,onReject)
    return originalPush.call(this,location).catch(err => err)
}

var routes = () => {
    let routesConfig=[];
    let paths=[];
    paths=require("@/router/path.js").default;
    routesConfig.push(
      {
        path: "/", // 默认页面重定向到主页
        name:'login',
        component: () => import(/*webpackChunkName: "zhw-[request]" */'@/views/login/index.vue'),
      },
      {
        path:'/home',
        name:'home',
        component: () => import(/*webpackChunkName: "zhw-[request]" */'@/components/Home.vue'),
        children: paths ? paths.map(item =>{
          return{
            path: item.path,
            name: item.path.substring(1),
            component: () => import(/*webpackChunkName: "zhw-[request]" */'@/'+item.file),
          }
        }) : []
      }
    );

      return routesConfig;
  };



const router = new VueRouter({
    mode:'hash',
    routes:routes()
})

export default router