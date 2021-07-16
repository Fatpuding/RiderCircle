import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Button, Table, Card, Modal, message } from 'antd'
import LinkButton from '../../../components/link-button'
import UpdateForm from './update-form'
import Search from '../../../components/search/search'
import storageUtils from '../../../utils/storageUtils'
import { reqDeleteUser, reqUsers,reqSearchUser } from '../../../api'

const data = []
for (let i = 0; i < 16; i++) {
    data.push({
        userName: `用户`.concat(i),
        userDescription: "简介".concat(i),
        userPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        userCreatedAt:"hhhh"
    })
}


export default class Users extends Component {

    columns = [
        {
            title: '用户名',
            dataIndex: 'userName'
        },
        {
            title: '个人简介',
            dataIndex: 'userDescription'
        },
        {
            title: '头像',
            dataIndex: 'userPhoto',
            render: img => ( img ? <img src={'/common/getAPhoto?photo=' + img} alt="avatar" style={{ width: "60px", height:"60px" }}/> : <></> )
        },

        {
            title: '创建时间',
            dataIndex: 'userCreatedAt'
        },
        {
            title: '操作',
            render: (user) => (
                <span>
                    <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                </span>
            )
        },]

    formRef = React.createRef();
    state = {
        users: [],
        isShow: false,
        searchValue:''
    }

    
    
   
    //显示添加界面
    showAdd = () => {
        this.setState({ isShow: true })
    }
    

    handleonChange = (e) => {
        this.setState({ searchValue: e.target.value })

    }

    handleSearch = async () => {
        const { token } = storageUtils.getAdmin()
        const userName = this.state.searchValue
        const result = await reqSearchUser(userName, token)
        const users = result.data.userArray
        if (result.status === 200) {
            this.setState({users})
        }
    }

    //删除指定用户
    
    deleteUser = (user) => {
        const { token } = storageUtils.getAdmin()
        Modal.confirm({
            okText : '确定',
            cancelText:'取消',
            title: `确认删除${user.userName}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user.userName,token)
                if (result.status === 200) {
                    message.success('删除用户成功!')
                    this.getUsers()
                }
            }
        })
    }


    getUsers = async () => {
        const { token } = storageUtils.getAdmin()
        const result = await reqUsers(token)
        if (result.status === 200) {
            const users  = result.data.userArray
            this.setState({
                users
            })
        }
    }


    componentDidMount() {
        this.getUsers()
        
    }

    render() {
        const { users, isShow } = this.state
        const user = this.user || {}

	const {token}=storageUtils.getAdmin()
	if(!token){
		return <Redirect to ="/admin/login"/>
	}

        const title = <div style={{ display: "flex", width: "100%" }}>
            <Search
                onChange={(e) => this.handleonChange(e)}
                onClick={this.handleSearch.bind(this)}/>
            
        </div>
        return (

            
            <Card
                title={title}>
                <Table
                    bordered
                    rowKey='userName'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: 5
                    }}
                />

                <Modal
                    centered
                    okText='确定'
                    cancelText='取消'
                    title='添加用户'
                    visible={isShow}
                    
                    onOk={this.addUser}
                    onCancel={() => {
                        this.setState({ isShow: false })
                    }}
                >
                    <UpdateForm
                        ref={this.formRef}
                        userName={user.userName}
                        userDescription={user.userDescription}/>
                </Modal>
                

            </Card>
            
            
        )

           
    }
}
