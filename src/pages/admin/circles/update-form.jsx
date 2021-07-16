import React, { Component } from 'react'
import { Form, Input, Avatar } from 'antd'
import UploadImgs from '../../../components/uplaod';
import storageUtils from '../../../utils/storageUtils'

const Item = Form.Item


export default class UpdateForm extends Component {
    state = {
        circleDescription: this.props.circleDescription,
        circleName: this.props.circleName,
        circlePhotoArray: this.props.circlePhotoArray,
        circleMasterName: this.props.circleMasterName,
	}


    constructor(props) {
        super(props)
        this.formRef = React.createRef()
    }

   

    onValuesChange = (changedValues, allValues) => {
        if (changedValues.circleName) {
            this.setState({
                circleName: changedValues.circleName
            })
        } else if (changedValues.circleDescription) {
            this.setState({
                circleDescription: changedValues.circleDescription
            })
        } else if (changedValues.circleMasterName) {
            this.setState({
                circleMasterName: changedValues.circleMasterName
            })
        }
    };

    render() {

        const { circleName, circleMasterName, circlePhotoArray, circleDescription } = this.state
        const imgNum = this.props.imgNum
        const { token } = storageUtils.getAdmin()
        return (
            <Form onValuesChange={this.onValuesChange}>
                <Form.Item
                    label="车圈"
                    name="circleName"
                    initialValue={circleName}
                    rules={[
                        {
                            required: true,
                            message: '请输入车圈名!',
                        },
                    ]}>
                    <Input placeholder="请输入车圈名" />
                </Form.Item>

                <Form.Item
                    label="简介"
                    name="circleDescription"
                    initialValue={circleDescription}
                    rules={[
                        {
                            required: true,
                            message: '请输入车圈简介!',
                        },
                    ]}>
                    <Input placeholder="请输入车圈简介" />
                </Form.Item>
                <Form.Item
                    label="车圈图片"
                    name="circlePhotoArray">
                    <UploadImgs ref={this.formRef} token={token} imgs={circlePhotoArray} imgNum={imgNum} />
                </Form.Item>
                <Form.Item
                    label="圈主"
                    name="circleMasterName"
                    initialValue={circleMasterName}
                    rules={[
                        {
                            required: true,
                            message: '请输入圈主名!',
                        },
                    ]}>
                    <Input placeholder="请输入圈主名" />
                </Form.Item>
            </Form>
        )
    }
}