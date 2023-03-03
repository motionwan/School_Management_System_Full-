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
  width: 100%;
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
    width: 100%;
    height: 30px;
    font-size: 20px;
  }
`;

const TextInput = React.forwardRef(({ label, ...rest }, ref) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input ref={ref} {...rest} />
  </InputContainer>
));

export default TextInput;
