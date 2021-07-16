import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import IssueHome from './issue'
import ChooseCircle from '../choosecircle/choosecircle';

export default class Issue extends Component {
    render() {
        return (
            <Switch>
                <Route path='/client/circlehome/issue' component={IssueHome} exact/>
                <Route path='/client/circlehome/issue/choosecircle' component={ChooseCircle} exact/>
            </Switch>

        );
    }
}