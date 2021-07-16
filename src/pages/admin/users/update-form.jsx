import React, { Component } from 'react'
import {Form,Input,Avatar} from 'antd'
import storageUtils from '../../../utils/storageUtils'

const Item = Form.Item

export default class UpdateForm extends Component {
    state = {
        userDescription: this.props.userDescription,
        userName: this.props.userName,
	}


    constructor(props) {
        super(props)
        this.formRef = React.createRef()
    }

   

    onValuesChange = (changedValues, allValues) => {
        if (changedValues.userName) {
            this.setState({
                userName: changedValues.userName
            })
        } else if (changedValues.userDescription) {
            this.setState({
                userDescription: changedValues.userDescription
            })
        }
    };

    render() {

        const { userName, userDescription } = this.state
        const { token } = storageUtils.getUser()
        const imgNum = this.props
        console.log("form:",{ userName, userDescription})
        return (
            <Form onValuesChange={this.onValuesChange}>
                <Form.Item
                    label="用户名"
                    name="userName"
                    initialValue={userName}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}>
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    label="个人简介"
                    name="userDescription"
                    initialValue={userDescription}
                    rules={[
                        {
                            required: true,
                            message: '请输入个人简介!',
                        },
                    ]}>
                    <Input placeholder="请输入个人简介" />
                </Form.Item>
            </Form>
        )
    }
}