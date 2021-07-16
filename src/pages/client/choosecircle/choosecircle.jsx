import React, { Component } from 'react'
import { Layout, Card} from 'antd'
import Header from '../../../components/header'
import { reqDraft } from '../../../api'
import './choosecircle.less'


const { Content } = Layout;
function getUrl(userPhoto) {
    return '/common/getAPhoto?photo='.concat(userPhoto)
}



export default class ChooseCiecle extends Component {
    state = {
        circleArray: this.props.location.state.circleArray,
        token: this.props.location.state.token
    }

    logout = () => {
        this.props.history.goBack()

    }

    getCirclename = async (circleName) => {
        const { token } = this.state
        const result = await reqDraft(token)
        const draft=result.data
        if (result.status === 200) {
            this.props.history.replace('/client/circlehome/issue',{ circleName,draft})
            
        }
        
    }

    render() {const { circleArray } = this.state
        return (
            <div className="choosecircle">

                <Header onClick={this.logout} title="选择车圈" />
                <Content className="choosecircle-content">
                    {circleArray ? circleArray.map(item => {
                        return <Card
                            style={{ margin:"15px 0" }}
                            onClick={() => { this.getCirclename(item.circleName) }}>
                            <div className="circle">
                                <img src={getUrl(item.circlePhoto)} alt='img' className="img" />
                                    <div className="decription">
                                        <h2>{item.circleName}</h2>
                                        <span> {` ${item.circleUserNum} ${"加入   "} ${item.circleContentNum} ${"内容"}`} </span>
                                    </div>
                                </div>
                            </Card>
                        }):<></>}
                </Content>
            </div>

        )
    }
}