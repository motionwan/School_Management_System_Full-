import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: red;
  border: 0.5px solid #3483eb;
  font-weight: bold;
  font-size: 14px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: #cd5c5c;
    color: #000;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    width: 200px;
    height: 70px;
    font-size: 18px;
  }
`;

const ButtonOutline = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid red;
  font-weight: bold;
  font-size: 14px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    width: 200px;
    height: 70px;
    font-size: 18px;
  }
`;
const Icon = styled.span`
  padding-right: 5px;
  svg: {
    font-size: 20px;
  }
`;

export const SecondaryButton = ({ label, icon, type, onClick }) => {
  return (
    <div>
      <Button onClick={onClick} type={type}>
        <Icon>{icon}</Icon>
        {label}
      </Button>
    </div>
  );
};
export const SecondaryOutlineButton = ({ label, icon, type, onClick }) => {
  return (
    <div>
      <ButtonOutline onClick={onClick} type={type}>
        <Icon>{icon}</Icon>
        {label}
      </ButtonOutline>
    </div>
  );
};
