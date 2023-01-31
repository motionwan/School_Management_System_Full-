import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  display: block;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
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
    width: 80%;
    height: 30px;
    font-size: 20px;
  }
`;

const TextInput = ({
  name,
  id,
  type,
  onChange,
  value,
  label,
  placeholder,
  checked,
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input
      checked={checked}
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
