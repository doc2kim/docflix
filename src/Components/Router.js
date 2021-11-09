import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Header from "Components/Header";
import Search from "Routes/Search/SearchContainer";
import Detail from "Routes/Detail/DetailContainer";


// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return (
        <Router>
            <>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/tv" exact component={TV} />
                    <Route path="/search" exact component={Search} />
                    <Route path="/movie/:id" component={Detail} />
                    <Route path="/tv/:id" component={Detail} />
                    <Redirect from="*" to="/" />
                </Switch>
            </>
        </Router>
    )
}