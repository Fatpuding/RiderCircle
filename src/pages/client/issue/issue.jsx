import React, { Component } from 'react'
import { Redirect, Route, Link } from 'react-router-dom'
import { Input, Layout, Button, Modal, message } from 'antd'
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils'
import LinkButton from '../../../components/link-button';
import Header from '../../../components/header'
import { EllipsisOutlined, LeftOutlined, CarOutlined } from '@ant-design/icons';
import './issue.less'
import UploadImgs from '../../../components/uplaod';
import { __values } from 'tslib';
import { getValues } from 'jest-validate/build/condition';
import { reqCircles, reqIssuePost,reqSaveDraft,reqDeleteDraft } from '../../../api'

const { Content, Footer } = Layout;
const { TextArea } = Input;



export default class IssueHome extends Component {

   
    circleName = this.props.location.state.circleName||""
    draft = this.props.location.state.draft || {}
    choose = this.props.location.state.choose


    constructor(props) {
        super(props)
        this.formRef = React.createRef()
    }

    state = {
        visible: false,
        circleName: this.circleName ? this.circleName:this.draft.circleName? this.draft.circleName: "选择车圈",
        description: this.draft ? this.draft.description || "" : "",
        choose: this.choose === 0 || this.choose === 1? this.choose: this.draft.choose,
        circleArray: this.draft ? this.draft.circleArray||[] :[],
        photoArray: this.draft ? this.draft.photoArray||[] :[],
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleOk = async() => {
    //保存草稿
        this.setState({ visible: false });
        const { circleName, choose, description } = this.state
        const { token } = storageUtils.getUser()
        const photoArray = this.formRef.current.getImgs()
        const result = await reqSaveDraft(circleName, description,photoArray,choose,token)
        if (result.status === 200) {
            this.props.history.replace('/client/circlehome')
        }
        else {
            message.error(result.msg)
        }
    };

    handleCancel = () => {
    //取消
        this.setState({ visible: false });
    
    };

    handleAbandon = async() => {
        //丢弃
        const { token } = storageUtils.getUser()
        this.setState({ visible: false });
        const result = await reqDeleteDraft(token)
        if (result.status === 200) {
            this.props.history.replace('/client/circlehome')
        }
        else {
            message.error(result.msg)
        }
    };

    handleonChange = (e) => {
        this.setState({ description: e.target.value })

    }

    chooseCircle = async(circleArray) => {
        //先保存数据
        const { token } = storageUtils.getUser()
        const { circleName, choose, description } = this.state
        const photoArray = this.formRef.current.getImgs()
        const result = await reqSaveDraft(circleName, description, photoArray, choose, token)
        if (result.status === 200) {
            this.props.history.push('/client/circlehome/issue/choosecircle', { circleArray, token })
        }
        else {
            message.error(result.msg)
        }
        
    }

    getIssueInfo = async () => {
        const { token } = storageUtils.getUser()
        const result = await reqCircles(token)
        const { circleArray } = result.data
        if (result.status === 200) {
            this.setState({
                circleArray
            })
        }
        else {
            message.error(result.mag)
        }

    }

    issuePost = async () => {
        //准备数据
        const { token } = storageUtils.getUser()
        const { choose, circleName, description } = this.state
        const photoArray = this.formRef.current.getImgs()
        const result = await reqIssuePost(circleName, description, photoArray, choose, token)
        if (result.status == 200) {
            this.props.history.replace('/client/circlehome')
        }
        else {
            message.error(result.data)
        }
        

    }


    componentDidMount() {
        this.getIssueInfo()
    }

    render() {
        const { visible, circleName, choose, description, circleArray, photoArray } = this.state
        const imgNum = 9
        const { token } = storageUtils.getUser()

        return (
            <div className="issue">

                <Header onClick={this.showModal} title="发布" />
                <Content className="issue-content">
                    <div className="exit-confirm">
                        <Modal
                            centered
                            visible={visible}
                            title={<span>是否保存当前输入？</span>}
                            onCancel={this.handleCancel}
                            footer={<LinkButton
                                type="default"
                                onClick={this.handleCancel}
                                className="cancel"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#66A6FF",
                                    padding:"19px 0"
                                }}>
                                            取消
                                </LinkButton>}>
                            <LinkButton
                                type="default"
                                onClick={this.handleOk}
                                className="yes"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#66A6FF"
                                }}>
                                    保存草稿
                                </LinkButton>
                            <LinkButton
                                type="default"
                                onClick={this.handleAbandon}
                                className="no"
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#66A6FF",
                                    padding: "19px 0"
                                }}>
                                    丢弃
                                </LinkButton>
                            
                        </Modal>
                    </div>

                    <TextArea
                        placeholder="分享汽车生活"
                        onChange={(e) => { this.handleonChange(e) }}
                        bordered={false}
                        rows={4}
                        style={{ marginTop: "12px" }}
                        value={description}
                    />
                    <UploadImgs ref={this.formRef} imgNum={imgNum} token={token} imgs={photoArray}/>
                </Content>
                <footer className="issue-footer">
                    <div className="container">
                    <LinkButton icon={<CarOutlined />} className="choosecircle"
                        onClick={() => {this.chooseCircle(circleArray)}}>
                        {circleName ? circleName:"选择车友圈"}
                    </LinkButton>
                    <Button shape="round" type="primary" className="issue-button"
                        onClick={this.issuePost}>
                        发布
                        </Button>
                    </div>
                </footer>

            </div>

        )
    }
}