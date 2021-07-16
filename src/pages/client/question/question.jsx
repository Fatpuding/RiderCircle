import React, { Component } from 'react'
import { Redirect, Route, Link } from 'react-router-dom'
import { message, Layout, Avatar, Image, Button, List, Comment, Empty, Modal, Card } from 'antd'
import storageUtils from '../../../utils/storageUtils';
import LinkButton from '../../../components/link-button';
import IssueComment from '../../../components/issue-comment'
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, QuestionCircleOutlined, FormOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import './question.less'
import bestsolution_tag from '../../../assets/images/bestsolution_tag.png'
import empty from '../../../assets/images/empty.png'
import { reqQuestionInfo, reqAdoptAnswer, reqIssueAnswer } from '../../../api'

const { Content } = Layout;
function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}
const data = {
    questionID:"1",
    questionIssuer: {
        questionIssuerName: "九牧林131",
        questionIssuerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    },
    questionIssueTime: "2021-07-06",
    questionDescription: "问题：怎样才算闯红灯？后轮刚过线就变红灯，是该走还是该停？",
    questionPhotoArray: [],
    questionCircleName: `奔驰E级`,
    questionSolved: true,
    questionSolverName:"Sala Soh",
    questionAnswerNum: 2,
    answerArray: [
        {
            answerer: {
                answerName: "Sala Soh",
                answerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            answerDescription: "哈哈哈哈哈哈哈哈",
            answerTime: "2021-7-7",
            answerAcceptance: true,
        },
        {
            answerer: {
                answerName: "Sala Soho",
                answerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            answerDescription: "哈哈哈哈哈哈哈哈",
            answerTime: "2021-7-7",
            answerAcceptance: false,
        }
    ]
}


export default class Question extends Component {
    circleName = this.props.location.state.circleName||""

    state = {
        question: {
            questionIssuer: {},
            questionPhotoArray: [],
            visible: false,
            disabled: false,
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

    enterIsuue = () => {
        this.props.history.replace('/client/circlehome/issue', { choose: 1 })
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    handleAnswer = (e) => {
        this.setState({ answerDescription: e.target.value })

    }

    issueAnswer = async ({ questionID, questionMasterName }) => {
        this.setState({ visible:false })
        //准备数据
        const { token } = storageUtils.getUser()
        const { answerDescription } = this.state
        console.log(questionMasterName, questionID, answerDescription)
        const result = await reqIssueAnswer({questionMasterName,questionID,answerDescription},token)
        if (result.status === 200) {
            this.getQuestionInfo()
        }
        else {
            message.error(result.msg)
        }

    }

    getQuestionInfo = async () => {
        const {token} = storageUtils.getUser()
        const questionID  = this.props.location.state.questionID
        console.log("questionid:",questionID)
        const result = await reqQuestionInfo(questionID, token)
        if (result.status === 200) {
            const question = result.data
        //const question = data
        this.setState({
            question
        })
        }
        else {
            message.error(result.msg)
        }
    }

    solveQuestion = async(questionID,answererID) => {
        const { token } = storageUtils.getUser()
        
        console.log(questionID, answererID)
        const result = await reqAdoptAnswer(questionID, answererID, token)
        if (result.status == 200) {
            this.setState({ disabled: true })
        }
    }


    componentDidMount() {
        this.getQuestionInfo()
    }


    render() {
        const { question, visible, disabled } = this.state
        console.log("question",question)
        const { token } = storageUtils.getUser()

        return (
            <div className="question">

                <Header onClick={this.logout} title="车友圈" />
                <Content className="question-content">
                    <Card>
                        <Card.Meta
                            avatar={<Avatar src={getUrl(question.questionIssuer.questionIssuerPhoto)} />}
                            title={question.questionIssuer.questionIssuerName}
                            description={question.questionIssueTime}
                        />
                        <div>
                            <p>{question.questionDescription}</p>
                            {question.questionPhotoArray ? question.questionPhotoArray.map(
                                img => {
                                    return <img width={"30%"} src={getUrl(img)} />
                                }) : <></>
                            }
                            
                        </div>
                    </Card>

                    <div className='title'>
                    {question.questionAnswerNum ?
                        <div>{` ${"回答"}${'('}${question.questionAnswerNum}${')'}`}</div> :
                            <div>暂无回答</div>}
                    </div>
					<div>
                    {question.questionAnswerArray ?question.questionAnswerArray.map(
					item => {
					return <Card
                                        title={<Card.Meta
                                            title={item.answerer.answererName}
                                            avatar={
                                                <Avatar src={getUrl(item.answerer.answererPhoto)} />
                                            }
                                            description={item.answerTime}
                                        />}
										extra={item.answerAcceptance ? question.questionSelf?<></>:
                                            <img src={bestsolution_tag} alt='ba' style={{ width: "68px", height: "29px" }} /> :
                                            question.questionSolved ? <></>:
                                                !question.questionSelf ? <></> :
                                                    <Button
                                                        style={{ position: "absolute",right:"10px" }}
                                            type='primary'
                                            shape="round"
                                            size="small"
                                            disabled={disabled}
                                            onClick={() => { this.solveQuestion(question.questionID, item.answerID) }}>
                                                采纳答案</Button>
                                            }>
                                        
										<p>{item.answerDescription}</p>
                                    </Card>})
                         : <Empty 
							description="暂无回答"
							image={empty}/>}</div>
                </Content>
                <footer className="question-footer">
                    <Modal
                        destroyOnClose
                        onCancel={this.handleCancel}
                        visible={visible}
                        footer={null}
                        style={{ top: 615 }}
                        closable={false}>
                        <IssueComment
                            onChange={(e) => { this.handleAnswer(e) }}
                            onClick={this.issueAnswer.bind(this,
                                {
                                    questionID: question.questionID,
                                    questionMasterName: question.questionIssuer.questionIssuerName
                                })
                            } />
                    </Modal>
                    <div className="container">
                        <div className="question-issue">
                    <LinkButton
                        
                        icon={<QuestionCircleOutlined />}
                        onClick={() => token ? this.enterIsuue() : this.props.history.replace('/client/login')}>
                        <span>我要提问</span>
                            </LinkButton>
                        </div>
                        <div className="question-answer">
                    <LinkButton
                        icon={<FormOutlined />}
                        
                        onClick={() => {token ? this.showModal() : this.props.history.replace('/client/login') }}>
                        <span>写回答</span>
                            </LinkButton>
                        </div>
                    </div>
                </footer>
            </div>

        )
    }
}