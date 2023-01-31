import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningComponent = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotate} 1s linear infinite;
  border: 4px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

export default function Spinner() {
  return <SpinningComponent />;
}
