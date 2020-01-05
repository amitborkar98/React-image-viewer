import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/Login';


class Controller extends Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Login {...props} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;