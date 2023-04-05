import styled from 'styled-components';

export const MajorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 10rem;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
export const MainContainer = styled.div`
  display: flex;
  gap: 50px;
  width: 70%;
  min-height: 20rem;
  border-radius: 10px;
  align-items: center;
  margin: 0 60px;
  padding: 50px;
  margin-top: 50px;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    min-width: 100%;
    flex-direction: column;
    margin: 10px 0;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;

export const Label = styled.label`
  font-size: 25px;
  font-weight: 500;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
