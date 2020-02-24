import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

import Map from './Map';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      data: {},
      details: [],
    };
  }

  componentDidMount() {
    fetch('/artist/campaign/' + this.props.id)
      .then(data => data.json())
      .then(res => {
        this.setState(res);
      });
  }

  render() {
    const { details } = this.state;
    if (this.state.details.length > 0) {
      const total = details[details.length - 1].total;
      const metrics = [
        <h3 key={details.length}>Total Participants: {total}</h3>,
      ];
      for (let i = 0; i < details.length - 1; i++) {
        metrics.push(
          <p key={i}>
            {details[i].city}: {(details[i].count / total) * 100}%
          </p>,
        );
      }
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
          <Map campaignId={this.props.id} />
          {metrics}
        </Modal>
      );
    } else {
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
          <Map markers={this.state.locationData} />
          <h1>No Metrics Available</h1>
        </Modal>
      );
    }
  }
}

export default Details;
