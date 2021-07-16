import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Post from '../post/post'
import Question from '../question/question'
import Circlehome from './circle';

export default class Circle extends Component {
    render() {
        return (
            <Switch>
                <Route path='/client/circlehome/circle' component={Circlehome} exact />
                <Route path='/client/circlehome/circle/post' component={Post} exact />
                <Route path='/client/circlehome/circle/question' component={Question} exact />
            </Switch>

        );
    }
}