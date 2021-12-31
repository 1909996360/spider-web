// 引入axios插件
import axios from "axios";
// 引入qs库,如果post请求格式为application/x-www-form-urlencoded,就格式化数据,其他格式直接上传
import qs from 'qs'
// import proxy from '@/api/proxy.js'

// 编写get和post方法,并且暴露出去
/*
get:
    url:访问的接口地址,
    params:需要带的参数,放在链接地址后带参请求,默认为空,类型为对象
    headers:{
        'Content-Type':'application/json' //默认请求格式为json
    }
*/ 
export function get(url,params = {},headers ={'Content-Type':'application/json'}){
    return new Promise((resolve,reject)=>{
        axios.get(
            url,
            {
                headers:headers,
                params:params
            })
            .then((response)=>{
                resolve(response.data)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}
/*
    post:
        url:访问的接口地址,
        data:需要带的参数,放在请求报文中,默认为空,类型为对象,
        headers:{
            'Content-Type':'application/x-wwww-form-urlencoded'
        }
*/ 
export function post(url,data={},headers={"Content-Type": "application/x-www-form-urlencoded"}){
    return new Promise((resolve,reject)=>{
        axios({
            method:'post',
            url:url,
            headers:headers,
            data:headers['Content-Type'] == 'application/x-www-form-urlencoded' ? qs.stringify(data) : data,
        })
        .then((response) =>{
            resolve(response.data)
        },(err)=>{
            reject(err)
        })
    })
}

// axios默认配置
axios.defaults.timeout = 100000 // 超时时间

axios.interceptors.request.use(
    (config) =>{
        // 在这里进行操作一些拦截操作
        return config
    },
    (error) =>{
        // 这里返回一些错误操作
        return Promise.reject(error)
    }
)