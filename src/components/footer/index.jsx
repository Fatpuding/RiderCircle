import React from 'react';
import { Menu } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import './index.less'
import  circlehome from '../../assets/images/circlehome.svg'
import mycount  from '../../assets/images/mycount.png'


export default function Footer({ onClick1, onClick2 }) {

    return (
        <div className="footer">
            <div className="container">
                <div className="circlehome" onClick={onClick1}>
                    <img src={circlehome} alt="circle" className="circleimg" />
                    <p className="name">车友圈</p>
                </div>
                <div className="mycount" onClick={onClick2}>
                    <img src={mycount} alt="circle" className="accountimg" />
                    <p className="name">我的</p>
                </div>
            </div>
        </div>
    );
};