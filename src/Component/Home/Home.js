import React, { Component } from 'react';
import './Home.css';
import { Button } from 'antd';
import { EllipsisOutlined, LeftOutlined, CarOutlined } from '@ant-design/icons';
import Hotcircle from './Hotcircle';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('/Mock/hotcircles.json').then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data
                    })
                })
            }
        })
    }

    render() {
        return (
            <div className="container">
               
                <div className="header" >
                    <Button type="text" icon={<LeftOutlined />}> </Button>
                    车友圈
                    <Button type="text" icon={<EllipsisOutlined />}> </Button>

                </div>
                <div className='hotcircles' style={{ marginLeft: "8px" }}>
                    <img src='../../Images/2-车友圈.png'></img>
                    热门车友圈
                </div> 

                <div >
                    {
                        this.state.data.map(item => {
                            return <Hotcircle data={item} />
                        })
                    }

                </div> 
                

                
            </div>

            

        );
    }
}

export default Home;