import React from 'react';

import { Card, Button } from 'react-bootstrap';

import Details from './Details';

const ActiveCard = ({
  id,
  name,
  artistName,
  show,
  onClick,
  showDetails,
  toggleDetailsModal,
  deactivate,
}) => {
  //card display
  console.log('active card ', id);
  return (
    <Card className="dashboardCard" style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="activeCard">Active</Card.Subtitle>
        <Card.Subtitle>
          Link:
          <a href={window.location.origin + '/' + artistName + '/' + name}>
            {window.location.origin + '/' + artistName + '/' + name}
          </a>
        </Card.Subtitle>
        <div className="buttons">
          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              deactivate(id);
            }}
          >
            Deactivate
          </Button>
          <Button
            type="submit"
            variant="info"
            onClick={() => {
              onClick(id);
            }}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="outline-info"
            onClick={() => {
              showDetails(id);
            }}
          >
            View Details
          </Button>
        </div>
        <Details
          show={show}
          campaign={name}
          id={id}
          toggleDetailsModal={toggleDetailsModal}
        />
      </Card.Body>
    </Card>
  );
};

export default ActiveCard;
