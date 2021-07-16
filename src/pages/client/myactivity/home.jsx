import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Post from '../post/post'
import Question from '../question/question'
import MyActivityHome from './myactivity';

export default class MyActivity extends Component {
    render() {
        return (
            <Switch>
                <Route path='/client/mycount/myactivity' component={MyActivityHome} exact />
                <Route path='/client/mycount/myactivity/post' component={Post} exact />
                <Route path='/client/mycount/myactivity/question' component={Question} exact />
            </Switch>

        );
    }
}