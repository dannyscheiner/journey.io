import React from 'react';

import { Card } from 'react-bootstrap';

const InactiveCard = ({ name }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="inactiveCard">Inactive</Card.Subtitle>
        </Card.Body>
      </Card>
      <div className="buttons">
        <Button type="submit" variant="outline-info">
          View Metrics
        </Button>
      </div>
    </>
  );
};

export default InactiveCard;
