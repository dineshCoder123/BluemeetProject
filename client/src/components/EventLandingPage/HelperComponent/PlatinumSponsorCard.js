import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  &:hover {

    cursor: pointer;

    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const PlatinumSponsorCard = ({id, image, url}) => {
  return (
    <>
      <a href={`//${url}`} target="_blank" rel="noreferrer">
    <Card key={id} style={{maxHeight: '180px', borderRadius: "10px",}}>
      <img
      style={{borderRadius: "10px", objectFit: "contain"}}
        className="sponsor-card"
        src={image}
        alt="sponsor card"
      />
    </Card>
    </a>
    </>
  );
};

export default PlatinumSponsorCard;
