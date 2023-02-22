import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 20px;
  }
`;

const CheckboxInput = ({
  name,
  id,
  type,
  onChange,
  checked,
  label,
  ...rest
}) => (
  <InputContainer>
    <Label htmlFor={id}>{label}</Label>
    <Checkbox
      checked={checked}
      name={name}
      id={id}
      type={type}
      onChange={onChange}
      {...rest}
    />
  </InputContainer>
);

export default CheckboxInput;
