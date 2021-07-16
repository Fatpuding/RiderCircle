import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Post from '../post/post'
import Question from '../question/question'
import MyCommentaryHome from './mycommentary';

export default class MyCommentary extends Component {
    render() {
        return (
            <Switch>
                <Route path='/client/mycount/mycommentary' component={MyCommentaryHome} exact />
                <Route path='/client/mycount/mycommentary/post' component={Post} exact />
                <Route path='/client/mycount/mycommentary/question' component={Question} exact />
            </Switch>

        );
    }
}