import styled from 'styled-components';

// styles for the exam report card display
export const SchoolDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  border-bottom: 1px solid #ccc;
  min-height: 5rem;
  width: 100%;
  margin-bottom: 15px;
  gap: 0.5rem;
`;
export const TermDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  padding: 5px 0 10px 0;
`;
export const StudentDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  border-bottom: 1px solid #ccc;
  min-height: 5rem;
  width: 100%;
  margin-bottom: 20px;
  gap: 0.5rem;
  padding: 5px;
`;
export const StudentProfileContainer = styled.div`
  height: 5rem;
  width: 8rem;
  border: 1px solid #ccc;
`;

export const CrestContainer = styled.div`
  height: 5rem;
  width: 5rem;
  border: 1px solid #ccc;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 5rem;
  padding: -30px;
  width: 50%;
  margin-bottom: 20px;
`;

export const SchoolName = styled.h3`
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0px 10px;
`;

export const Label = styled.p`
  font-weight: bold;
  margin: 0px 10px;
  border-bottom: 1px solid #ccc;
`;
export const Name = styled.p`
  text-transform: uppercase;
  display: block;
  margin: 0px 10px;
  border-bottom: 1px solid #ccc;
  // font-weight: bold;
`;

export const SingleContainer = styled.div`
  display: flex;
`;

// overlay for printing
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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
