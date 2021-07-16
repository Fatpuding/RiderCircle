import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import './login.less'
import { reqAdminLogin } from '../../../api'
import storageUtils from '../../../utils/storageUtils'
import Header from '../../../components/header';



class Login extends Component {


    logout = () => {
        this.props.history.goBack()

    }

    onFinish = async (values) => {
        const { adminName, password } = values
        const result = await reqAdminLogin(adminName, password)
        if (result.status === 200) { // 登陆成功

            const token = result.data.token
            storageUtils.saveAdmin({ token: token }) // 保存到local中
            this.props.history.replace('/admin')
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
            <div className="login" style={{ alignItems: "center", height:"100%" }}>
                <section className="login-content">
                    <h1>登录管理系统</h1>
                    <Form
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="adminName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入管理员名!',
                                },
                            ]}
                        >
                            <Input placeholder="请输入管理员名" />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                
            </div>
        )
    }
}

export default Login