import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
    } from 'react-router-dom';

import App from '../containers/App';
import NavBar from '../components/Navbar';
import NewMotorcycles from '../containers/NewMotorcycles';


const Router = () => {
  return (
    <BrowserRouter>
        <NavBar />
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/new' component={NewMotorcycles} />
        </Switch>
    </BrowserRouter>
  )
}

export default Router