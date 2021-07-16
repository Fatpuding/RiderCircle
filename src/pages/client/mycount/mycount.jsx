import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { Menu, Layout, Avatar, Image, Modal } from 'antd'
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, UserOutlined, MessageOutlined, CommentOutlined, StarOutlined, EditOutlined } from '@ant-design/icons';
import './mycount.less'
import avatar from './avatar.png'
import Footer from '../../../components/footer'
import UpdateForm from '../../../components/update-form/update-form';
import { reqInfo, reqUpdateInfo, reqPhoto } from '../../../api'

const { Content} = Layout;

function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}

export default class MyCountHome extends Component {
    formRef = React.createRef();

    state = {
        collapsed: false,
        userName: "",
        userDescription: "这里是简介",
        showStatus: 0,
        userPhoto:avatar
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        this.props.history.goBack()

    }

    login = () => {
        this.props.history.replace('/client/login')
    }

    showUpdate = () => {
        this.setState({
            showStatus: 1
        })
    }

    getInfo = async () => {
        const { token } = storageUtils.getUser()
        const result = await reqInfo(token)
        if (result.status === 200) {
            const { userName, userDescription, userPhoto } = result.data
            this.setState({
                userName,
                userDescription,
                userPhoto
                })
        }
        else {
            //message.error('获取个人信息失败')
        }
    }

    updateInfo = async () => {
        //1.隐藏确定框
        this.setState({
            showStatus: 0
        })
        //准备数据
        const userPhoto = this.formRef.current.formRef.current.getImgs()[0]
		const userDescription=this.formRef.current.state.userDescription
        const { token } = storageUtils.getUser()
        //2.发请求更新分类
		
        const result = await reqUpdateInfo(userPhoto,userDescription,token)
		

        if (result.status === 200) {
            //3.重新显示列表
            this.getInfo()
        }

    }

    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    componentDidMount() {
        this.getInfo()
    }

    render() {
        const { userName, userDescription, userPhoto, showStatus } = this.state
        const { token } = storageUtils.getUser()

        return (

            <div className="mycount">

                <Header onClick={this.logout} title="我的"/>
                <Content className="mycount-content">
                   
                    <Modal
                        title="修改信息"
                        visible={showStatus === 1}
                        onOk={this.updateInfo}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <UpdateForm ref={this.formRef} userPhoto={userPhoto} userName={userName} userDescription={userDescription} token={token} imgNum={1}/>
                    </Modal>
                    <div className="myinformation">
                        <Avatar className="avatar"
                            shape="circle"
                            src={getUrl(userPhoto)}>
                        </Avatar>
                        <div>
                            <h1>{userName}</h1>
                            <p>{userDescription ? userDescription:"这里是简介"}</p>
                            <LinkButton onClick={() => this.showUpdate()} icon={<EditOutlined />}/>
                         </div>
                    </div>
                    
                        <div className="activity" >
                        <LinkButton
                            style={{ fontSize: "16px" }}
                            icon={<StarOutlined />}
                            onClick={() => {
                            this.props.history.push('/client/mycount/myactivity')
                            }} >我的动态</LinkButton>
                        </div>
                        <div className="commentary" >
                        <LinkButton
                            style={{fontSize:"16px"}}
                            icon={<CommentOutlined />}
                            onClick={() => {
                            this.props.history.push('/client/mycount/mycommentary')
                            }} >我的评论</LinkButton>
                        </div>
                    <div className="switchaccount" >
                        <LinkButton
                            style={{ fontSize: "16px" }}
                            onClick={() => {
                            this.props.history.replace('/client/login')
                        }} >切换账号</LinkButton>
                    </div>

                    
                    
                </Content>
                <Footer
                    onClick1={()=>this.props.history.replace('/client')}
                    onClick2={()=>token ? this.props.history.replace('/client/mycount') :
                        this.props.history.replace('/client/login')}
                />
            </div>

        )
    }
} 