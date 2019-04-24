import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import App from './App';
import Login from './pages/login';
import Weather from './pages/weather';


class Routes extends Component {
  static propTypes = {
  }
  
  render() {
    const { history } = this.props
    return (
      <Router history={history}>
        <App>
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Weather} />
        </App>
      </Router>
    )
  }
}

export default Routes
