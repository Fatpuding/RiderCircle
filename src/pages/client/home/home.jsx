import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MyCount from '../mycount/home'
import CircleHome from '../circlehome/home'
import Login from '../login/login'

export default class Client extends Component {
    render() {
        return (
            <Switch>
                <Redirect from='/client' exact to='/client/circlehome' exact />
                <Route path='/client/circlehome' component={CircleHome} />
                <Route path='/client/mycount' component={MyCount} />
                <Route path='/client/login' component={Login} />
            </Switch>
                    
        );
    }
}