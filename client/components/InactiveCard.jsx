import React from 'react';

import { Card, Button } from 'react-bootstrap';

const InactiveCard = ({ name, id, onClick }) => {
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="inactiveCard">Inactive</Card.Subtitle>
        <div className="buttons">
          <Button type="submit" variant="outline-info">
            View Metrics
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InactiveCard;
