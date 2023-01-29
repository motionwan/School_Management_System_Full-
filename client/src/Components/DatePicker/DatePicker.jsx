import React, { useState } from 'react';
import { format, isValid, parse } from 'date-fns';
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  outline: none;
  background: transparent;
  transition: all 0.3 ease-in-out;
  svg {
    color: white;
  }
`;

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);

  const handleDateChange = (event) => {
    const date = parse(event.target.value, 'yyyy-MM-dd', new Date());
    if (isValid(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <DatePickerContainer>
      <Input
        type='date'
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        onChange={handleDateChange}
      />
    </DatePickerContainer>
  );
};

export default DatePicker;
