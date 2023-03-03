import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  pointer-events: none;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  height: 40px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text};
  padding: 10px;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    height: 50px;
    font-size: 20px;
  }
`;

const Option = styled.option`
  color: ${({ theme }) => theme.text};
`;

const SelectInputField = React.forwardRef(
  ({ label, options, ...rest }, ref) => (
    <InputContainer>
      <Label>{label}</Label>
      <SelectInput ref={ref} {...rest}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </SelectInput>
    </InputContainer>
  )
);

export default SelectInputField;
