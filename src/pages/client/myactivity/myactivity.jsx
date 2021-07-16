import React, { Component, Message } from 'react'
import { message, List, Layout, Card, Space, Popconfirm, Avatar,Empty } from 'antd'
import moment from 'moment'
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, DeleteOutlined, MessageOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import './myactivity.less'
import { reqActivities, reqDeletePost, reqDeleteQuestion } from '../../../api'
import empty from '../../../assets/images/empty.png'

const { Content } = Layout;

function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}
const postData = []
const questionData=[]

for (let i = 0; i < 6; i++) {
    postData.push({
        postID: i,
        postIssuer: {
            postIssuerName: "九牧林131".concat(i),
            postIssuerPhoto: "./public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png"
        },
        postIssueTime: "2021-07-06",
        postDescription: "马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下",
        postPhotoArray: ['./public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png',
            './public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png',
            './public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png'],
        postCircleName: `奔驰E级`.concat(i),
        postUpNum: 120,
        postCommentaryNum: 20,
        isUped: false
    })
}

for (let i = 0; i < 6; i++) {
    questionData.push({
        questionID: "2".concat(i),
        questionIssuer: {
            questionIssuerName: "九牧林11".concat(i),
            questionIssuerPhoto: "./public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png"
        },
        questionSolver: {
            questionSolverName: "九牧林".concat(i),
            questionSolverPhoto: "./public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png",
            questionSolverDescription: "这是最佳答案",
            questionSloverTime: "2021-07-06",

        },
        questionIssueTime: "2021-07-06",
        questionDescription: "问题：怎样才算闯红灯？后轮刚过线就变红灯，是该走还是该停？",
        questionPhotoArray: ["./public/photo/user/userPhoto5588b746-7c31-4c80-5fa2-1619cd460914.png"],
        questionCircleName: `奔驰E级`,
        questionSolved: true,
        questionAnswerNum: 20
    })
}

export default class MyActivityHome extends Component {
    state = {
            postArray: [],
            questionArray:[]
    }

    logout = () => {
        this.props.history.goBack()

    }

    enterPost = (postID) => {
        this.props.history.push('/client/mycount/myactivity/post', { postID })
    }

    enterQuestion= (questionID) => {
        this.props.history.push('/client/mycount/myactivity/question', { questionID })
    }

    getActivities = async () => {
        const {token} = storageUtils.getUser()
        const result = await reqActivities(token)
        if (result.status === 200) {
            const { postArray, questionArray } = result.data
        this.setState({
            postArray,
            questionArray
        })
        }
        else {
        Message.error(result.msg)
        }
    }

    handleConfirmPost = async(postID) => {
        const { token } = storageUtils.getUser()
        const result = await reqDeletePost(postID, token)
        if (result.status === 200) {
            this.getActivities()
        }
        else {
            message.error(result.msg)
        }
    }

    handleConfirmQuestion = async (questionID) => {
        const { token } = storageUtils.getUser()
        const result = await reqDeleteQuestion(questionID, token)
        if (result.status === 200) {
            this.getActivities()
        }
        else {
            message.error(result.msg)
        }
    }

    componentDidMount() {
        this.getActivities ()
    }

    render() {
        const { postArray, questionArray } = this.state
        console.log(postArray,questionArray)
        return (
            <div className="myactivity">
                <Header onClick={this.logout} title="我的动态" />
                
                <Content className="myactivity-content">
                    {!postArray && !questionArray ?
                        <Empty description="暂无内容" image={empty}/> :
						<div>
                            <div className="posts">
                                {postArray ? postArray.map(item => {
                                    return <div className='post'>
									<Card
									onClick={()=>{this.props.history.replace('/client/circlehome/post',{postID:item.postID})}}>
                                        <Card.Meta
                                            avatar={<Avatar src={getUrl(item.postIssuer.postIssuerPhoto)} />}
                                            title={item.postIssuer.postIssuerName}
                                        />
                                        <div className="content">
                                            <div className='description'>
											{item.postDescription}
											</div>
											{item.postPhotoArray.length > 0 ?
											
                                                <img src={getUrl(item.postPhotoArray[0])} className='img' />
												

                                                : <></>}
                                        </div>
                                    </Card>
									<Space>
                                                <span>{item.postIssueTime}</span>
                                                <span>{`${item.postCommentaryNum} ${"评论"}`}</span>
                                                <Popconfirm
                                                    title="确认要删除该条内容吗？"
                                                    okText="删除"
                                                    cancelText="取消"
                                                    onConfirm={this.handleConfirmPost.bind(this, item.postID)}>
                                                    <LinkButton icon={<DeleteOutlined />} />
                                                </Popconfirm>
												</Space>
												</div>
                                }) : 
								<></>}
                            </div>

                            <div className="questions">
                                {questionArray ? questionArray.map(item => {
                                    return <div className="content">
                                        <Card
										onClick={()=>{this.props.history.replace('/client/circlehome/circle/question',{questionID:item.questionID})}}
										>
                                        <Card.Meta
                                            avatar={<Avatar src={getUrl(item.questionIssuer.questionIssuerPhoto)} />}
                                                title={item.questionIssuer.questionIssuerName} />
                                            <div className='content'>
                                            <p>{item.questionDescription}</p>
                                            </div>
                                            </Card>
                                         <Space>
                                                <span>{item.questionIssueTime}</span>
                                                <span>{`${item.questionAnswerNum} ${"回答"}`}</span>
                                                <Popconfirm
                                                    title="确认要删除该条内容吗？"
                                                    okText="删除"
                                                    cancelText="取消"
                                                    onConfirm={this.handleConfirmQuestion.bind(this, item.questionID)}>
                                                    <LinkButton icon={<DeleteOutlined />} />
                                                </Popconfirm></Space>   
                                        </div>
                                    
                                }) : <></>}
                            </div>
                        </div>}
                </Content>
            </div>

        )
    }
}