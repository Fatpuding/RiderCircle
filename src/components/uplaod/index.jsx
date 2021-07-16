import React from 'react'
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.less'
import { reqDeleteImg } from '../../api'


export default class UploadImgs extends React.Component {

    constructor(props) {
        super(props)
        let fileList = []
        const { imgs } = this.props || []
        if (imgs && imgs[0] !== undefined && imgs[0] !== '') {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: '/common/getAPhoto?photo='+img
            }))
        }
        
        this.state = {
            fileList,
            token: this.props.token
        }
    }

    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }

    handleChange = async ({ file, fileList,event }) => {
        const { token } = this.state
        if (file.status === "done") {
            const result = file.response
            if (result.status === 200) {
                const name = result.data.photo
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = '/common/getAPhoto?photo=' + name
            }
            else {
                message.error(result.msg)
            }
        }
        else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteImg(file.name,token)
            if (result.status === 400) {
                message.error(result.msg)
            }
        }
        this.setState({ fileList: [...fileList]  })
    }

    render() {
        const { fileList, token } = this.state;
        const { imgNum, imgs } = this.props

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
        );
        return (
            <>
                <Upload
                    maxCount={imgNum+1}
                    action="/common/sendAPhoto"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={this.handleChange}
                    headers={{ Authorization: token }}
                    data={{ belong: "user" }}
                >
                    {fileList.length >= imgNum ? null : uploadButton}
                </Upload>
            </>
        );
    }
}
