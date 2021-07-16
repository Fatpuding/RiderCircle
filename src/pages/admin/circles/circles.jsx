import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import UpdateForm from './update-form'
import Search from '../../../components/search/search'
import LinkButton from '../../../components/link-button'
import storageUtils from '../../../utils/storageUtils'
import { reqDeleteCircle, reqAddOrUpdateCircle, reqAdminCircles, reqSearchCircle } from '../../../api'

const data = []
for (let i = 0; i < 16; i++) {
    data.push({
        circleName: `车圈`.concat(i),
        circleDescription: "简介".concat(i),
        circlePhotoArray: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"],
        
        circleMasterName: "saha".concat(i),
        circleActiveNum:"20"
    })
}

export default class Circles extends Component {
    columns = [
        {
            title: '车圈',
            dataIndex: 'circleName'
        },
        {
            title: '车圈简介',
            dataIndex: 'circleDescription'
        },
        {
            title: "活跃用户数",
            dataIndex: "circleActiveUserNum",
        },
        {
            title: "用户总数",
            dataIndex: "circleUserNum",
        },
        {
            title: '车圈图片',
            dataIndex: 'circlePhotoArray',
            render: imgs => (
                <div style={{ width:"180px" }}>
                    {imgs ? imgs.map(img => {
                        return (<img src={'/common/getAPhoto?photo=' + img} alt="img" style={{ width: "45px" }}/>)
                    }):<></>}
                </div>
            )
        },
        
        {
            title: "圈主",
            dataIndex: "circleMasterName",
        },
        {
            title: "创建时间",
            dataIndex: "circleCreateTime",
        },
        {
            title: '操作',
            render: (circle) => (
                <span>
                    <LinkButton onClick={() => this.showUpdate(circle)}>修改</LinkButton>
                    <LinkButton onClick={() => this.deleteCircle(circle)}>删除</LinkButton>
                </span>
            )
        },]

    formRef = React.createRef();
    state = {
        circles: [],
        isShow:false,
        searchValue: '',
    }

    //显示添加界面
    showAdd = () => {
        this.circle = null // 去除前面保存的circle
        this.setState({ isShow: true })
    }

    //显示修改界面
    showUpdate = (circle) => {
        this.circle = circle
        this.setState({
            isShow: true
        })
        //this.formRef.current.setState(circle)

    }

    handleonChange = (e) => {
        this.setState({ searchValue: e.target.value })

    }

    handleSearch = async () => {
        const { token } = storageUtils.getAdmin()
        const circleName = this.state.searchValue
        console.log(circleName)
        const result = await reqSearchCircle(circleName, token)
        const circles = result.data.circleArray
        if (result.status === 200) {
            this.setState({circles})
        }
    }

    //删除指定车圈

    deleteCircle = (circle) => {
        const { token } = storageUtils.getAdmin()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: `确认删除${circle.circleName}吗?`,
            onOk: async () => {
                const result = await reqDeleteCircle(circle.circleName,token)
                if (result.status === 200) {
                    message.success('删除车圈成功!')
                this.getCircles()
                }
            }
        })
    }


    //添加/更新车圈
    addOrUpdateCircle = async () => {

        this.setState({ isShow: false })

        // 1. 收集输入数据
        const { token } = storageUtils.getAdmin()
        const circlePhotoArray = this.formRef.current.formRef.current.getImgs()
        const { circleName, circleMasterName,circleDescription } = this.formRef.current.state
        //this.formRef.current.formRef.current.setState({fileList:[]})

        //console.log("shuju:", { circleName, circleMasterName, circleDescription })
        // 2. 提交添加的请求
        const result = await reqAddOrUpdateCircle(circleName, circleMasterName,circleDescription,circlePhotoArray,token)
        // 3. 更新列表显示
        if (result.status === 200) {
        message.success(`${this.circle ? '修改' : '添加'}${'车圈成功'}`)
            this.getCircles()
        }
    }

    getCircles = async () => {
        const { token } = storageUtils.getAdmin()
        const result = await reqAdminCircles(token)
        const circles = result.data.circleArray
        //const circles=data
        if (result.status === 200) {
            
        this.setState({
            circles
        })
        }
    }


    componentDidMount() {
        this.getCircles()

    }

    render() {
        const { circles, isShow } = this.state
        const circle = this.circle || {}
        console.log("circle:", circle)

        const title = <div style={{ display: "flex", width: "100%" }}>
            <Search
                onChange={(e) => this.handleonChange(e)}
                onClick={this.handleSearch.bind(this)} />
            < Button
                type='primary'
                onClick={this.showAdd}
                shape="round"
                style={{
                    position: "absolute",
                    right: "20px"

                }}> 创建车圈</Button>

        </div>

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='userName'
                    dataSource={circles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 6}}
                />

                <Modal
                    centered
                    destroyOnClose
                    okText='确定'
                    cancelText='取消'
                    title={circle.circleName ? '修改车圈' : '添加车圈'}
                    visible={isShow}
                    onOk={this.addOrUpdateCircle}
                    onCancel={() => {
                        this.setState({ isShow: false })
                    }}
                >
                    <UpdateForm
                        ref={this.formRef}
                        imgNum={3}
                        circlePhotoArray={circle.circlePhotoArray}
                        circleName={circle.circleName}
                        circleDescription={circle.circleDescription}
                        circleMasterName={circle.circleMasterName} />
                </Modal>

            </Card>
        )
    }
}