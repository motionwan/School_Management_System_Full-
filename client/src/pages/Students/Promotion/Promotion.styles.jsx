import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

export const NoteContainer = styled.div`
  width: 100%;
  min-height: 10px;
  background-color: salmon;
  border-radius: 5px;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 40px;
`;
export const Note = styled.p`
  font-size: 18px;
`;

export const OneByTwoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  min-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
