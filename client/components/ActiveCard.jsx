import React from 'react';
// ActiveCard is created via React Bootstrap
import { Card, Button } from 'react-bootstrap';

import Details from './Details';

// Located on the Artist Dashboard, the ActiveCard component houses the interface to edit and view the metrics for an active campaign. It is distinguishable from an inactive card simply by the text above the "edit" and "view metrics" buttons that says "Active".

// Props are being passed down from the Dashboard Component
// name and id relate to campaign.id and campaign.name
const ActiveCard = ({
  // Below are props being passed down from the Dashboard Component using object deconstruction
  // name and id relate to campaign.id and campaign.name
  id,
  name,
  artistName,
  show,
  onClick,
  showDetails,
  toggleDetailsModal,
  deactivate
}) => {
  //card display
  console.log('active card ', id);
  return (
    // look at React Bootstrap to further understand the card component
    <Card className='dashboardCard' style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className='activeCard'>Active</Card.Subtitle>
        <Card.Subtitle>
          {/* window.location.origin means the path that the browser is at. journey.io/ for example. */}
          Link:
          <a href={window.location.origin + '/' + artistName + '/' + name}>
            {window.location.origin + '/' + artistName + '/' + name}
          </a>
        </Card.Subtitle>
        <div className='buttons'>
          <Button
            type='submit'
            // in bootstrap, variant being set to "danger" turns it red
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
          <Button
            type='submit'
            variant='outline-info'
            onClick={() => {
              showDetails(id);
            }}
          >
            View Details
          </Button>
        </div>
        <Details show={show} campaign={name} id={id} toggleDetailsModal={toggleDetailsModal} />
      </Card.Body>
    </Card>
  );
};

export default ActiveCard;
