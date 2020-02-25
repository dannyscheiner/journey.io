import React from 'react';

import { Card, Button } from 'react-bootstrap';

// Located on the Artist Dashboard, the InactiveCard component keeps record of a deactivated, and thusly, inactive campaign. It is distinguishable from an active card simply by the text above the "edit" and "view metrics" buttons that says "Active".

// Props are being passed down from the Dashboard Component
// name and id relate to campaign.id and campaign.name
const InactiveCard = ({ name, id, show, onClick, showDetails, toggleDetailsModal }) => {
  return (
    // look at React Bootstrap to further understand the card component
    <Card className='dashboardCard' style={{ width: '25rem', backgroundColor: '#CACACA' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className='inactiveCard'>Inactive</Card.Subtitle>
        <div className='buttons'>
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

export default InactiveCard;
