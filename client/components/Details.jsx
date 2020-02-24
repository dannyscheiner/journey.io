import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

import Map from './Map';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/artist/getcampaigndetails' + this.props.id)
      .then(data => data.json())
      .then();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.props.toggleDetailsModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.campaign}</Modal.Title>
        </Modal.Header>
        <Map />
        <p>Total Participants: </p>
      </Modal>
    );
  }
}

export default Details;
