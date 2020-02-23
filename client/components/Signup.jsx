import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupVerify: false,
    };

    this.createUser = this.createUser.bind(this);
  }

  createUser(e) {
    e.preventDefault();

    fetch('/artist/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.createNameInput.value,
        username: e.target.createUsernameInput.value,
        password: e.target.createPasswordInput.value,
        location: e.target.createLocationInput.value,
      }),
    })
      .then(data => data.json())
      .then(res => {
        this.props.updateState(res.id);
        this.setState({ signupVerify: true });
      })
      .catch(err => {
        console.log('Signup ERROR: ', err);
      });
  }

  render() {
    if (this.state.signinVerify) {
      return <Redirect to="/" />;
    }
    return (
      <Form className="signup" onSubmit={this.createUser}>
        <Form.Group controlId="createNameInput">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="createUsernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="createPasswordInput">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Create a password" />
        </Form.Group>
        <Form.Group controlId="createLocationInput">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button variant="info" type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }
}

export default Signup;
