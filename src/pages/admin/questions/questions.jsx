import React, { Component } from 'react'
import { Table, Card, Modal, message } from 'antd'
import LinkButton from '../../../components/link-button'
import Search from '../../../components/search/search'
import storageUtils from '../../../utils/storageUtils'
import { reqDeleteAdminQuestion, reqQuestions, reqSearchQuestion } from '../../../api'

let data=[]
for (let i = 0; i < 6; i++) {
    data.push({
        questionID: "2",
        questionIssuerName: "九牧林131",
        questionIssueTime: "2021-07-06",
        questionDescription: "问题：怎样才算闯红灯？后轮刚过线就变红灯，是该走还是该停？",
        questionPhotoArray: [],
        questionSolved: true,
        questionAnswerNum: 20
    })
}


export default class Questions extends Component {
    columns = [
        {
            title: '问答ID',
            dataIndex: 'questionID'
        },
        {
            title: '提问人',
            dataIndex: 'questionIssuerName'
        },
        {
            title: '问题内容',
            dataIndex: 'questionDescription'
        },
        {
            title: '图片',
            dataIndex: 'questionPhotoArray',
            render: imgs => (
                <div style={{ width: "180px" }}>
                    {imgs?imgs.map(img => {
                        return (<img src={'/common/getAPhoto?photo=' + img} alt="img" style={{ width: "60px" }}/>)
                    }):<></>}
                </div>
            )
        },
        {
            title: '提问时间',
            dataIndex: 'questionIssueTime'
        },
        {
            title: '回答数',
            dataIndex: 'questionAnswerNum'
        },
        {
            title: '已解决',
            dataIndex: 'questionSolved',
            render: questionSolved => ( questionSolved ? <span>是</span> : <span>否</span> )
        },
  
        {
            title: '操作',
            render: (question) => (
                <span>
                    <LinkButton onClick={() => this.enterQuestion(question)}>查看详情</LinkButton>
                    <LinkButton onClick={() => this.deleteQuestion(question)}>删除</LinkButton>
                </span>
            )
        },]

    formRef = React.createRef();
    state = {
        questions: [],
        isShow: false,
        searchValue: ''
    }


    handleonChange = (e) => {
        this.setState({ searchValue: e.target.value })

    }

    handleSearch = async () => {
        const { token } = storageUtils.getAdmin()
        const questionID = this.state.searchValue
        console.log(questionID)
        const result = await reqSearchQuestion(questionID, token)
        const questions = []
        questions.push(result.data)
        if (result.status === 200) {
            this.setState({ questions })
        }
    }

    //删除指定问答

    deleteQuestion = (question) => {
        const { token } = storageUtils.getAdmin()
        Modal.confirm({
            title: `确认删除${question.questionID}吗?`,
            onOk: async () => {
                const result = await reqDeleteAdminQuestion(question.questionID,token)
                if (result.status === 200) {
                    message.success('删除问题成功!')
                this.getQuestions()
                }
            }
        })
    }


    enterQuestion = (question) => {
        this.props.history.push('/admin/questions/answer', { questionID: question.questionID })
    }

    getQuestions = async () => {
        const { token } = storageUtils.getAdmin()
        const result = await reqQuestions(token)
        const questions = result.data.questionArray
        if (result.status === 200) {
        this.setState({
            questions
        })
        }
    }


    componentDidMount() {
        this.getQuestions()

    }

    render() {
        const { questions} = this.state
        const question = this.question || {}
        console.log("question:", question)

        const title = <Search
            onChange={(e) => this.handleonChange(e)}
            onClick={this.handleSearch.bind(this)} />


        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='questionID'
                    dataSource={questions}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5 }}
                />

            </Card>
        )
    }
}