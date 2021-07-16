import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CircleHomeHome from './circlehome'
import Issue from '../issue/home'
import Circle from '../circle/home'
import Post from '../post/post'
import Question from '../question/question'

export default class CircleHome extends Component {
    render() {
        return (
            <Switch>
                <Route path='/client/circlehome' component={CircleHomeHome} exact />
                <Route path='/client/circlehome/issue' component={Issue} />
                <Route path='/client/circlehome/circle' component={Circle} />
                <Route path='/client/circlehome/post' component={Post} />
                <Route path='/client/circlehome/question' component={Question} />
            </Switch>

        );
    }
}