import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #3483eb;
  border: 1px solid #3483eb;
  font-weight: bold;
  font-size: 14px;
  border-radius: 5px;
  letter-spacing: 0.9px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: #34deeb;
    color: #000;
    transform: translateY(-3px);
  }
  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 50px;
    font-size: 18px;
  }
`;

const ButtonOutline = styled.button`
  background: ${({ theme }) => theme.bg3};
  border: 1px solid #3483eb;
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
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 50px;
    font-size: 18px;
  }
`;
const Icon = styled.span`
  padding-right: 5px;
  svg: {
    font-size: 20px;
  }
`;

export const PrimaryButton = ({ label, icon, type, onClick, ...rest }) => {
  return (
    <div>
      <Button onClick={onClick} {...rest} type={type}>
        <Icon>{icon}</Icon>
        {label}
      </Button>
    </div>
  );
};
export const PrimaryOutlineButton = ({
  label,
  icon,
  onClick,
  type,
  ...rest
}) => {
  return (
    <div>
      <ButtonOutline onClick={onClick} {...rest} type={type}>
        <Icon>{icon}</Icon>
        {label}
      </ButtonOutline>
    </div>
  );
};
