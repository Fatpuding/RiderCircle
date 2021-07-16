import React, { Component} from 'react'
import { Redirect, Route, Link } from 'react-router-dom'
import { Comment, Layout, Avatar, Card, Empty, List, Collapse, Modal, Input, message } from 'antd'
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, MoreOutlined, LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons';
import './post.less'
import Comments from '../../../components/comment';
import { reqPostInfo, reqIssueComment, reqIssueReply } from '../../../api'
import { async } from 'q';
import IssueComment from '../../../components/issue-comment';
import empty from '../../../assets/images/empty.png'

const { Content, Footer } = Layout;
const { TextArea } = Input

function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}
const data = {
    postIssuer: {
        postIssuerName: "九牧林131",
        postIssuerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    },
    postIssueTime: "2021-07-06",
    postDescription: "马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下",
    postPhotoArray: ['https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'],
    postCircleName: `奔驰E级`,
    postUpNum: 120,
    postCommentaryNum: 20,
    postCommentaryArray: [
        {
            commenter: {
                commenterID:"1",
                commenterName: "Sala Soh",
                commenterPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            commentaryDescription: "哈哈哈哈哈哈哈哈",
            commentaryTime: "2021-7-7",
            replyNum: 0,
            replyArray: [{
                replayID: "1",
                replayerName:"haha",
                replyDescription: "哦哦哦哦哦哦"
            }]
        },
        {
            commenter: {
                commenterID: "2",
                commenterName: "Sala Soho",
                commenterPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            commentaryDescription: "哈哈哈哈哈哈哈哈",
            commentaryTime: "2021-7-7",
            replyNum: 20,
            replyArray: [{
                replayID: "1",
                replayerName: "hoho",
                replyDescription: "哦哦哦哦哦哦"
            }]
        },
        {
            commenter: {
                commenterID:"3",
                commenterName: "Sala",
                commenterPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            commentaryDescription: "哈哈哈哈哈哈哈哈",
            commentaryTime: "2021-7-7",
            replyNum: 20,
            replyArray: [{
                replayID: "1",
                replayerName: "hoho",
                replyDescription: "哦哦哦哦哦哦"
            }]
        }]
}




export default class Post extends Component {
    circleName = this.props.location.state.circleName||""
    state = {
        post: {
            postIssuer: {},
            postPhotoArray: [],
            commentaryDescription: "",
            replyDescription: "",
            visible: false,
            commentaryID: '',
            commentaryMasterName:'',
        }
    }

    logout = () => {
        if (this.circleName) {
            const circleName = this.circleName
            this.props.history.replace('/client/circlehome/circle', { circleName })
        }
        else {
            this.props.history.goBack()
        }

    }

    login = () => {
        this.props.history.replace('/client/login')
    }

    showModal = ({ commentaryID, commentaryMasterName }) => {
        this.setState({
            visible: true,
            commentaryID,
            commentaryMasterName
        })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    handleComment = (e) => {
        this.setState({ commentaryDescription: e.target.value })

    }

    issueComment = async () => {
        //准备数据
        const { token } = storageUtils.getUser()
        const { commentaryDescription } = this.state
        const postID = this.props.location.state.postID
        const postMasterName = this.props.location.state.postMasterName
        const result = await reqIssueComment({postMasterName,postID,commentaryDescription},token)
        if (result.status === 200) {
		this.setState({commentaryDescription:""})
            this.getPostInfo()
        }
        else {
            message.error(result.msg)
        }

    }

    handleReply = (e) => {
        this.setState({ replyDescription: e.target.value })

    }

    issueReply = async ( commentaryID, commentaryMasterName ) => {
        this.setState({
            visible:false
        })
        //准备数据
        const { token } = storageUtils.getUser()
        const { replyDescription } = this.state
        const result = await reqIssueReply({commentaryMasterName,commentaryID,replyDescription},token)
        if (result.status === 200) {
            this.getPostInfo()
        }
        else {
            message.error(result.msg)
        }

    }

    getPostInfo = async () => {
        const { token } = storageUtils.getUser()
        const postID = this.props.location.state.postID
        const result = await reqPostInfo(postID,token)
		
        if (result.status === 200) {
        const post = result.data
		//console.log(post)
        this.setState({
            post
        })
        }
        else {
        message.error(result.msg)
        }
    }
    componentDidMount() {
        this.getPostInfo()
    }

    render() {
        const { post, visible, commentaryID, commentaryMasterName,commentaryDescription } = this.state
        const { token } = storageUtils.getUser()
        return (
            <div className="post">

                <Header onClick={this.logout} title="帖子详情"/>
                <Content className="post-content">
                    <div className="post">
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src={getUrl(post.postIssuer.postIssuerPhoto)} />}
                            title={post.postIssuer.postIssuerName}
                            description={post.postIssueTime}
                        />
                        <div>
                                <p>{post.postDescription}</p>
                                <div className="imgs">
                                    {post.postPhotoArray !== null && post.postPhotoArray && post.postPhotoArray.length > 0 ?

                                        post.postPhotoArray.map(img => {
                                            return <img width={
                                                post.postPhotoArray.length === 1 ? "100%" :
                                                    post.postPhotoArray.length % 2 === 0 && post.postPhotoArray.length <= 4 ? "50%" :
                                                        "30%"}
                                                src={getUrl(img)}
                                                alt="img" />
                                        }) : <></>}
                                </div>
                            
                        </div>
                        </Card>
                    </div>


                    <div className="comment">
                        {post.postCommentaryArray ?
                            <>
                                <Modal
                                    mask={false}
                                    destroyOnClose
                                    onCancel={this.handleCancel.bind(this)}
                                    visible={visible}
                                    footer={null}
                                    style={{ top: 615 }}
                                    closable={false}

                                >
                                    <IssueComment
                                        commentaryID={commentaryID}
                                        commentaryMasterName={commentaryMasterName}
                                        onChange={(e) => { this.handleReply(e) }}
                                        onClick={() => this.issueReply(commentaryID, commentaryMasterName)} />
                                </Modal>
                                <List
                                    header={<div>评论</div>}
                                    dataSource={post.postCommentaryArray}
                                    renderItem={item => (
                                        <List.Item>
                                            <Comment
                                                author={item.commenter.commenterName}
                                                avatar={
                                                    <Avatar src={getUrl(item.commenter.commenterPhoto)} />
                                                }
                                                content={item.commentaryDescription}
                                                datetime={<span>{item.commentaryTime}</span>}
                                                actions={[
                                                    <Collapse ghost>{
                                                        item.replyNum ?
                                                            <Collapse.Panel
                                                                header={<span
                                                                    onClick={() => token ? this.showModal({
                                                                        commentaryID: item.commentaryID,
                                                                        commentaryMasterName: item.commenter.commenterName
                                                                    }) :
                                                                        this.login.bind(this)}>
                                                                    {`${item.replyNum} ${"回复"}`}
                                                                </span>}
                                                                showArrow={false}>
                                                                <List
                                                                    dataSource={item.replyArray}
                                                                    renderItem={replyitem => (
                                                                        <List.Item>
                                                                            <Comment
                                                                                author={replyitem.replyerName}
                                                                                content={replyitem.replyDescription} />
                                                                        </List.Item>)} />
                                                            </Collapse.Panel> :
                                                            <span onClick={() => token ? this.showModal({
                                                                commentaryID: item.commentaryID,
                                                                commentaryMasterName: item.commenter.commenterName
                                                            }) : this.login.bind(this)}>回复</span>}
                                                    </Collapse>]} />
                                        </List.Item>)} />
                                
								<br></br>
								<br></br>
								<br></br>
                            </>

                            :
							<Empty 
							description="抢先评论，这里需要你的态度"
							image={empty}/>
                            
                        }
                    </div>
                    <IssueComment
					value={commentaryDescription}
                        onChange={(e) => { this.handleComment(e) }}
                        onClick={this.issueComment}/>
                </Content>
            </div>

        )
    }
}