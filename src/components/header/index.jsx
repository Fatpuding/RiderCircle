import React from 'react';
import LinkButton from '../link-button'
import {LeftOutlined , EllipsisOutlined } from '@ant-design/icons';
import './index.less'

export default function Header({ onClick, title }) {

    return (
        <div className="header">
            <div className="exit">
                <LinkButton icon={<EllipsisOutlined  />}  />
            </div>
            <span>{title}</span>
            <div className="return">
                <LinkButton icon={<LeftOutlined/>}  onClick={onClick}/>
            </div>
            
        </div>
    );
};