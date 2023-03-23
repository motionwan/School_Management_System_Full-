import styled from 'styled-components';

export const FieldSet = styled.fieldset`
  min-height: 10rem;
  width: 100%;
`;

export const Legend = styled.legend`
  font-size: 20px;
`;

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const SingleFieldContainer = styled.div`
  width: 90%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 50px 0;
`;
