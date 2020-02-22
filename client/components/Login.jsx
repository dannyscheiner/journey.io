/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginVerify: false,
      loginError: '',
      username: '',
      password: '',
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPw = this.setPw.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPw(e) {
    this.setState({ password: e.target.value });
  }

  sendLogin(e) {
    e.preventDefault();
    fetch('/artist/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          this.props.updateId(res.text().id);
          this.setState({ loginVerify: true, loginError: '' });
        }
        if (res.status === 400) {
          this.setState({
            loginError: 'Invalid username/password',
            username: '',
            password: '',
          });
        }
      })
      .catch(err => {
        console.log('Login ERROR: ', err);
      });
  }

  render() {
    if (this.state.loginVerify) {
      return <Redirect to="/" />;
    }
    return (
      <Form className="login">
        <Form.Group controlId="loginUsernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="user"
            name="username"
            type="text"
            onChange={this.setUsername}
            value={this.state.username}
          />
        </Form.Group>
        <Form.Group controlId="loginPasswordInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="pw"
            name="pw"
            type="password"
            onChange={this.setPw}
            value={this.state.password}
          />
        </Form.Group>
        <p>{this.state.loginError}</p>
        <div className="buttons">
          <Button variant="info" onClick={this.sendLogin}>
            Login
          </Button>
          <Button variant="outline-info">
            <Link className="signupLink" to={'/signup'}>
              Sign Up
            </Link>
          </Button>
        </div>
      </Form>
    );
  }
}
export default Login;
