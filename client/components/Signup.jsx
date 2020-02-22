import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupVerify: false,
      usernameUnavailable: false,
      username: '',
      password: '',
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPw = this.setPw.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPw(e) {
    this.setState({ pw: e.target.value });
  }

  createUser(e) {
    e.preventDefault();
    fetch('/artist/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        pw: this.state.pw,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ signupVerify: true });
        }
      })
      .catch(err => {
        console.log('Login ERROR: ', err);
      });
  }

  render() {
    if (this.state.signinVerify) {
      return <Redirect to="/" />;
    }
    return (
      <Form className="signup">
        <Form.Group controlId="createUsernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="user"
            name="username"
            type="text"
            onChange={this.setUsername}
            value={this.state.username}
          />
        </Form.Group>
        <Form.Group controlId="createPasswordInput">
          <Form.Label htmlFor="pw">Password</Form.Label>
          <Form.Control
            id="pw"
            name="pw"
            type="password"
            placeholder="Create a password"
            onChange={this.setPw}
            value={this.state.pw}
          />
        </Form.Group>
        <p>{this.state.loginError}</p>
        <Button variant="info" onClick={this.createUser}></Button>
      </Form>
    );
  }
}

export default Signup;
