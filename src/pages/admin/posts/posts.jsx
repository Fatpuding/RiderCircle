import React, { Component } from 'react'
import { Button, Table, Card, Modal, message } from 'antd'
import LinkButton from '../../../components/link-button'
import UpdateForm from '../../../components/update-form/update-form'
import Search from '../../../components/search/search'
import storageUtils from '../../../utils/storageUtils'
import { reqDeleteAdminPost, reqPosts, reqSearchPost } from '../../../api'

const data = []
for (let i = 0; i < 16; i++) {
    data.push({
        postID: "1".concat(i),
        postIssuerName: "九牧林131",
        postIssueTime: "2021-07-06",
        postDescription: "马自达昂克赛拉 过年回家需要一辆实用的汽车不仅要大气还要能拉货的，年货准备充足，过年了，再多的年货我也装得下",
        postPhotoArray: ['https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'],
        postUpNum: 120,
        postCommentaryNum: 20
    })
}
export default class Posts extends Component {
    columns = [
        {
            title: '帖子ID',
            dataIndex: 'postID'
        },
        {
            title: '发帖人',
            dataIndex: 'postIssuerName'
        },
        {
            title: '帖子内容',
            dataIndex: 'postDescription'
        },
        {
            title: '帖子图片',
            dataIndex: 'postPhotoArray',
            render: imgs => (
                <div style={{ width: "180px" }}>
                    {imgs?imgs.map(img => {
                        return (<img src={'/common/getAPhoto?photo=' + img} alt="img" style={{ width: "60px" }}/>)
                    }):<></>}
                </div>
            )
        },
        {
            title: '发帖时间',
            dataIndex: 'postIssueTime'
        },

        {
            title: '点赞数',
            dataIndex: 'postUpNum'
        },
        {
            title: '评论数',
            dataIndex: 'postCommentaryNum'
        },
        {
            title: '操作',
            render: (post) => (
                <span>
                    <LinkButton onClick={() => this.enterPost(post)}>查看详情</LinkButton>
                    <LinkButton onClick={() => this.deletePost(post)}>删除</LinkButton>
                </span>
            )
        },]

    formRef = React.createRef();
    state = {
        posts: [],
        isShow: false,
        searchValue: ''
    }


    handleonChange = (e) => {
        this.setState({ searchValue: e.target.value })

    }

    handleSearch = async () => {
        const { token } = storageUtils.getAdmin()
        const postID = this.state.searchValue
        console.log(postID)
        const result = await reqSearchPost(postID, token)
        const posts = []
        posts.push(result.data)
        if (result.status === 200) {
            this.setState({posts})

        }
    }

    //删除指定帖子

    deletePost = (post) => {
        const { token } = storageUtils.getAdmin()
        Modal.confirm({
            title: `确认删除${post.postID}吗?`,
            onOk: async () => {
                const result = await reqDeleteAdminPost(post.postID,token)
                if (result.status === 200) {
                    message.success('删除帖子成功!')
                    this.getPosts()
                }
            }
        })
    }


    enterPost = (post) => {
        this.props.history.push('/admin/posts/commentaries', { postID: post.postID } )
    }

    getPosts = async () => {
        const { token } = storageUtils.getAdmin()
        const result = await reqPosts(token)
        if (result.status === 200) {
        const posts = result.data.postArray
        //const posts = data
            this.setState({
                posts
            })
        }
    }


    componentDidMount() {
        this.getPosts()

    }

    render() {
        const { posts } = this.state
        const post = this.post || {}
        console.log("post:", post)

        const title = <Search
            onChange={(e) => this.handleonChange(e)}
            onClick={this.handleSearch.bind(this)}/>


        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='postID'
                    dataSource={posts}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 4 }}
                />

            </Card>
        )
    }
}