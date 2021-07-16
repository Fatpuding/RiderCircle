import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'

export default function ajax(url, data = {}, token = '', params = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        // 1. ִ���첽ajax����
        if (type === 'GET') { // ��GET����
            promise = axios.get(url, { // ���ö���
                params: data,// ָ��������� 
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':token
                }
            })
        } else if (type === 'POST'){ // ��POST����
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
        // 2. ����ɹ���, ����resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. ���ʧ����, ������reject(reason), ������ʾ�쳣��Ϣ
        }).catch(error => {
            // reject(error)
            message.error('�������: ' + error.message)
        })
    })


}