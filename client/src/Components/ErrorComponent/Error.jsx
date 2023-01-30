import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center; ;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  font-weight: 500;
  @media (min-width: 700) {
    font-size: 26px;
  }
`;
