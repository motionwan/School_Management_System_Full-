import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin: 10px;
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text};
`;

const SelectComponent = ({ options, ...props }) => (
  <SelectContainer>
    <Select {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </SelectContainer>
);

export default SelectComponent;
