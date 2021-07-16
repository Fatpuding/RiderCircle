import React, { Component,Message } from 'react'
import { Redirect, Route, Link } from 'react-router-dom'
import { Comment, Card, Layout, Empty, Avatar, Space, Popconfirm } from 'antd'
import moment from 'moment';
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, DeleteOutlined, MessageOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import './mycommentary.less'
import { reqCommentaries, reqDeleteReply } from '../../../api'
import empty from '../../../assets/images/empty.png'

const { Content } = Layout;

function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}


export default class MyCommentaryHome extends Component {
    state = {
        Commentaries:[]
    }


    logout = () => {
        this.props.history.goBack()

    }

    enterPost = (postID) => {
        this.props.history.push('/client/mycount/mycommentary/post', { postID })
    }

    handleConfirm = async (replyID) => {
        const { token } = storageUtils.getUser()
        const result = await reqDeleteReply(replyID, token)
        if (result.status === 200) {
        this.getCommentaries()
        }
    }

    getCommentaries = async () => {
        const {token} = storageUtils.getUser()
        const result = await reqCommentaries(token)
        if (result.status === 200) {
        const Commentaries = result.data.replyArray
        this.setState({
            Commentaries 
        })
        }
        else {
            Message.error(result.msg)
        }
    }
    componentDidMount() {
        this.getCommentaries()
    }

    render() {
        const { Commentaries } = this.state

        return (
            <div className="mycommentary">

                <Header onClick={this.logout} title="我的评论" />
                <Content className="mycommentary-content">{Commentaries?
                    Commentaries.map( item=> {
                            return <div className='comm'>
							<Card
                                >
                                <Card.Meta
                                    avatar={<Avatar src={getUrl(item.replyer.replyerPhoto)} />}
                                    title={item.replyer.replyerName}
                                    onClick={this.enterPost.bind(this, item.postID)}
                                />
                                <p>{item.replyDescription}</p>
                            </Card>
							<Space>
                                        <span>{item.replyTime}</span>
                                        <Popconfirm
                                            title="确认要删除该条内容吗？"
                                            okText="删除"
                                            cancelText="取消"
                                            onConfirm={this.handleConfirm.bind(this, item.replyID)}>
                                            <LinkButton icon={<DeleteOutlined />} />
                                        </Popconfirm></Space>
										</div>
                    }) :
                    <Empty 
					description="暂无内容"
							image={empty}/>}

                </Content>
            </div>

        )
    }
}