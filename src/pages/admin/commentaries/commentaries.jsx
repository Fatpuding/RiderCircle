import React, { Component } from 'react'
import { Comment, Layout, Avatar, message, Empty, List, Collapse, Card } from 'antd'
import { DeleteOutlined} from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import { reqAdminPost, reqDeleteCommentary, reqDeleteAdminReply } from '../../../api'
//import './commentaries.less'
import './index.css'


const { Content } = Layout;

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
            commentaryID: "1",
            commenter: {
                commenterName: "Sala Soh",
                commenterPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            commentaryDescription: "哈哈哈哈哈哈哈哈",
            commentaryTime: "2021-7-7",
            replyNum: 0,
            replyArray: [{
                replayID: "1",
                replayerName: "haha",
                replyDescription: "哦哦哦哦哦哦"
            }]
        },
        {
            commentaryID: "2",
            commenter: {
                
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
            commentaryID: "3",
            commenter: {
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

export default class Commentaries extends Component {
    state = {
        post: {
            postIssuer: {},
            postPhotoArray: [],
        }
    }

    logout = () => {
        this.props.history.goBack()

    }

    deleteCommentary = async(commentaryID) => {
        const { token } = storageUtils.getAdmin()
        const result = await reqDeleteCommentary(commentaryID, token)
        if (result.status === 200) {
            this.getPostInfo()
        }
    }

    deleteReply = async(replyID) => {
        const { token } = storageUtils.getAdmin()
        const result = await reqDeleteAdminReply(replyID, token)
        if (result.status === 200) {
            this.getPostInfo()
        }
    }

    getPostInfo = async () => {
        const { token } = storageUtils.getAdmin()
        const postID  = this.props.location.state.postID
        const result = await reqAdminPost(postID,token)
        const post = result.data
        console.log(post)
        if (result.status === 200) {
        
        
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
        const { post} = this.state

        return (
            <div className="post">
                <LinkButton
                    onClick={this.logout}
                    style={{
                        fontSize: "16px",
                        padding: "12px",
                        marginBottom: "12px"
                    }}>返回</LinkButton>
                <div className="post-content">
                    <Card >
                        <Card.Meta
                            avatar={<Avatar src={getUrl(post.postIssuer.postIssuerPhoto)} />}
                            title={post.postIssuer.postIssuerName}
                            description={post.postIssueTime}
                        />
                        <div className="post-description">
                            {post.postDescription}
                        </div>
                        <div className="imgs">
                            {post.postPhotoArray !== null && post.postPhotoArray && post.postPhotoArray.length > 0 ?

                                post.postPhotoArray.map(img => {
                                    return <img width='143px'
                                        src={getUrl(img)}
                                        alt="img" />
                                }) : <></>}
                        </div>
                    </Card>

                    {post.postCommentaryArray ?
                        <div >
                            <List
                                header={<div>评论</div>}
                                dataSource={post.postCommentaryArray}
                                renderItem={item => (
                                    <List.Item
                                        extra={<LinkButton
                                            icon={<DeleteOutlined />}
                                            onClick={()=>this.deleteCommentary(item.commentaryID)} />
                                        }>
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
                                                            header={<span>{`${item.replyNum} ${"回复"}`}
                                                            </span>}
                                                            showArrow={false}>
                                                            <List
                                                                dataSource={item.replyArray}
                                                                renderItem={replyitem => (
                                                                    <List.Item
                                                                        extra={<LinkButton
                                                                            icon={<DeleteOutlined />}
                                                                            onClick={()=>this.deleteReply(replyitem.replyID)} />
                                                                        }>
                                                                        <Comment
                                                                            author={replyitem.replayerName}
                                                                            content={replyitem.replyDescription} />
                                                                    </List.Item>)} />
                                                        </Collapse.Panel> :
                                                        <></>}
                                                </Collapse>]} />
                                    </List.Item>)} />
                        </div> : <Empty description="暂无评论" />
                    }</div>
            </div>

        )
    }
}