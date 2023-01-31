import React from 'react';
import styled from 'styled-components';

const AddViewContainer = styled.div`
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.bg3};
  margin-bottom: 20px;
  border-radius: 5px;
`;

const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5px;
  gap: 20px;
`;

const AddView = ({ children }) => {
  return (
    <div>
      <AddViewContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
      </AddViewContainer>
    </div>
  );
};

export default AddView;
