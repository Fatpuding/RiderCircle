import React, { Component } from 'react'
import { Comment, Layout, Avatar, message, Empty, List, Collapse, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import { reqAdminQuestion, reqDeleteAnswer } from '../../../api'
import bestsolution_tag from '../../../assets/images/bestsolution_tag.png'
const { Content } = Layout;

const data = {
    questionID: "1",
    questionIssuer: {
        questionIssuerName: "九牧林131",
        questionIssuerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    },
    questionIssueTime: "2021-07-06",
    questionDescription: "问题：怎样才算闯红灯？后轮刚过线就变红灯，是该走还是该停？",
    questionPhotoArray: [],
    questionSolved: true,
    questionSolverName: "Sala Soh",
    questionAnswerNum: 2,
    answerArray: [
        {
            answerID:"1",
            answerer: {
                answerName: "Sala Soh",
                answerPhoto: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            answerDescription: "哈哈哈哈哈哈哈哈",
            answerTime: "2021-7-7",
            answerAcceptance: true,
        },
        {
            answerID: "2",
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
function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}

export default class Answer extends Component {
    state = {
        question: {
            questionIssuer: {},
            questionPhotoArray: [],
        }
    }

    logout = () => {
        this.props.history.goBack()

    }

    deleteAnswer = async(answerID) => {
        const { token } = storageUtils.getAdmin()
        const result = await reqDeleteAnswer(answerID, token)
        if (result.status === 200) {
            this.getQuestionInfo()
        }
    }

    getQuestionInfo = async () => {
        const { token } = storageUtils.getAdmin()
        const questionID = this.props.location.state.questionID
        console.log("questionID", questionID)
        const result = await reqAdminQuestion(questionID,token)

        if (result.status === 200) {
        const question = result.data
        console.log(question)
        this.setState({
            question
        })
        }
        else {
        message.error(result.msg)
        }
    }
    componentDidMount() {
        this.getQuestionInfo()
    }


    render() {
        const { question} = this.state

        return (
            <div className="question">

                <LinkButton onClick={this.logout}>返回</LinkButton>
                    <Card >
                        <Card.Meta
                            avatar={<Avatar src={getUrl(question.questionIssuer.questionIssuerPhoto)} />}
                            title={question.questionIssuer.questionIssuerName}
                            description={question.questionIssueTime}
                        />
                        <div>
                        <p>{question.questionDescription}</p>
                    </div>
                    <div >{
                        question.questionPhotoArray ?
                            question.questionPhotoArray.map(img=> {
                                return <img src={getUrl(img)} style={{ width: "113px" }}/>
                        }):<></>
                    }
                        </div>
                    </Card>

                    {question.questionAnswerNum ?
                        <>
                            <List
                            header={question.questionAnswerNum ?
                                <div>{` ${"回答"}${'('}${question.questionAnswerNum}${')'}`}</div> :
                                <div>暂无回答</div>}
                            dataSource={question.questionAnswerArray}

                            renderItem={item => (
                                <List.Item
                                    extra={item.answerAcceptance ?
                                        <img src={bestsolution_tag} alt='ba' style={{ width: "68px", height: "29px" }} /> : <></>}
                                    actions={[
                                        <LinkButton
                                            icon={<DeleteOutlined />}
                                            onClick={()=>this.deleteAnswer( item.answerID)} />
                                    ]}>

                                       <Comment
                                            author={item.answerer.answererName}
                                            avatar={
                                                <Avatar src={getUrl(item.answerer.answererPhoto)} />
                                            }
                                            content={item.answerDescription}
                                            datetime={<span>{item.answerTime}</span>}
                                        />
                                    </List.Item>)}
                            />
                    </> : <Empty description='暂无回答'/>
                }

            </div>
        )
    }
}