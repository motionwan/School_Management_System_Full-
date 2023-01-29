import React from 'react';
import styled from 'styled-components';
import { PrimaryOutlineButton } from '../Buttons/PrimaryButton';
import { SecondaryOutlineButton } from '../Buttons/SecondaryButton';

const ModalOverlay = styled.div`
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

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease-in;
  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const DeleteAction = styled.h3`
  color: #000;
  font-weight: 500;
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  transition: all 0.3s ease-in-out;
  margin-top: 30px;
  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const DialogModal = ({ message, onDialog }) => {
  return (
    <>
      (
      <ModalOverlay>
        <ModalContainer>
          <DeleteAction>{message}</DeleteAction>
          <ModalActions>
            <SecondaryOutlineButton
              label='Yes'
              onClick={() => onDialog(true)}
            />

            <PrimaryOutlineButton label='No' onClick={() => onDialog(false)} />
          </ModalActions>
        </ModalContainer>
      </ModalOverlay>
      )
    </>
  );
};

export default DialogModal;
