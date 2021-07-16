import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export default function CommentForm({ author, avatar, content, datetime,replyArray,replayNum }) {

    
    const actions = [
        <span key="comment-basic-reply-to">回复</span>,
    ];

    return (
        <Comment actions={actions} avatar={avatar} author={author} content={content} datetime={datetime} />
    );
};