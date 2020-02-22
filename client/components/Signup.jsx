import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupVerify: false,
      name: '',
      username: '',
      password: '',
      location: '',
    };

    this.setName = this.setName.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPw = this.setPw.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPw(e) {
    this.setState({ password: e.target.value });
  }

  setLocation(e) {
    this.setState({ location: e.target.value });
  }

  createUser(e) {
    e.preventDefault();
    fetch('/artist/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        location: this.state.location,
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
        <Form.Group controlId="createNameInput">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            type="text"
            onChange={this.setUsername}
            value={this.state.name}
          />
        </Form.Group>
        <Form.Group controlId="createUsernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control
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
            value={this.state.password}
          />
        </Form.Group>
        <Form.Group controlId="createLocationInput">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            onChange={this.setUsername}
            value={this.state.username}
          />
        </Form.Group>
        <Button variant="info" onClick={this.createUser}>
          Sign Up
        </Button>
      </Form>
    );
  }
}

export default Signup;
