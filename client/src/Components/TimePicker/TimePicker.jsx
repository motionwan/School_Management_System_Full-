import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;
  width: 100px;
`;

const TimePicker = ({ value, onChange, onBlur, name }) => {
  return (
    <>
      <Input
        type='time'
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      />
    </>
  );
};

export default TimePicker;
