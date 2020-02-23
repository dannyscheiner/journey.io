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
    };

    this.sendLogin = this.sendLogin.bind(this);
  }

  sendLogin(e) {
    e.preventDefault();

    fetch('/artist/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: e.target.loginUsernameInput.value,
        password: e.target.loginPasswordInput.value,
      }),
    })
      .then(data => data.json())
      .then(res => {
        this.props.updateState(res.id);
        this.setState({ loginVerify: true, loginError: '' });
      })
      .catch(err => {
        this.setState({
          loginError: 'Invalid username/password',
        });
      });
  }

  render() {
    if (this.state.loginVerify) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Form className="login" onSubmit={this.sendLogin}>
        <Form.Group controlId="loginUsernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="loginPasswordInput">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <p>{this.state.loginError}</p>
        <div className="buttons">
          <Button type="submit" variant="info">
            Login
          </Button>
          <Button type="submit" variant="outline-info">
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
