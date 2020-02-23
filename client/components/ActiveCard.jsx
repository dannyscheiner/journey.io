import React from 'react';

import { Card, Button } from 'react-bootstrap';

const ActiveCard = ({ name }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="activeCard">Active</Card.Subtitle>
        </Card.Body>
      </Card>
      <div className="buttons">
        <Button type="submit" variant="info">
          Edit
        </Button>
        <Button type="submit" variant="outline-info">
          View Metrics
        </Button>
      </div>
    </>
  );
};

export default ActiveCard;
