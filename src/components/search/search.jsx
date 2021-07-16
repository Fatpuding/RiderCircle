import React from 'react';
import { Input } from 'antd';
import './search.less'
import LinkButton from '../link-button'
import { SearchOutlined } from '@ant-design/icons'


const { TextArea } = Input


export default function Search({ onChange, onClick}) {

    return (
        <div className="search">
            <TextArea
                className="input"
                onChange={onChange} />
            <LinkButton
                className="search-button"
                icon={<SearchOutlined />}
                onClick={onClick}>搜索</LinkButton>
        </div>
    );
};