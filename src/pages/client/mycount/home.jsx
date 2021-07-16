import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import storageUtils from '../../../utils/storageUtils'
import MyActivity from '../myactivity/home'
import MyCountHome from './mycount';
import MyCommentary from '../mycommentary/home';

export default class MyCount extends Component {
    render() {
        const { token } = storageUtils.getUser()
        if (!token) {
            return <Redirect to='/client/login'/>
        }
        return (
            <Switch>
                <Route path='/client/mycount' component={MyCountHome} exact />
                <Route path='/client/mycount/myactivity' component={MyActivity} />
                <Route path='/client/mycount/mycommentary' component={MyCommentary} />
            </Switch>

        );
    }
}