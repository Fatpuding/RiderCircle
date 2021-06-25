import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from "../App";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";

class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}
export default Router;
