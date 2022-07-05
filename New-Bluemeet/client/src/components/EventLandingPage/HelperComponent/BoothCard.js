import React from 'react';
import styled from 'styled-components';

const BoothName = styled.div`
font-weight: 600;
  font-size: 1.05rem;
  color: #212121;
`;

const BoothBrief = styled.div`
font-weight: 400;
  font-size: 0.8rem;
  color: #212121;
`;

const BoothCard = ({name,description,id, image}) => {
  return (
    <div key={id} className="booth-card px-3 py-3">
      <img
        src={image}
        className="booth-card-image mb-3"
        alt="booth-poster"
      />
      <BoothName className="booth-name mb-3">{name}</BoothName>
      <BoothBrief className="booth-short-description mb-3">
      {description}
      </BoothBrief>
    </div>
  );
};

export default BoothCard;
