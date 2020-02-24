/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, Button, Navbar } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="homepage"
        style={{
          textAlign: 'center',
        }}
      >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">journey</Navbar.Brand>
        </Navbar>
        {/* LOG IN CARD */}
        <div
          className="cards-divs"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '50px',
          }}
        >
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>
                Already signed up as an artist? Visit your dashboard here to
                view metrics, and create or edit campaigns.
              </Card.Text>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              {/* <a id='login-btn' href='/login'>
                <Button variant='primary'>Login</Button>
              </a> */}
            </Card.Body>
          </Card>

          {/* SIGN UP CARD */}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Signup</Card.Title>
              <Card.Text>
                Not signed up as an artist yet? No problem! Sign up quickly to
                start a campaign in just minutes.
              </Card.Text>
              <Link to="/signup">
                <Button variant="primary">Signup</Button>
              </Link>
              {/* <a id='signup-btn' href='/signup'>
                <Button variant='primary'>Signup</Button>
              </a> */}
            </Card.Body>
          </Card>

          {/* USER CARD */}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Want to Request Your Artist in Your City?</Card.Title>
              <Card.Text>
                Search your artist's social media page to get their journey
                campaign link.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Homepage;
