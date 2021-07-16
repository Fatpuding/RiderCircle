import React from 'react';
import { Input } from 'antd';
import './index.less'
import LinkButton from '../link-button'

const { TextArea } = Input


export default function IssueComment({value, onChange, onClick}) {

    return (
        <div className="issue-comment">
            <TextArea
			value={value}
                className="input"
                placeholder="说点什么吧"
                onChange={onChange} />
            <LinkButton className="issue-button" onClick={onClick}>发布</LinkButton>
        </div>
    );
};