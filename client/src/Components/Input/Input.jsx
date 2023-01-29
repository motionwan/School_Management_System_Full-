import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: flex;
  width: 100%;
`;

const Label = styled.label`
  transition: all 0.2s ease-in-out;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 20px;
  margin-top: 3px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    font-size: 24px;
  }
`;

const TextInput = ({ name, id, type, onChange, value, label, placeholder }) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input
      name={name}
      id={id}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  </InputContainer>
);

export default TextInput;
