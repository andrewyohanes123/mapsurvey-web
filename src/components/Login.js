import React, { Component } from 'react'
import logo from '../logo.png';
import Req from '../modules/Req';
import Token from '../modules/Token';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    login: false,
    status : null,
    message : ""
  }

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  login = (ev) => {
    ev.preventDefault();
    const { username, password } = this.state;
    Req.post('/api/public/login', { username, password }).then(resp => {
      const { data, status, message } = resp.data;
      if (status) {
        Token.setLoginToken(data);
        this.setState({ login: true, status : true });
        setTimeout(() => {
          this.setState({ status : null, message })
        }, 3000)
      } else {
        this.setState({ status : false, message});
        setTimeout(() => {
          this.setState({ status : null, message })
        }, 3000)
      }
    });
  }

  componentDidMount = () => {
    const token = localStorage.getItem('x-access-token');
    const refreshToken = localStorage.getItem('x-refresh-token');
    console.log(token, refreshToken);
    if (token !== null && refreshToken !== null) {
      this.setState({ login: true });
    }
  }

  render() {
    if (this.state.login) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="login" >
        { this.state.status !== null &&
          <Notify {...this.state} />
        }
        <form action="" className="form">
          <img src={logo} alt="" className="logo" />
          <h3 className="thin text-center mt-2 mb-2" >Map Survey Web Manager</h3>
          <input type="text" name="username" onChange={this.onChangeText} className="input" placeholder="Username" />
          <input type="password" name="password" onChange={this.onChangeText} className="input" placeholder="Password" />
          <button type="submit" onClick={this.login} className="btn btn-block">Login</button>
        </form>
      </div>
    )
  }
}

const Notify = (props) => {
  return (
    <div className={`notify text-center ${props.status ? 'notify-success' : 'notify-danger'}`}>
      <p>{props.status ? "Login berhasil" : props.message}</p>
    </div>
  )
}