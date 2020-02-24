/* eslint-disable react/no-array-index-key */
import React, { useState, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

const EditCampaign = props => {
  const [spotifyWarning, setWarning] = useState(false);
  const warningText = spotifyWarning ? 'Please include a link to Spotify' : '';

  const editCampaign = e => {
    e.preventDefault();
    //check if spotify url is valid
    if (!e.target.spotifyInput.value.toLowerCase().includes('spotify')) {
      setWarning(true);
      return;
    }
    const editCampaignFormData = {
      id: props.currentCampaign.id, // campaign_id passed in from fetch post, passed down thru state
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

    fetch('/artist/updatecampaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editCampaignFormData)
    })
      .then(response => response.json())
      .then(campaignData => {
        console.log('Success editing campaign', campaignData);
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
        props.toggleEditModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Campaign</Modal.Title>
      </Modal.Header>
      <Form onSubmit={editCampaign}>
        <Modal.Body>
          <Form.Group controlId="campaignNameInput">
            <Form.Label>Campaign Name*</Form.Label>
            <Form.Control
              type="input"
              required
              defaultValue={props.currentCampaign.name}
            />
          </Form.Group>
          <Form.Group controlId="spotifyInput">
            <Form.Label>Spotify*{warningText}</Form.Label>
            <Form.Control
              type="input"
              required
              defaultValue={props.currentCampaign.spotify}
            />
          </Form.Group>
          <Form.Group controlId="facebookInput">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.facebook}
            />
          </Form.Group>
          <Form.Group controlId="twitterInput">
            <Form.Label>Twitter</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.twitter}
            />
          </Form.Group>
          <Form.Group controlId="instagramInput">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.instagram}
            />
          </Form.Group>
          <Form.Group controlId="youtubeInput">
            <Form.Label>YouTube</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.youtube}
            />
          </Form.Group>
          <Form.Group controlId="soundcloudInput">
            <Form.Label>SoundCloud</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.soundcloud}
            />
          </Form.Group>
          <Form.Group controlId="tiktokInput">
            <Form.Label>Tik Tok</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.tiktok}
            />
          </Form.Group>
          <Form.Group controlId="promoVideoInput">
            <Form.Label>Promo Video (Uploaded as YouTube link)</Form.Label>
            <Form.Control
              type="input"
              defaultValue={props.currentCampaign.video}
            />
          </Form.Group>
          <Form.Group controlId="bioInput">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              defaultValue={props.currentCampaign.bio}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditCampaign;
