import React from 'react';
import styled from 'styled-components';

const LocationContainer = styled.div`
  width: 100%;

  height: 9rem;
  background: ${({ theme }) => theme.bg3};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const LocationName = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 25px;
`;
const LocationIcon = styled.span`
  font-size: 25px;
  padding: 0 10px;
`;
const ChildrenBox = styled.div`
  margin-top: -1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TermLabel = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const LocationLabel = ({ children, label, icon, termLabel, children2 }) => {
  return (
    <div>
      <LocationContainer>
        <LocationName>
          <LocationIcon>{icon}</LocationIcon>
          {label}
        </LocationName>
        <ChildrenBox>
          {' '}
          <TermLabel>
            <h4>{termLabel} </h4>
          </TermLabel>
          {children}
        </ChildrenBox>
      </LocationContainer>
    </div>
  );
};

export default LocationLabel;
