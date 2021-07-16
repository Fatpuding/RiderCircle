import React, { Component } from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import { Layout,Menu,Modal } from 'antd'
import {
    CarOutlined,
    ProfileOutlined,
    UserOutlined,
    QuestionCircleOutlined,
    CommentOutlined,
    BulbOutlined,
} from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils'
import Login from '../login/login'
import Users from '../users/users'
import Circles from '../circles/circles'
import Posts from '../posts/posts'
import Questions from '../questions/questions'
import Commentaries from '../commentaries/commentaries'
import Answer from '../answer/answer'
import LinkButton from '../../../components/link-button'
import ridercircle from './ridercircle.png'
import './home.less'

const { Header, Footer, Sider, Content } = Layout



export default class Adimin extends Component {

    logout = () => {
    // 显示确认框
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                this.props.history.replace('/admin/login')
            }
        })
}
    render() {
	
        
        return (
            <Layout style={{height:"960px"}}>
                <Sider >
                    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
                        <img src={ridercircle} alt="logo" />
                    </div>
                    <Menu style={{fontSize:"16px"}}
                            theme="dark" mode="inline" >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                用户管理
                                <Link to='/admin/users' />
                            </Menu.Item>
                            <Menu.Item key="2" icon={<CarOutlined />}>
                                车圈管理
                                <Link to='/admin/circles'/>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<ProfileOutlined />}>
                                帖子管理
                                <Link to='/admin/posts' />
                            </Menu.Item>
                            <Menu.Item key="4" icon={<QuestionCircleOutlined />}>
                                问答管理
                                <Link to='/admin/questions' />
                            </Menu.Item>
                     </Menu>
                </Sider>
                <Layout>
                    <Header style={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        height: "112px",
                        alignItems: "center",
                        fontSize: "30px",
                        color: "#fff",
                        display: "flex",
                    }}>
                        车友圈后台管理系统  
                        <LinkButton
                            onClick={this.logout}
                            style={{
                                display: "inline-block",
                                color: "#fcfcfc",
                                fontSize: "10px",
                                position:"absolute",
                                right:"20px"
                            }}
                        >
                            退出
                        </LinkButton>
                    </Header>
                    <Content style={{ margin: 20, backgroundColor: '#fcfcfc', overflow: "auto" }}>
                        <Switch>
                            <Redirect from='/admin' exact to='/admin/users' exact />
                            <Route path='/admin/login' component={Login} />
                            <Route path='/admin/users' component={Users} />
                            <Route path='/admin/circles' component={Circles} />
                            <Route path='/admin/posts' component={Posts} exact/>
                            <Route path='/admin/questions' component={Questions} exact/>
                            <Route path="/admin/posts/commentaries" component={Commentaries} />
                            <Route path="/admin/questions/answer" component={Answer} />
                            
                        </Switch>
                    </Content>
                    {/* <Footer
                        style={{
                            height:"80px",
                            textAlign: 'center',
                            color: '#cccccc',
                            fontSize: "20px"
                        }}>
                        开心管理、快乐工作！
                     </Footer>*/}
                </Layout>
            </Layout>
        );
    }
}