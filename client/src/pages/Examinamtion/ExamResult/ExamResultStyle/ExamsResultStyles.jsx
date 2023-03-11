import styled from 'styled-components';

export const ClassSectionHolder = styled.div`
  width: 100%;
  min-height: 8rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  // gap: 1rem;
  padding: 0.5rem;
  flex-direction: column;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const TwoByTwoContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 0;
  gap: 30px;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const MarksTableContainer = styled.div`
  width: 100%;
  min-height: 4rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0.2rem 1rem;

  background-color: ${({ theme }) => theme.bg3};
  flex-direction: column;
  margin: 20px 0;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const MarksContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 10px;
  gap: 30px;
  align-items: center;
  // justify-content: center;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
`;

export const NameLabel = styled.h3`
  font-size: 18px;
  text-align: left;
  width: 30%;
  margin-left: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
`;

export const InputContainer = styled.div`
  width: 30%;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    //align-items: f;
  }
`;
