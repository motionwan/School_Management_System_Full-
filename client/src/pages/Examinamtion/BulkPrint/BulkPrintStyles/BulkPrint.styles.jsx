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
  width: 100%;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    width: 80%;
    //align-items: f;
  }
`;

// overlay
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 678;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  min-width: 600px;
  max-height: 80vh;
  overflow-y: scroll;
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease-in;
  @media (max-width: 767px) {
    padding: 10px;
  }
`;

export const DeleteAction = styled.h3`
  color: #000;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  transition: all 0.3s ease-in-out;
  margin-top: 30px;
  @media (max-width: 767px) {
    padding: 10px;
  }
`;
