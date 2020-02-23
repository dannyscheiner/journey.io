/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const EditCampaign = (props) => {
  const [spotifyWarning, setWarning] = useState(false);
  const warningText = spotifyWarning ? 'Please include a link to Spotify' : '';

  const [campaignResponses, updateResponses] = useState({
    // id: props.id,
    id: 2,
    name: '',
    video: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    soundcloud: '',
    tiktok: '',
    spotify: '',
    bio: ''
  });

  useEffect(() => {
    fetch('/artist/editcampaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ artist_id: 2 })
    })
      .then((response) => response.json())
      .then((campaignData) => {
        console.log('Success', campaignData);
        updateResponses(campaignData);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  });

  const createCampaign = (e) => {
    e.preventDefault();
    //check if spotify url is valid
    if (!e.target.spotifyInput.value.toLowerCase().includes('spotify')) {
      setWarning(true);
      return;
    }
  };

  return (
    <div className='editCampaign' style={{ width: '50%', margin: 'auto' }}>
      <h1>Edit Your Campaign</h1>
      <br></br>
      <Form onSubmit={createCampaign}>
        <Form.Group controlId='campaignNameInput'>
          <Form.Label>Campaign Name*</Form.Label>
          <Form.Control type='input' required defaultValue={campaignResponses.name} />
        </Form.Group>
        <Form.Group controlId='spotifyInput'>
          <Form.Label>Spotify*{warningText}</Form.Label>
          <Form.Control type='input' required />
        </Form.Group>
        <Form.Group controlId='facebookInput'>
          <Form.Label>Facebook</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='twitterInput'>
          <Form.Label>Twitter</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='instagramInput'>
          <Form.Label>Instagram</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='youtubeInput'>
          <Form.Label>YouTube</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='soundcloudInput'>
          <Form.Label>SoundCloud</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='tiktokInput'>
          <Form.Label>Tik Tok</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='promoVideoInput'>
          <Form.Label>Promo Video (Uploaded as YouTube link)</Form.Label>
          <Form.Control type='input' />
        </Form.Group>
        <Form.Group controlId='bioInput'>
          <Form.Label>Bio</Form.Label>
          <Form.Control as='textarea' rows='3' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditCampaign;
