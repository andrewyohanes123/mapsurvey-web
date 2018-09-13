import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './index.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Dashboard />
      </Fragment>
    );
  }
}

export default App;
