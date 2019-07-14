import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './login';
import ServersPage from './servers'

export default class IndexRouter extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route component={LoginPage} exact path="/login"></Route>
                    <Route component={ServersPage} path="/"></Route>
                </Switch>
            </Router>
        )
    }
}