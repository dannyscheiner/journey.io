import React from 'react';
// ActiveCard is created via React Bootstrap
import { Card, Button } from 'react-bootstrap';

// Located on the Artist Dashboard, the ActiveCard component houses the interface to edit and view the metrics for an active campaign. It is distinguishable from an inactive card simply by the text above the "edit" and "view metrics" buttons that says "Active".

// Props are being passed down from the Dashboard Component
// name and id relate to campaign.id and campaign.name
// onClick, t
const ActiveCard = ({ name, id, onClick, deactivate }) => {
  //card display
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className='activeCard'>Active</Card.Subtitle>
        <div className='buttons'>
          <Button
            type='submit'
            variant='danger'
            onClick={() => {
              deactivate(id);
            }}
          >
            Deactivate
          </Button>
          <Button
            type='submit'
            variant='info'
            onClick={() => {
              onClick(id);
            }}
          >
            Edit
          </Button>
          <Button type='submit' variant='outline-info'>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ActiveCard;
