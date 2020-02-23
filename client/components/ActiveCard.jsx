import React from 'react';

import { Card, Button } from 'react-bootstrap';

const ActiveCard = ({ name, id, onClick }) => {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="activeCard">Active</Card.Subtitle>
        <div className="buttons">
          <Button
            type="submit"
            variant="info"
            onClick={() => {
              onClick(id);
            }}
          >
            Edit
          </Button>
          <Button type="submit" variant="outline-info">
            View Metrics
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ActiveCard;
