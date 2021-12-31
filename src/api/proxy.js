// 判断当前是什么环境，判断依据为
// npm run serve: 跑的是test环境
// npm run build:dev :跑的是dev环境
// npm run build:build:production :跑的是生产环境

var domain = function(param){
    if(process.env.NODE_ENV == 'development'){
        // .env.test
        return param.test
    }
    if(process.env.NODE_ENV == 'dev'){
        // .env.development
        return param.dev
    }
    if(process.env.NODE_ENV == 'production'){
        return param.prod
    }
}

module.exports = {
    // 基础接口域名
    "/basic":{
        target:domain({
            dev: "http://suiyue2.test.liefengtech.com:83/base",
            test: "http://test.basic.dubbo.liefengtech.com",
            // test: "https://www.lilnong.top/cors",
            prod: "https://basic.prod.liefengtech.com",
        }),
            ws:false,
            changeOrigin:true, //是否开启代理
            secure:true, // https协议才设置
            pathRewrite:{ // basic开头的请求回去target下请求
                '^/basic':'/' //替换/basic为 '/'
            }
       
    }
    
}