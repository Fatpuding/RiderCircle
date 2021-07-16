import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'

export default function ajax(url, data = {}, token = '', params = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data,// 指定请求参数 
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':token
                }
            })
        } else if (type === 'POST'){ // 发POST请求
            promise = axios.post(url,data,
                {
                    headers:{
                        'Content-Type':'multipart/form-data',
                        'Authorization':token
                    },
                    params: params,
                })
        }
        else {
            promise = axios.delete(url,
                {
                    data: data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    },
                    params: params,
                    
                })
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('请求出错: ' + error.message)
        })
    })


}