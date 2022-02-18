import React from 'react';
import StudentCard from './app/layouts/studentCard';
import { Route, Switch, Redirect } from 'react-router-dom';
import Registration from './app/layouts/registration';

function App() {
    return (
        <Switch>
            <Route path='/registration' component={Registration} />
            <Route path='/' component={StudentCard} />
            <Redirect to='/' />
        </Switch>
    );
}

export default App;
