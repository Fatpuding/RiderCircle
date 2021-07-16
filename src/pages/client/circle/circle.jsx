import React, { Component } from 'react'
import { List, Layout, Avatar, Image, Button, Space, Menu, Card, Tabs, Badge, message } from 'antd'
import { LikeFilled, CameraFilled, QuestionCircleFilled, MessageOutlined, CarOutlined, LikeOutlined } from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils'
import Header from '../../../components/header'
import { reqCircleData, reqRecentCircleData, reqJoinCircle, reqPostUp } from '../../../api'
import bestsolution_tag from '../../../assets/images/bestsolution_tag.png'
import more from '../../../assets/images/more.png'
import './circle.less'

const { Content } = Layout;

function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


export default class Circlehome extends Component {
    state = {
        circleName: this.props.location.state.circleName,
        circleUserPhoto: [],
        postArray: [],
        questionArray:[],
        dot:true
    }

    logout = () => {
        this.props.history.goBack()

    }

    login = () => {
        this.props.history.replace('/client/login')
    }

    enterPost = (postID, postIssuerName, circleName) => {
        this.props.history.replace('/client/circlehome/circle/post',
            { postID, postMasterName: postIssuerName, circleName })
    }

    joinCircle = async (circleName) => {
        this.setState({
            isJoined: true
        })
        const { token } = storageUtils.getUser()
        const result = await reqJoinCircle(circleName, token)
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

    getAllData = async () => {
        const { token } = storageUtils.getUser()
        const circleName = this.props.location.state.circleName
        console.log("车圈",circleName)
        const result = await reqCircleData(circleName,token)
        if (result.status === 200) {
            const {
                circleUserNum,
                circleBackGround,
                circleDescription,
                circleMasterPhoto,
                circleUserPhoto,
                isJoined,
                postArray,
                questionArray } = result.data
            this.setState({
               circleUserNum,
                circleBackGround,
                circleDescription,
                circleMasterPhoto,
               circleUserPhoto,
                isJoined,
                postArray,
                questionArray,
                dot: true
            })
        }
        else {
        message.error(result.mag)
        }
    }

    getRecentData = async () => {
        this.setState({dot:false})
        const { token } = storageUtils.getUser()
        const circleName = this.props.location.state.circleName
        console.log("车圈", circleName)
        const result = await reqRecentCircleData(circleName, token)
        if (result.status === 200) {
            const {
                circleUserNum,
                circleBackGround,
                circleDescription,
                circleMasterPhoto,
                circleUserPhoto,
                isJoined,
                postArray,
                questionArray } = result.data
            this.setState({
                circleUserNum,
                circleBackGround,
                circleDescription,
                circleMasterPhoto,
                circleUserPhoto,
                isJoined,
                postArray,
                questionArray,
            })
        }
        else {
            message.error(result.mag)
        }
    }


    componentDidMount() {
        this.getAllData()
    }

    render() {
        const {
            circleName,
            circleBackGround,
            circleUserNum,
            circleDescription,
            circleMasterPhoto,
            circleUserPhoto,
            isJoined,
            postArray,
            questionArray,
            dot } = this.state
        const { token } = storageUtils.getUser()
        console.log(circleBackGround)

        return (
            <div className="circle">
			

                <Header onClick={this.logout} title="车友圈" />
                <Content className="circle-content">
                    <div style={{display:"flex",height: "110px"}}>
                    <div style={{width:"70%"}}>
                            <h1>{circleName}</h1>
                            <Space>
                                {"圈主："}
                                <Avatar
                                    style={{ width: "18px", height: "18px" }}
                                    src={getUrl(circleMasterPhoto)}
                                    size="small" />
                                <Avatar.Group
                                    style={{ marginTop: "8px", marginLeft:"0" }}
                                    maxCount={4}
                                    size="small">
                                    {circleUserPhoto.map(img => {
                                        return <Avatar 
                                            src={getUrl(img)}
                                            style={{ width: "18px", height: "18px" }} />
                                    })}
                                    < Avatar src={more} style={{ width: "18px", height: "18px" }} />
                                </Avatar.Group>
                                {`${"等"} ${circleUserNum} ${"个车友"}`}
                            </Space>
                            <p>{circleDescription}</p>
                        </div>
                        <div style={{
                            width: "30%",
                            backgroundImage: "url(" + getUrl(circleBackGround) + ")",
                            backgroundSize: "100% 100%",
                            alignItems: "center"
                        }}>
                            <Button
                                type="primary"
                                shape="round" size="small"
                                style={{
                                    position: "absolute",
                                    right: "30px",
                                    top:"90px"
                                }}
                                onClick={() => token ?
                                    this.joinCircle(circleName, token) :
                                    this.props.history.replace('/client/login')}>{isJoined ? "已加入" : "加入"}
                            </Button>
                        </div>
                    </div>

                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={()=>this.getAllData() }>
                            热门
                        </Menu.Item>
                        <Menu.Item key="2" onClick={ ()=>this.getRecentData() }>
                            <Badge dot={dot}>最新</Badge>
                        </Menu.Item>
                    </Menu>
                    <div className="posts">
                        {postArray ? postArray.map(item => {
                            return <div className='post'>
							<Card>
                                <Card.Meta
                                    avatar={<Avatar src={getUrl(item.postIssuer.postIssuerPhoto)} />}
                                    title={item.postIssuer.postIssuerName}
                                    description={item.postIssueTime}
                                />
                                <div onClick={() => this.props.history.push('/client/circlehome/post',
                                    { postID: item.postID, postMasterName: item.postIssuerName, circleName })}>
                                    <p>{item.postDescription}</p>
                                    <div className="imgs">
                                        {item.postPhotoArray !== null && item.postPhotoArray && item.postPhotoArray.length > 0 ?
                                            item.postPhotoArray.map(img => {
                                                return <img width={
                                                    item.postPhotoArray.length === 1 ? "100%" :
                                                        item.postPhotoArray.length % 2 === 0 && item.postPhotoArray.length <= 4 ? "50%" :
                                                            "30%"}
                                                    src={getUrl(img)}
                                                    alt="img" />
                                            }) :
                                            <></>}
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
                                    <span onClick={() => { this.enterPost(item.postID, item.postIssuerName,circleName) }}>
                                        {React.createElement(MessageOutlined)}
                                        <span>{item.postCommentaryNum}</span>
                                    </span>
							</Space>
							</div>
                        }) : <></>}
                    </div>

                    <div className="questions">
                        {questionArray ? questionArray.map(item => {
                            return <div className='question'>
                                <Card >
                                    <Card.Meta
                                        avatar={<Avatar src={getUrl(item.questionIssuer.questionIssuerPhoto)} />}
                                        title={item.questionIssuer.questionIssuerName}
                                        description={item.questionIssueTime} />
                                    <div onClick={() => this.props.history.push('/client/circlehome/circle/question',
                                        { questionID: item.questionID, circleName })}>
                                        <p>{item.questionDescription}</p>
                                        <div className="imgs">{
                                            item.questionPhotoArray ? item.questionPhotoArray.map(img => {
                                                return <img src={getUrl(img)} style={{ width: "113px" }} />
                                            }) : <></>}
                                        </div>
                                    </div>
                                </Card>
								<Space>
									<span>{item.questionSolved ? "已解决" : ""}</span>
									<span>{item.questionAnswerNum ? `${'('}${item.questionAnswerNum}${')'} ${"回答"}`:"暂无回答"}</span>
								</Space>
                                <div className="answer">
                                    {item.questionSolved ?
                                        <Card
                                            title={
                                                <Card.Meta
                                                    title={item.acceptAnswer.answerer.answererName}
                                                    avatar={<Avatar src={getUrl(item.acceptAnswer.answerer.answererPhoto)} />}
                                                    description={<span>{item.acceptAnswer.answerTime}</span>} />
                                            }
                                            extra={
                                                <img
                                                    src={bestsolution_tag}
                                                    alt='ba'
                                                    style={{ width: "68px", height: "29px" }} />}>
                                            <p>{item.acceptAnswer.answerDescription}</p>
                                        </Card> :
                                        <></>}
                                </div>
                            </div>
                        }) : <></>}
                    </div>
                    
                    

                    <Menu className="bottom-menu" mode="horizontal">
                        <Menu.Item className="img"
                            onClick={() => token ? 
                                this.props.history.replace('/client/circlehome/issue', { choose: 0,circleName })
                                : this.props.history.replace('/login')
                            }
                            icon={<CameraFilled />} key="post">图文
                        </Menu.Item>
                        <Menu.Item className="ques"
                            onClick={() => 
                                token ?
                                    this.props.history.replace('/client/circlehome/issue', { choose: 1,circleName }) :
                                    this.props.history.replace('/client/login')
                            }
                            icon={<QuestionCircleFilled />} key="question">提问
                        </Menu.Item>
                    </Menu>

                </Content>
            </div>

        )
    }
}