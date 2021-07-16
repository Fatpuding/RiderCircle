import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Form,Icon,Input,Button,message } from 'antd'
import './login.less'
import { reqLogin } from '../../../api'
import iconReturn from '../../../assets/images/iconReturn.png'
import memoryUtils from '../../../utils/memoryUtils'
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button'
import Header from '../../../components/header';
import { EllipsisOutlined, LeftOutlined, CarOutlined } from '@ant-design/icons';



class Login extends Component {

    logout = () => {
        this.props.history.goBack()

    }

    onFinish = async(values) => {
        const { userName, password } = values
        const result = await reqLogin(userName, password)
        if (result.status === 200) { // 登陆成功

            const token = result.data.token
            console.log(token)
            memoryUtils.user.token = token // 保存在内存中
            storageUtils.saveUser({ token: token }) // 保存到local中
            // 跳转到车友圈首页界面 (不需要再回退回到登陆)
            console.log('success:', values)
            this.props.history.replace('/client/circlehome')
        }
        else {
            message.error(result.msg)
        }
    };
    
    render() {

        
        const onFinishFailed = (errorInfo) => {
                console.log('Failed:', errorInfo);
        };


        return (
            <div className="login">
                <Header onClick={this.logout} title="登录" />
                <section className="login-content">
                    <h1>登录车友圈</h1>
                    <Form
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name = "userName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name = "password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>未注册用户会自动登录</p>
                </section>
            </div>
        )
    }
}

export default Login