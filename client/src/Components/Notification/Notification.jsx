import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 20px;
  background-color: ${({ type }) => (type === 'error' ? '#ff0000' : '#00ff00')};

  color: ${({ type }) => (type === 'error' ? '#fff' : '#000')};
  border-radius: 10px;
  animation: ${fadeOut} 10s ease-in-out;
  animation-fill-mode: forwards;

  @media (max-width: 700px) {
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
`;

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 10000);

  if (!show) {
    return null;
  }

  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};

export default Notification;
