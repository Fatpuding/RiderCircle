import React, { Component } from 'react'
import { Menu, Layout, Button, Dropdown, Image, message, List, Avatar, Space, Card } from 'antd'
import { CarOutlined, MessageOutlined, CameraFilled, QuestionCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { reqAllData, reqJoinCircle, reqPostUp,reqDraft } from '../../../api'
import bestsolution_tag from '../../../assets/images/bestsolution_tag.png'
import hotcircle from '../../../assets/images/hotcircle.png'
import more from '../../../assets/images/more.png'
import './circlehome.less'


const { Content} = Layout;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}


export default class CircleHomeHome extends Component {
    state = {
        collapsed: false,
        hotCircleArray: [],
        postArray: [],
        questionArray: [],
        draft: {}
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    login = () => {
        this.props.history.replace('/client/login')
    }

    enterCircle = (circleName) => {
        this.props.history.push('/client/circlehome/circle', { circleName })
    }

    enterPost = (postID,postIssuerName) => {
        this.props.history.replace('/client/circlehome/post', { postID, postMasterName:postIssuerName })
    }


    joinCircle = async (circleName) => {
        const { token } = storageUtils.getUser()
        const result = await reqJoinCircle(circleName,token)
        if (result.status === 200) {
            this.getAllData()
        }
    }

    handleLike = async (postID) => {
        const { token } = storageUtils.getUser()
        const result = await reqPostUp(postID,token)
        if (result.status === 200) {
            this.getAllData()
        }
    }

    handleComment = () => { }

    getAllData = async () => {
        const { token } = storageUtils.getUser()

        const result = await reqDraft(token)
        if (result.status === 200) {
            const draft = result.data || {}
            this.setState({
                draft
            })

        }
        
        const result1 = await reqAllData(token)
        const { hotCircleArray, postArray, questionArray } = result1.data
        if (result1.status === 200) {
            this.setState({
                hotCircleArray,
                postArray,
                questionArray,
            })
        }
        else {
            message.error(result.msg)
        }
    }

    componentDidMount() {
        this.getAllData()
    }

    render() {
        const { token } = storageUtils.getUser()
        const { hotCircleArray, postArray, questionArray, draft } = this.state

        const menu = (
            <Menu defaultSelectedKeys="post">
                <Menu.Item
                    onClick={() => token ? draft && draft.choose === 0 ?
                        this.props.history.push('/client/circlehome/issue', { draft }) :
                        this.props.history.push('/client/circlehome/issue', { choose: 0 }) 
                        : this.login()
                    }
                    icon={<CameraFilled />} key="post">发图文
                </Menu.Item>
                <Menu.Item
                    onClick={() => token ? draft && draft.choose === 1 ?
                        this.props.history.push('/client/circlehome/issue', { draft }) :
                        this.props.history.push('/client/circlehome/issue', { choose: 1 }) 
                        : this.login()
                    }
                    icon={<QuestionCircleFilled />} key="question">提问
                </Menu.Item>
            </Menu>
        );
        
        return (
            <div className="circlehome">
                <Header onClick={this.login} title="车友圈" />
                <Content className="circlehome-content">
                    <div className="hotcircle">
                        <img src={hotcircle} alt="hotimg" className="hotimg" />
                        <p className="title">热门车友圈</p>
                    </div>
                    <div className="hotcircle-array">
                        {hotCircleArray ? hotCircleArray.map(circle => {
                            return <Card
                                style={{
                                    margin: "0 0 16px 16px",
                                    boxShadow: " 0 2px 8px 0 rgba(0,0,0,0.10)",
                                    height: "177px",
                                    width:"246px"
                                }}
                                actions={[
                                    <Space>
                                        <Avatar.Group maxCount={4} size="small">
                                            {circle.circleUserPhoto ? circle.circleUserPhoto.map(img => {
                                                return <Avatar
                                                    src={getUrl(img)}
                                                    style={{ width: "18px", height: "18px" }} />
                                            }) : <></>}
                                            < Avatar src={more} style={{ width: "18px", height: "18px" }}/>
                                        </Avatar.Group>
                                        <p>{` ${circle.circleActiveUserNum} ${"位活跃车友"}`}</p>
                                        <Button
                                            shape="round"
                                            type="primary"
                                            size="small"
                                            onClick={() => token ?
                                                this.joinCircle(circle.circleName) :
                                                this.props.history.replace('/client/login', { path: '/client/circlehome' })}>
                                            {circle.isJoined ? "已加入" : "加入"}
                                        </Button>
                                    </Space>]}>
                                    <Card.Meta
                                        title={circle.circleName}
                                        onClick={this.enterCircle.bind(this, circle.circleName)} />
                                    <div style={{ marginLeft: "8px", width: "219px", height: "97px", display: "flex", overflowX: "hidden" }}> 
                                        {circle.circlePhotoArray ?
                                            circle.circlePhotoArray.map(img => {
                                            return <img
                                                src={getUrl(img)}
                                                alt="img"
                                                style={{ width: "73px", height: "97px" }} />
                                            }) : <></>
                                        }
                                    </div>
                            </Card>
                            }) : <></>}
                    </div>
                    <div className="posts">
                        {postArray ? postArray.map(item => {
                            return <div className='post'>
							<Card
                                >
                                <Card.Meta
                                    avatar={<Avatar src={getUrl(item.postIssuer.postIssuerPhoto)} />}
                                    title={item.postIssuer.postIssuerName}
                                    description={item.postIssueTime}
                                />
                                <div onClick={() => this.props.history.push('/client/circlehome/post',
                                    { postID: item.postID, postMasterName: item.postIssuerName })}>
                                    <p>{item.postDescription}</p>
                                    <div className="imgs">
                                    {item.postPhotoArray !== null && item.postPhotoArray && item.postPhotoArray.length > 0 ?
                                        item.postPhotoArray.map(img => {
                                                return <img
                                                    width={
                                                        item.postPhotoArray.length === 1 ? "100%" :
                                                        item.postPhotoArray.length % 2 === 0 && item.postPhotoArray.length <= 4 ? "50%" :
                                                        "30%"}
                                                    src={getUrl(img)}
                                                    alt="img" />
                                        }) : <></>}
                                    </div>
                                </div>
                            </Card>
							<Space>
							<IconText icon={CarOutlined} text={item.postCircleName} />
                                    <span onClick={token ? this.handleLike.bind(this, item.postID) :
                                        this.login.bind(this)}>
                                        {React.createElement(item.isUped ? LikeFilled : LikeOutlined)}
                                        <span>{item.postUpNum}</span>
                                    </span>
                                    <span onClick={() => { this.enterPost(item.postID, item.postIssuerName) }}>
                                        {React.createElement(MessageOutlined)}
                                        <span>{item.postCommentaryNum}</span>
                                    </span>
							</Space>
						</div>
                        }): <></>}
                    </div>

                    <div className="questions">
                        {questionArray ? questionArray.map(item => {
                            return <div className='question'>
                                <Card
                                    >
                                    <Card.Meta
                                        avatar={<Avatar src={getUrl(item.questionIssuer.questionIssuerPhoto)} />}
                                        title={item.questionIssuer.questionIssuerName}
                                        description={item.questionIssueTime} />
                                    <div onClick={() => this.props.history.push('/client/circlehome/circle/question',
                                        { questionID: item.questionID })}>
                                        <p>{item.questionDescription}</p>
                                        <div className="imgs">{
                                            item.questionPhotoArray ? item.questionPhotoArray.map(img => {
                                                return <img src={getUrl(img)} style={{ width: "113px"}} />
                                            }) : <></>}
                                        </div>
                                    </div>
                                </Card>
								<Space>
								<span>{item.questionSolved ? "已解决" : ""}</span>
                                        <span>{item.questionAnswerNum ?
                                            ` ${'('}${item.questionAnswerNum}${')'} ${"回答"}` :
                                            "暂无回答"} </span>
								</Space>
                                <div className= "answer">
                                    {item.questionSolved ?
                                        <Card
                                            title={
                                                <Card.Meta
                                                    title={item.acceptAnswer.answerer.answererName}
                                                    avatar={<Avatar src={getUrl(item.acceptAnswer.answerer.answererPhoto)} />}
                                                    description={<span>{item.acceptAnswer.answerTime}</span>} />
                                                }
                                            extra={<img src={bestsolution_tag} alt='ba' style={{ width: "68px", height: "29px" }} />}>
                                            <p>{item.acceptAnswer.answerDescription}</p>
                                        </Card> : <></>}
                                </div>
                            </div>
                        }) : <></>}
                    </div>

                    <Dropdown overlay={menu} placement="topRight" arrow className="issue-button" trigger="click">
                        <Button shape="circle" type="primary" className="issue">发布</Button>
                    </Dropdown>
                </Content>
                <Footer
                    onClick1={() => this.props.history.replace('/client')}
                    onClick2={() => token ? this.props.history.replace('/client/mycount') :
                        this.props.history.replace('/client/login')}
                />
            </div>

        )
    }
}