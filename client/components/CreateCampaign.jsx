/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateCampaignComponent = (props) => {
  console.log(props.artistId);
  const [spotifyWarning, setWarning] = useState(false);
  const warningText = spotifyWarning ? 'Please include a link to Spotify' : '';
  const createCampaign = e => {
    e.preventDefault();
    //check if spotify url is valid
    if (!e.target.spotifyInput.value.toLowerCase().includes('spotify')) {
      setWarning(true);
      return;
    }
    const campaignData = {
      artist_id: props.artistId,
      name: e.target.campaignNameInput.value,
      video: e.target.promoVideoInput.value,
      facebook: e.target.facebookInput.value,
      twitter: e.target.twitterInput.value,
      instagram: e.target.instagramInput.value,
      youtube: e.target.youtubeInput.value,
      soundcloud: e.target.soundcloudInput.value,
      tiktok: e.target.tiktokInput.value,
      spotify: e.target.spotifyInput.value,
      bio: e.target.bioInput.value
    };

    fetch('/artist/createcampaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(campaignData)
    }).then(response => response.json())
      .then(campaignData => {
        console.log('Successful submission', campaignData);
        props.loadArtistCampaigns();
      })
      .catch(error => {
        console.log('Error', error);
      });
  };
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.toggleCreateModal(false);
      }}
    >
      <Form onSubmit={createCampaign}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="campaignNameInput">
            <Form.Label>Campaign Name*</Form.Label>
            <Form.Control type="input" required />
          </Form.Group>
          <Form.Group controlId="spotifyInput">
            <Form.Label>Spotify*{warningText}</Form.Label>
            <Form.Control type="input" required />
          </Form.Group>
          <Form.Group controlId="facebookInput">
            <Form.Label>Facebook</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="twitterInput">
            <Form.Label>Twitter</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="instagramInput">
            <Form.Label>Instagram</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="youtubeInput">
            <Form.Label>YouTube</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="soundcloudInput">
            <Form.Label>SoundCloud</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="tiktokInput">
            <Form.Label>Tik Tok</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="promoVideoInput">
            <Form.Label>Promo Video (Uploaded as YouTube link)</Form.Label>
            <Form.Control type="input" />
          </Form.Group>
          <Form.Group controlId="bioInput">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateCampaignComponent;
