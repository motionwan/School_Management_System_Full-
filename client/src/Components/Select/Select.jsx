import React, { useState } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  width: 300px;
  margin: 30px auto;
  position: relative;
`;

const SelectStyled = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  color: inherit;
  background-color: ${({ theme }) => theme.bg2};
`;

const Icon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const ArrowDown = styled.svg`
  width: 20px;
  height: 20px;
  fill: #333;
`;

const SelectOption = styled.option`
  font-size: 16px;
`;

const SelectComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <SelectContainer>
      <SelectStyled value={selectedValue} onChange={handleChange}>
        <SelectOption value=''>Select an option</SelectOption>
        <SelectOption value='option1'>Option 1</SelectOption>
        <SelectOption value='option2'>Option 2</SelectOption>
        <SelectOption value='option3'>Option 3</SelectOption>
      </SelectStyled>
      <Icon>
        <ArrowDown viewBox='0 0 20 20'>
          <path d='M9.293, 12. 293, 16. 586, 5. 0, 9. 293, 8. 707, 5. 0, 0, 5. 0, 0, 5. 0 Z' />
        </ArrowDown>
      </Icon>
    </SelectContainer>
  );
};

export default SelectComponent;
