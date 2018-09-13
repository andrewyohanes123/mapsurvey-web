import React, { Component } from 'react'
import logo from '../logo.png';

export default class Login extends Component {
  render() {
    return (
      <div className="login" >
        <form action="" className="form">
          <img src={logo} alt="" className="logo" />
          <h3 className="thin text-center" >Map Survey Web Manager</h3>
          <input type="text" className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password" />
          <button className="btn btn-block">Login</button>
        </form>
      </div>
    )
  }
}
