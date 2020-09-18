import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './landingpage';
import Signup from './Signup';
import Siginin from './Siginin';


export default function Router() {
    return (
        <Switch>
            <Route path="/" component={LandingPage} exact/>
            <Route path="/signup" component={Signup} exact/>
            <Route path="/signin" component={Siginin} exact/>
        </Switch>
    )
}
